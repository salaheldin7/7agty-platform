import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { ChatButton } from '@/components/ChatButton';
import { FavoriteButton } from '@/components/FavoriteButton';
import { API_URL, API_BASE_URL } from '@/config/api';
import { SEO } from '@/components/SEO';
import { SharePropertyButton } from '@/components/SharePropertyButton';
import PropertyComments from '@/components/PropertyComments';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Home, 
  Building, 
  Warehouse,
  User,
  Phone,
  Mail,
  ArrowLeft,
  Eye,
  MessageCircle,
  Car,
  Tv,
  Smartphone,
  Briefcase,
  Truck,
  Stethoscope
} from 'lucide-react';
import { 
  useListingTypes, 
  useCarMakes, 
  useCarModels,
  useElectronicsTypes,
  useItemCondition,
  useMobileBrands,
  useMobileModels,
  useJobTypes,
  useJobWorkTypes,
  useJobLocationTypes,
  useVehicleTypes,
  useVehicleRentalOptions,
  useDoctorSpecialties,
  useBookingTypes
} from '@/hooks/useListingTypes';
import { useCountries, useCountryGovernorates, useGovernorateCities } from '@/hooks/useCountries';


interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location_country: string;
  location_governorate: string;
  location_city: string;
  category: string;
  rent_or_buy: string;
  status: string;
  images: string[];
  created_at: string;
  user_name: string;
  username?: string;
  user_id: number;
  user_phone: string;
  is_favorited?: boolean;
  totalComments?: number;
  averageRating?: number;
  listing_type?: string;
  country_id?: number;
  governorate_id?: number;
  city_id?: number;
  // Property-specific fields
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  // Car-specific fields
  car_make?: string;
  car_model?: string;
  car_year?: number;
  car_condition?: string;
  car_mileage?: number;
  // Electronics-specific fields
  electronics_type?: string;
  electronics_brand?: string;
  electronics_condition?: string;
  // Mobile-specific fields
  mobile_brand?: string;
  mobile_model?: string;
  mobile_condition?: string;
  item_condition?: string;
  // Job-specific fields
  job_type?: string;
  job_work_type?: string;
  job_location_type?: string;
  // Vehicle booking-specific fields
  vehicle_type?: string;
  vehicle_rental_option?: string;
  vehicle_with_driver?: boolean;
  // Doctor booking-specific fields
  doctor_specialty?: string;
  booking_type?: string;
}

interface UserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  role: string;
  created_at: string;
  properties_count?: number;
  avatar?: string;
}

interface Location {
  id: string;
  name_en: string;
  name_ar: string;
}

interface Governorate extends Location {
  cities: City[];
}

interface City extends Location {
  governorate_id: string;
}

const UserProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { isRTL } = useLanguage();
  
  // Helper function to get initial filter state from localStorage
  const getInitialFilters = () => {
    if (!username) return null;
    try {
      const savedFilters = localStorage.getItem(`userprofile_filters_${username}`);
      if (savedFilters) {
        const filters = JSON.parse(savedFilters);
        console.log('🔧 [UserProfile] Getting initial filters from localStorage:', filters);
        return filters;
      }
    } catch (error) {
      console.error('❌ [UserProfile] Error parsing saved filters:', error);
    }
    return null;
  };

  const initialFilters = getInitialFilters();
  
  // Fetch listing types and countries
  const { listingTypes, loading: typesLoading } = useListingTypes();
  const { countries, loading: countriesLoading } = useCountries();
  const { carMakes, loading: carMakesLoading } = useCarMakes();
  
  const [user, setUser] = useState<UserProfile | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState(initialFilters?.searchTerm || '');
  const [sortBy, setSortBy] = useState(initialFilters?.sortBy || 'date_new_old');
  const [filterCategory, setFilterCategory] = useState(initialFilters?.filterCategory || 'all');
  const [filterGovernorate, setFilterGovernorate] = useState(initialFilters?.filterGovernorate || 'all');
  const [filterCity, setFilterCity] = useState(initialFilters?.filterCity || 'all');
  const [filterType, setFilterType] = useState(initialFilters?.filterType || 'all');
  const [priceRangeType, setPriceRangeType] = useState(initialFilters?.priceRangeType || 'all');
  const [priceRange, setPriceRange] = useState(initialFilters?.priceRange || [0, 10000000000]);
  const [showPhoneForProperty, setShowPhoneForProperty] = useState<string | null>(null);
  const [showCommentsFor, setShowCommentsFor] = useState<string | null>(null);
  
  // New filters for multi-category (same as Marketplace) - Initialize from localStorage
  const [selectedListingType, setSelectedListingType] = useState(initialFilters?.selectedListingType || 'all');
  const [filterCountry, setFilterCountry] = useState(initialFilters?.filterCountry || 'all');
  const [filterCarMake, setFilterCarMake] = useState(initialFilters?.filterCarMake || 'all');
  const [filterCarModel, setFilterCarModel] = useState(initialFilters?.filterCarModel || 'all');
  const [filterCarCondition, setFilterCarCondition] = useState(initialFilters?.filterCarCondition || 'all');
  
  // Electronics filters
  const [filterElectronicsType, setFilterElectronicsType] = useState(initialFilters?.filterElectronicsType || 'all');
  const [filterItemCondition, setFilterItemCondition] = useState(initialFilters?.filterItemCondition || 'all');
  
  // Mobile filters
  const [filterMobileBrand, setFilterMobileBrand] = useState(initialFilters?.filterMobileBrand || 'all');
  const [filterMobileModel, setFilterMobileModel] = useState(initialFilters?.filterMobileModel || 'all');
  
  // Job filters
  const [filterJobType, setFilterJobType] = useState(initialFilters?.filterJobType || 'all');
  const [filterJobWorkType, setFilterJobWorkType] = useState(initialFilters?.filterJobWorkType || 'all');
  const [filterJobLocationType, setFilterJobLocationType] = useState(initialFilters?.filterJobLocationType || 'all');
  
  // Vehicle filters
  const [filterVehicleType, setFilterVehicleType] = useState(initialFilters?.filterVehicleType || 'all');
  const [filterVehicleRentalOption, setFilterVehicleRentalOption] = useState(initialFilters?.filterVehicleRentalOption || 'all');
  
  // Doctor filters
  const [filterDoctorSpecialty, setFilterDoctorSpecialty] = useState(initialFilters?.filterDoctorSpecialty || 'all');
  const [filterBookingType, setFilterBookingType] = useState(initialFilters?.filterBookingType || 'all');
  
  // Property-specific filters
  const [filterBedrooms, setFilterBedrooms] = useState(initialFilters?.filterBedrooms || 'all');
  const [filterArea, setFilterArea] = useState(initialFilters?.filterArea || '');
  
  // Fetch car models based on selected make
  const { models: carModels, loading: carModelsLoading } = useCarModels(filterCarMake !== 'all' ? filterCarMake : null);
  
  // Fetch all selector data
  const { electronicsTypes, loading: electronicsLoading } = useElectronicsTypes();
  const { itemCondition, loading: conditionLoading } = useItemCondition();
  const { mobileBrands, loading: mobileBrandsLoading } = useMobileBrands();
  const { models: mobileModels, loading: mobileModelsLoading } = useMobileModels(filterMobileBrand !== 'all' ? filterMobileBrand : null);
  const { jobTypes, loading: jobTypesLoading } = useJobTypes();
  const { jobWorkTypes, loading: jobWorkTypesLoading } = useJobWorkTypes();
  const { jobLocationTypes, loading: jobLocationTypesLoading } = useJobLocationTypes();
  const { vehicleTypes, loading: vehicleTypesLoading } = useVehicleTypes();
  const { vehicleRentalOptions, loading: vehicleRentalLoading } = useVehicleRentalOptions();
  const { doctorSpecialties, loading: doctorSpecialtiesLoading } = useDoctorSpecialties();
  const { bookingTypes, loading: bookingTypesLoading } = useBookingTypes();
  
  // Dynamic location data based on selected country and governorate
  const countryIdNumber = filterCountry !== 'all' ? parseInt(filterCountry) : null;
  const governorateIdNumber = filterGovernorate !== 'all' ? parseInt(filterGovernorate) : null;
  const { governorates: countryGovernorates, loading: governoratesLoading } = useCountryGovernorates(countryIdNumber);
  const { cities: governorateCities, loading: citiesLoading } = useGovernorateCities(governorateIdNumber);

  const isNumericId = /^\d+$/.test(username || '');
  
  // Refs for auto-scrolling listing type tabs on mobile
  const listingTypeContainerRef = useRef<HTMLDivElement | null>(null);
  const listingTypeButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const propertyRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const isInitialMount = useRef(true);
  const hasRestoredFilters = useRef(false);

  const priceRangeConfigs = {
    'all': { min: 0, max: 10000000000, step: 100000000, label: isRTL ? 'الكل' : 'ALL' },
    '100K': { min: 0, max: 100000, step: 2000, label: isRTL ? 'حتى 100 ألف' : 'Up to 100K' },
    '10M': { min: 100000, max: 10000000, step: 50000, label: isRTL ? '100 ألف - 10 مليون' : '100K - 10M' },
    '100M': { min: 10000000, max: 100000000, step: 1000000, label: isRTL ? '10 - 100 مليون' : '10M - 100M' },
    '500M': { min: 100000000, max: 500000000, step: 20000000, label: isRTL ? '100 - 500 مليون' : '100M - 500M' },
    '1B': { min: 500000000, max: 1000000000, step: 50000000, label: isRTL ? '500 مليون - 1 مليار' : '500M - 1B' },
    'ABOVE': { min: 1000000000, max: 10000000000, step: 100000000, label: isRTL ? 'أكثر من 1 مليار' : 'Above 1B' }
  };

  const handlePriceRangeTypeChange = (type: string) => {
    setPriceRangeType(type);
    const config = priceRangeConfigs[type as keyof typeof priceRangeConfigs];
    setPriceRange([config.min, config.max]);
  };

  const handlePropertyClick = (propertyId: string) => {
    sessionStorage.setItem('userprofile_scroll_position', window.scrollY.toString());
    sessionStorage.setItem('userprofile_property_id', propertyId);
    navigate(`/property/${propertyId}`);
  };

  const getImageUrl = (imagePath: string | undefined) => {
    if (!imagePath) return undefined;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    if (imagePath.startsWith('/')) {
      return `${API_BASE_URL}${imagePath}`;
    }
    return `${API_BASE_URL}/${imagePath}`;
  };

  const getPropertyImageUrl = (imagePath: string) => {
    if (!imagePath) return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    return `${API_BASE_URL}${imagePath}`;
  };

  useEffect(() => {
    fetchUserProfile();
    fetchUserProperties();
    fetchGovernorates();
  }, [username]);

  // Re-fetch properties when filters change
  useEffect(() => {
    if (username) {
      fetchUserProperties();
    }
  }, [
    selectedListingType, 
    filterCountry, 
    filterGovernorate, 
    filterCity,
    filterCarMake,
    filterCarModel,
    filterCarCondition,
    filterElectronicsType,
    filterMobileBrand,
    filterMobileModel,
    filterJobType,
    filterJobWorkType,
    filterVehicleType,
    filterDoctorSpecialty
  ]);

  // Auto-scroll selected listing type into view on mobile
  useEffect(() => {
    // Wait for listing types to load and refs to be populated
    if (typesLoading || !listingTypes) {
      return;
    }

    if (selectedListingType && listingTypeButtonRefs.current[selectedListingType]) {
      const button = listingTypeButtonRefs.current[selectedListingType];
      const container = listingTypeContainerRef.current;
      
      if (button && container) {
        // Calculate center position
        const scrollToButton = () => {
          try {
            const buttonRect = button.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const scrollLeft = button.offsetLeft - (containerRect.width / 2) + (buttonRect.width / 2);
            
            container.scrollTo({
              left: scrollLeft,
              behavior: 'smooth'
            });
          } catch (error) {
            console.error('Scroll error:', error);
          }
        };

        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
          scrollToButton();
        }, 100);
      }
    }
  }, [selectedListingType, typesLoading, listingTypes]);

  // Restore scroll position when returning from property detail
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('userprofile_scroll_position');
    const savedPropertyId = sessionStorage.getItem('userprofile_property_id');
    
    if (savedScrollPosition && savedPropertyId && properties.length > 0) {
      setTimeout(() => {
        const propertyElement = propertyRefs.current[savedPropertyId];
        if (propertyElement) {
          propertyElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          window.scrollTo({ top: parseInt(savedScrollPosition), behavior: 'smooth' });
        }
        
        sessionStorage.removeItem('userprofile_scroll_position');
        sessionStorage.removeItem('userprofile_property_id');
      }, 100);
    }
  }, [properties]);

  // Save filter state to localStorage whenever filters change
  useEffect(() => {
    const filterState = {
      // Search and sort
      searchTerm,
      sortBy,
      // Listing type
      selectedListingType,
      // Location filters
      filterCountry,
      filterGovernorate,
      filterCity,
      // Price filters
      priceRange,
      priceRangeType,
      // Property filters
      filterCategory,
      filterType,
      filterBedrooms,
      filterArea,
      // Car filters
      filterCarMake,
      filterCarModel,
      filterCarCondition,
      // Electronics filters
      filterElectronicsType,
      filterItemCondition,
      // Mobile filters
      filterMobileBrand,
      filterMobileModel,
      // Job filters
      filterJobType,
      filterJobWorkType,
      filterJobLocationType,
      // Vehicle filters
      filterVehicleType,
      filterVehicleRentalOption,
      // Doctor filters
      filterDoctorSpecialty,
      filterBookingType
    };
    console.log('💾 [UserProfile] Saving filters to localStorage:', filterState);
    console.log('📌 [UserProfile] Current selectedListingType:', selectedListingType);
    localStorage.setItem(`userprofile_filters_${username}`, JSON.stringify(filterState));
  }, [
    username, searchTerm, sortBy, selectedListingType,
    filterCountry, filterGovernorate, filterCity,
    priceRange, priceRangeType,
    filterCategory, filterType, filterBedrooms, filterArea,
    filterCarMake, filterCarModel, filterCarCondition,
    filterElectronicsType, filterItemCondition,
    filterMobileBrand, filterMobileModel,
    filterJobType, filterJobWorkType, filterJobLocationType,
    filterVehicleType, filterVehicleRentalOption,
    filterDoctorSpecialty, filterBookingType
  ]);

  // Restore filter state from localStorage on component mount
  useEffect(() => {
    if (!username) return;
    
    const savedFilters = localStorage.getItem(`userprofile_filters_${username}`);
    if (savedFilters) {
      try {
        const filters = JSON.parse(savedFilters);
        // Search and sort
        if (filters.searchTerm !== undefined) setSearchTerm(filters.searchTerm);
        if (filters.sortBy !== undefined) setSortBy(filters.sortBy);
        // Listing type
        if (filters.selectedListingType !== undefined) setSelectedListingType(filters.selectedListingType);
        // Location filters
        if (filters.filterCountry !== undefined) setFilterCountry(filters.filterCountry);
        if (filters.filterGovernorate !== undefined) setFilterGovernorate(filters.filterGovernorate);
        if (filters.filterCity !== undefined) setFilterCity(filters.filterCity);
        // Price filters
        if (filters.priceRange !== undefined) setPriceRange(filters.priceRange);
        if (filters.priceRangeType !== undefined) setPriceRangeType(filters.priceRangeType);
        // Property filters
        if (filters.filterCategory !== undefined) setFilterCategory(filters.filterCategory);
        if (filters.filterType !== undefined) setFilterType(filters.filterType);
        if (filters.filterBedrooms !== undefined) setFilterBedrooms(filters.filterBedrooms);
        if (filters.filterArea !== undefined) setFilterArea(filters.filterArea);
        // Car filters
        if (filters.filterCarMake !== undefined) setFilterCarMake(filters.filterCarMake);
        if (filters.filterCarModel !== undefined) setFilterCarModel(filters.filterCarModel);
        if (filters.filterCarCondition !== undefined) setFilterCarCondition(filters.filterCarCondition);
        // Electronics filters
        if (filters.filterElectronicsType !== undefined) setFilterElectronicsType(filters.filterElectronicsType);
        if (filters.filterItemCondition !== undefined) setFilterItemCondition(filters.filterItemCondition);
        // Mobile filters
        if (filters.filterMobileBrand !== undefined) setFilterMobileBrand(filters.filterMobileBrand);
        if (filters.filterMobileModel !== undefined) setFilterMobileModel(filters.filterMobileModel);
        // Job filters
        if (filters.filterJobType !== undefined) setFilterJobType(filters.filterJobType);
        if (filters.filterJobWorkType !== undefined) setFilterJobWorkType(filters.filterJobWorkType);
        if (filters.filterJobLocationType !== undefined) setFilterJobLocationType(filters.filterJobLocationType);
        // Vehicle filters
        if (filters.filterVehicleType !== undefined) setFilterVehicleType(filters.filterVehicleType);
        if (filters.filterVehicleRentalOption !== undefined) setFilterVehicleRentalOption(filters.filterVehicleRentalOption);
        // Doctor filters
        if (filters.filterDoctorSpecialty !== undefined) setFilterDoctorSpecialty(filters.filterDoctorSpecialty);
        if (filters.filterBookingType !== undefined) setFilterBookingType(filters.filterBookingType);
        
        // Mark filters as restored immediately
        hasRestoredFilters.current = true;
      } catch (error) {
        console.error('Error restoring filters:', error);
        hasRestoredFilters.current = true;
      }
    } else {
      // No saved filters, mark as restored anyway
      hasRestoredFilters.current = true;
    }
    
    // Mark initial mount as complete after a delay
    setTimeout(() => {
      isInitialMount.current = false;
    }, 100);
  }, [username]); // Run when username changes

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const endpoint = isNumericId 
        ? `${API_URL}/users/${username}` 
        : `${API_URL}/users/username/${username}`;

      const response = await fetch(endpoint, { headers });
      
      if (!response.ok) {
        throw new Error('User not found');
      }

      const data = await response.json();
      
      if (data.success && data.data) {
        setUser(data.data);
      }
    } catch (err: any) {
      console.error('Error fetching user:', err);
      setError(isRTL ? 'فشل تحميل الملف الشخصي' : 'Failed to load profile');
    }
  };

  const fetchUserProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('auth_token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const endpoint = isNumericId
        ? `${API_URL}/users/${username}/properties`
        : `${API_URL}/users/username/${username}/properties`;

      // Build query parameters for filters
      const params = new URLSearchParams();
      
      if (selectedListingType !== 'all') {
        params.append('listing_type', selectedListingType);
      }
      if (filterCountry !== 'all') {
        params.append('country_id', filterCountry);
      }
      if (filterGovernorate !== 'all') {
        params.append('governorate_id', filterGovernorate);
      }
      if (filterCity !== 'all') {
        params.append('city_id', filterCity);
      }
      
      // Add type-specific filters
      if (filterCarMake !== 'all') {
        params.append('car_make', filterCarMake);
      }
      if (filterCarModel !== 'all') {
        params.append('car_model', filterCarModel);
      }
      if (filterCarCondition !== 'all') {
        params.append('car_condition', filterCarCondition);
      }
      if (filterElectronicsType !== 'all') {
        params.append('electronics_type', filterElectronicsType);
      }
      if (filterMobileBrand !== 'all') {
        params.append('mobile_brand', filterMobileBrand);
      }
      if (filterMobileModel !== 'all') {
        params.append('mobile_model', filterMobileModel);
      }
      if (filterJobType !== 'all') {
        params.append('job_type', filterJobType);
      }
      if (filterJobWorkType !== 'all') {
        params.append('job_employment_type', filterJobWorkType);
      }
      if (filterVehicleType !== 'all') {
        params.append('vehicle_type', filterVehicleType);
      }
      if (filterDoctorSpecialty !== 'all') {
        params.append('doctor_specialty', filterDoctorSpecialty);
      }
      
      const queryString = params.toString();
      const url = queryString ? `${endpoint}?${queryString}` : endpoint;

      console.log('Fetching user properties with filters:', {
        username: username,
        listing_type: selectedListingType,
        country: filterCountry,
        governorate: filterGovernorate,
        city: filterCity,
        url: url
      });

      const response = await fetch(url, { headers });
      
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }

      const data = await response.json();
      
      if (data.success && data.data) {
        const propertiesArray = Array.isArray(data.data.data) 
          ? data.data.data 
          : Array.isArray(data.data) 
          ? data.data 
          : [];
        
        const processedProperties = propertiesArray.map((prop: any) => ({
          ...prop,
          images: Array.isArray(prop.images) 
            ? prop.images 
            : typeof prop.images === 'string' 
            ? JSON.parse(prop.images) 
            : [],
          // Preserve IDs for filtering
          country_id: prop.country_id || prop.country?.id,
          governorate_id: prop.governorate_id || prop.governorate?.id,
          city_id: prop.city_id || prop.city?.id,
          // Set location names (keep existing if no related objects)
          location_governorate: prop.governorate?.name_en || prop.location_governorate || '',
          location_city: prop.city?.name_en || prop.location_city || '',
          location_country: prop.country?.name_en || prop.location_country || '',
          user_name: prop.user?.name || user?.name || 'Unknown',
          username: prop.user?.username || prop.username || '',
          user_id: prop.user?.id || user?.id || 0,
          user_phone: prop.user?.phone || user?.phone || 'N/A'
        }));
        
        setProperties(processedProperties);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(isRTL ? 'خطأ في تحميل العقارات' : 'Error loading properties');
    } finally {
      setLoading(false);
    }
  };

  const fetchGovernorates = async () => {
    try {
      const response = await fetch(`${API_URL}/governorates`);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.success && data.data) {
          const governoratesData = data.data.map((gov: any) => ({
            ...gov,
            cities: []
          }));
          setGovernorates(governoratesData);
          return;
        }
      }
      
      setGovernorates([]);
    } catch (err) {
      console.error('Error fetching governorates:', err);
      setGovernorates([]);
    }
  };

  useEffect(() => {
    const loadCitiesForGovernorate = async () => {
      if (filterGovernorate !== 'all') {
        setFilterCity('all');
        
        const selectedGov = governorates.find(g => String(g.id) === filterGovernorate);
        
        if (selectedGov && (!selectedGov.cities || selectedGov.cities.length === 0)) {
          try {
            const response = await fetch(`${API_URL}/governorates/${filterGovernorate}/cities`);
            if (response.ok) {
              const data = await response.json();
              
              if (data.success && data.data) {
                setGovernorates(prev => prev.map(gov => 
                  String(gov.id) === filterGovernorate 
                    ? { ...gov, cities: data.data }
                    : gov
                ));
              }
            }
          } catch (error) {
            console.error('Error loading cities:', error);
          }
        }
      } else {
        setFilterCity('all');
      }
    };
    
    loadCitiesForGovernorate();
  }, [filterGovernorate]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'villa':
      case 'townhouse':
        return <Home className="w-4 h-4" />;
      case 'apartment':
      case 'building':
        return <Building className="w-4 h-4" />;
      case 'commercial':
        return <Warehouse className="w-4 h-4" />;
      default:
        return <Home className="w-4 h-4" />;
    }
  };

  const formatPrice = (price: number, type: string) => {
    const formatted = new Intl.NumberFormat('en-US').format(price);
    return type === 'rent' 
      ? `${formatted} ${isRTL ? 'جنيه/شهرياً' : 'EGP/month'}` 
      : `${formatted} ${isRTL ? 'جنيه' : 'EGP'}`;
  };

  const getAvailableCities = () => {
    if (filterGovernorate === 'all') return [];
    
    const selectedGov = governorates.find(gov => 
      String(gov.id) === filterGovernorate
    );
    
    return selectedGov && Array.isArray(selectedGov.cities) ? selectedGov.cities : [];
  };

  const filteredProperties = properties.filter(property => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      property.title.toLowerCase().includes(searchLower) ||
      property.description.toLowerCase().includes(searchLower) ||
      property.location_governorate.toLowerCase().includes(searchLower) ||
      property.location_city.toLowerCase().includes(searchLower) ||
      (countryGovernorates && countryGovernorates.some((gov: any) => 
        (gov.name_ar.toLowerCase().includes(searchLower) || 
         gov.name_en.toLowerCase().includes(searchLower)) &&
        (property.location_governorate === gov.name_en || 
         property.location_governorate === gov.name_ar)
      )) ||
      (governorateCities && governorateCities.some((city: any) => 
        (city.name_ar.toLowerCase().includes(searchLower) || 
         city.name_en.toLowerCase().includes(searchLower)) &&
        (property.location_city === city.name_en || 
         property.location_city === city.name_ar)
      ));
      
    // Listing type filter
    const matchesListingType = selectedListingType === 'all' || 
      property.listing_type === selectedListingType || 
      (!property.listing_type && selectedListingType === 'property');
      
    const matchesCategory = filterCategory === 'all' || property.category === filterCategory;
    
    // Country filter - use country_id if available
    const matchesCountry = filterCountry === 'all' || 
      (property.country_id && String(property.country_id) === filterCountry);
    
    // Governorate filter - use governorate_id if available, fallback to name matching
    let matchesGovernorate = filterGovernorate === 'all';
    if (!matchesGovernorate && filterGovernorate !== 'all') {
      if (property.governorate_id) {
        matchesGovernorate = String(property.governorate_id) === filterGovernorate;
      } else if (countryGovernorates) {
        const selectedGov = countryGovernorates.find((g: any) => String(g.id) === filterGovernorate);
        if (selectedGov) {
          matchesGovernorate = 
            property.location_governorate === selectedGov.name_en || 
            property.location_governorate === selectedGov.name_ar;
        }
      }
    }
    
    // City filter - use city_id if available, fallback to name matching
    let matchesCity = filterCity === 'all';
    if (!matchesCity && filterCity !== 'all') {
      if (property.city_id) {
        matchesCity = String(property.city_id) === filterCity;
      } else if (governorateCities) {
        const selectedCity = governorateCities.find((c: any) => String(c.id) === filterCity);
        if (selectedCity) {
          matchesCity = 
            property.location_city === selectedCity.name_en || 
            property.location_city === selectedCity.name_ar;
        }
      }
    }
    
    const matchesType = filterType === 'all' || property.rent_or_buy === filterType;
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    
    // Car filters
    const matchesCarMake = filterCarMake === 'all' || property.car_make === filterCarMake;
    const matchesCarModel = filterCarModel === 'all' || property.car_model === filterCarModel;
    const matchesCarCondition = filterCarCondition === 'all' || property.car_condition === filterCarCondition;
    
    // Electronics filters
    const matchesElectronicsType = filterElectronicsType === 'all' || property.electronics_type === filterElectronicsType;
    const matchesItemCondition = filterItemCondition === 'all' || property.item_condition === filterItemCondition;
    
    // Mobile filters
    const matchesMobileBrand = filterMobileBrand === 'all' || property.mobile_brand === filterMobileBrand;
    const matchesMobileModel = filterMobileModel === 'all' || property.mobile_model === filterMobileModel;
    
    // Property-specific filters
    const matchesBedrooms = filterBedrooms === 'all' || 
      (filterBedrooms === '8+' && property.bedrooms && property.bedrooms >= 8) ||
      (property.bedrooms && property.bedrooms.toString() === filterBedrooms);
    
    const matchesArea = !filterArea || (property.area && property.area >= parseInt(filterArea));
    
    // Job filters
    const matchesJobType = filterJobType === 'all' || property.job_type === filterJobType;
    const matchesJobWorkType = filterJobWorkType === 'all' || property.job_work_type === filterJobWorkType;
    const matchesJobLocationType = filterJobLocationType === 'all' || property.job_location_type === filterJobLocationType;
    
    // Vehicle filters
    const matchesVehicleType = filterVehicleType === 'all' || property.vehicle_type === filterVehicleType;
    const matchesVehicleRentalOption = filterVehicleRentalOption === 'all' || property.vehicle_rental_option === filterVehicleRentalOption;
    
    // Doctor filters
    const matchesDoctorSpecialty = filterDoctorSpecialty === 'all' || property.doctor_specialty === filterDoctorSpecialty;
    const matchesBookingType = filterBookingType === 'all' || property.booking_type === filterBookingType;

    return matchesSearch && matchesListingType && matchesCategory && matchesCountry && 
      matchesGovernorate && matchesCity && matchesType && matchesPrice &&
      matchesCarMake && matchesCarModel && matchesCarCondition &&
      matchesElectronicsType && matchesItemCondition &&
      matchesMobileBrand && matchesMobileModel &&
      matchesBedrooms && matchesArea &&
      matchesJobType && matchesJobWorkType && matchesJobLocationType &&
      matchesVehicleType && matchesVehicleRentalOption &&
      matchesDoctorSpecialty && matchesBookingType;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'date_new_old':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'date_old_new':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'price_low_high':
        return a.price - b.price;
      case 'price_high_low':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className={`container mx-auto px-4 py-8 mt-20 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={`container mx-auto px-4 py-8 mt-20 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            {isRTL ? 'المستخدم غير موجود' : 'User Not Found'}
          </h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <Button onClick={() => navigate('/marketplace')}>
            {isRTL ? 'العودة إلى السوق' : 'Back to Marketplace'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${user.name} (@${user.username}) - Real Estate Agent Profile | 7agty`}
        titleAr={`${user.name} (@${user.username}) - الملف الشخصي للوكيل العقاري | حاجتي`}
        description={`View ${user.name}'s profile and browse ${properties.length} property listings on 7agty. Contact @${user.username} directly for real estate inquiries in Egypt. Properties for sale and rent.`}
        descriptionAr={`اعرض ملف ${user.name} الشخصي وتصفح ${properties.length} إعلان عقاري على حاجتي. تواصل مع @${user.username} مباشرة لاستفسارات العقارات في مصر. عقارات للبيع والإيجار.`}
        keywords={`${user.name}, @${user.username}, real estate agent Egypt, property listings ${user.username}, ${user.name} properties, contact real estate agent, Egyptian property seller, real estate profile, property agent`}
        keywordsAr={`${user.name}, @${user.username}, وكيل عقاري مصر, إعلانات عقارية ${user.username}, عقارات ${user.name}, تواصل مع وكيل عقاري, بائع عقارات مصري, ملف عقاري, وكيل عقارات`}
        canonical={`https://7agty.com/profile/${user.username || user.id}`}
      />
      
      <div className={`container mx-auto px-4 py-8 mt-20 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className={`mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {isRTL ? <ArrowLeft className="w-4 h-4 ml-2" /> : <ArrowLeft className="w-4 h-4 mr-2" />}
          {isRTL ? 'رجوع' : 'Back'}
        </Button>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className={`flex flex-col md:flex-row items-center gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg flex-shrink-0">
                <AvatarImage src={getImageUrl(user.avatar)} alt={user.name} />
                <AvatarFallback className="text-4xl font-bold bg-sky-100 text-sky-600">
                  {user.name?.charAt(0)?.toUpperCase() || '?'}
                </AvatarFallback>
              </Avatar>
              
              <div className={`flex-1 text-center md:text-left ${isRTL ? 'md:text-right' : ''}`}>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                {user.username && (
                  <p className="text-gray-600 mb-1">@{user.username}</p>
                )}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  <Badge className="bg-sky-600">
                    {isRTL ? 'بائع' : 'Seller'}
                  </Badge>
                  <Badge variant="outline">
                    {isRTL ? `${properties.length} عقار` : `${properties.length} Properties`}
                  </Badge>
                </div>
                
                <div className={`flex flex-col sm:flex-row gap-3 text-sm text-gray-600 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                  {user.phone && (
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Phone className="w-4 h-4" />
                      <span dir="ltr">{user.phone}</span>
                    </div>
                  )}
                  {user.email && (
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                  )}
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Calendar className="w-4 h-4" />
                    <span>
                      {isRTL ? 'انضم في ' : 'Joined '}
                      {new Date(user.created_at).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <ChatButton 
                  userId={user.id}
                  userName={user.name}
                  className="w-full bg-sky-600 hover:bg-sky-700"
                  variant="default"
                  showName={true}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">
            {isRTL ? 'عقارات المستخدم' : "User's Properties"}
          </h2>
          
          <div className="relative max-w-md mb-6">
            <Search className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} h-4 w-4 text-gray-400`} />
            <Input
              type="text"
              placeholder={isRTL ? 'ابحث عن العقارات، المدن...' : 'Search properties, cities...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${isRTL ? 'pr-10 text-right' : 'pl-10'} w-full`}
            />
          </div>
          
          {/* Listing Type Tabs */}
          {!typesLoading && listingTypes?.listing_types && (
            <div className="mt-8">
              <div 
                ref={listingTypeContainerRef}
                className="flex flex-wrap gap-2 md:gap-3 justify-center items-center px-2 md:px-0"
              >
                {/* All Tab */}
                <button
                  ref={(el) => (listingTypeButtonRefs.current['all'] = el)}
                  onClick={() => setSelectedListingType('all')}
                  className={`flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-medium transition-all duration-300 transform ${
                    selectedListingType === 'all'
                      ? 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-xl scale-105 ring-4 ring-gray-300 ring-offset-2'
                      : 'bg-white text-gray-700 hover:bg-gray-100 hover:scale-105 border-2 border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg'
                  }`}
                >
                  <Home className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base font-semibold">{isRTL ? 'الكل' : 'All'}</span>
                </button>

                {/* Property Tab */}
                <button
                  ref={(el) => (listingTypeButtonRefs.current['property'] = el)}
                  onClick={() => setSelectedListingType('property')}
                  className={`flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-medium transition-all duration-300 transform ${
                    selectedListingType === 'property'
                      ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-xl scale-105 ring-4 ring-blue-300 ring-offset-2'
                      : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 hover:text-white hover:scale-105 border-2 border-blue-300 hover:border-blue-400 shadow-md hover:shadow-lg'
                  }`}
                >
                  <Home className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base font-semibold whitespace-nowrap">{isRTL ? 'عقارات' : 'Properties'}</span>
                </button>

                {/* Car Tab */}
                <button
                  ref={(el) => (listingTypeButtonRefs.current['car'] = el)}
                  onClick={() => setSelectedListingType('car')}
                  className={`flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-medium transition-all duration-300 transform ${
                    selectedListingType === 'car'
                      ? 'bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white shadow-xl scale-105 ring-4 ring-green-300 ring-offset-2'
                      : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-green-500 hover:via-green-600 hover:to-green-700 hover:text-white hover:scale-105 border-2 border-green-300 hover:border-green-400 shadow-md hover:shadow-lg'
                  }`}
                >
                  <Car className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base font-semibold whitespace-nowrap">{isRTL ? 'سيارات' : 'Cars'}</span>
                </button>

                {/* Electronics Tab */}
                <button
                  ref={(el) => (listingTypeButtonRefs.current['electronics'] = el)}
                  onClick={() => setSelectedListingType('electronics')}
                  className={`flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-medium transition-all duration-300 transform ${
                    selectedListingType === 'electronics'
                      ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white shadow-xl scale-105 ring-4 ring-purple-300 ring-offset-2'
                      : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:via-purple-600 hover:to-purple-700 hover:text-white hover:scale-105 border-2 border-purple-300 hover:border-purple-400 shadow-md hover:shadow-lg'
                  }`}
                >
                  <Tv className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base font-semibold whitespace-nowrap">{isRTL ? 'إلكترونيات' : 'Electronics'}</span>
                </button>

                {/* Mobile Tab */}
                <button
                  ref={(el) => (listingTypeButtonRefs.current['mobile'] = el)}
                  onClick={() => setSelectedListingType('mobile')}
                  className={`flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-medium transition-all duration-300 transform ${
                    selectedListingType === 'mobile'
                      ? 'bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 text-white shadow-xl scale-105 ring-4 ring-pink-300 ring-offset-2'
                      : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:via-pink-600 hover:to-pink-700 hover:text-white hover:scale-105 border-2 border-pink-300 hover:border-pink-400 shadow-md hover:shadow-lg'
                  }`}
                >
                  <Smartphone className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base font-semibold whitespace-nowrap">{isRTL ? 'موبايلات وتابلت' : 'Mobile & Tablets'}</span>
                </button>

                {/* Job Tab */}
                <button
                  ref={(el) => (listingTypeButtonRefs.current['job'] = el)}
                  onClick={() => setSelectedListingType('job')}
                  className={`flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-medium transition-all duration-300 transform ${
                    selectedListingType === 'job'
                      ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white shadow-xl scale-105 ring-4 ring-orange-300 ring-offset-2'
                      : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 hover:text-white hover:scale-105 border-2 border-orange-300 hover:border-orange-400 shadow-md hover:shadow-lg'
                  }`}
                >
                  <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base font-semibold whitespace-nowrap">{isRTL ? 'وظائف' : 'Jobs'}</span>
                </button>

                {/* Vehicle Booking Tab */}
                <button
                  ref={(el) => (listingTypeButtonRefs.current['vehicle_booking'] = el)}
                  onClick={() => setSelectedListingType('vehicle_booking')}
                  className={`flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-medium transition-all duration-300 transform ${
                    selectedListingType === 'vehicle_booking'
                      ? 'bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 text-white shadow-xl scale-105 ring-4 ring-cyan-300 ring-offset-2'
                      : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 hover:text-white hover:scale-105 border-2 border-cyan-300 hover:border-cyan-400 shadow-md hover:shadow-lg'
                  }`}
                >
                  <Truck className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base font-semibold whitespace-nowrap">{isRTL ? 'حجز مركبة' : 'Book a Vehicle'}</span>
                </button>

                {/* Doctor Booking Tab */}
                <button
                  ref={(el) => (listingTypeButtonRefs.current['doctor_booking'] = el)}
                  onClick={() => setSelectedListingType('doctor_booking')}
                  className={`flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-medium transition-all duration-300 transform ${
                    selectedListingType === 'doctor_booking'
                      ? 'bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white shadow-xl scale-105 ring-4 ring-red-300 ring-offset-2'
                      : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-red-500 hover:via-red-600 hover:to-red-700 hover:text-white hover:scale-105 border-2 border-red-300 hover:border-red-400 shadow-md hover:shadow-lg'
                  }`}
                >
                  <Stethoscope className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base font-semibold whitespace-nowrap">{isRTL ? 'حجز طبيب' : 'Book a Doctor'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Filter className="w-5 h-5 text-sky-600" />
            <h3 className="text-lg font-semibold">{isRTL ? 'فلترة حسب' : 'Filter By'}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {isRTL ? 'ترتيب حسب' : 'Sort By'}
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className={isRTL ? 'text-right' : ''}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date_new_old">
                    {isRTL ? 'الأحدث إلى الأقدم' : 'Newest to Oldest'}
                  </SelectItem>
                  <SelectItem value="date_old_new">
                    {isRTL ? 'الأقدم إلى الأحدث' : 'Oldest to Newest'}
                  </SelectItem>
                  <SelectItem value="price_low_high">
                    {isRTL ? 'السعر من الأقل للأكثر' : 'Price: Low to High'}
                  </SelectItem>
                  <SelectItem value="price_high_low">
                    {isRTL ? 'السعر من الأكثر للأقل' : 'Price: High to Low'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Country Filter - Show for all listing types */}
            {!countriesLoading && countries && countries.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'الدولة' : 'Country'}
                </label>
                <Select value={filterCountry} onValueChange={(value) => {
                  setFilterCountry(value);
                  setFilterGovernorate('all');
                  setFilterCity('all');
                }}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل الدول' : 'All Countries'}</SelectItem>
                    {countries.map((country: any) => (
                      <SelectItem key={country.id} value={String(country.id)}>
                        {isRTL ? country.name_ar : country.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Governorate - using dynamic hook data - Only show when NOT "all" listing type */}
            {selectedListingType !== 'all' && !governoratesLoading && filterCountry !== 'all' && countryGovernorates && countryGovernorates.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'المحافظة' : 'Governorate'}
                </label>
                <Select 
                  value={filterGovernorate} 
                  onValueChange={(value) => {
                    setFilterGovernorate(value);
                    setFilterCity('all');
                  }}
                >
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل المحافظات' : 'All Governorates'}</SelectItem>
                    {countryGovernorates.map((gov: any) => (
                      <SelectItem key={gov.id} value={String(gov.id)}>
                        {isRTL ? gov.name_ar : gov.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* City - using dynamic hook data - Only show when NOT "all" listing type */}
            {selectedListingType !== 'all' && !citiesLoading && filterGovernorate !== 'all' && governorateCities && governorateCities.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'المدينة' : 'City'}
                </label>
                <Select 
                  value={filterCity} 
                  onValueChange={setFilterCity}
                >
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل المدن' : 'All Cities'}</SelectItem>
                    {governorateCities.map((city: any) => (
                      <SelectItem key={city.id} value={String(city.id)}>
                        {isRTL ? city.name_ar : city.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Property Type - Only show for property listing type, not for "all" */}
            {selectedListingType === 'property' && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'نوع العقار' : 'Property Type'}
                </label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل الأنواع' : 'All Types'}</SelectItem>
                    <SelectItem value="villa">{isRTL ? 'فيلا' : 'Villa'}</SelectItem>
                    <SelectItem value="apartment">{isRTL ? 'شقة' : 'Apartment'}</SelectItem>
                    <SelectItem value="townhouse">{isRTL ? 'تاون هاوس' : 'Townhouse'}</SelectItem>
                    <SelectItem value="land">{isRTL ? 'أرض' : 'Land'}</SelectItem>
                    <SelectItem value="building">{isRTL ? 'مبنى' : 'Building'}</SelectItem>
                    <SelectItem value="commercial">{isRTL ? 'تجاري' : 'Commercial'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Bedrooms Filter - Only show for property listing type (apartment, villa, townhouse) */}
            {selectedListingType === 'property' && 
             (filterCategory === 'all' || filterCategory === 'apartment' || filterCategory === 'villa' || filterCategory === 'townhouse') && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'عدد غرف النوم' : 'Number of Bedrooms'}
                </label>
                <Select value={filterBedrooms} onValueChange={setFilterBedrooms}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'الكل' : 'All'}</SelectItem>
                    <SelectItem value="0">{isRTL ? 'استوديو (0)' : 'Studio (0)'}</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8+">8+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Area Filter - Show for property listing type only, not for "all" */}
            {selectedListingType === 'property' && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'المساحة (متر مربع)' : 'Area (Square Meters)'}
                </label>
                <input
                  type="number"
                  value={filterArea}
                  onChange={(e) => setFilterArea(e.target.value)}
                  placeholder={isRTL ? 'أدخل الحد الأدنى للمساحة' : 'Enter minimum area'}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                />
              </div>
            )}

            {/* Rent or Buy - Only show for property listing type, not for "all" */}
            {selectedListingType === 'property' && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'إيجار أو شراء' : 'Rent or Buy'}
                </label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'الكل' : 'All'}</SelectItem>
                    <SelectItem value="rent">{isRTL ? 'إيجار' : 'Rent'}</SelectItem>
                    <SelectItem value="buy">{isRTL ? 'شراء' : 'Buy'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-3">
              {isRTL ? 'نطاق السعر' : 'Price Range'}
            </label>
            
            <div className="mb-4">
              <Select value={priceRangeType} onValueChange={handlePriceRangeTypeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{priceRangeConfigs['all'].label}</SelectItem>
                  <SelectItem value="100K">{priceRangeConfigs['100K'].label}</SelectItem>
                  <SelectItem value="10M">{priceRangeConfigs['10M'].label}</SelectItem>
                  <SelectItem value="100M">{priceRangeConfigs['100M'].label}</SelectItem>
                  <SelectItem value="500M">{priceRangeConfigs['500M'].label}</SelectItem>
                  <SelectItem value="1B">{priceRangeConfigs['1B'].label}</SelectItem>
                  <SelectItem value="ABOVE">{priceRangeConfigs['ABOVE'].label}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="px-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={priceRangeConfigs[priceRangeType as keyof typeof priceRangeConfigs].max}
                min={priceRangeConfigs[priceRangeType as keyof typeof priceRangeConfigs].min}
                step={priceRangeConfigs[priceRangeType as keyof typeof priceRangeConfigs].step}
                className="w-full"
              />
              <div className={`flex justify-between text-sm text-gray-600 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="text-left">
                  <div className="font-semibold">{new Intl.NumberFormat('en-US').format(priceRange[0])}</div>
                  <div className="text-xs text-gray-400">{isRTL ? 'جنيه' : 'EGP'}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{new Intl.NumberFormat('en-US').format(priceRange[1])}</div>
                  <div className="text-xs text-gray-400">{isRTL ? 'جنيه' : 'EGP'}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional filters based on listing type */}
          {selectedListingType === 'car' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'ماركة السيارة' : 'Car Make'}
                </label>
                <Select value={filterCarMake} onValueChange={(value) => {
                  setFilterCarMake(value);
                  setFilterCarModel('all');
                }}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل الماركات' : 'All Makes'}</SelectItem>
                    {!carMakesLoading && Array.isArray(carMakes) && [...carMakes].sort((a: any, b: any) => a.name.localeCompare(b.name)).map((make: any) => (
                      <SelectItem key={make.id} value={make.name}>
                        {make.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'موديل السيارة' : 'Car Model'}
                </label>
                <Select value={filterCarModel} onValueChange={setFilterCarModel} disabled={filterCarMake === 'all'}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل الموديلات' : 'All Models'}</SelectItem>
                    {!carModelsLoading && Array.isArray(carModels) && [...carModels].sort((a: any, b: any) => a.localeCompare(b)).map((model: any) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'حالة السيارة' : 'Car Condition'}
                </label>
                <Select value={filterCarCondition} onValueChange={setFilterCarCondition}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل الحالات' : 'All Conditions'}</SelectItem>
                    <SelectItem value="new">{isRTL ? 'جديد' : 'New'}</SelectItem>
                    <SelectItem value="used">{isRTL ? 'مستعمل' : 'Used'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {selectedListingType === 'electronics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'نوع الإلكترونيات' : 'Electronics Type'}
                </label>
                <Select value={filterElectronicsType} onValueChange={setFilterElectronicsType}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل الأنواع' : 'All Types'}</SelectItem>
                    {!electronicsLoading && electronicsTypes && Object.entries(electronicsTypes).map(([key, type]: [string, any]) => (
                      <SelectItem key={key} value={key}>
                        {isRTL ? type.name_ar : type.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'حالة المنتج' : 'Item Condition'}
                </label>
                <Select value={filterItemCondition} onValueChange={setFilterItemCondition}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل الحالات' : 'All Conditions'}</SelectItem>
                    {!conditionLoading && itemCondition && Object.entries(itemCondition).map(([key, cond]: [string, any]) => (
                      <SelectItem key={key} value={key}>
                        {isRTL ? cond.name_ar : cond.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {selectedListingType === 'mobile' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'ماركة الموبايل' : 'Mobile Brand'}
                </label>
                <Select value={filterMobileBrand} onValueChange={(value) => {
                  setFilterMobileBrand(value);
                  setFilterMobileModel('all');
                }}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل الماركات' : 'All Brands'}</SelectItem>
                    {!mobileBrandsLoading && Array.isArray(mobileBrands) && mobileBrands.map((brand: any) => (
                      <SelectItem key={brand.id} value={brand.name}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'موديل الموبايل' : 'Mobile Model'}
                </label>
                <Select value={filterMobileModel} onValueChange={setFilterMobileModel} disabled={filterMobileBrand === 'all'}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل الموديلات' : 'All Models'}</SelectItem>
                    {!mobileModelsLoading && Array.isArray(mobileModels) && mobileModels.map((model: any) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'حالة الموبايل' : 'Mobile Condition'}
                </label>
                <Select value={filterItemCondition} onValueChange={setFilterItemCondition}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل الحالات' : 'All Conditions'}</SelectItem>
                    {!conditionLoading && itemCondition && Object.entries(itemCondition).map(([key, cond]: [string, any]) => (
                      <SelectItem key={key} value={key}>
                        {isRTL ? cond.name_ar : cond.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {selectedListingType === 'job' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'نوع الوظيفة' : 'Job Type'}
                </label>
                <Select value={filterJobType} onValueChange={setFilterJobType}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل الأنواع' : 'All Types'}</SelectItem>
                    {!jobTypesLoading && jobTypes && Object.entries(jobTypes).map(([key, type]: [string, any]) => (
                      <SelectItem key={key} value={key}>
                        {isRTL ? type.name_ar : type.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'نوع العمل' : 'Work Type'}
                </label>
                <Select value={filterJobWorkType} onValueChange={setFilterJobWorkType}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل الأنواع' : 'All Types'}</SelectItem>
                    {!jobWorkTypesLoading && jobWorkTypes && Object.entries(jobWorkTypes).map(([key, type]: [string, any]) => (
                      <SelectItem key={key} value={key}>
                        {isRTL ? type.name_ar : type.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'موقع العمل' : 'Location Type'}
                </label>
                <Select value={filterJobLocationType} onValueChange={setFilterJobLocationType}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل الأنواع' : 'All Types'}</SelectItem>
                    {!jobLocationTypesLoading && jobLocationTypes && Object.entries(jobLocationTypes).map(([key, type]: [string, any]) => (
                      <SelectItem key={key} value={key}>
                        {isRTL ? type.name_ar : type.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {selectedListingType === 'vehicle_booking' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'نوع المركبة' : 'Vehicle Type'}
                </label>
                <Select value={filterVehicleType} onValueChange={setFilterVehicleType}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل الأنواع' : 'All Types'}</SelectItem>
                    {!vehicleTypesLoading && vehicleTypes && Object.entries(vehicleTypes).map(([key, type]: [string, any]) => (
                      <SelectItem key={key} value={key}>
                        {isRTL ? type.name_ar : type.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'خيار التأجير' : 'Rental Option'}
                </label>
                <Select value={filterVehicleRentalOption} onValueChange={setFilterVehicleRentalOption}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل الخيارات' : 'All Options'}</SelectItem>
                    {!vehicleRentalLoading && vehicleRentalOptions && Object.entries(vehicleRentalOptions).map(([key, option]: [string, any]) => (
                      <SelectItem key={key} value={key}>
                        {isRTL ? option.name_ar : option.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {selectedListingType === 'doctor_booking' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'التخصص' : 'Specialty'}
                </label>
                <Select value={filterDoctorSpecialty} onValueChange={setFilterDoctorSpecialty}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل التخصصات' : 'All Specialties'}</SelectItem>
                    {!doctorSpecialtiesLoading && doctorSpecialties && Object.entries(doctorSpecialties).map(([key, specialty]: [string, any]) => (
                      <SelectItem key={key} value={key}>
                        {isRTL ? specialty.name_ar : specialty.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'نوع الحجز' : 'Booking Type'}
                </label>
                <Select value={filterBookingType} onValueChange={setFilterBookingType}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'كل الأنواع' : 'All Types'}</SelectItem>
                    {!bookingTypesLoading && bookingTypes && Object.entries(bookingTypes).map(([key, type]: [string, any]) => (
                      <SelectItem key={key} value={key}>
                        {isRTL ? type.name_ar : type.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProperties.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {isRTL ? 'لا توجد عقارات' : 'No Properties Found'}
              </h3>
              <p className="text-gray-500">
                {isRTL ? 'جرب تغيير معايير البحث' : 'Try adjusting your search criteria'}
              </p>
            </div>
          ) : (
            sortedProperties.map((property) => {
              const isArabic = /[\u0600-\u06FF]/.test(property.title);
              
              return (
                <Card 
                  key={property.id}
                  ref={(el) => (propertyRefs.current[property.id] = el)}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  <div 
                    className="relative cursor-pointer"
                    onClick={() => handlePropertyClick(property.id)}
                  >
                    {property.images && property.images.length > 0 && property.images[0] ? (
                      <img
                        src={getPropertyImageUrl(property.images[0])}
                        alt={property.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                        <Home className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                    
                    <div 
                      className="absolute top-3 right-3 z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FavoriteButton
                        propertyId={property.id}
                        initialIsFavorited={property.is_favorited || false}
                        className="bg-white/90 hover:bg-white shadow-lg"
                      />
                    </div>
                    
                    <Badge 
                      className={`absolute top-3 left-3 ${
                        property.rent_or_buy === 'rent' ? 'bg-blue-600' : 'bg-sky-600'
                      } text-white shadow-lg`}
                    >
                      {isRTL ? (property.rent_or_buy === 'rent' ? 'إيجار' : 'شراء') : (property.rent_or_buy === 'rent' ? 'Rent' : 'Buy')}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle 
                      className={`flex items-start gap-2 text-base leading-relaxed cursor-pointer hover:text-sky-600 transition-colors ${
                        isArabic ? 'flex-row-reverse text-right' : ''
                      }`}
                      style={{ 
                        minHeight: '3rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                      title={property.title}
                      onClick={() => handlePropertyClick(property.id)}
                    >
                      <span className="flex-shrink-0 mt-1">
                        {getCategoryIcon(property.category)}
                      </span>
                      <span className="flex-1 font-semibold">
                        {property.title}
                      </span>
                    </CardTitle>
                    
                    {/* Publisher Info - Only show if different from profile owner */}
                    {user && property.user_id !== user.id && (
                      <div className={`flex items-center gap-2 mt-2 text-sm text-gray-600 ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <User className="w-4 h-4" />
                        <span className="font-medium">{property.user_name}</span>
                        {property.username && (
                          <span className="text-gray-500">@{property.username}</span>
                        )}
                      </div>
                    )}
                    
                    {/* Car-specific details - Show prominently below title */}
                    {property.listing_type === 'car' && (property.car_make || property.car_model || property.car_year || property.car_condition) && (
                      <div className={`flex items-center gap-2 mt-2 flex-wrap ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <Car className="w-4 h-4 text-green-600" />
                        <div className="flex items-center gap-2 text-sm">
                          {property.car_make && (
                            <Badge className="bg-green-600 text-white font-medium capitalize">
                              {property.car_make}
                            </Badge>
                          )}
                          {property.car_model && (
                            <Badge variant="outline" className="text-gray-700 font-medium border-green-600 capitalize">
                              {property.car_model}
                            </Badge>
                          )}
                          {property.car_year && (
                            <Badge variant="secondary" className="font-medium">
                              {property.car_year}
                            </Badge>
                          )}
                          {property.car_condition && (
                            <Badge variant="secondary" className="font-medium capitalize">
                              {property.car_condition === 'new' ? (isRTL ? 'جديد' : 'New') :
                               property.car_condition === 'used' ? (isRTL ? 'مستعمل' : 'Used') :
                               property.car_condition}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Electronics-specific details */}
                    {property.listing_type === 'electronics' && (
                      <div className={`flex items-center gap-2 mt-2 flex-wrap ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <Tv className="w-4 h-4 text-purple-600" />
                        <div className="flex items-center gap-2 text-sm flex-wrap">
                          {/* Listing Type Badge */}
                          <Badge className="bg-purple-600 text-white font-medium">
                            {isRTL ? 'إلكترونيات' : 'Electronics'}
                          </Badge>
                          {/* Electronics Type Badge */}
                          {property.electronics_type && (
                            <Badge variant="outline" className="text-gray-700 font-medium border-purple-600 capitalize">
                              {(() => {
                                // Try to get translation from backend data first
                                if (electronicsTypes && electronicsTypes[property.electronics_type]) {
                                  return isRTL ? electronicsTypes[property.electronics_type].name_ar : electronicsTypes[property.electronics_type].name_en;
                                }
                                // Fallback to hardcoded translations
                                const electronicsTypeTranslations: { [key: string]: string } = {
                                  laptop: 'لابتوب',
                                  desktop: 'كمبيوتر مكتبي',
                                  tablet: 'تابلت',
                                  tv: 'تلفزيون',
                                  television: 'تلفزيون',
                                  camera: 'كاميرا',
                                  smartphone: 'هاتف ذكي',
                                  smartwatch: 'ساعة ذكية',
                                  headphones: 'سماعات',
                                  speaker: 'سماعات',
                                  printer: 'طابعة',
                                  monitor: 'شاشة',
                                  keyboard: 'لوحة مفاتيح',
                                  mouse: 'ماوس',
                                  gaming_console: 'جهاز ألعاب',
                                  router: 'راوتر',
                                  coffee_maker: 'صانعة قهوة',
                                  microwave: 'ميكروويف',
                                  refrigerator: 'ثلاجة',
                                  washing_machine: 'غسالة',
                                  air_conditioner: 'مكيف',
                                  vacuum_cleaner: 'مكنسة كهربائية',
                                  blender: 'خلاط',
                                  iron: 'مكواة',
                                  fan: 'مروحة',
                                  heater: 'سخان',
                                  other: 'أخرى'
                                };
                                return isRTL 
                                  ? (electronicsTypeTranslations[property.electronics_type?.toLowerCase().replace(/ /g, '_')] || property.electronics_type)
                                  : property.electronics_type;
                              })()}
                            </Badge>
                          )}
                          {/* Brand Badge */}
                          {property.electronics_brand && (
                            <Badge variant="outline" className="text-gray-700 font-medium border-purple-600 capitalize">
                              {property.electronics_brand}
                            </Badge>
                          )}
                          {/* Condition Badge */}
                          {(property.item_condition || property.electronics_condition) && (
                            <Badge variant="secondary" className="font-medium capitalize">
                              {(() => {
                                const condition = (property.item_condition || property.electronics_condition)?.toLowerCase().replace(/ /g, '_');
                                const conditionTranslations: { [key: string]: string } = {
                                  new: 'جديد',
                                  used: 'مستعمل',
                                  refurbished: 'مجدد',
                                  used_like_new: 'مستعمل كالجديد',
                                  like_new: 'كالجديد',
                                  excellent: 'ممتاز',
                                  good: 'جيد',
                                  fair: 'مقبول',
                                  poor: 'سيء'
                                };
                                if (!condition) return property.item_condition || property.electronics_condition;
                                return isRTL 
                                  ? (conditionTranslations[condition] || property.item_condition || property.electronics_condition)
                                  : (property.item_condition || property.electronics_condition);
                              })()}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Mobile-specific details */}
                    {property.listing_type === 'mobile' && (property.mobile_brand || property.mobile_model || property.item_condition) && (
                      <div className={`flex items-center gap-2 mt-2 flex-wrap ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <Smartphone className="w-4 h-4 text-pink-600" />
                        <div className="flex items-center gap-2 text-sm">
                          {property.mobile_brand && (
                            <Badge className="bg-pink-600 text-white font-medium capitalize">
                              {property.mobile_brand}
                            </Badge>
                          )}
                          {property.mobile_model && (
                            <Badge variant="outline" className="text-gray-700 font-medium border-pink-600 capitalize">
                              {property.mobile_model}
                            </Badge>
                          )}
                          {property.item_condition && (
                            <Badge variant="secondary" className="font-medium capitalize">
                              {(() => {
                                const condition = property.item_condition?.toLowerCase().replace(/ /g, '_');
                                const conditionTranslations: { [key: string]: string } = {
                                  new: 'جديد',
                                  used: 'مستعمل',
                                  refurbished: 'مجدد',
                                  used_like_new: 'مستعمل كالجديد',
                                  like_new: 'كالجديد',
                                  excellent: 'ممتاز',
                                  good: 'جيد',
                                  fair: 'مقبول',
                                  poor: 'سيء'
                                };
                                if (!condition) return property.item_condition;
                                return isRTL 
                                  ? (conditionTranslations[condition] || property.item_condition)
                                  : property.item_condition;
                              })()}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Job-specific details */}
                    {property.listing_type === 'job' && property.job_type && (
                      <div className={`flex items-center gap-2 mt-2 flex-wrap ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <Briefcase className="w-4 h-4 text-orange-600" />
                        <Badge className="bg-orange-600 text-white font-medium capitalize">
                          {(() => {
                            // Try to get translation from backend data first
                            if (jobTypes && jobTypes[property.job_type]) {
                              return isRTL ? jobTypes[property.job_type].name_ar : jobTypes[property.job_type].name_en;
                            }
                            // Fallback to hardcoded translations
                            const jobTypeTranslations: { [key: string]: string } = {
                              developer: 'مطور',
                              designer: 'مصمم',
                              teacher: 'معلم',
                              accountant: 'محاسب',
                              engineer: 'مهندس',
                              doctor: 'طبيب',
                              nurse: 'ممرض',
                              sales: 'مبيعات',
                              marketing: 'تسويق',
                              customer_service: 'خدمة عملاء',
                              driver: 'سائق',
                              chef: 'طاهي',
                              waiter: 'نادل',
                              cleaner: 'عامل نظافة',
                              security: 'أمن',
                              manager: 'مدير',
                              receptionist: 'موظف استقبال',
                              other: 'أخرى'
                            };
                            return isRTL 
                              ? (jobTypeTranslations[property.job_type?.toLowerCase()] || property.job_type)
                              : property.job_type;
                          })()}
                        </Badge>
                        {property.job_work_type && (
                          <Badge variant="outline" className="text-gray-700 font-medium border-orange-600 capitalize">
                            {property.job_work_type === 'full_time' ? (isRTL ? 'دوام كامل' : 'Full Time') :
                             property.job_work_type === 'part_time' ? (isRTL ? 'دوام جزئي' : 'Part Time') :
                             property.job_work_type === 'contract' ? (isRTL ? 'عقد' : 'Contract') :
                             property.job_work_type === 'freelance' ? (isRTL ? 'مستقل' : 'Freelance') :
                             property.job_work_type}
                          </Badge>
                        )}
                        {property.job_location_type && (
                          <Badge variant="outline" className="text-gray-700 font-medium border-orange-600 capitalize">
                            {property.job_location_type === 'remote' ? (isRTL ? 'عن بعد' : 'Remote') :
                             property.job_location_type === 'onsite' ? (isRTL ? 'في الموقع' : 'Onsite') :
                             property.job_location_type === 'hybrid' ? (isRTL ? 'هجين' : 'Hybrid') :
                             property.job_location_type}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    {/* Property-specific details */}
                    {property.listing_type === 'property' && (
                      <div className={`flex items-center gap-2 mt-2 flex-wrap ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <Home className="w-4 h-4 text-blue-600" />
                        <div className="flex items-center gap-2 text-sm flex-wrap">
                          {/* Listing Type Badge */}
                          <Badge className="bg-blue-600 text-white font-medium">
                            {isRTL ? 'عقار' : 'Property'}
                          </Badge>
                          {/* Category Badge */}
                          {property.category && (
                            <Badge variant="outline" className="text-gray-700 font-medium border-blue-600 capitalize">
                              {property.category === 'villa' ? (isRTL ? 'فيلا' : 'Villa') :
                               property.category === 'apartment' ? (isRTL ? 'شقة' : 'Apartment') :
                               property.category === 'land' ? (isRTL ? 'أرض' : 'Land') :
                               property.category === 'townhouse' ? (isRTL ? 'تاون هاوس' : 'Townhouse') :
                               property.category === 'building' ? (isRTL ? 'مبنى' : 'Building') :
                               property.category === 'commercial' ? (isRTL ? 'تجاري' : 'Commercial') :
                               property.category === 'other' ? (isRTL ? 'أخرى' : 'Other') :
                               property.category}
                            </Badge>
                          )}
                          {/* Rent or Buy Badge */}
                          {property.rent_or_buy && (
                            <Badge variant="outline" className="text-gray-700 font-medium border-blue-600 capitalize">
                              {property.rent_or_buy === 'rent' ? (isRTL ? 'إيجار' : 'Rent') : (isRTL ? 'شراء' : 'Buy')}
                            </Badge>
                          )}
                          {/* Bedrooms Badge */}
                          {property.bedrooms && property.bedrooms > 0 && (
                            <Badge variant="secondary" className="font-medium">
                              {property.bedrooms} {isRTL ? 'غرف' : 'Beds'}
                            </Badge>
                          )}
                          {/* Bathrooms Badge */}
                          {property.bathrooms && property.bathrooms > 0 && (
                            <Badge variant="secondary" className="font-medium">
                              {property.bathrooms} {isRTL ? 'حمام' : 'Baths'}
                            </Badge>
                          )}
                          {/* Area Badge */}
                          {property.area && property.area > 0 && (
                            <Badge variant="secondary" className="font-medium">
                              {property.area} {isRTL ? 'م²' : 'm²'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Vehicle Booking-specific details */}
                    {property.listing_type === 'vehicle_booking' && property.vehicle_type && (
                      <div className={`flex items-center gap-2 mt-2 flex-wrap ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <Truck className="w-4 h-4 text-cyan-600" />
                        <div className="flex items-center gap-2 text-sm">
                          {property.vehicle_type && (
                            <Badge className="bg-cyan-600 text-white font-medium capitalize">
                              {property.vehicle_type}
                            </Badge>
                          )}
                          {property.vehicle_with_driver !== undefined && (
                            <Badge variant="outline" className="text-gray-700 font-medium border-cyan-600">
                              {property.vehicle_with_driver ? (isRTL ? 'مع سائق' : 'With Driver') : (isRTL ? 'قيادة ذاتية' : 'Self Drive')}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Doctor Booking-specific details */}
                    {property.listing_type === 'doctor_booking' && (property.doctor_specialty || property.booking_type) && (
                      <div className={`flex items-center gap-2 mt-2 flex-wrap ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <Stethoscope className="w-4 h-4 text-red-600" />
                        <div className="flex items-center gap-2 text-sm">
                          {property.doctor_specialty && (
                            <Badge className="bg-red-600 text-white font-medium capitalize">
                              {(() => {
                                // Try to get translation from backend data first
                                if (doctorSpecialties && doctorSpecialties[property.doctor_specialty]) {
                                  return isRTL ? doctorSpecialties[property.doctor_specialty].name_ar : doctorSpecialties[property.doctor_specialty].name_en;
                                }
                                // Fallback to hardcoded translations
                                const specialtyTranslations: { [key: string]: string } = {
                                  general: 'طب عام',
                                  dentist: 'أسنان',
                                  pediatrics: 'أطفال',
                                  cardiology: 'قلب',
                                  dermatology: 'جلدية',
                                  orthopedics: 'عظام',
                                  neurology: 'أعصاب',
                                  psychiatry: 'نفسية',
                                  ophthalmology: 'عيون',
                                  ent: 'أنف وأذن وحنجرة'
                                };
                                return isRTL 
                                  ? (specialtyTranslations[property.doctor_specialty] || property.doctor_specialty)
                                  : property.doctor_specialty;
                              })()}
                            </Badge>
                          )}
                          {property.booking_type && (
                            <Badge variant="outline" className="text-gray-700 font-medium border-red-600 capitalize">
                              {property.booking_type === 'online' ? (isRTL ? 'استشارة أونلاين' : 'Online Consultation') : 
                               property.booking_type === 'in_person' ? (isRTL ? 'حضوري' : 'In-Person') : 
                               property.booking_type}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </CardHeader>
                  
                  <CardContent className="space-y-3 flex-grow">
                    <p 
                      className={`text-gray-600 text-sm leading-relaxed ${
                        isArabic ? 'text-right' : ''
                      }`}
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {property.description}
                    </p>
                    
                    {/* Additional Car details */}
                    {property.listing_type === 'car' && property.car_condition && (
                      <div className={`flex items-center gap-2 flex-wrap ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <Badge variant={property.car_condition === 'new' ? 'default' : 'secondary'} className="text-xs">
                          {property.car_condition === 'new' ? (isRTL ? 'جديدة' : 'New') : (isRTL ? 'مستعملة' : 'Used')}
                        </Badge>
                        {property.car_mileage && (
                          <span className="text-sm text-gray-600">
                            {property.car_mileage.toLocaleString()} {isRTL ? 'كم' : 'km'}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Additional Electronics/Mobile details - Item Condition */}
                    {(property.listing_type === 'electronics' || property.listing_type === 'mobile') && property.item_condition && (
                      <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <Badge variant={property.item_condition === 'new' ? 'default' : 'secondary'} className="text-xs">
                          {property.item_condition === 'new' ? (isRTL ? 'جديد' : 'New') : 
                           property.item_condition === 'used' ? (isRTL ? 'مستعمل' : 'Used') :
                           property.item_condition === 'refurbished' ? (isRTL ? 'مجدد' : 'Refurbished') :
                           property.item_condition}
                        </Badge>
                      </div>
                    )}
                    
                    {/* Additional Job details */}
                    {property.listing_type === 'job' && property.job_location_type && (
                      <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <Badge variant="outline" className="text-xs">
                          {property.job_location_type === 'remote' ? (isRTL ? 'عن بعد' : 'Remote') :
                           property.job_location_type === 'on_site' ? (isRTL ? 'في الموقع' : 'On-Site') :
                           property.job_location_type === 'hybrid' ? (isRTL ? 'هجين' : 'Hybrid') :
                           property.job_location_type}
                        </Badge>
                      </div>
                    )}
                    
                    <div className={`flex items-center gap-2 text-sm text-gray-500 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <MapPin className="w-4 h-4 flex-shrink-0 text-red-500" />
                      <span className="truncate">
                        {property.location_city}, {property.location_governorate}, {property.location_country}
                      </span>
                    </div>
                    
                    <div className={`flex items-center gap-2 text-sm text-gray-500 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <Calendar className="w-4 h-4 flex-shrink-0 text-blue-500" />
                      <span>{new Date(property.created_at).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US')}</span>
                    </div>
                    
                    <div className={`flex items-center gap-2 pt-2 border-t ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <DollarSign className="w-5 h-5 flex-shrink-0 text-sky-600" />
                      <span className="text-xl font-bold text-sky-600">
                        {formatPrice(property.price, property.rent_or_buy)}
                      </span>
                    </div>
                  </CardContent>
                  
                <CardFooter className="pt-4 pb-4 flex-col gap-2 bg-gray-50">
  {/* Row 1: View and Chat Buttons */}
  <div className={`flex w-full gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
    <Button 
      onClick={() => handlePropertyClick(property.id)}
      variant="outline" 
      className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 bg-white"
    >
      <Eye className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
      {isRTL ? 'عرض التفاصيل' : 'View Details'}
    </Button>
    
    <ChatButton
      userId={property.user_id}
      userName={property.user_name}
      className="flex-1 bg-sky-600 hover:bg-sky-700"
      size="default"
      variant="default"
    />
  </div>

  {/* Row 2: Phone Number Section */}
  <div className="w-full">
    {showPhoneForProperty === property.id ? (
      <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => window.location.href = `tel:${property.user_phone}`}
        >
          <Phone className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {property.user_phone}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowPhoneForProperty(null)}
          className="bg-white"
        >
          ✕
        </Button>
      </div>
    ) : (
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        onClick={() => setShowPhoneForProperty(property.id)}
      >
        <Phone className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        {isRTL ? 'إظهار رقم الهاتف' : 'Show Phone Number'}
      </Button>
    )}
  </div>

  {/* Row 3: Comments and Share */}
  <div className={`flex w-full gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
    {/* Comments Button */}
    <Button
      onClick={() => setShowCommentsFor(property.id)}
      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
    >
      <MessageCircle className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
      {isRTL ? 'تعليقات' : 'Comments'}
      {property.totalComments !== undefined && property.totalComments > 0 && (
        <Badge className={`${isRTL ? 'mr-2' : 'ml-2'} bg-white/20 text-white`}>
          {property.totalComments}
        </Badge>
      )}
    </Button>
    
    {/* Share Button */}
    <SharePropertyButton
      property={property}
      className="flex-1"
      variant="outline"
      size="default"
      showLabel={true}
    />
  </div>
</CardFooter>
                </Card>
              );
            })
          )}
        </div>

         {sortedProperties.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {isRTL 
                ? `عرض ${sortedProperties.length} من ${properties.length} عقار`
                : `Showing ${sortedProperties.length} of ${properties.length} properties`
              }
            </p>
          </div>
        )}
      </div>

      {/* PropertyComments Modal - ADD THIS */}
      <PropertyComments
        propertyId={showCommentsFor}
        isOpen={showCommentsFor !== null}
        onClose={() => setShowCommentsFor(null)}
      />
    </>
  );
};

export default UserProfile;