import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/config/api';

export interface ListingType {
  name_en: string;
  name_ar: string;
  icon: string;
  has_rent_buy: boolean;
}

export interface ListingTypesConfig {
  listing_types: Record<string, ListingType>;
  property_categories?: Record<string, any>;
  car_makes: Record<string, any>;
  car_models?: any[];
  electronics_types?: Record<string, any>;
  mobile_brands: Record<string, any>;
  mobile_models?: Record<string, string[]>;
  job_types: Record<string, any>;
  vehicle_types: Record<string, any>;
  doctor_specialties: Record<string, any>;
  booking_types?: Record<string, any>;
}

export interface CarMake {
  name: string;
  logo: string;
  models: string[];
}

export interface ElectronicsCategory {
  type: string;
  name_en: string;
  name_ar: string;
  icon: string;
}

export interface MobileBrand {
  name: string;
  logo?: string;
  models: string[];
}

export interface JobType {
  type: string;
  name_en: string;
  name_ar: string;
  icon: string;
}

export interface VehicleType {
  type: string;
  name_en: string;
  name_ar: string;
  icon: string;
  with_driver: boolean;
}

export interface DoctorSpecialty {
  specialty: string;
  name_en: string;
  name_ar: string;
  icon: string;
}

export const useListingTypes = () => {
  const [listingTypes, setListingTypes] = useState<ListingTypesConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListingTypes = async () => {
      try {
        const response = await axios.get(`${API_URL}/listing-types`);
        if (response.data.success) {
          setListingTypes(response.data.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch listing types');
        console.error('Error fetching listing types:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListingTypes();
  }, []);

  return { listingTypes, loading, error };
};

export const useCarMakes = () => {
  const [carMakes, setCarMakes] = useState<CarMake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarMakes = async () => {
      try {
        const response = await axios.get(`${API_URL}/listing-types`);
        if (response.data.success && response.data.data.car_makes) {
          // Convert object to array
          const makesObject = response.data.data.car_makes;
          const makesArray = Object.keys(makesObject).map(name => ({
            name,
            logo: makesObject[name].logo || '',
            models: makesObject[name].models || []
          }));
          setCarMakes(makesArray);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch car makes');
        console.error('Error fetching car makes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarMakes();
  }, []);

  return { carMakes, loading, error };
};

export const useCarModels = (make: string | null) => {
  const [models, setModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!make) {
      setModels([]);
      return;
    }

    const fetchModels = async () => {
      setLoading(true);
      try {
        console.log('useCarModels - Fetching models for make:', make);
        // Fetch from listing-types endpoint which contains all car makes and their models
        const response = await axios.get(`${API_URL}/listing-types`);
        console.log('useCarModels - API response:', response.data);
        
        if (response.data.success && response.data.data.car_makes) {
          const carMakesObject = response.data.data.car_makes;
          console.log('useCarModels - car_makes object:', carMakesObject);
          console.log('useCarModels - Looking for make:', make);
          console.log('useCarModels - Available makes:', Object.keys(carMakesObject));
          
          // Get models for the specific make
          if (carMakesObject[make] && carMakesObject[make].models) {
            console.log('useCarModels - Found models:', carMakesObject[make].models);
            setModels(carMakesObject[make].models);
          } else {
            console.log('useCarModels - Make not found in car_makes, trying fallback endpoint');
            // Fallback: try the old endpoint if the new structure doesn't have models
            try {
              const modelsResponse = await axios.get(`${API_URL}/car-makes/${make}/models`);
              console.log('useCarModels - Fallback API response:', modelsResponse.data);
              if (modelsResponse.data.success) {
                setModels(modelsResponse.data.data);
              }
            } catch (fallbackErr) {
              console.error('useCarModels - Fallback failed:', fallbackErr);
              setModels([]);
            }
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch car models');
        console.error('Error fetching car models:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [make]);

  return { models, loading, error };
};

export const useMobileBrands = () => {
  const [mobileBrands, setMobileBrands] = useState<MobileBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMobileBrands = async () => {
      try {
        const response = await axios.get(`${API_URL}/mobile-brands`);
        if (response.data.success) {
          setMobileBrands(response.data.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch mobile brands');
        console.error('Error fetching mobile brands:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMobileBrands();
  }, []);

  return { mobileBrands, loading, error };
};

export const useMobileModels = (brand: string | null) => {
  const [models, setModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!brand) {
      setModels([]);
      return;
    }

    const fetchModels = async () => {
      setLoading(true);
      try {
        console.log('🔍 Fetching models for brand:', brand);
        
        // Try the direct endpoint first
        try {
          const response = await axios.get(`${API_URL}/mobile-brands/${brand}/models`);
          console.log('📱 Direct API response:', response.data);
          
          if (response.data.success && response.data.data) {
            const modelsData = response.data.data;
            // Handle both array and object formats
            const modelsList = Array.isArray(modelsData) 
              ? modelsData 
              : (modelsData.models || []);
            
            console.log('✅ Models found:', modelsList);
            setModels(modelsList);
            setLoading(false);
            return;
          }
        } catch (directErr) {
          console.log('⚠️ Direct endpoint failed, trying listing-types...');
        }
        
        // Fallback: Try listing-types endpoint
        const response = await axios.get(`${API_URL}/listing-types`);
        console.log('📋 Listing types response:', response.data);
        
        if (response.data.success && response.data.data.mobile_brands) {
          const mobileBrandsObject = response.data.data.mobile_brands;
          console.log('📱 Mobile brands object:', mobileBrandsObject);
          
          // Try exact match first
          if (mobileBrandsObject[brand] && mobileBrandsObject[brand].models) {
            console.log('✅ Found models (exact match):', mobileBrandsObject[brand].models);
            setModels(mobileBrandsObject[brand].models);
            setLoading(false);
            return;
          }
          
          // Try case-insensitive match
          const brandKey = Object.keys(mobileBrandsObject).find(
            key => key.toLowerCase() === brand.toLowerCase()
          );
          
          if (brandKey && mobileBrandsObject[brandKey] && mobileBrandsObject[brandKey].models) {
            console.log('✅ Found models (case-insensitive):', mobileBrandsObject[brandKey].models);
            setModels(mobileBrandsObject[brandKey].models);
            setLoading(false);
            return;
          }
        }
        
        console.log('❌ No models found for brand:', brand);
        setModels([]);
        
      } catch (err: any) {
        setError(err.message || 'Failed to fetch mobile models');
        console.error('❌ Error fetching mobile models:', err);
        setModels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [brand]);

  return { models, loading, error };
};
// Electronics hooks
export const useElectronicsTypes = () => {
  const [electronicsTypes, setElectronicsTypes] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchElectronicsTypes = async () => {
      try {
        const response = await axios.get(`${API_URL}/electronics-types`);
        if (response.data.success) {
          setElectronicsTypes(response.data.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch electronics types');
        console.error('Error fetching electronics types:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchElectronicsTypes();
  }, []);

  return { electronicsTypes, loading, error };
};

export const useItemCondition = () => {
  const [itemCondition, setItemCondition] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItemCondition = async () => {
      try {
        const response = await axios.get(`${API_URL}/item-condition`);
        if (response.data.success) {
          setItemCondition(response.data.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch item condition');
        console.error('Error fetching item condition:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItemCondition();
  }, []);

  return { itemCondition, loading, error };
};

// Job hooks
export const useJobTypes = () => {
  const [jobTypes, setJobTypes] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await axios.get(`${API_URL}/job-types`);
        if (response.data.success) {
          setJobTypes(response.data.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch job types');
        console.error('Error fetching job types:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobTypes();
  }, []);

  return { jobTypes, loading, error };
};

export const useJobWorkTypes = () => {
  const [jobWorkTypes, setJobWorkTypes] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobWorkTypes = async () => {
      try {
        const response = await axios.get(`${API_URL}/job-work-types`);
        if (response.data.success) {
          setJobWorkTypes(response.data.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch job work types');
        console.error('Error fetching job work types:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobWorkTypes();
  }, []);

  return { jobWorkTypes, loading, error };
};

export const useJobLocationTypes = () => {
  const [jobLocationTypes, setJobLocationTypes] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobLocationTypes = async () => {
      try {
        const response = await axios.get(`${API_URL}/job-location-types`);
        if (response.data.success) {
          setJobLocationTypes(response.data.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch job location types');
        console.error('Error fetching job location types:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobLocationTypes();
  }, []);

  return { jobLocationTypes, loading, error };
};

// Vehicle hooks
export const useVehicleTypes = () => {
  const [vehicleTypes, setVehicleTypes] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const response = await axios.get(`${API_URL}/vehicle-types`);
        if (response.data.success) {
          setVehicleTypes(response.data.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch vehicle types');
        console.error('Error fetching vehicle types:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleTypes();
  }, []);

  return { vehicleTypes, loading, error };
};

export const useVehicleRentalOptions = () => {
  const [vehicleRentalOptions, setVehicleRentalOptions] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicleRentalOptions = async () => {
      try {
        const response = await axios.get(`${API_URL}/vehicle-rental-options`);
        if (response.data.success) {
          setVehicleRentalOptions(response.data.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch vehicle rental options');
        console.error('Error fetching vehicle rental options:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleRentalOptions();
  }, []);

  return { vehicleRentalOptions, loading, error };
};

// Doctor hooks
export const useDoctorSpecialties = () => {
  const [doctorSpecialties, setDoctorSpecialties] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorSpecialties = async () => {
      try {
        const response = await axios.get(`${API_URL}/doctor-specialties`);
        if (response.data.success) {
          setDoctorSpecialties(response.data.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch doctor specialties');
        console.error('Error fetching doctor specialties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorSpecialties();
  }, []);

  return { doctorSpecialties, loading, error };
};

export const useBookingTypes = () => {
  const [bookingTypes, setBookingTypes] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingTypes = async () => {
      try {
        const response = await axios.get(`${API_URL}/booking-types`);
        if (response.data.success) {
          setBookingTypes(response.data.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch booking types');
        console.error('Error fetching booking types:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingTypes();
  }, []);

  return { bookingTypes, loading, error };
};
