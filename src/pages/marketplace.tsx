import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, MapPin, DollarSign, Home, Building, Warehouse, Eye, Phone, Crown, Shield, UserPlus, MessageCircle, Car, Tv, Smartphone, Briefcase, Truck, Stethoscope, User } from 'lucide-react';
import { ChatButton } from '@/components/ChatButton';
import { SharePropertyButton } from '@/components/SharePropertyButton';
import { API_URL, API_BASE_URL } from '@/config/api';
import PropertyComments from '@/components/PropertyComments';
import { Share2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/SEO';
import { MarketplaceSEOEnhancer, useMarketplaceSEO } from '@/components/MarketplaceSEOEnhancer';
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

interface SearchUser {
  id: number;
  name: string;
  username: string;
  email?: string;
  phone?: string;
  is_admin: boolean;
  is_founder: boolean;
  properties_count?: number;
  isNewResult?: boolean;
}

interface MarketplaceProps {
  isAdmin?: boolean;
}

const Marketplace: React.FC<MarketplaceProps> = ({ isAdmin = false }) => {
  const navigate = useNavigate();
    const { isRTL } = useLanguage();
     useMarketplaceSEO();
  const propertyRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const listingTypeContainerRef = useRef<HTMLDivElement | null>(null);
  const listingTypeButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const isInitialMount = useRef(true);
  const hasRestoredFilters = useRef(false);
  
  // Helper function to get initial filter state from localStorage
  const getInitialFilters = () => {
    try {
      const savedFilters = localStorage.getItem('marketplace_filters');
      if (savedFilters) {
        const filters = JSON.parse(savedFilters);
        console.log('🔧 Getting initial filters from localStorage:', filters);
        return filters;
      }
    } catch (error) {
      console.error('❌ Error parsing saved filters:', error);
    }
    return null;
  };

  const initialFilters = getInitialFilters();
  
  // Fetch listing types and countries
  const { listingTypes, loading: typesLoading } = useListingTypes();
  const { countries, loading: countriesLoading } = useCountries();
  const { carMakes, loading: carMakesLoading } = useCarMakes();
  
  // Debug logging
  React.useEffect(() => {
    console.log('Marketplace - typesLoading:', typesLoading);
    console.log('Marketplace - listingTypes:', listingTypes);
    console.log('Marketplace - listingTypes?.listing_types:', listingTypes?.listing_types);
  }, [typesLoading, listingTypes]);
  
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    return `${API_BASE_URL}${imagePath}`;
  };
  
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
  
  // New filters for multi-category - Initialize from localStorage
  const [selectedListingType, setSelectedListingType] = useState(initialFilters?.selectedListingType || 'all');
  const [filterCountry, setFilterCountry] = useState(initialFilters?.filterCountry || 'all');
  const [filterCarMake, setFilterCarMake] = useState(initialFilters?.filterCarMake || 'all');
  const [filterCarModel, setFilterCarModel] = useState(initialFilters?.filterCarModel || 'all');
  const [filterCarCondition, setFilterCarCondition] = useState(initialFilters?.filterCarCondition || 'all');
  const [filterCarYear, setFilterCarYear] = useState(initialFilters?.filterCarYear || '');
  
  // Property-specific filters
  const [filterBedrooms, setFilterBedrooms] = useState(initialFilters?.filterBedrooms || 'all');
  const [filterArea, setFilterArea] = useState(initialFilters?.filterArea || '');
  
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
  
  const [searchUsers, setSearchUsers] = useState<SearchUser[]>([]);
  const [searchingUsers, setSearchingUsers] = useState(false);
  const [showUserResults, setShowUserResults] = useState(false);
  const [showCommentsFor, setShowCommentsFor] = useState<string | null>(null);
  
  // Dynamic location data based on selected country and governorate (must be after state declarations)
  const countryIdNumber = filterCountry !== 'all' ? parseInt(filterCountry) : null;
  const governorateIdNumber = filterGovernorate !== 'all' ? parseInt(filterGovernorate) : null;
  const { governorates: countryGovernorates, loading: governoratesLoading } = useCountryGovernorates(countryIdNumber);
  const { cities: governorateCities, loading: citiesLoading } = useGovernorateCities(governorateIdNumber);

  const priceRangeConfigs = {
    'all': { min: 0, max: 10000000000, step: 100000000, label: isRTL ? 'الكل' : 'ALL' },
    '100K': { min: 0, max: 100000, step: 2000, label: isRTL ? 'حتى 100 ألف' : 'Up to 100K' },
    '10M': { min: 100000, max: 10000000, step: 50000, label: isRTL ? '100 ألف - 10 مليون' : '100K - 10M' },
    '100M': { min: 10000000, max: 100000000, step: 1000000, label: isRTL ? '10 - 100 مليون' : '10M - 100M' },
    '500M': { min: 100000000, max: 500000000, step: 20000000, label: isRTL ? '100 - 500 مليون' : '100M - 500M' },
    '1B': { min: 500000000, max: 1000000000, step: 50000000, label: isRTL ? '500 مليون - 1 مليار' : '500M - 1B' },
    'ABOVE': { min: 1000000000, max: 10000000000, step: 100000000, label: isRTL ? 'أكثر من 1 مليار' : 'Above 1B' }
  };

  // Icon mapper for listing types
  const getListingTypeIcon = (type: string) => {
    const iconMap: { [key: string]: any } = {
      'property': Home,
      'car': Car,
      'electronics': Tv,
      'mobile': Smartphone,
      'job': Briefcase,
      'vehicle_booking': Truck,
      'doctor_booking': Stethoscope
    };
    return iconMap[type] || Home;
  };

  const mockGovernorates: Governorate[] = [
    {
      id: '1',
      name_en: 'Cairo',
      name_ar: 'القاهرة',
      cities: [
        { id: '1-1', name_en: 'New Cairo', name_ar: 'القاهرة الجديدة', governorate_id: '1' },
        { id: '1-2', name_en: 'Nasr City', name_ar: 'مدينة نصر', governorate_id: '1' }
      ]
    },
    {
      id: '2',
      name_en: 'Alexandria',
      name_ar: 'الإسكندرية',
      cities: [
        { id: '2-1', name_en: 'Sidi Gaber', name_ar: 'سيدي جابر', governorate_id: '2' }
      ]
    }
  ];

  const mockProperties: Property[] = [
    {
      id: '1',
      title: isRTL ? 'فيلا فاخرة في القاهرة الجديدة' : 'Luxury Villa in New Cairo',
      description: isRTL ? 'فيلا جميلة بـ 4 غرف نوم' : 'Beautiful 4-bedroom villa',
      price: 5000000,
      location_country: isRTL ? 'مصر' : 'Egypt',
      location_governorate: isRTL ? 'القاهرة' : 'Cairo',
      location_city: isRTL ? 'القاهرة الجديدة' : 'New Cairo',
      category: 'villa',
      rent_or_buy: 'buy',
      status: 'approved',
      images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400'],
      created_at: '2024-01-15',
      user_name: 'Ahmed Hassan',
      user_id: 1,
      user_phone: '+20 123 456 7890',
      totalComments: 5,
      averageRating: 4.5
    }
  ];

  const handlePriceRangeTypeChange = (type: string) => {
    setPriceRangeType(type);
    const config = priceRangeConfigs[type as keyof typeof priceRangeConfigs];
    setPriceRange([config.min, config.max]);
  };

  const handlePropertyClick = (propertyId: string) => {
    sessionStorage.setItem('marketplace_scroll_position', window.scrollY.toString());
    sessionStorage.setItem('marketplace_property_id', propertyId);
    navigate(`/property/${propertyId}`);
  };

  const searchUsersGlobally = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSearchUsers([]);
      setShowUserResults(false);
      return;
    }

    setSearchingUsers(true);
    try {
      const token = localStorage.getItem('auth_token');
      const headers: HeadersInit = {
        'Accept': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/users/search?query=${encodeURIComponent(query)}`, {
        headers,
      });

      if (response.ok) {
        const data = await response.json();
        const users = data.users || data.data || [];
        
        const processedUsers = users.map((u: any) => ({
          ...u,
          isNewResult: true,
        }));
        
        setSearchUsers(processedUsers);
        setShowUserResults(processedUsers.length > 0);
      } else {
        setSearchUsers([]);
        setShowUserResults(false);
      }
    } catch (error) {
      console.error('Error searching users:', error);
      setSearchUsers([]);
      setShowUserResults(false);
    } finally {
      setSearchingUsers(false);
    }
  };

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchTerm.trim().length >= 2) {
      searchTimeoutRef.current = setTimeout(() => {
        searchUsersGlobally(searchTerm);
      }, 300);
    } else {
      setSearchUsers([]);
      setShowUserResults(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query parameters
      const params = new URLSearchParams();
      
      // Add filters to API request
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
      
      // Add type-specific filters to API request for better performance
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
      const url = queryString ? `${API_URL}/properties?${queryString}` : `${API_URL}/properties`;
      
      console.log('Fetching properties with filters:', {
        listing_type: selectedListingType,
        country: filterCountry,
        governorate: filterGovernorate,
        city: filterCity,
        url: url
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
          location_country: prop.country?.name_en || prop.location_country || '',
          location_governorate: prop.governorate?.name_en || prop.location_governorate || '',
          location_city: prop.city?.name_en || prop.location_city || '',
          user_name: prop.user?.name || 'Unknown',
          username: prop.user?.username || prop.username || '',
          user_id: prop.user?.id || prop.user_id || 0,
          user_phone: prop.user?.phone || prop.user_phone || 'N/A',
          totalComments: prop.totalComments || 0,
          averageRating: prop.averageRating || 0
        }));
        
        // Debug logging for location data
        console.log('Sample property location data:', processedProperties.slice(0, 2).map((p: any) => ({
          id: p.id,
          title: p.title,
          country_id: p.country_id,
          governorate_id: p.governorate_id,
          city_id: p.city_id,
          location_country: p.location_country,
          location_governorate: p.location_governorate,
          location_city: p.location_city
        })));
        
        // Debug logging for electronics properties
        processedProperties.forEach((prop: any) => {
          if (prop.listing_type === 'electronics') {
            console.log('Electronics property data:', {
              id: prop.id,
              title: prop.title,
              electronics_type: prop.electronics_type,
              electronics_brand: prop.electronics_brand,
              electronics_condition: prop.electronics_condition,
              item_condition: prop.item_condition
            });
          }
        });
        
        setProperties(processedProperties);
      } else {
        setProperties(mockProperties);
      }
    } catch (err) {
      setError(isRTL ? 'خطأ في تحميل العقارات' : 'Error loading properties');
      setProperties(mockProperties);
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
      
      setGovernorates(mockGovernorates);
      const allCities = mockGovernorates.flatMap(gov => gov.cities || []);
      setCities(allCities);
    } catch (err) {
      setGovernorates(mockGovernorates);
      const allCities = mockGovernorates.flatMap(gov => gov.cities || []);
      setCities(allCities);
    }
  };

  useEffect(() => {
    fetchProperties();
    fetchGovernorates();
  }, []);

  // Re-fetch properties when filters change
  useEffect(() => {
    fetchProperties();
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
  }, [filterGovernorate, governorates]);

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
      filterCarYear,
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
    console.log('💾 Saving filters to localStorage:', filterState);
    console.log('📌 Current selectedListingType:', selectedListingType);
    localStorage.setItem('marketplace_filters', JSON.stringify(filterState));
  }, [
    searchTerm, sortBy, selectedListingType,
    filterCountry, filterGovernorate, filterCity,
    priceRange, priceRangeType,
    filterCategory, filterType, filterBedrooms, filterArea,
    filterCarMake, filterCarModel, filterCarCondition, filterCarYear,
    filterElectronicsType, filterItemCondition,
    filterMobileBrand, filterMobileModel,
    filterJobType, filterJobWorkType, filterJobLocationType,
    filterVehicleType, filterVehicleRentalOption,
    filterDoctorSpecialty, filterBookingType
  ]);

  // Restore filter state from localStorage on component mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('marketplace_filters');
    console.log('🔍 Restoring filters from localStorage:', savedFilters);
    
    if (savedFilters) {
      try {
        const filters = JSON.parse(savedFilters);
        console.log('📦 Parsed filters:', filters);
        console.log('📌 Selected listing type from storage:', filters.selectedListingType);
        
        // Search and sort
        if (filters.searchTerm !== undefined) setSearchTerm(filters.searchTerm);
        if (filters.sortBy !== undefined) setSortBy(filters.sortBy);
        // Listing type
        if (filters.selectedListingType !== undefined) {
          console.log('✅ Restoring listing type:', filters.selectedListingType);
          setSelectedListingType(filters.selectedListingType);
        }
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
        if (filters.filterCarYear !== undefined) setFilterCarYear(filters.filterCarYear);
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
        console.error('❌ Error restoring filters:', error);
        hasRestoredFilters.current = true;
      }
    } else {
      console.log('⚠️ No saved filters found in localStorage');
      // No saved filters, mark as restored anyway
      hasRestoredFilters.current = true;
    }
    
    // Mark initial mount as complete after a delay
    setTimeout(() => {
      isInitialMount.current = false;
    }, 100);
  }, []); // Only run on mount

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('marketplace_scroll_position');
    const savedPropertyId = sessionStorage.getItem('marketplace_property_id');
    
    if (savedScrollPosition && savedPropertyId && properties.length > 0) {
      setTimeout(() => {
        const propertyElement = propertyRefs.current[savedPropertyId];
        if (propertyElement) {
          propertyElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          window.scrollTo({ top: parseInt(savedScrollPosition), behavior: 'smooth' });
        }
        
        sessionStorage.removeItem('marketplace_scroll_position');
        sessionStorage.removeItem('marketplace_property_id');
      }, 100);
    }
  }, [properties]);

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

  const renderUserBadge = (user: SearchUser) => {
    if (user.is_founder) {
      return (
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
          <Crown className="w-3 h-3 mr-1" />
          {isRTL ? 'مؤسس' : 'Founder'}
        </Badge>
      );
    }
    if (user.is_admin) {
      return (
        <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs">
          <Shield className="w-3 h-3 mr-1" />
          {isRTL ? 'مشرف' : 'Admin'}
        </Badge>
      );
    }
    return null;
  };

  const filteredProperties = properties.filter(property => {
    const searchLower = searchTerm.toLowerCase();
    
    const matchesSearch = 
      property.title.toLowerCase().includes(searchLower) ||
      property.description.toLowerCase().includes(searchLower) ||
      property.user_name.toLowerCase().includes(searchLower) ||
      property.location_governorate.toLowerCase().includes(searchLower) ||
      property.location_city.toLowerCase().includes(searchLower) ||
      governorates.some(gov => 
        (gov.name_ar.toLowerCase().includes(searchLower) || 
         gov.name_en.toLowerCase().includes(searchLower)) &&
        (property.location_governorate === gov.name_en || 
         property.location_governorate === gov.name_ar)
      ) ||
      cities.some(city => 
        (city.name_ar.toLowerCase().includes(searchLower) || 
         city.name_en.toLowerCase().includes(searchLower)) &&
        (property.location_city === city.name_en || 
         property.location_city === city.name_ar)
      );
    
    // Listing type filter
    const matchesListingType = selectedListingType === 'all' || property.listing_type === selectedListingType || (!property.listing_type && selectedListingType === 'property');
      
    const matchesCategory = filterCategory === 'all' || property.category === filterCategory;
    
    // Country filter - use country_id if available
    const matchesCountry = filterCountry === 'all' || 
      (property.country_id && String(property.country_id) === filterCountry);
    
    // Governorate filter - use governorate_id if available, fallback to name matching
    let matchesGovernorate = filterGovernorate === 'all';
    if (!matchesGovernorate && filterGovernorate !== 'all') {
      if (property.governorate_id) {
        matchesGovernorate = String(property.governorate_id) === filterGovernorate;
      } else {
        const selectedGov = governorates.find(g => String(g.id) === filterGovernorate);
        if (selectedGov) {
          const govName = isRTL ? selectedGov.name_ar : selectedGov.name_en;
          matchesGovernorate = property.location_governorate === govName;
        }
      }
    }
    
    // Debug location filtering (log first property only)
    if (property.id === properties[0]?.id && filterCountry !== 'all') {
      console.log('Location Filter Debug:', {
        filterCountry,
        filterGovernorate,
        filterCity,
        property: {
          id: property.id,
          title: property.title,
          country_id: property.country_id,
          governorate_id: property.governorate_id,
          city_id: property.city_id,
          location_country: property.location_country,
          location_governorate: property.location_governorate,
          location_city: property.location_city
        },
        matches: {
          country: matchesCountry,
          governorate: matchesGovernorate
        }
      });
    }
    
    // City filter - use city_id if available, fallback to name matching
    let matchesCity = filterCity === 'all';
    if (!matchesCity && filterCity !== 'all') {
      if (property.city_id) {
        matchesCity = String(property.city_id) === filterCity;
      } else {
        const availableCities = getAvailableCities();
        const selectedCity = availableCities.find(c => String(c.id) === filterCity);
        if (selectedCity) {
          const cityName = isRTL ? selectedCity.name_ar : selectedCity.name_en;
          matchesCity = property.location_city === cityName;
        }
      }
    }
    
    const matchesType = filterType === 'all' || property.rent_or_buy === filterType;
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    
    // Car-specific filters
    const matchesCarMake = filterCarMake === 'all' || property.car_make === filterCarMake;
    const matchesCarModel = filterCarModel === 'all' || property.car_model === filterCarModel;
    const matchesCarCondition = filterCarCondition === 'all' || property.car_condition === filterCarCondition;
    const matchesCarYear = !filterCarYear || (property.car_year && property.car_year.toString().includes(filterCarYear));

    // Electronics-specific filters
    const matchesElectronicsType = filterElectronicsType === 'all' || property.electronics_type === filterElectronicsType;
    
    // Mobile-specific filters
    const matchesMobileBrand = filterMobileBrand === 'all' || property.mobile_brand === filterMobileBrand;
    const matchesMobileModel = filterMobileModel === 'all' || property.mobile_model === filterMobileModel;
    
    // Item condition (for electronics and mobile)
    const matchesItemCondition = filterItemCondition === 'all' || property.item_condition === filterItemCondition;
    
    // Property-specific filters
    const matchesBedrooms = filterBedrooms === 'all' || 
      (filterBedrooms === '8+' && property.bedrooms && property.bedrooms >= 8) ||
      (property.bedrooms && property.bedrooms.toString() === filterBedrooms);
    
    const matchesArea = !filterArea || (property.area && property.area >= parseInt(filterArea));
    
    // Job-specific filters
    const matchesJobType = filterJobType === 'all' || property.job_type === filterJobType;
    const matchesJobWorkType = filterJobWorkType === 'all' || property.job_work_type === filterJobWorkType;
    const matchesJobLocationType = filterJobLocationType === 'all' || property.job_location_type === filterJobLocationType;
    
    // Vehicle-specific filters
    const matchesVehicleType = filterVehicleType === 'all' || property.vehicle_type === filterVehicleType;
    const matchesVehicleRentalOption = filterVehicleRentalOption === 'all' || property.vehicle_rental_option === filterVehicleRentalOption;
    
    // Doctor-specific filters
    const matchesDoctorSpecialty = filterDoctorSpecialty === 'all' || property.doctor_specialty === filterDoctorSpecialty;
    const matchesBookingType = filterBookingType === 'all' || property.booking_type === filterBookingType;

    return matchesSearch && matchesListingType && matchesCategory && matchesCountry && matchesGovernorate && matchesCity && matchesType && matchesPrice && matchesCarMake && matchesCarModel && matchesCarCondition && matchesCarYear && matchesElectronicsType && matchesMobileBrand && matchesMobileModel && matchesItemCondition && matchesBedrooms && matchesArea && matchesJobType && matchesJobWorkType && matchesJobLocationType && matchesVehicleType && matchesVehicleRentalOption && matchesDoctorSpecialty && matchesBookingType;
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

  if (error) {
    return (
      <div className={`container mx-auto px-4 py-8 mt-20 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <Button 
            onClick={fetchProperties}
            className="mt-4 bg-sky-600 hover:bg-sky-700"
          >
            {isRTL ? 'إعادة المحاولة' : 'Try Again'}
          </Button>
        </div>
      </div>
    );
  }

const generateMarketplaceSEO = () => {
  // Define all brand variations
  const brandKeywords = '7agty, hagty, hagti, hagaty, hagati, 7agati, 7agaty, حاجتي, حاجاتي, حاجتى';
  
  // Safely get listing type info
  let selectedCategory = null;
  let categoryLabel = '';
  
  if (selectedListingType && selectedListingType !== 'all' && listingTypes?.listing_types) {
    // Fix: Access object property correctly
    const typeData = listingTypes.listing_types[selectedListingType];
    if (typeData) {
      selectedCategory = typeData;
      categoryLabel = isRTL ? typeData.name_ar : typeData.name_en;
    }
  }
  
  const cityName = filterCity && filterCity !== 'all' && cities.find(c => String(c.id) === filterCity)
    ? (isRTL ? cities.find(c => String(c.id) === filterCity)?.name_ar : cities.find(c => String(c.id) === filterCity)?.name_en)
    : '';
  const govName = filterGovernorate && filterGovernorate !== 'all' && governorates.find(g => String(g.id) === filterGovernorate)
    ? (isRTL ? governorates.find(g => String(g.id) === filterGovernorate)?.name_ar : governorates.find(g => String(g.id) === filterGovernorate)?.name_en)
    : '';

  // Enhanced titles with brand variations
  const titleEn = searchTerm 
    ? `${searchTerm} - 7agty حاجتي Free Marketplace`
    : categoryLabel && cityName
    ? `${categoryLabel} in ${cityName} for Sale & Rent - 7agty حاجتي`
    : categoryLabel
    ? `${categoryLabel} for Sale & Rent - 7agty حاجتي Egypt, UAE & Saudi`
    : `7agty حاجتي - Free Marketplace - Sell Cars, Apartments, Villas, Phones for Free`;

  const titleAr = searchTerm
    ? `${searchTerm} - 7agty حاجتي سوق مجاني`
    : categoryLabel && cityName
    ? `${categoryLabel} في ${cityName} للبيع والإيجار - 7agty حاجتي`
    : categoryLabel
    ? `${categoryLabel} للبيع والإيجار - 7agty حاجتي مصر والإمارات والسعودية`
    : `7agty حاجتي - سوق مجاني - بيع سيارة بيع عربية بيع شقة بيع فيلا مجانا`;

  const descEn = searchTerm
    ? `Browse search results for "${searchTerm}" on 7agty حاجتي hagty hagti - Middle East's FREE marketplace. Sell cars, apartments, villas, phones for free with no commissions! Find properties, cars, electronics in Egypt, UAE & Saudi Arabia.`
    : categoryLabel && cityName
    ? `Find the best ${categoryLabel} for sale and rent in ${cityName}, ${govName}. Sell ${categoryLabel} for FREE on 7agty حاجتي hagty hagati - no fees, browse verified listings.`
    : categoryLabel
    ? `Discover ${categoryLabel} for sale and rent. Sell ${categoryLabel} for FREE on 7agty حاجتي hagty - no commissions. Compare prices, view photos, contact sellers directly.`
    : `7agty حاجتي hagty hagti hagaty - Middle East's FREE marketplace. Sell cars, apartments, villas, phones for free! No commissions! Browse properties, cars, electronics in Egypt, UAE & Saudi Arabia. Post your ad FREE today!`;

  const descAr = searchTerm
    ? `تصفح نتائج البحث عن "${searchTerm}" على 7agty حاجتي hagty - سوق الشرق الأوسط المجاني. بيع سيارة بيع عربية بيع شقة بيع فيلا مجانا بدون عمولة! اعثر على عقارات، سيارات، إلكترونيات في مصر والإمارات والسعودية.`
    : categoryLabel && cityName
    ? `اعثر على أفضل ${categoryLabel} للبيع والإيجار في ${cityName}، ${govName}. بيع ${categoryLabel} مجانا على 7agty حاجتي hagty - بدون رسوم، تصفح إعلانات موثوقة.`
    : categoryLabel
    ? `اكتشف ${categoryLabel} للبيع والإيجار. بيع ${categoryLabel} مجانا على 7agty حاجتي hagty hagati - بدون عمولة. قارن الأسعار، شاهد الصور، تواصل مع البائعين.`
    : `7agty حاجتي hagty hagti hagaty - سوق الشرق الأوسط المجاني. بيع سيارة بيع عربية بيع شقة بيع فيلا بيع موبايل مجانا! بدون عمولة! تصفح عقارات، سيارات، إلكترونيات في مصر والإمارات والسعودية. انشر إعلانك مجانا اليوم!`;

  // CRITICAL: Include ALL brand variations in keywords
  const keywordsEn = `${brandKeywords}, sell for free, sell car free, sell apartment free, sell villa free, sell palace free, sell phone free, sell mobile free, sell electronics free, free marketplace Egypt, free marketplace UAE, free marketplace Saudi, no fees, no commission, Middle East marketplace, Egypt online market, UAE online market, Saudi Arabia online market, ${categoryLabel ? `${categoryLabel}, ${categoryLabel} Egypt, ${categoryLabel} UAE, ${categoryLabel} Saudi Arabia, ${categoryLabel} for sale, sell ${categoryLabel} free, ` : ''}${cityName ? `${cityName} ${categoryLabel || 'properties'}, ` : ''}${govName ? `${govName} real estate, ` : ''}properties Egypt, properties UAE, properties Saudi Arabia, apartments for sale Egypt, villas for rent Egypt, cars for sale Egypt, used cars Egypt, electronics Egypt, mobiles for sale Egypt, jobs in Egypt, Cairo properties, Dubai properties, Riyadh properties`;

  const keywordsAr = `${brandKeywords}, بيع مجانا, بيع سيارة مجانا, بيع عربية مجانا, بيع شقة مجانا, بيع فيلا مجانا, بيع قصر مجانا, بيع موبايل مجانا, بيع الكترونيات مجانا, بيع سيارة, بيع عربية, بيع شقة, بيع فيلا, بيع موبايل, سوق مجاني مصر, سوق مجاني الإمارات, سوق مجاني السعودية, اعلانات مجانية, بدون عمولة, بدون رسوم, سوق مصري, سوق إماراتي, سوق سعودي, ${categoryLabel ? `${categoryLabel}, ${categoryLabel} مصر, ${categoryLabel} الإمارات, بيع ${categoryLabel} مجانا, ` : ''}${cityName ? `${categoryLabel || 'عقارات'} ${cityName}, ` : ''}${govName ? `عقارات ${govName}, ` : ''}عقارات مصر, شقق للبيع مصر, فلل للإيجار مصر, سيارات للبيع مصر, موبايلات للبيع مصر, وظائف في مصر, شقق القاهرة, عقارات دبي, عقارات الرياض`;

  return { titleEn, titleAr, descEn, descAr, keywordsEn, keywordsAr };
};
  const seoData = generateMarketplaceSEO();

  return (
    <>
      <SEO 
        title={seoData.titleEn}
        titleAr={seoData.titleAr}
        description={seoData.descEn}
        descriptionAr={seoData.descAr}
        keywords={seoData.keywordsEn}
        keywordsAr={seoData.keywordsAr}
        canonical={`https://7agty.com/marketplace${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ''}`}
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": isRTL ? seoData.titleAr : seoData.titleEn,
          "description": isRTL ? seoData.descAr : seoData.descEn,
          "url": `https://7agty.com/marketplace`,
          "provider": {
            "@type": "Organization",
            "name": "7agty حاجتي",
            "url": "https://7agty.com"
          }
        }}
      />
      <div className={`container mx-auto px-4 py-8 mt-20 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <MarketplaceSEOEnhancer
        selectedListingType={selectedListingType}
        filterCity={filterCity}
        filterGovernorate={filterGovernorate}
        searchTerm={searchTerm}
        cities={cities}
        governorates={governorates}
        listingTypes={listingTypes}
      />
              {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {isRTL ? 'السوق العقاري' : 'Property Marketplace'}
        </h1>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-6">
          <Search className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} h-4 w-4 text-gray-400`} />
          <Input
            type="text"
            placeholder={isRTL ? 'ابحث عن العقارات والمستخدمين...' : 'Search properties and users...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${isRTL ? 'pr-10 text-right' : 'pl-10'} w-full`}
          />
          
          {/* User Search Results Dropdown */}
          {showUserResults && searchUsers.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-2xl border-2 border-blue-200 max-h-96 overflow-y-auto">
              <div className={`p-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50 ${isRTL ? 'text-right' : ''}`}>
                <h3 className="font-semibold text-gray-800">
                  {isRTL ? 'نتائج البحث عن المستخدمين' : 'User Search Results'}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {isRTL ? `تم العثور على ${searchUsers.length} مستخدم` : `Found ${searchUsers.length} users`}
                </p>
              </div>
              
              {searchUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => {
                    navigate(`/profile/${user.username || user.id}`);
                    setSearchTerm('');
                    setShowUserResults(false);
                  }}
                  className={`w-full p-4 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0 ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-center gap-2 mb-1 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                        <p className="font-semibold text-gray-900 truncate">
                          {user.name}
                        </p>
                        {renderUserBadge(user)}
                      </div>
                      
                      <p className={`text-sm text-gray-600 truncate ${isRTL ? 'text-right' : ''}`}>
                        @{user.username}
                      </p>
                      
                      {user.properties_count !== undefined && user.properties_count > 0 && (
                        <div className={`flex items-center gap-1 mt-1 text-xs text-sky-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Home className="w-3 h-3" />
                          <span>
                            {user.properties_count} {isRTL ? 'عقار' : 'properties'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className={`flex-shrink-0 ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
                      <UserPlus className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                </button>
              ))}
              
              <div className="p-2 bg-gray-50 border-t">
                <button
                  onClick={() => {
                    setShowUserResults(false);
                    setSearchTerm('');
                  }}
                  className="w-full text-center text-sm text-gray-600 hover:text-gray-800 py-2"
                >
                  {isRTL ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          )}
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
              
              {Object.entries(listingTypes.listing_types).map(([key, type]: [string, any]) => {
                const Icon = getListingTypeIcon(key);
                const isSelected = selectedListingType === key;
                
                // Enhanced color schemes with gradients
                const colorSchemes: { [key: string]: { gradient: string; ring: string; border: string; hover: string } } = {
                  'property': { 
                    gradient: 'from-blue-500 via-blue-600 to-blue-700', 
                    ring: 'ring-blue-300',
                    border: 'border-blue-300',
                    hover: 'hover:border-blue-400'
                  },
                  'car': { 
                    gradient: 'from-green-500 via-green-600 to-green-700', 
                    ring: 'ring-green-300',
                    border: 'border-green-300',
                    hover: 'hover:border-green-400'
                  },
                  'electronics': { 
                    gradient: 'from-purple-500 via-purple-600 to-purple-700', 
                    ring: 'ring-purple-300',
                    border: 'border-purple-300',
                    hover: 'hover:border-purple-400'
                  },
                  'mobile': { 
                    gradient: 'from-pink-500 via-pink-600 to-pink-700', 
                    ring: 'ring-pink-300',
                    border: 'border-pink-300',
                    hover: 'hover:border-pink-400'
                  },
                  'job': { 
                    gradient: 'from-orange-500 via-orange-600 to-orange-700', 
                    ring: 'ring-orange-300',
                    border: 'border-orange-300',
                    hover: 'hover:border-orange-400'
                  },
                  'vehicle_booking': { 
                    gradient: 'from-cyan-500 via-cyan-600 to-cyan-700', 
                    ring: 'ring-cyan-300',
                    border: 'border-cyan-300',
                    hover: 'hover:border-cyan-400'
                  },
                  'doctor_booking': { 
                    gradient: 'from-red-500 via-red-600 to-red-700', 
                    ring: 'ring-red-300',
                    border: 'border-red-300',
                    hover: 'hover:border-red-400'
                  }
                };
                
                const colors = colorSchemes[key] || colorSchemes['property'];
                
                return (
                  <button
                    key={key}
                    ref={(el) => (listingTypeButtonRefs.current[key] = el)}
                    onClick={() => {
                      setSelectedListingType(key);
                      // Reset category-specific filters when switching types
                      if (key !== 'car') {
                        setFilterCarMake('all');
                        setFilterCarModel('all');
                        setFilterCarCondition('all');
                        setFilterCarYear('');
                      }
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-medium transition-all duration-300 transform ${
                      isSelected
                        ? `bg-gradient-to-r ${colors.gradient} text-white shadow-xl scale-105 ring-4 ${colors.ring} ring-offset-2`
                        : `bg-white text-gray-700 hover:bg-gradient-to-r hover:${colors.gradient} hover:text-white hover:scale-105 border-2 ${colors.border} ${colors.hover} shadow-md hover:shadow-lg`
                    }`}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-sm md:text-base font-semibold whitespace-nowrap">{isRTL ? type.name_ar : type.name_en}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

{/* Filters */}
<div className="bg-white rounded-lg shadow-md p-6 mb-8">
  <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
    <Filter className="w-5 h-5 text-sky-600" />
    <h3 className="text-lg font-semibold">{isRTL ? 'فلترة حسب' : 'Filter By'}</h3>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
    {/* Sort By */}
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
            {countryGovernorates.map((gov) => (
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
            {governorateCities.map((city) => (
              <SelectItem key={city.id} value={String(city.id)}>
                {isRTL ? city.name_ar : city.name_en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )}

    {/* Property Type - Only show for property listing type, NOT for "all" */}
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

    {/* Bedrooms Filter - Only show for property listing type with specific categories */}
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

    {/* Area Filter - Show for property listing type only, NOT for "all" */}
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

    {/* Car Make - Only show for car listing type */}
    {selectedListingType === 'car' && !carMakesLoading && carMakes && carMakes.length > 0 && (
      <div>
        <label className="block text-sm font-medium mb-2">
          {isRTL ? 'ماركة السيارة' : 'Car Make'}
        </label>
        <Select value={filterCarMake} onValueChange={(value) => {
          setFilterCarMake(value);
          setFilterCarModel('all'); // Reset model when make changes
        }}>
          <SelectTrigger className={isRTL ? 'text-right' : ''}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{isRTL ? 'كل الماركات' : 'All Makes'}</SelectItem>
            {[...carMakes].sort((a, b) => a.name.localeCompare(b.name)).map((make) => (
              <SelectItem key={make.name} value={make.name}>
                {make.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )}

    {/* Car Model - Only show when a make is selected */}
    {selectedListingType === 'car' && filterCarMake !== 'all' && (
      <div>
        <label className="block text-sm font-medium mb-2">
          {isRTL ? 'موديل السيارة' : 'Car Model'}
        </label>
        <Select 
          value={filterCarModel} 
          onValueChange={setFilterCarModel}
          disabled={carModelsLoading}
        >
          <SelectTrigger className={isRTL ? 'text-right' : ''}>
            <SelectValue placeholder={carModelsLoading ? (isRTL ? 'جاري التحميل...' : 'Loading...') : (isRTL ? 'اختر الموديل' : 'Select Model')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{isRTL ? 'كل الموديلات' : 'All Models'}</SelectItem>
            {carModels && [...carModels].sort((a, b) => a.localeCompare(b)).map((model: string) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )}

    {/* Car Condition - Only show for car listing type */}
    {selectedListingType === 'car' && (
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
            <SelectItem value="new">{isRTL ? 'جديدة' : 'New'}</SelectItem>
            <SelectItem value="used">{isRTL ? 'مستعملة' : 'Used'}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )}

    {/* Car Year - Only show for car listing type */}
    {selectedListingType === 'car' && (
      <div>
        <label className="block text-sm font-medium mb-2">
          {isRTL ? 'سنة الصنع' : 'Year'}
        </label>
        <Input
          type="text"
          placeholder={isRTL ? 'مثل: 2020' : 'e.g., 2020'}
          value={filterCarYear}
          onChange={(e) => setFilterCarYear(e.target.value)}
          className={isRTL ? 'text-right' : ''}
        />
      </div>
    )}

    {/* Electronics Type - Only show for electronics listing type */}
    {selectedListingType === 'electronics' && !electronicsLoading && electronicsTypes && Object.keys(electronicsTypes).length > 0 && (
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
            {Object.entries(electronicsTypes).map(([key, type]: [string, any]) => (
              <SelectItem key={key} value={key}>
                {type.icon} {isRTL ? type.name_ar : type.name_en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )}

    {/* Mobile Brand - Only show for mobile listing type */}
    {selectedListingType === 'mobile' && !mobileBrandsLoading && mobileBrands && Object.keys(mobileBrands).length > 0 && (
      <div>
        <label className="block text-sm font-medium mb-2">
          {isRTL ? 'العلامة التجارية' : 'Brand'}
        </label>
        <Select value={filterMobileBrand} onValueChange={(value) => {
          setFilterMobileBrand(value);
          setFilterMobileModel('all');
        }}>
          <SelectTrigger className={isRTL ? 'text-right' : ''}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{isRTL ? 'كل العلامات' : 'All Brands'}</SelectItem>
            {Object.entries(mobileBrands).map(([key, brand]: [string, any]) => (
              <SelectItem key={key} value={key}>
                {brand.logo} {isRTL ? brand.name_ar : brand.name_en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )}

    {/* Mobile Model - Only show when brand is selected */}
    {selectedListingType === 'mobile' && filterMobileBrand !== 'all' && (
      <div>
        <label className="block text-sm font-medium mb-2">
          {isRTL ? 'الموديل' : 'Model'}
        </label>
        <Select value={filterMobileModel} onValueChange={setFilterMobileModel} disabled={mobileModelsLoading}>
          <SelectTrigger className={isRTL ? 'text-right' : ''}>
            <SelectValue placeholder={mobileModelsLoading ? (isRTL ? 'جاري التحميل...' : 'Loading...') : undefined} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{isRTL ? 'كل الموديلات' : 'All Models'}</SelectItem>
            {mobileModels && mobileModels.map((model: string) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )}

    {/* Item Condition - Show for electronics and mobile */}
    {(selectedListingType === 'electronics' || selectedListingType === 'mobile') && !conditionLoading && itemCondition && Object.keys(itemCondition).length > 0 && (
      <div>
        <label className="block text-sm font-medium mb-2">
          {isRTL ? 'الحالة' : 'Condition'}
        </label>
        <Select value={filterItemCondition} onValueChange={setFilterItemCondition}>
          <SelectTrigger className={isRTL ? 'text-right' : ''}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{isRTL ? 'كل الحالات' : 'All Conditions'}</SelectItem>
            {Object.entries(itemCondition).map(([key, cond]: [string, any]) => (
              <SelectItem key={key} value={key}>
                {isRTL ? cond.name_ar : cond.name_en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )}

    {/* Job Type - Only show for job listing type */}
    {selectedListingType === 'job' && !jobTypesLoading && jobTypes && Object.keys(jobTypes).length > 0 && (
      <div>
        <label className="block text-sm font-medium mb-2">
          {isRTL ? 'فئة الوظيفة' : 'Job Category'}
        </label>
        <Select value={filterJobType} onValueChange={setFilterJobType}>
          <SelectTrigger className={isRTL ? 'text-right' : ''}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{isRTL ? 'كل الفئات' : 'All Categories'}</SelectItem>
            {Object.entries(jobTypes).map(([key, type]: [string, any]) => (
              <SelectItem key={key} value={key}>
                {type.icon} {isRTL ? type.name_ar : type.name_en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )}

    {/* Job Work Type - Only show for job listing type */}
    {selectedListingType === 'job' && !jobWorkTypesLoading && jobWorkTypes && Object.keys(jobWorkTypes).length > 0 && (
      <div>
        <label className="block text-sm font-medium mb-2">
          {isRTL ? 'نوع الدوام' : 'Work Type'}
        </label>
        <Select value={filterJobWorkType} onValueChange={setFilterJobWorkType}>
          <SelectTrigger className={isRTL ? 'text-right' : ''}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{isRTL ? 'كل الأنواع' : 'All Types'}</SelectItem>
            {Object.entries(jobWorkTypes).map(([key, type]: [string, any]) => (
              <SelectItem key={key} value={key}>
                {isRTL ? type.name_ar : type.name_en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )}

    {/* Job Location Type - Only show for job listing type */}
    {selectedListingType === 'job' && !jobLocationTypesLoading && jobLocationTypes && Object.keys(jobLocationTypes).length > 0 && (
      <div>
        <label className="block text-sm font-medium mb-2">
          {isRTL ? 'نوع العمل' : 'Location Type'}
        </label>
        <Select value={filterJobLocationType} onValueChange={setFilterJobLocationType}>
          <SelectTrigger className={isRTL ? 'text-right' : ''}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{isRTL ? 'كل الأنواع' : 'All Types'}</SelectItem>
            {Object.entries(jobLocationTypes).map(([key, type]: [string, any]) => (
              <SelectItem key={key} value={key}>
                {isRTL ? type.name_ar : type.name_en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )}

    {/* Vehicle Type - Only show for vehicle_booking listing type */}
    {selectedListingType === 'vehicle_booking' && !vehicleTypesLoading && vehicleTypes && Object.keys(vehicleTypes).length > 0 && (
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
            {Object.entries(vehicleTypes).map(([key, type]: [string, any]) => (
              <SelectItem key={key} value={key}>
                {type.icon} {isRTL ? type.name_ar : type.name_en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )}

    {/* Vehicle Rental Option - Only show for vehicle_booking listing type */}
    {selectedListingType === 'vehicle_booking' && !vehicleRentalLoading && vehicleRentalOptions && Object.keys(vehicleRentalOptions).length > 0 && (
      <div>
        <label className="block text-sm font-medium mb-2">
          {isRTL ? 'خيار الإيجار' : 'Rental Option'}
        </label>
        <Select value={filterVehicleRentalOption} onValueChange={setFilterVehicleRentalOption}>
          <SelectTrigger className={isRTL ? 'text-right' : ''}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{isRTL ? 'كل الخيارات' : 'All Options'}</SelectItem>
            {Object.entries(vehicleRentalOptions).map(([key, option]: [string, any]) => (
              <SelectItem key={key} value={key}>
                {isRTL ? option.name_ar : option.name_en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )}

    {/* Doctor Specialty - Only show for doctor_booking listing type */}
    {selectedListingType === 'doctor_booking' && !doctorSpecialtiesLoading && doctorSpecialties && Object.keys(doctorSpecialties).length > 0 && (
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
            {Object.entries(doctorSpecialties).map(([key, specialty]: [string, any]) => (
              <SelectItem key={key} value={key}>
                {specialty.icon} {isRTL ? specialty.name_ar : specialty.name_en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )}

    {/* Booking Type - Only show for doctor_booking listing type */}
    {selectedListingType === 'doctor_booking' && !bookingTypesLoading && bookingTypes && Object.keys(bookingTypes).length > 0 && (
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
            {Object.entries(bookingTypes).map(([key, type]: [string, any]) => (
              <SelectItem key={key} value={key}>
                {isRTL ? type.name_ar : type.name_en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )}

    {/* Rent or Buy - Only show for property and car, NOT for "all" */}
    {(selectedListingType === 'property' || selectedListingType === 'car') && (
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

  {/* Price Range Filter */}
  <div className="mb-4">
    <label className="block text-sm font-medium mb-3">
      {isRTL ? 'نطاق السعر' : 'Price Range'}
    </label>
    
    <div className="mb-4">
      <Select value={priceRangeType} onValueChange={handlePriceRangeTypeChange}>
        <SelectTrigger className={`w-full ${isRTL ? 'text-right' : ''}`}>
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
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <div className="font-semibold">{new Intl.NumberFormat('en-US').format(priceRange[0])}</div>
          <div className="text-xs text-gray-400">{isRTL ? 'جنيه' : 'EGP'}</div>
        </div>
        <div className={isRTL ? 'text-left' : 'text-right'}>
          <div className="font-semibold">{new Intl.NumberFormat('en-US').format(priceRange[1])}</div>
          <div className="text-xs text-gray-400">{isRTL ? 'جنيه' : 'EGP'}</div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sortedProperties.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">{isRTL ? 'لا توجد عقارات' : 'No Properties Found'}</p>
          </div>
        ) : (
          sortedProperties.map((property) => (
            <Card 
              key={property.id}
              ref={(el) => (propertyRefs.current[property.id] = el)}
              className="overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="relative cursor-pointer" onClick={() => handlePropertyClick(property.id)}>
                <img
                  src={getImageUrl(property.images[0])}
                  alt={property.title}
                  className="w-full h-56 object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-sky-600 text-white">
                  {property.rent_or_buy === 'rent' ? (isRTL ? 'إيجار' : 'Rent') : (isRTL ? 'شراء' : 'Buy')}
                </Badge>
              </div>
              
             <CardHeader 
  className="cursor-pointer hover:bg-gray-50 transition-colors" 
  onClick={() => handlePropertyClick(property.id)}
>
  <CardTitle className="text-base hover:text-sky-600 transition-colors">
    {property.title}
  </CardTitle>
  
  {/* Publisher Info */}
  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
    <User className="w-4 h-4" />
    <span className="font-medium">{property.user_name}</span>
    {property.username && (
      <span className="text-gray-500">@{property.username}</span>
    )}
  </div>
  
  {/* Car-specific details - Show prominently below title */}
  {property.listing_type === 'car' && (property.car_make || property.car_model || property.car_year || property.car_condition) && (
    <div className="flex items-center gap-2 mt-2 flex-wrap">
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
    <div className="flex items-center gap-2 mt-2 flex-wrap">
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
    <div className="flex items-center gap-2 mt-2 flex-wrap">
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
    <div className="flex items-center gap-2 mt-2 flex-wrap">
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
    <div className="flex items-center gap-2 mt-2 flex-wrap">
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
    <div className="flex items-center gap-2 mt-2 flex-wrap">
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
    <div className="flex items-center gap-2 mt-2 flex-wrap">
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
              
              <CardContent className="space-y-3">
                <p className="text-gray-600 text-sm line-clamp-2">{property.description}</p>
                
                {/* Additional Car details */}
                {property.listing_type === 'car' && property.car_condition && (
                  <div className="flex items-center gap-2 flex-wrap">
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
                  <div className="flex items-center gap-2">
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
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {property.job_location_type === 'remote' ? (isRTL ? 'عن بعد' : 'Remote') :
                       property.job_location_type === 'on_site' ? (isRTL ? 'في الموقع' : 'On-Site') :
                       property.job_location_type === 'hybrid' ? (isRTL ? 'هجين' : 'Hybrid') :
                       property.job_location_type}
                    </Badge>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>{property.location_city}, {property.location_governorate}, {property.location_country}</span>
                </div>
                
                <div className="flex items-center gap-2 pt-2 border-t">
                  <DollarSign className="w-5 h-5 text-sky-600" />
                  <span className="text-xl font-bold text-sky-600">
                    {formatPrice(property.price, property.rent_or_buy)}
                  </span>
                </div>
              </CardContent>
              
         <CardFooter className="flex flex-col gap-2 p-4 bg-gray-50">
  {/* Row 1: Action Buttons */}
  <div className="flex w-full gap-2">
    {/* View Details Button */}
    <Button 
      onClick={() => handlePropertyClick(property.id)}
      variant="outline" 
      className="flex-1 bg-white hover:bg-gray-100"
    >
      <Eye className="w-4 h-4 mr-2" />
      {isRTL ? 'عرض التفاصيل' : 'View Details'}
    </Button>
    
    {/* Chat Button */}
    <ChatButton
      userId={property.user_id}
      userName={property.user_name}
      className="flex-1"
    />
  </div>

  {/* Row 2: Phone Number Section */}
  <div className="w-full">
    {showPhoneForProperty === property.id ? (
      <div className="flex gap-2">
        <Button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => window.location.href = `tel:${property.user_phone}`}
        >
          <Phone className="w-4 h-4 mr-2" />
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
        <Phone className="w-4 h-4 mr-2" />
        {isRTL ? 'إظهار رقم الهاتف' : 'Show Phone Number'}
      </Button>
    )}
  </div>

  {/* Row 3: Comments and Share */}
  <div className="flex w-full gap-2">
    {/* Comments Button */}
    <Button
      onClick={() => setShowCommentsFor(property.id)}
      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      {isRTL ? 'تعليقات' : 'Comments'}
      {property.totalComments !== undefined && property.totalComments > 0 && (
        <Badge className="ml-2 bg-white/20 text-white">
          {property.totalComments}
        </Badge>
      )}
    </Button>
    
    {/* Share Button */}
    <SharePropertyButton
      property={property}
      className="flex-1"
      variant="outline"
    />
  </div>
</CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* PropertyComments Modal */}
      <PropertyComments
        propertyId={showCommentsFor}
        isOpen={showCommentsFor !== null}
        onClose={() => setShowCommentsFor(null)}
      />
    </div>
    </>
  );
};

export default Marketplace;