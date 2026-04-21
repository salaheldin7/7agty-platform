import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, CloudUpload, Home, MapPin, Trash2, Info, Loader2, Image as ImageIcon, DollarSign, ArrowRight, AlertCircle, X, Car, Tv, Smartphone, Briefcase, Truck, Stethoscope } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { API_URL } from '@/config/api';
import { useListingTypes, useCarMakes, useCarModels, useElectronicsTypes, useItemCondition, useMobileBrands, useMobileModels, useJobTypes, useJobWorkTypes, useJobLocationTypes, useVehicleTypes, useVehicleRentalOptions, useDoctorSpecialties, useBookingTypes } from '@/hooks/useListingTypes';
import { useCountries, useCountryGovernorates, useGovernorateCities } from '@/hooks/useCountries';
import ListingTypeSelector from '@/components/listings/ListingTypeSelector';
import CountrySelector from '@/components/selectors/CountrySelector';
import CarMakeSelector from '@/components/selectors/CarMakeSelector';
import CarModelSelector from '@/components/selectors/CarModelSelector';
import MobileModelSelector from '@/components/selectors/MobileModelSelector';

interface PropertyForm {
  title: string;
  description: string;
  price: string;
  location_governorate: string;
  location_city: string;
  category: string;
  rent_or_buy: string;
  bedrooms?: string;
  bathrooms?: string;
  area?: string;
  images: File[];
  // Multi-category fields
  listing_type: string;
  country_id: string;
  // Car fields
  car_make?: string;
  car_model?: string;
  car_year?: string;
  car_condition?: string;
  car_mileage?: string;
  car_transmission?: string;
  car_fuel_type?: string;
  // Electronics fields
  electronics_type?: string;
  electronics_brand?: string;
  electronics_condition?: string;
  // Mobile fields
  mobile_brand?: string;
  mobile_model?: string;
  mobile_storage?: string;
  mobile_condition?: string;
  // Item condition (electronics & mobile)
  item_condition?: string;
  // Job fields
  job_type?: string;
  job_work_type?: string;
  job_location_type?: string;
  job_employment_type?: string;
  job_experience_level?: string;
  job_salary_min?: string;
  job_salary_max?: string;
  // Vehicle booking fields
  vehicle_type?: string;
  vehicle_rental_option?: string;
  vehicle_rental_duration?: string;
  vehicle_with_driver?: boolean;
  // Doctor booking fields
  doctor_specialty?: string;
  booking_type?: string;
}

interface Location {
  id: number | string;
  name_en: string;
  name_ar: string;
}

interface Governorate extends Location {
  cities?: City[];
}

interface City extends Location {
  governorate_id: number | string;
}

interface ExistingImage {
  id: number;
  url: string;
}

const AddProperty = () => {
  const [searchParams] = useSearchParams();
  const editPropertyId = searchParams.get('edit');
  const isEditMode = !!editPropertyId;
  const isInitialLoadRef = useRef(true);

  // Fetch listing data from API
  const { listingTypes, loading: typesLoading } = useListingTypes();
  const { countries, loading: countriesLoading } = useCountries();
  const { carMakes, loading: carMakesLoading } = useCarMakes();
  
  // Fetch all selector data
  const { electronicsTypes, loading: electronicsLoading } = useElectronicsTypes();
  const { itemCondition, loading: conditionLoading } = useItemCondition();
  const { mobileBrands, loading: mobileBrandsLoading } = useMobileBrands();
  const { jobTypes, loading: jobTypesLoading } = useJobTypes();
  const { jobWorkTypes, loading: jobWorkTypesLoading } = useJobWorkTypes();
  const { jobLocationTypes, loading: jobLocationTypesLoading } = useJobLocationTypes();
  const { vehicleTypes, loading: vehicleTypesLoading } = useVehicleTypes();
  const { vehicleRentalOptions, loading: vehicleRentalLoading } = useVehicleRentalOptions();
  const { doctorSpecialties, loading: doctorSpecialtiesLoading } = useDoctorSpecialties();
  const { bookingTypes, loading: bookingTypesLoading } = useBookingTypes();

  const [form, setForm] = useState<PropertyForm>({
    title: "",
    description: "",
    price: "",
    location_governorate: "",
    location_city: "",
    category: "",
    rent_or_buy: "buy",
    bedrooms: "",
    bathrooms: "",
    area: "",
    images: [],
    // Multi-category defaults
    listing_type: "property",
    country_id: "1", // Egypt by default
    // Car defaults
    car_make: "",
    car_model: "",
    car_year: "",
    car_condition: "",
    car_mileage: "",
    car_transmission: "",
    car_fuel_type: "",
    // Electronics defaults
    electronics_type: "",
    electronics_brand: "",
    electronics_condition: "",
    // Mobile defaults
    mobile_brand: "",
    mobile_model: "",
    mobile_storage: "",
    mobile_condition: "",
    // Item condition default
    item_condition: "",
    // Job defaults
    job_type: "",
    job_work_type: "",
    job_location_type: "",
    job_employment_type: "",
    job_experience_level: "",
    job_salary_min: "",
    job_salary_max: "",
    // Vehicle booking defaults
    vehicle_type: "",
    vehicle_rental_option: "",
    vehicle_rental_duration: "",
    vehicle_with_driver: false,
    // Doctor booking defaults
    doctor_specialty: "",
    booking_type: ""
  });
  
  // Fetch governorates based on selected country (must be after form state)
  const countryIdNumber = form.country_id ? parseInt(form.country_id) : null;
  const { governorates: countryGovernorates, loading: governoratesLoading } = useCountryGovernorates(countryIdNumber);
  
  // Fetch cities based on selected governorate (must be after form state)
  const governorateIdNumber = form.location_governorate ? parseInt(form.location_governorate) : null;
  const { cities: governorateCities, loading: citiesLoading } = useGovernorateCities(governorateIdNumber);
  
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof PropertyForm, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isRTL } = useLanguage();

  // Mock governorates and cities data
  const mockGovernorates: Governorate[] = [
    {
      id: '1',
      name_en: 'Cairo',
      name_ar: 'القاهرة',
      cities: [
        { id: '1-1', name_en: 'New Cairo', name_ar: 'القاهرة الجديدة', governorate_id: '1' },
        { id: '1-2', name_en: 'Nasr City', name_ar: 'مدينة نصر', governorate_id: '1' },
        { id: '1-3', name_en: 'Maadi', name_ar: 'المعادي', governorate_id: '1' },
        { id: '1-4', name_en: 'Heliopolis', name_ar: 'مصر الجديدة', governorate_id: '1' }
      ]
    },
    {
      id: '2',
      name_en: 'Alexandria',
      name_ar: 'الإسكندرية',
      cities: [
        { id: '2-1', name_en: 'Sidi Gaber', name_ar: 'سيدي جابر', governorate_id: '2' },
        { id: '2-2', name_en: 'Montazah', name_ar: 'المنتزه', governorate_id: '2' },
        { id: '2-3', name_en: 'Miami', name_ar: 'ميامي', governorate_id: '2' },
        { id: '2-4', name_en: 'Stanley', name_ar: 'ستانلي', governorate_id: '2' }
      ]
    },
    {
      id: '3',
      name_en: 'Giza',
      name_ar: 'الجيزة',
      cities: [
        { id: '3-1', name_en: '6th October', name_ar: '6 أكتوبر', governorate_id: '3' },
        { id: '3-2', name_en: 'Sheikh Zayed', name_ar: 'الشيخ زايد', governorate_id: '3' },
        { id: '3-3', name_en: 'Dokki', name_ar: 'الدقي', governorate_id: '3' },
        { id: '3-4', name_en: 'Mohandessin', name_ar: 'المهندسين', governorate_id: '3' }
      ]
    }
  ];

  // Cleanup image preview URLs on unmount only
  useEffect(() => {
    return () => {
      imagePreviewUrls.forEach(url => {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {
          console.error('Error revoking URL:', e);
        }
      });
    };
  }, []);

  // Load governorates and cities
  useEffect(() => {
    const loadLocations = async () => {
      try {
        const govResponse = await fetch(`${API_URL}/governorates`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });

        if (govResponse.ok) {
          const govData = await govResponse.json();
          
          if (govData.success && govData.data) {
            setGovernorates(govData.data);
          } else {
            setGovernorates(mockGovernorates);
          }
        } else {
          setGovernorates(mockGovernorates);
          const allCities = mockGovernorates.flatMap(gov => gov.cities || []);
          setCities(allCities);
        }
      } catch (error) {
        console.error("Failed to fetch locations:", error);
        setGovernorates(mockGovernorates);
        const allCities = mockGovernorates.flatMap(gov => gov.cities || []);
        setCities(allCities);
      }
    };
    
    loadLocations();
  }, []);

  // Load property data when in edit mode
  useEffect(() => {
    const loadPropertyData = async () => {
      if (!isEditMode || !editPropertyId) return;

      const token = localStorage.getItem('auth_token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/properties/${editPropertyId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load property');
        }

        const data = await response.json();
        const property = data.success ? data.data : data;

        setForm({
          title: property.title || "",
          description: property.description || "",
          price: property.price?.toString() || "",
          location_governorate: property.governorate_id?.toString() || property.governorate?.id?.toString() || "",
          location_city: property.city_id?.toString() || property.city?.id?.toString() || "",
          category: property.category || "",
          rent_or_buy: property.rent_or_buy || "buy",
          bedrooms: property.bedrooms?.toString() || "",
          bathrooms: property.bathrooms?.toString() || "",
          area: property.area?.toString() || "",
          images: [],
          // Multi-category fields
          listing_type: property.listing_type || "property",
          country_id: property.country_id?.toString() || "1",
          // Car fields
          car_make: property.car_make || "",
          car_model: property.car_model || "",
          car_year: property.car_year?.toString() || "",
          car_condition: property.car_condition || "",
          car_mileage: property.car_mileage?.toString() || "",
          car_transmission: property.car_transmission || "",
          car_fuel_type: property.car_fuel_type || "",
          // Electronics fields
          electronics_type: property.electronics_type || "",
          electronics_brand: property.electronics_brand || "",
          electronics_condition: property.electronics_condition || "",
          electronics_warranty: property.electronics_warranty?.toString() || "",
          item_condition: property.item_condition || "",
          // Mobile fields
          mobile_brand: property.mobile_brand || "",
          mobile_model: property.mobile_model || "",
          mobile_storage: property.mobile_storage || "",
          mobile_color: property.mobile_color || "",
          mobile_condition: property.mobile_condition || "",
          // Job fields
          job_type: property.job_type || "",
          job_work_type: property.job_work_type || "",
          job_location_type: property.job_location_type || "",
          job_experience_level: property.job_experience_level || "",
          job_employment_type: property.job_employment_type || "",
          job_salary_min: property.job_salary_min?.toString() || "",
          job_salary_max: property.job_salary_max?.toString() || "",
          // Vehicle booking fields
          vehicle_type: property.vehicle_type || "",
          vehicle_with_driver: property.vehicle_with_driver?.toString() || "",
          vehicle_rental_duration: property.vehicle_rental_duration || "",
          // Doctor booking fields
          booking_type: property.booking_type || "",
          doctor_specialty: property.doctor_specialty || "",
          doctor_name: property.doctor_name || "",
          clinic_hospital_name: property.clinic_hospital_name || "",
          available_days: property.available_days || "",
          available_hours: property.available_hours || "",
        });

        // Load existing images properly
        if (property.images && Array.isArray(property.images) && property.images.length > 0) {
          console.log('Loading existing images:', property.images);
          // Convert images array to proper format with IDs
          const imagesWithIds = property.images.map((img: any, index: number) => {
            if (typeof img === 'string') {
              // If it's just a URL string, create a temporary ID
              return { id: -(index + 1), url: img }; // Negative IDs for local tracking
            } else if (img.id && img.url) {
              // If it's an object with id and url
              return { id: img.id, url: img.url };
            } else if (img.image_path) {
              // If using image_path field
              return { id: img.id || -(index + 1), url: img.image_path };
            }
            return null;
          }).filter(Boolean);
          
          setExistingImages(imagesWithIds);
        } else {
          setExistingImages([]);
        }

      } catch (error) {
        console.error('Error loading property:', error);
        toast({
          title: isRTL ? "خطأ" : "Error",
          description: isRTL ? "فشل في تحميل بيانات العقار" : "Failed to load property data",
          variant: "destructive",
        });
        navigate('/my-ads');
      } finally {
        setLoading(false);
      }
    };

    loadPropertyData();
  }, [isEditMode, editPropertyId, navigate, toast, isRTL]);

  // Update cities when governorate changes
  useEffect(() => {
    const loadCities = async () => {
      if (form.location_governorate) {
        try {
          const response = await fetch(`${API_URL}/governorates/${form.location_governorate}/cities`, {
            method: "GET",
            headers: {
              "Accept": "application/json",
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data) {
              setCities(data.data);
            } else {
              setCities([]);
            }
          } else {
            const selectedGovernorate = governorates.find(g => String(g.id) === form.location_governorate);
            if (selectedGovernorate && selectedGovernorate.cities) {
              setCities(selectedGovernorate.cities);
            } else {
              setCities([]);
            }
          }
        } catch (error) {
          console.error("Failed to fetch cities:", error);
          setCities([]);
        }
        
        if (!isEditMode || !isInitialLoadRef.current) {
          setForm(prev => ({...prev, location_city: ""}));
        } else {
          isInitialLoadRef.current = false;
        }
      } else {
        setCities([]);
      }
    };
    
    loadCities();
  }, [form.location_governorate, governorates, isEditMode]);

  const handleChange = (name: keyof PropertyForm, value: string) => {
    setForm(prev => ({...prev, [name]: value}));
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: undefined}));
    }
    if (serverError) {
      setServerError(null);
    }
  };

  // Format number with commas
  const formatNumberWithCommas = (value: string): string => {
    // Remove all non-digit characters
    const cleanValue = value.replace(/\D/g, '');
    // Add commas for thousands
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Handle price change with comma formatting
  const handlePriceChange = (value: string) => {
    // Remove commas for storage
    const cleanValue = value.replace(/,/g, '');
    // Only allow numbers
    if (cleanValue === '' || /^\d+$/.test(cleanValue)) {
      handleChange("price", cleanValue);
    }
  };

 const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      console.log('📸 Files selected:', filesArray.length);
      
      // Validate file types
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      const invalidFiles = filesArray.filter(file => !validTypes.includes(file.type));
      
      if (invalidFiles.length > 0) {
        toast({
          title: isRTL ? "نوع ملف غير صالح" : "Invalid file type",
          description: isRTL 
            ? "يرجى تحميل صور فقط (JPG, PNG, GIF, WebP)"
            : "Please upload images only (JPG, PNG, GIF, WebP)",
          variant: "destructive"
        });
        return;
      }

      // Validate file sizes (max 5MB per file)
      const maxSize = 5 * 1024 * 1024; // 5MB
      const oversizedFiles = filesArray.filter(file => file.size > maxSize);
      
      if (oversizedFiles.length > 0) {
        toast({
          title: isRTL ? "حجم الملف كبير جداً" : "File size too large",
          description: isRTL 
            ? "الحد الأقصى لحجم الصورة هو 5 ميجابايت"
            : "Maximum image size is 5MB",
          variant: "destructive"
        });
        return;
      }
      
      const totalImages = existingImages.length + form.images.length + filesArray.length;
      if (totalImages > 5) {
        const remaining = 5 - existingImages.length - form.images.length;
        toast({
          title: isRTL ? "الحد الأقصى للصور هو 5" : "Maximum 5 images allowed",
          description: isRTL 
            ? `لديك ${existingImages.length + form.images.length} صور بالفعل. يمكنك إضافة ${remaining} فقط.`
            : `You already have ${existingImages.length + form.images.length} images. You can add ${remaining} more.`,
          variant: "destructive"
        });
        return;
      }
      
      // Create preview URLs for new images
      const newImagePreviewUrls: string[] = [];
      
      filesArray.forEach((file, idx) => {
        try {
          const url = URL.createObjectURL(file);
          newImagePreviewUrls.push(url);
          console.log(`✅ Created preview URL ${idx + 1}:`, url);
        } catch (error) {
          console.error(`❌ Error creating URL for file ${idx + 1}:`, error);
        }
      });
      
      console.log('📊 Preview URLs created:', newImagePreviewUrls.length);
      
      setImagePreviewUrls(prev => {
        const updated = [...prev, ...newImagePreviewUrls];
        console.log('📊 Total preview URLs:', updated.length);
        return updated;
      });
      
      setForm(prev => ({
        ...prev,
        images: [...prev.images, ...filesArray]
      }));
      
      if (errors.images) {
        setErrors(prev => ({...prev, images: undefined}));
      }

      // Reset the file input
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    console.log('Removing new image at index:', index);
    
    const newImages = [...form.images];
    newImages.splice(index, 1);
    
    const newImagePreviewUrls = [...imagePreviewUrls];
    try {
      URL.revokeObjectURL(newImagePreviewUrls[index]);
    } catch (e) {
      console.error('Error revoking URL:', e);
    }
    newImagePreviewUrls.splice(index, 1);
    
    setForm(prev => ({...prev, images: newImages}));
    setImagePreviewUrls(newImagePreviewUrls);

    console.log('After removal:', {
      newImagesCount: newImages.length,
      previewUrlsCount: newImagePreviewUrls.length
    });
  };

  const removeExistingImage = (index: number) => {
    console.log('Removing existing image at index:', index);
    
    const newExistingImages = [...existingImages];
    const removedImage = newExistingImages.splice(index, 1)[0];
    setExistingImages(newExistingImages);

    console.log('Removed existing image:', removedImage.url);
    console.log('Remaining existing images:', newExistingImages.length);
    
    toast({
      title: isRTL ? "تم حذف الصورة" : "Image removed",
      description: isRTL 
        ? "سيتم حذف الصورة عند حفظ التعديلات"
        : "Image will be deleted when you save changes",
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PropertyForm, string>> = {};
    
    if (!form.title.trim()) {
      newErrors.title = isRTL ? "يرجى إدخال العنوان" : "Please enter a title";
    } else if (form.title.trim().length < 5) {
      newErrors.title = isRTL ? "العنوان قصير جداً (5 أحرف على الأقل)" : "Title too short (minimum 5 characters)";
    }
    
    if (!form.description.trim()) {
      newErrors.description = isRTL ? "يرجى إدخال الوصف" : "Please enter a description";
    } else if (form.description.trim().length < 20) {
      newErrors.description = isRTL ? "الوصف قصير جداً (20 حرف على الأقل)" : "Description too short (minimum 20 characters)";
    }
    
    if (!form.price.trim()) {
      newErrors.price = isRTL ? "يرجى إدخال سعر العقار" : "Please enter a property price";
    } else if (isNaN(Number(form.price)) || Number(form.price) <= 0) {
      newErrors.price = isRTL ? "يرجى إدخال سعر صالح" : "Please enter a valid price";
    }
    
    if (!form.location_governorate) {
      newErrors.location_governorate = isRTL ? "يرجى اختيار المحافظة" : "Please select a governorate";
    }
    
    if (!form.location_city) {
      newErrors.location_city = isRTL ? "يرجى اختيار المدينة" : "Please select a city";
    }
    
    // Validate category only for property listing type
    if (form.listing_type === 'property' && !form.category) {
      newErrors.category = isRTL ? "يرجى اختيار نوع العقار" : "Please select a property type";
    }
    
    // Validate property-specific required fields (area and bedrooms)
    if (form.listing_type === 'property') {
      if (!form.area || Number(form.area) <= 0) {
        newErrors.area = isRTL ? "يرجى إدخال المساحة" : "Please enter area";
      }
      if (!form.bedrooms || form.bedrooms === '') {
        newErrors.bedrooms = isRTL ? "يرجى إدخال عدد غرف النوم" : "Please enter number of bedrooms";
      }
    }
    
    // Validate car-specific fields when listing_type is 'car'
    if (form.listing_type === 'car') {
      if (!form.car_make) {
        newErrors.car_make = isRTL ? "يرجى اختيار ماركة السيارة" : "Please select car make";
      }
      if (!form.car_model) {
        newErrors.car_model = isRTL ? "يرجى اختيار موديل السيارة" : "Please select car model";
      }
      if (!form.car_year) {
        newErrors.car_year = isRTL ? "يرجى إدخال سنة الصنع" : "Please enter car year";
      }
      if (!form.car_condition) {
        newErrors.car_condition = isRTL ? "يرجى اختيار حالة السيارة" : "Please select car condition";
      }
    }
    
    // Only validate rent_or_buy for property and car listings
    if ((form.listing_type === 'property' || form.listing_type === 'car') && !form.rent_or_buy) {
      newErrors.rent_or_buy = isRTL ? "يرجى اختيار نوع العرض" : "Please select listing type";
    }
    
    if (form.images.length === 0 && existingImages.length === 0) {
      newErrors.images = isRTL ? "يرجى تحميل صورة واحدة على الأقل" : "Please upload at least one image";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0] as keyof PropertyForm;
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      toast({
        title: isRTL ? "خطأ في النموذج" : "Form Error",
        description: isRTL ? "يرجى تصحيح الأخطاء في النموذج" : "Please correct the errors in the form",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    setServerError(null);

    const token = localStorage.getItem("auth_token");
    if (!token) {
      toast({
        title: isRTL ? "غير مصرح" : "Unauthorized",
        description: isRTL ? "يرجى تسجيل الدخول أولاً" : "Please login first",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }

    try {
      const formData = new FormData();
      
      // Add basic fields
      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("price", form.price);
      formData.append("governorate_id", form.location_governorate);
      formData.append("city_id", form.location_city);
      formData.append("rent_or_buy", form.rent_or_buy);
      
      // Add multi-category fields
      formData.append("listing_type", form.listing_type);
      formData.append("country_id", form.country_id);
      
      // Add category field - backend requires a valid property category
      if (form.listing_type === 'property') {
        formData.append("category", form.category);
      } else {
        // For non-property listings, use a default property category
        // The backend validates against property categories, so we use 'other' or 'land' as fallback
        formData.append("category", "other");
      }
      
      // Add car-specific fields when listing_type is 'car'
      if (form.listing_type === 'car') {
        if (form.car_make) formData.append("car_make", form.car_make);
        if (form.car_model) formData.append("car_model", form.car_model);
        if (form.car_year) formData.append("car_year", form.car_year);
        if (form.car_condition) formData.append("car_condition", form.car_condition);
        if (form.car_mileage) formData.append("car_mileage", form.car_mileage);
        if (form.car_transmission) formData.append("car_transmission", form.car_transmission);
        if (form.car_fuel_type) formData.append("car_fuel_type", form.car_fuel_type);
      }

      // Add electronics-specific fields when listing_type is 'electronics'
      if (form.listing_type === 'electronics') {
        console.log('🔍 Electronics Form Data Before Submit:', {
          electronics_type: form.electronics_type,
          electronics_brand: form.electronics_brand,
          item_condition: form.item_condition,
          electronics_condition: form.electronics_condition
        });
        
        if (form.electronics_type) formData.append("electronics_type", form.electronics_type);
        if (form.electronics_brand) formData.append("electronics_brand", form.electronics_brand);
        
        // The form uses item_condition, map it to electronics_condition for backend
        const conditionValue = form.electronics_condition || form.item_condition;
        if (conditionValue) {
          formData.append("electronics_condition", conditionValue);
          console.log('✅ Added electronics_condition:', conditionValue);
        } else {
          console.warn('⚠️ No condition value found!');
        }
      }

      // Add mobile-specific fields when listing_type is 'mobile'
      if (form.listing_type === 'mobile') {
        if (form.mobile_brand) formData.append("mobile_brand", form.mobile_brand);
        if (form.mobile_model) formData.append("mobile_model", form.mobile_model);
        if (form.mobile_storage) formData.append("mobile_storage", form.mobile_storage);
        
        // The form uses item_condition, map it to mobile_condition for backend
        const conditionValue = form.mobile_condition || form.item_condition;
        if (conditionValue) formData.append("mobile_condition", conditionValue);
      }

      // Add job-specific fields when listing_type is 'job'
      if (form.listing_type === 'job') {
        console.log('🔍 JOB FIELDS DEBUG:', {
          job_type: form.job_type,
          job_work_type: form.job_work_type,
          job_employment_type: form.job_employment_type,
          job_location_type: form.job_location_type,
          job_experience_level: form.job_experience_level
        });
        
        if (form.job_type) formData.append("job_type", form.job_type);
        // Map job_work_type to job_employment_type for backend
        if (form.job_work_type) formData.append("job_employment_type", form.job_work_type);
        if (form.job_employment_type) formData.append("job_employment_type", form.job_employment_type);
        if (form.job_experience_level) formData.append("job_experience_level", form.job_experience_level);
        // Map job_location_type to job_location_type (will add to DB)
        if (form.job_location_type) {
          console.log('✅ Adding job_location_type to FormData:', form.job_location_type);
          formData.append("job_location_type", form.job_location_type);
        } else {
          console.log('❌ job_location_type is empty or undefined');
        }
        if (form.job_salary_min) formData.append("job_salary_min", form.job_salary_min);
        if (form.job_salary_max) formData.append("job_salary_max", form.job_salary_max);
      }

      // Add vehicle booking-specific fields when listing_type is 'vehicle_booking'
      if (form.listing_type === 'vehicle_booking') {
        if (form.vehicle_type) formData.append("vehicle_type", form.vehicle_type);
        if (form.vehicle_rental_duration) formData.append("vehicle_rental_duration", form.vehicle_rental_duration);
        if (form.vehicle_with_driver !== undefined) formData.append("vehicle_with_driver", form.vehicle_with_driver ? "1" : "0");
      }

      // Add doctor booking-specific fields when listing_type is 'doctor_booking'
      if (form.listing_type === 'doctor_booking') {
        if (form.doctor_specialty) formData.append("doctor_specialty", form.doctor_specialty);
        if (form.booking_type) formData.append("booking_type", form.booking_type);
      }

      // Add default amenities
      formData.append("furnished", "0");
      formData.append("has_parking", "0");
      formData.append("has_garden", "0");
      formData.append("has_pool", "0");
      formData.append("has_elevator", "0");

      // Add optional fields
      if (form.bedrooms && Number(form.bedrooms) > 0) {
        formData.append("bedrooms", form.bedrooms);
      }
      if (form.bathrooms && Number(form.bathrooms) > 0) {
        formData.append("bathrooms", form.bathrooms);
      }
      if (form.area && Number(form.area) > 0) {
        formData.append("area", form.area);
      }

      // Handle images for edit mode
      if (isEditMode) {
        // Send current existing image URLs that should be kept
        const remainingImageUrls = existingImages.map(img => img.url);
        if (remainingImageUrls.length > 0) {
          formData.append('existing_images', JSON.stringify(remainingImageUrls));
          console.log('Images to keep:', remainingImageUrls);
        }

        // Add new images if any (these will be added alongside existing ones)
        if (form.images && form.images.length > 0) {
          form.images.forEach((image) => {
            formData.append("images[]", image);
          });
          console.log('New images to upload:', form.images.length);
        }
      } else {
        // For create mode, add all images
        if (form.images && form.images.length > 0) {
          form.images.forEach((image) => {
            formData.append("images[]", image);
          });
        }
      }

      // Log form data for debugging
      console.log(`${isEditMode ? 'Updating' : 'Creating'} property:`);
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(pair[0], `File: ${pair[1].name} (${pair[1].type}, ${pair[1].size} bytes)`);
        } else {
          console.log(pair[0], pair[1]);
        }
      }

      // Different approach for edit vs create
      let response;
      
      if (isEditMode) {
        // For edit: Always use FormData with POST method spoofing
        // This handles both data updates and image changes in one request
        formData.append('_method', 'PUT');
        
        response = await fetch(`${API_URL}/properties/${editPropertyId}`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
          },
          body: formData
        });
      } else {
        // For create: Use POST with FormData
        response = await fetch(`${API_URL}/properties`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
          },
          body: formData
        });
      }

      // Handle response
      const contentType = response.headers.get('content-type');
      let data: any = {};
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // Non-JSON response
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error(`Server error (${response.status}). Please check server logs.`);
      }

      if (!response.ok) {
        // Handle validation errors
        if (data.errors) {
          const errorMessages = Object.entries(data.errors)
            .map(([field, messages]: [string, any]) => {
              const messageArray = Array.isArray(messages) ? messages : [messages];
              return `${field}: ${messageArray.join(', ')}`;
            })
            .join('\n');
          throw new Error(isRTL ? `فشل التحقق:\n${errorMessages}` : `Validation failed:\n${errorMessages}`);
        }
        throw new Error(data.message || (isRTL ? "فشل في إرسال الإعلان" : "Failed to submit listing"));
      }

      // Success - show appropriate message
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const isAdminOrFounder = user.is_admin || user.role === 'admin' || user.role === 'founder';

      let successMessage = "";
      let descriptionMessage = "";

      if (isEditMode) {
        if (data.data?.status === 'pending' && data.data?.needs_reapproval) {
          successMessage = isRTL ? "تم إعادة تقديم الإعلان للمراجعة" : "Listing resubmitted for approval";
          descriptionMessage = isRTL 
            ? "تم حفظ التعديلات وإعادة إرسال الإعلان للمراجعة من قبل المشرفين" 
            : "Your changes have been saved and the listing has been resubmitted for admin approval";
        } else {
          successMessage = isRTL ? "✅ تم تحديث الإعلان بنجاح" : "✅ Listing updated successfully";
          descriptionMessage = isRTL ? "تم حفظ التغييرات" : "Your changes have been saved";
        }
      } else {
        if (isAdminOrFounder) {
          successMessage = isRTL ? "✅ تم إضافة الإعلان بنجاح" : "✅ Listing added successfully";
          descriptionMessage = isRTL 
            ? "تم نشر الإعلان مباشرة في السوق" 
            : "Your listing has been published directly to the marketplace";
        } else {
          successMessage = isRTL ? "✅ تم إرسال الإعلان بنجاح" : "✅ Listing submitted successfully";
          descriptionMessage = isRTL 
            ? "سيتم مراجعة الإعلان من قبل المشرفين" 
            : "Your listing will be reviewed by administrators";
        }
      }

      toast({
        title: successMessage,
        description: descriptionMessage,
      });

      // Navigate to my ads page
      setTimeout(() => {
        navigate('/my-ads');
      }, 1000);

    } catch (error: any) {
      console.error("Error submitting listing:", error);
      const errorMessage = error.message || (isRTL ? "حدث خطأ غير متوقع" : "An unexpected error occurred");
      setServerError(errorMessage);

      toast({
        title: isRTL ? "❌ فشل في إرسال الإعلان" : "❌ Failed to submit listing",
        description: errorMessage,
        variant: "destructive"
      });

      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 pt-8 pb-16 px-4 flex items-center justify-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-sky-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800">
            {isRTL ? 'جاري تحميل بيانات الإعلان...' : 'Loading listing data...'}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 pt-6 pb-16 px-3 sm:px-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-600 p-4 sm:p-6 md:p-8">
            <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold text-white flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
              {isEditMode 
                ? (isRTL ? "✏️ تعديل الإعلان" : "✏️ Edit Listing")
                : (isRTL ? "➕ إضافة إعلان جديد" : "➕ Add New Listing")
              }
            </h1>
            <p className={`text-sky-100 mt-2 text-sm sm:text-base flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
              {isEditMode
                ? (isRTL ? "قم بتحديث تفاصيل الإعلان" : "Update your listing details")
                : (isRTL ? "أدخل تفاصيل إعلانك ليتم عرضه" : "Enter your listing details to publish it")
              }
            </p>
          </div>

          {/* Server Error Alert */}
          {serverError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4 rounded-lg">
              <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} items-start gap-3`}>
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-800 mb-1">
                    {isRTL ? "خطأ في الخادم" : "Server Error"}
                  </h3>
                  <p className="text-red-700 text-sm whitespace-pre-line">{serverError}</p>
                </div>
                <button
                  onClick={() => setServerError(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
            {/* Left Column - Main Form */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Basic Information */}
              <div className={`bg-gradient-to-br from-sky-50 to-blue-50 p-4 sm:p-6 rounded-xl border border-sky-200 shadow-md ${isRTL ? 'text-right' : ''}`}>
                <h2 className={`text-lg sm:text-xl font-semibold text-sky-800 mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                  <Home className="h-5 w-5 text-sky-600" />
                  <span>{isRTL ? "معلومات الإعلان الأساسية" : "Basic Listing Information"}</span>
                </h2>
                
                <div className="space-y-4">
                  {/* Listing Type Selector */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      {isRTL ? "نوع الإعلان" : "Listing Category"}
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <ListingTypeSelector
                      value={form.listing_type}
                      onChange={(value) => {
                        handleChange("listing_type", value);
                        // Reset category-specific fields when changing type
                        if (value !== 'car') {
                          handleChange("car_make", "");
                          handleChange("car_model", "");
                          handleChange("car_year", "");
                          handleChange("car_condition", "");
                          handleChange("car_mileage", "");
                          handleChange("car_transmission", "");
                          handleChange("car_fuel_type", "");
                        }
                        if (value !== 'property') {
                          handleChange("category", "");
                        }
                      }}
                    />
                  </div>

                  {/* Country Selector - Moved to Location section */}
                  
                  {/* Title */}
                  <div>
                    <Label 
                      htmlFor="title" 
                      className={`text-sm font-medium ${errors.title ? 'text-red-500' : 'text-gray-700'}`}
                    >
                      {isRTL ? "العنوان" : "Title"}
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      placeholder={isRTL ? "مثال: شقة فاخرة بمنظر على النيل" : "E.g., Luxury apartment with Nile view"}
                      className={`mt-1 ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                  </div>
                  
                  {/* Description */}
                  <div>
                    <Label 
                      htmlFor="description" 
                      className={`text-sm font-medium ${errors.description ? 'text-red-500' : 'text-gray-700'}`}
                    >
                      {isRTL ? "وصف العقار" : "Property Description"}
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      value={form.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      placeholder={isRTL ? "اكتب وصفًا تفصيليًا للعقار..." : "Write a detailed description of your property..."}
                      rows={5}
                      className={`mt-1 ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                  </div>

                  {/* Price */}
                  <div>
                    <Label 
                      htmlFor="price" 
                      className={`text-sm font-medium ${errors.price ? 'text-red-500' : 'text-gray-700'}`}
                    >
                      {isRTL ? "السعر (جنيه مصري)" : "Price (EGP)"}
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div className="relative mt-1">
                      <DollarSign className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                      <Input
                        id="price"
                        type="text"
                        value={formatNumberWithCommas(form.price)}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        placeholder={isRTL ? "أدخل السعر" : "Enter price"}
                        className={`${isRTL ? 'pr-10' : 'pl-10'} ${errors.price ? 'border-red-500 focus:ring-red-500' : ''}`}
                      />
                    </div>
                    {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className={`bg-gradient-to-br from-sky-50 to-blue-50 p-4 sm:p-6 rounded-xl border border-sky-200 shadow-md ${isRTL ? 'text-right' : ''}`}>
                <h2 className={`text-lg sm:text-xl font-semibold text-sky-800 mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                  <MapPin className="h-5 w-5 text-sky-600" />
                  <span>{isRTL ? "موقع الإعلان" : "Listing Location"}</span>
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Country */}
                  {!countriesLoading && countries && countries.length > 0 && (
                    <div className="sm:col-span-2">
                      <Label className="text-sm font-medium text-gray-700">
                        {isRTL ? "الدولة" : "Country"}
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <CountrySelector
                        value={form.country_id}
                        onChange={(value) => {
                          handleChange("country_id", value);
                          // Reset governorate and city when country changes
                          handleChange("location_governorate", "");
                          handleChange("location_city", "");
                        }}
                        countries={countries}
                      />
                    </div>
                  )}
                  
                  {/* Governorate */}
                  <div>
                    <Label 
                      htmlFor="location_governorate" 
                      className={`text-sm font-medium ${errors.location_governorate ? 'text-red-500' : 'text-gray-700'}`}
                    >
                      {isRTL ? "المحافظة" : "Governorate"}
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Select 
                      value={form.location_governorate}
                      onValueChange={(value) => {
                        handleChange("location_governorate", value);
                        handleChange("location_city", ""); // Reset city when governorate changes
                      }}
                      disabled={!form.country_id || governoratesLoading || countryGovernorates.length === 0}
                    >
                      <SelectTrigger 
                        id="location_governorate"
                        className={`mt-1 ${errors.location_governorate ? 'border-red-500' : ''}`}
                      >
                        <SelectValue 
                          placeholder={isRTL ? "اختر المحافظة" : "Select governorate"} 
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {countryGovernorates.map((governorate) => (
                          <SelectItem key={governorate.id} value={String(governorate.id)}>
                            {isRTL ? governorate.name_ar : governorate.name_en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.location_governorate && <p className="mt-1 text-sm text-red-500">{errors.location_governorate}</p>}
                  </div>
                  
                  {/* City */}
                  <div>
                    <Label 
                      htmlFor="location_city" 
                      className={`text-sm font-medium ${errors.location_city ? 'text-red-500' : 'text-gray-700'}`}
                    >
                      {isRTL ? "المدينة" : "City"}
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Select 
                      value={form.location_city}
                      onValueChange={(value) => handleChange("location_city", value)}
                      disabled={!form.location_governorate || citiesLoading || governorateCities.length === 0}
                    >
                      <SelectTrigger 
                        id="location_city"
                        className={`mt-1 ${errors.location_city ? 'border-red-500' : ''}`}
                      >
                        <SelectValue 
                          placeholder={isRTL ? "اختر المدينة" : "Select city"} 
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {governorateCities.map((city) => (
                          <SelectItem key={city.id} value={String(city.id)}>
                            {isRTL ? city.name_ar : city.name_en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.location_city && <p className="mt-1 text-sm text-red-500">{errors.location_city}</p>}
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className={`bg-gradient-to-br from-sky-50 to-blue-50 p-4 sm:p-6 rounded-xl border border-sky-200 shadow-md ${isRTL ? 'text-right' : ''}`}>
                <h2 className={`text-lg sm:text-xl font-semibold text-sky-800 mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                  <ImageIcon className="h-5 w-5 text-sky-600" />
                  <span>{isRTL ? "صور الإعلان" : "Listing Images"}</span>
                </h2>
                
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    multiple
                    onChange={handleImagesChange}
                    className="hidden"
                  />
                  
                  {/* Upload Area */}
                  <div 
                    onClick={triggerFileInput}
                    className={`
                      border-2 border-dashed rounded-xl p-6 sm:p-8 
                      flex flex-col items-center justify-center
                      cursor-pointer transition-all duration-200
                      ${errors.images 
                        ? 'border-red-400 bg-red-50 hover:bg-red-100' 
                        : 'border-sky-300 bg-sky-50 hover:bg-sky-100 hover:border-sky-400'
                      }
                    `}
                  >
                    <CloudUpload className={`h-10 w-10 sm:h-12 sm:w-12 mb-3 ${errors.images ? 'text-red-500' : 'text-sky-500'}`} />
                    <p className={`text-center font-medium text-sm sm:text-base ${errors.images ? 'text-red-700' : 'text-gray-700'}`}>
                      {isRTL ? "اضغط لتحميل الصور" : "Click to upload images"}
                    </p>
                    <p className="text-center text-gray-500 text-xs sm:text-sm mt-1">
                      {isRTL ? "يمكنك تحميل حتى 5 صور (JPG, PNG, GIF)" : "You can upload up to 5 images (JPG, PNG, GIF)"}
                      <br />
                      <span className={`font-semibold ${existingImages.length + form.images.length >= 5 ? 'text-orange-600' : 'text-sky-600'}`}>
                        {isRTL ? `(${existingImages.length + form.images.length}/5)` : `(${existingImages.length + form.images.length}/5)`}
                      </span>
                    </p>
                  </div>
                  {errors.images && <p className="mt-2 text-sm text-red-500 font-medium">{errors.images}</p>}
                  
                  {/* Existing Images */}
                  {existingImages.length > 0 && (
                    <div className="mt-6">
                      <h3 className={`text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        {isRTL ? `الصور الحالية (${existingImages.length})` : `Current Images (${existingImages.length})`}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                        {existingImages.map((image, index) => (
                          <div key={`existing-${image.id}-${index}`} className="relative group">
                            <img 
                              src={image.url} 
                              alt={`Existing ${index + 1}`} 
                              className="w-full h-28 sm:h-32 object-cover rounded-lg shadow-md border-2 border-green-300 transition-transform group-hover:scale-105"
                              onError={(e) => {
                                console.error('Failed to load image:', image.url);
                                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
                              }}
                            />
                            <div className={`absolute top-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md shadow-md ${isRTL ? 'right-2' : 'left-2'}`}>
                              ✓ {isRTL ? "موجودة" : "Saved"}
                            </div>
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeExistingImage(index);
                              }}
                              className={`absolute top-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all shadow-lg ${isRTL ? 'left-2' : 'right-2'}`}
                              title={isRTL ? "إزالة الصورة" : "Remove image"}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* New Images Preview */}
                  {/* New Images Preview */}
                  {imagePreviewUrls.length > 0 && (
                    <div className="mt-6">
                      <h3 className={`text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <CloudUpload className="w-4 h-4 text-blue-600" />
                        {isRTL ? `صور جديدة (${imagePreviewUrls.length}) - سيتم رفعها` : `New Images (${imagePreviewUrls.length}) - to be uploaded`}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                        {imagePreviewUrls.map((url, index) => {
                          console.log(`Rendering preview ${index + 1}:`, url);
                          return (
                            <div key={`preview-${index}`} className="relative group">
                              <img 
                                src={url} 
                                alt={`Preview ${index + 1}`} 
                                className="w-full h-28 sm:h-32 object-cover rounded-lg shadow-md border-2 border-blue-300 transition-transform group-hover:scale-105"
                                onLoad={() => console.log(`✅ Image ${index + 1} loaded`)}
                                onError={(e) => {
                                  console.error(`❌ Failed to load image ${index + 1}`);
                                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23f0f0f0" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="16"%3EError%3C/text%3E%3C/svg%3E';
                                }}
                              />
                              <div className={`absolute top-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md shadow-md ${isRTL ? 'right-2' : 'left-2'}`}>
                                ✨ {isRTL ? "جديدة" : "New"}
                              </div>
                              <button 
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeImage(index);
                                }}
                                className={`absolute top-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all shadow-lg ${isRTL ? 'left-2' : 'right-2'}`}
                                title={isRTL ? "إزالة الصورة" : "Remove image"}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className={`bg-gradient-to-br from-sky-50 to-blue-50 p-4 sm:p-6 rounded-xl border border-sky-200 shadow-md lg:sticky lg:top-20 ${isRTL ? 'text-right' : ''}`}>
                <h2 className={`text-lg sm:text-xl font-semibold text-sky-800 mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                  <Info className="h-5 w-5 text-sky-600" />
                  <span>{isRTL ? "تفاصيل إضافية" : "Additional Details"}</span>
                </h2>
                
                <div className="space-y-4">
                  {/* Property Category - Only show for property listing type */}
                  {form.listing_type === 'property' && (
                    <div>
                      <Label 
                        htmlFor="category" 
                        className={`text-sm font-medium ${errors.category ? 'text-red-500' : 'text-gray-700'}`}
                      >
                        {isRTL ? "نوع العقار" : "Property Type"}
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Select 
                        value={form.category}
                        onValueChange={(value) => handleChange("category", value)}
                      >
                        <SelectTrigger 
                          id="category"
                          className={`mt-1 ${errors.category ? 'border-red-500' : ''}`}
                        >
                          <SelectValue placeholder={isRTL ? "اختر نوع العقار" : "Select property type"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="villa">{isRTL ? "🏰 فيلا" : "🏰 Villa"}</SelectItem>
                          <SelectItem value="apartment">{isRTL ? "🏢 شقة" : "🏢 Apartment"}</SelectItem>
                          <SelectItem value="townhouse">{isRTL ? "🏘️ تاون هاوس" : "🏘️ Townhouse"}</SelectItem>
                          <SelectItem value="land">{isRTL ? "🌾 أرض" : "🌾 Land"}</SelectItem>
                          <SelectItem value="building">{isRTL ? "🏗️ مبنى" : "🏗️ Building"}</SelectItem>
                          <SelectItem value="commercial">{isRTL ? "🏪 تجاري" : "🏪 Commercial"}</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                    </div>
                  )}

                  {/* Car-Specific Fields - Only show for car listing type */}
                  {form.listing_type === 'car' && (
                    <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <h3 className="font-semibold text-green-800 flex items-center gap-2">
                        <Car className="w-5 h-5" />
                        {isRTL ? "تفاصيل السيارة" : "Car Details"}
                      </h3>
                      
                      {/* Car Make */}
                      <div>
                        <Label className={`text-sm font-medium ${errors.car_make ? 'text-red-500' : 'text-gray-700'}`}>
                          {isRTL ? "ماركة السيارة" : "Car Make"}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        {!carMakesLoading && carMakes ? (
                          <CarMakeSelector
                            value={form.car_make || ''}
                            onChange={(value) => {
                              handleChange("car_make", value);
                              handleChange("car_model", ""); // Reset model when make changes
                            }}
                            carMakes={carMakes}
                          />
                        ) : (
                          <p className="text-sm text-gray-500">{isRTL ? "جاري التحميل..." : "Loading..."}</p>
                        )}
                        {errors.car_make && <p className="mt-1 text-sm text-red-500">{errors.car_make}</p>}
                      </div>

                      {/* Car Model */}
                      {form.car_make && (
                        <div>
                          <Label className={`text-sm font-medium ${errors.car_model ? 'text-red-500' : 'text-gray-700'}`}>
                            {isRTL ? "موديل السيارة" : "Car Model"}
                            <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <CarModelSelector
                            value={form.car_model || ''}
                            onChange={(value) => handleChange("car_model", value)}
                            make={form.car_make}
                          />
                          {errors.car_model && <p className="mt-1 text-sm text-red-500">{errors.car_model}</p>}
                        </div>
                      )}

                      {/* Car Year */}
                      <div>
                        <Label className={`text-sm font-medium ${errors.car_year ? 'text-red-500' : 'text-gray-700'}`}>
                          {isRTL ? "سنة الصنع" : "Year"}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input
                          type="number"
                          min="1900"
                          max={new Date().getFullYear() + 1}
                          value={form.car_year || ''}
                          onChange={(e) => handleChange("car_year", e.target.value)}
                          placeholder={isRTL ? "مثال: 2023" : "E.g., 2023"}
                          className={`mt-1 ${errors.car_year ? 'border-red-500' : ''}`}
                        />
                        {errors.car_year && <p className="mt-1 text-sm text-red-500">{errors.car_year}</p>}
                      </div>

                      {/* Car Condition */}
                      <div>
                        <Label className={`text-sm font-medium ${errors.car_condition ? 'text-red-500' : 'text-gray-700'}`}>
                          {isRTL ? "حالة السيارة" : "Condition"}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Select
                          value={form.car_condition || ''}
                          onValueChange={(value) => handleChange("car_condition", value)}
                        >
                          <SelectTrigger className={`mt-1 ${errors.car_condition ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder={isRTL ? "اختر الحالة" : "Select condition"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">{isRTL ? "جديدة" : "New"}</SelectItem>
                            <SelectItem value="used">{isRTL ? "مستعملة" : "Used"}</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.car_condition && <p className="mt-1 text-sm text-red-500">{errors.car_condition}</p>}
                      </div>

                      {/* Car Mileage - Optional */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          {isRTL ? "الكيلومترات (اختياري)" : "Mileage (optional)"}
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          value={form.car_mileage || ''}
                          onChange={(e) => handleChange("car_mileage", e.target.value)}
                          placeholder={isRTL ? "مثال: 50000" : "E.g., 50000"}
                          className="mt-1"
                        />
                      </div>

                      {/* Car Transmission - Optional */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          {isRTL ? "ناقل الحركة (اختياري)" : "Transmission (optional)"}
                        </Label>
                        <Select
                          value={form.car_transmission || ''}
                          onValueChange={(value) => handleChange("car_transmission", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder={isRTL ? "اختر ناقل الحركة" : "Select transmission"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="automatic">{isRTL ? "أوتوماتيك" : "Automatic"}</SelectItem>
                            <SelectItem value="manual">{isRTL ? "يدوي" : "Manual"}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Car Fuel Type - Optional */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          {isRTL ? "نوع الوقود (اختياري)" : "Fuel Type (optional)"}
                        </Label>
                        <Select
                          value={form.car_fuel_type || ''}
                          onValueChange={(value) => handleChange("car_fuel_type", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder={isRTL ? "اختر نوع الوقود" : "Select fuel type"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="petrol">{isRTL ? "بنزين" : "Petrol"}</SelectItem>
                            <SelectItem value="diesel">{isRTL ? "ديزل" : "Diesel"}</SelectItem>
                            <SelectItem value="hybrid">{isRTL ? "هايبرد" : "Hybrid"}</SelectItem>
                            <SelectItem value="electric">{isRTL ? "كهرباء" : "Electric"}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  
                  {/* Electronics-Specific Fields - Only show for electronics listing type */}
                  {form.listing_type === 'electronics' && (
                    <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-blue-800 flex items-center gap-2">
                        <Tv className="w-5 h-5" />
                        {isRTL ? "تفاصيل الإلكترونيات" : "Electronics Details"}
                      </h3>
                      
                      {/* Electronics Type */}
                      <div>
                        <Label className={`text-sm font-medium ${errors.electronics_type ? 'text-red-500' : 'text-gray-700'}`}>
                          {isRTL ? "نوع الإلكترونيات" : "Electronics Type"}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        {!electronicsLoading && electronicsTypes && Object.keys(electronicsTypes).length > 0 ? (
                          <Select
                            value={form.electronics_type || ''}
                            onValueChange={(value) => handleChange("electronics_type", value)}
                          >
                            <SelectTrigger className={`mt-1 ${errors.electronics_type ? 'border-red-500' : ''}`}>
                              <SelectValue placeholder={isRTL ? "اختر النوع" : "Select type"} />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(electronicsTypes).map(([key, type]: [string, any]) => (
                                <SelectItem key={key} value={key}>
                                  {type.icon} {isRTL ? type.name_ar : type.name_en}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm text-gray-500">{isRTL ? "جاري التحميل..." : "Loading..."}</p>
                        )}
                        {errors.electronics_type && <p className="mt-1 text-sm text-red-500">{errors.electronics_type}</p>}
                      </div>

                      {/* Electronics Brand */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          {isRTL ? "العلامة التجارية" : "Brand"}
                        </Label>
                        <Input
                          type="text"
                          value={form.electronics_brand || ''}
                          onChange={(e) => handleChange("electronics_brand", e.target.value)}
                          placeholder={isRTL ? "مثال: Samsung, LG, Sony" : "e.g., Samsung, LG, Sony"}
                          className="mt-1"
                        />
                      </div>

                      {/* Item Condition */}
                      <div>
                        <Label className={`text-sm font-medium ${errors.item_condition ? 'text-red-500' : 'text-gray-700'}`}>
                          {isRTL ? "الحالة" : "Condition"}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        {!conditionLoading && itemCondition && Object.keys(itemCondition).length > 0 ? (
                          <Select
                            value={form.item_condition || ''}
                            onValueChange={(value) => handleChange("item_condition", value)}
                          >
                            <SelectTrigger className={`mt-1 ${errors.item_condition ? 'border-red-500' : ''}`}>
                              <SelectValue placeholder={isRTL ? "اختر الحالة" : "Select condition"} />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(itemCondition).map(([key, cond]: [string, any]) => (
                                <SelectItem key={key} value={key}>
                                  {isRTL ? cond.name_ar : cond.name_en}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm text-gray-500">{isRTL ? "جاري التحميل..." : "Loading..."}</p>
                        )}
                        {errors.item_condition && <p className="mt-1 text-sm text-red-500">{errors.item_condition}</p>}
                      </div>
                    </div>
                  )}

                  {/* Mobile-Specific Fields - Only show for mobile listing type */}
                  {form.listing_type === 'mobile' && (
                    <div className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <h3 className="font-semibold text-purple-800 flex items-center gap-2">
                        <Smartphone className="w-5 h-5" />
                        {isRTL ? "تفاصيل الهاتف" : "Mobile Details"}
                      </h3>
                      
                      {/* Mobile Brand */}
                      <div>
                        <Label className={`text-sm font-medium ${errors.mobile_brand ? 'text-red-500' : 'text-gray-700'}`}>
                          {isRTL ? "العلامة التجارية" : "Brand"}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        {!mobileBrandsLoading && mobileBrands && Object.keys(mobileBrands).length > 0 ? (
                          <Select
                            value={form.mobile_brand || ''}
                            onValueChange={(value) => {
                              handleChange("mobile_brand", value);
                              handleChange("mobile_model", ""); // Reset model when brand changes
                            }}
                          >
                            <SelectTrigger className={`mt-1 ${errors.mobile_brand ? 'border-red-500' : ''}`}>
                              <SelectValue placeholder={isRTL ? "اختر العلامة" : "Select brand"} />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(mobileBrands).map(([key, brand]: [string, any]) => (
                                <SelectItem key={key} value={key}>
                                  {brand.logo} {isRTL ? brand.name_ar : brand.name_en}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm text-gray-500">{isRTL ? "جاري التحميل..." : "Loading..."}</p>
                        )}
                        {errors.mobile_brand && <p className="mt-1 text-sm text-red-500">{errors.mobile_brand}</p>}
                      </div>

                      {/* Mobile Model */}
                      {form.mobile_brand && (
                        <div>
                          <Label className={`text-sm font-medium ${errors.mobile_model ? 'text-red-500' : 'text-gray-700'}`}>
                            {isRTL ? "الموديل" : "Model"}
                            <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <MobileModelSelector
                            value={form.mobile_model || ''}
                            onChange={(value) => handleChange("mobile_model", value)}
                            brand={form.mobile_brand}
                          />
                          {errors.mobile_model && <p className="mt-1 text-sm text-red-500">{errors.mobile_model}</p>}
                        </div>
                      )}

                      {/* Mobile Storage */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          {isRTL ? "السعة التخزينية" : "Storage"}
                        </Label>
                        <Select
                          value={form.mobile_storage || ''}
                          onValueChange={(value) => handleChange("mobile_storage", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder={isRTL ? "اختر السعة" : "Select storage"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="32gb">32GB</SelectItem>
                            <SelectItem value="64gb">64GB</SelectItem>
                            <SelectItem value="128gb">128GB</SelectItem>
                            <SelectItem value="256gb">256GB</SelectItem>
                            <SelectItem value="512gb">512GB</SelectItem>
                            <SelectItem value="1tb">1TB</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Item Condition */}
                      <div>
                        <Label className={`text-sm font-medium ${errors.item_condition ? 'text-red-500' : 'text-gray-700'}`}>
                          {isRTL ? "الحالة" : "Condition"}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        {!conditionLoading && itemCondition && Object.keys(itemCondition).length > 0 ? (
                          <Select
                            value={form.item_condition || ''}
                            onValueChange={(value) => handleChange("item_condition", value)}
                          >
                            <SelectTrigger className={`mt-1 ${errors.item_condition ? 'border-red-500' : ''}`}>
                              <SelectValue placeholder={isRTL ? "اختر الحالة" : "Select condition"} />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(itemCondition).map(([key, cond]: [string, any]) => (
                                <SelectItem key={key} value={key}>
                                  {isRTL ? cond.name_ar : cond.name_en}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm text-gray-500">{isRTL ? "جاري التحميل..." : "Loading..."}</p>
                        )}
                        {errors.item_condition && <p className="mt-1 text-sm text-red-500">{errors.item_condition}</p>}
                      </div>
                    </div>
                  )}

                  {/* Job-Specific Fields - Only show for job listing type */}
                  {form.listing_type === 'job' && (
                    <div className="space-y-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h3 className="font-semibold text-orange-800 flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        {isRTL ? "تفاصيل الوظيفة" : "Job Details"}
                      </h3>
                      
                      {/* Job Type */}
                      <div>
                        <Label className={`text-sm font-medium ${errors.job_type ? 'text-red-500' : 'text-gray-700'}`}>
                          {isRTL ? "فئة الوظيفة" : "Job Category"}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        {!jobTypesLoading && jobTypes && Object.keys(jobTypes).length > 0 ? (
                          <Select
                            value={form.job_type || ''}
                            onValueChange={(value) => handleChange("job_type", value)}
                          >
                            <SelectTrigger className={`mt-1 ${errors.job_type ? 'border-red-500' : ''}`}>
                              <SelectValue placeholder={isRTL ? "اختر الفئة" : "Select category"} />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(jobTypes).map(([key, type]: [string, any]) => (
                                <SelectItem key={key} value={key}>
                                  {type.icon} {isRTL ? type.name_ar : type.name_en}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm text-gray-500">{isRTL ? "جاري التحميل..." : "Loading..."}</p>
                        )}
                        {errors.job_type && <p className="mt-1 text-sm text-red-500">{errors.job_type}</p>}
                      </div>

                      {/* Job Work Type */}
                      <div>
                        <Label className={`text-sm font-medium ${errors.job_work_type ? 'text-red-500' : 'text-gray-700'}`}>
                          {isRTL ? "نوع الدوام" : "Work Type"}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        {!jobWorkTypesLoading && jobWorkTypes && Object.keys(jobWorkTypes).length > 0 ? (
                          <Select
                            value={form.job_work_type || ''}
                            onValueChange={(value) => handleChange("job_work_type", value)}
                          >
                            <SelectTrigger className={`mt-1 ${errors.job_work_type ? 'border-red-500' : ''}`}>
                              <SelectValue placeholder={isRTL ? "اختر نوع الدوام" : "Select work type"} />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(jobWorkTypes).map(([key, type]: [string, any]) => (
                                <SelectItem key={key} value={key}>
                                  {isRTL ? type.name_ar : type.name_en}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm text-gray-500">{isRTL ? "جاري التحميل..." : "Loading..."}</p>
                        )}
                        {errors.job_work_type && <p className="mt-1 text-sm text-red-500">{errors.job_work_type}</p>}
                      </div>

                      {/* Job Location Type */}
                      <div>
                        <Label className={`text-sm font-medium ${errors.job_location_type ? 'text-red-500' : 'text-gray-700'}`}>
                          {isRTL ? "نوع العمل" : "Location Type"}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        {!jobLocationTypesLoading && jobLocationTypes && Object.keys(jobLocationTypes).length > 0 ? (
                          <Select
                            value={form.job_location_type || ''}
                            onValueChange={(value) => handleChange("job_location_type", value)}
                          >
                            <SelectTrigger className={`mt-1 ${errors.job_location_type ? 'border-red-500' : ''}`}>
                              <SelectValue placeholder={isRTL ? "اختر نوع العمل" : "Select location type"} />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(jobLocationTypes).map(([key, type]: [string, any]) => (
                                <SelectItem key={key} value={key}>
                                  {isRTL ? type.name_ar : type.name_en}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm text-gray-500">{isRTL ? "جاري التحميل..." : "Loading..."}</p>
                        )}
                        {errors.job_location_type && <p className="mt-1 text-sm text-red-500">{errors.job_location_type}</p>}
                      </div>
                    </div>
                  )}

                  {/* Vehicle-Specific Fields - Only show for vehicle_booking listing type */}
                  {form.listing_type === 'vehicle_booking' && (
                    <div className="space-y-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <h3 className="font-semibold text-indigo-800 flex items-center gap-2">
                        <Truck className="w-5 h-5" />
                        {isRTL ? "تفاصيل المركبة" : "Vehicle Details"}
                      </h3>
                      
                      {/* Vehicle Type */}
                      <div>
                        <Label className={`text-sm font-medium ${errors.vehicle_type ? 'text-red-500' : 'text-gray-700'}`}>
                          {isRTL ? "نوع المركبة" : "Vehicle Type"}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        {!vehicleTypesLoading && vehicleTypes && Object.keys(vehicleTypes).length > 0 ? (
                          <Select
                            value={form.vehicle_type || ''}
                            onValueChange={(value) => handleChange("vehicle_type", value)}
                          >
                            <SelectTrigger className={`mt-1 ${errors.vehicle_type ? 'border-red-500' : ''}`}>
                              <SelectValue placeholder={isRTL ? "اختر النوع" : "Select type"} />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(vehicleTypes).map(([key, type]: [string, any]) => (
                                <SelectItem key={key} value={key}>
                                  {type.icon} {isRTL ? type.name_ar : type.name_en}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm text-gray-500">{isRTL ? "جاري التحميل..." : "Loading..."}</p>
                        )}
                        {errors.vehicle_type && <p className="mt-1 text-sm text-red-500">{errors.vehicle_type}</p>}
                      </div>

                      {/* Driver Option */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          {isRTL ? "خيار السائق" : "Driver Option"}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Select
                          value={form.vehicle_with_driver ? "with_driver" : "self_drive"}
                          onValueChange={(value) => handleChange("vehicle_with_driver", value === "with_driver")}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder={isRTL ? "اختر الخيار" : "Select option"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="with_driver">
                              {isRTL ? "مع سائق" : "With Driver"}
                            </SelectItem>
                            <SelectItem value="self_drive">
                              {isRTL ? "قيادة ذاتية" : "Self Drive"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Doctor-Specific Fields - Only show for doctor_booking listing type */}
                  {form.listing_type === 'doctor_booking' && (
                    <div className="space-y-4 p-4 bg-pink-50 rounded-lg border border-pink-200">
                      <h3 className="font-semibold text-pink-800 flex items-center gap-2">
                        <Stethoscope className="w-5 h-5" />
                        {isRTL ? "تفاصيل الطبيب" : "Doctor Details"}
                      </h3>
                      
                      {/* Doctor Specialty */}
                      <div>
                        <Label className={`text-sm font-medium ${errors.doctor_specialty ? 'text-red-500' : 'text-gray-700'}`}>
                          {isRTL ? "التخصص" : "Specialty"}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        {!doctorSpecialtiesLoading && doctorSpecialties && Object.keys(doctorSpecialties).length > 0 ? (
                          <Select
                            value={form.doctor_specialty || ''}
                            onValueChange={(value) => handleChange("doctor_specialty", value)}
                          >
                            <SelectTrigger className={`mt-1 ${errors.doctor_specialty ? 'border-red-500' : ''}`}>
                              <SelectValue placeholder={isRTL ? "اختر التخصص" : "Select specialty"} />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(doctorSpecialties).map(([key, specialty]: [string, any]) => (
                                <SelectItem key={key} value={key}>
                                  {specialty.icon} {isRTL ? specialty.name_ar : specialty.name_en}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm text-gray-500">{isRTL ? "جاري التحميل..." : "Loading..."}</p>
                        )}
                        {errors.doctor_specialty && <p className="mt-1 text-sm text-red-500">{errors.doctor_specialty}</p>}
                      </div>

                      {/* Booking Type */}
                      <div>
                        <Label className={`text-sm font-medium ${errors.booking_type ? 'text-red-500' : 'text-gray-700'}`}>
                          {isRTL ? "نوع الحجز" : "Booking Type"}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        {!bookingTypesLoading && bookingTypes && Object.keys(bookingTypes).length > 0 ? (
                          <Select
                            value={form.booking_type || ''}
                            onValueChange={(value) => handleChange("booking_type", value)}
                          >
                            <SelectTrigger className={`mt-1 ${errors.booking_type ? 'border-red-500' : ''}`}>
                              <SelectValue placeholder={isRTL ? "اختر نوع الحجز" : "Select booking type"} />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(bookingTypes).map(([key, type]: [string, any]) => (
                                <SelectItem key={key} value={key}>
                                  {isRTL ? type.name_ar : type.name_en}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm text-gray-500">{isRTL ? "جاري التحميل..." : "Loading..."}</p>
                        )}
                        {errors.booking_type && <p className="mt-1 text-sm text-red-500">{errors.booking_type}</p>}
                      </div>
                    </div>
                  )}
                  
                  {/* Listing Type (Rent/Buy) - Only for Property and Car */}
                  {(form.listing_type === 'property' || form.listing_type === 'car') && (
                    <div>
                      <Label 
                        htmlFor="rent_or_buy" 
                        className={`text-sm font-medium ${errors.rent_or_buy ? 'text-red-500' : 'text-gray-700'}`}
                      >
                        {isRTL ? "نوع العرض" : "Listing Type"}
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Select 
                        value={form.rent_or_buy}
                        onValueChange={(value) => handleChange("rent_or_buy", value)}
                      >
                        <SelectTrigger 
                          id="rent_or_buy"
                          className={`mt-1 ${errors.rent_or_buy ? 'border-red-500' : ''}`}
                        >
                          <SelectValue placeholder={isRTL ? "اختر نوع العرض" : "Select listing type"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buy">{isRTL ? "💰 للبيع" : "💰 For Sale"}</SelectItem>
                          <SelectItem value="rent">{isRTL ? "🔑 للإيجار" : "🔑 For Rent"}</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.rent_or_buy && <p className="mt-1 text-sm text-red-500">{errors.rent_or_buy}</p>}
                    </div>
                  )}
                  
                  {/* Optional Fields - Only for Property Listings */}
                  {form.listing_type === 'property' && (
                    <div className="pt-3 border-t-2 border-sky-200">
                      <p className="text-xs sm:text-sm text-sky-600 font-semibold mb-3">
                        {isRTL ? "📝 معلومات إضافية (اختيارية)" : "📝 Additional info (optional)"}
                      </p>
                      
                      <div className="space-y-3">
                        {/* Bedrooms */}
                        <div>
                          <Label htmlFor="bedrooms" className="text-sm font-medium text-gray-700">
                            {isRTL ? "🛏️ عدد غرف النوم *" : "🛏️ Bedrooms *"}
                          </Label>
                          <Input
                            id="bedrooms"
                            type="number"
                            min="0"
                            max="20"
                            value={form.bedrooms || ""}
                            onChange={(e) => handleChange("bedrooms", e.target.value)}
                            placeholder={isRTL ? "مثال: 3" : "E.g., 3"}
                            className="mt-1"
                            required
                          />
                        </div>
                        
                        {/* Bathrooms */}
                        <div>
                          <Label htmlFor="bathrooms" className="text-sm font-medium text-gray-700">
                            {isRTL ? "🚿 عدد الحمامات" : "🚿 Bathrooms"}
                          </Label>
                          <Input
                            id="bathrooms"
                            type="number"
                            min="0"
                            max="10"
                            value={form.bathrooms || ""}
                            onChange={(e) => handleChange("bathrooms", e.target.value)}
                            placeholder={isRTL ? "مثال: 2" : "E.g., 2"}
                            className="mt-1"
                          />
                        </div>
                        
                        {/* Area */}
                        <div>
                          <Label htmlFor="area" className="text-sm font-medium text-gray-700">
                            {isRTL ? "📏 المساحة (م²) *" : "📏 Area (m²) *"}
                          </Label>
                          <Input
                            id="area"
                            type="number"
                            min="0"
                            value={form.area || ""}
                            onChange={(e) => handleChange("area", e.target.value)}
                            placeholder={isRTL ? "مثال: 150" : "E.g., 150"}
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Submit Button */}
                  <div className="pt-6 mt-4 space-y-3">
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white py-4 sm:py-5 text-base sm:text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <div className={`flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                          <span>{isEditMode 
                            ? (isRTL ? 'جاري التحديث...' : 'Updating...')
                            : (isRTL ? 'جاري الإرسال...' : 'Submitting...')
                          }</span>
                        </div>
                      ) : (
                        <div className={`flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span>
                            {isEditMode 
                              ? (isRTL ? '💾 تحديث الإعلان' : '💾 Update Listing')
                              : (isRTL ? '✨ إضافة الإعلان' : '✨ Add Listing')
                            }
                          </span>
                          <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                        </div>
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/my-ads')}
                      className="w-full border-2 border-gray-300 hover:bg-gray-100 py-3 rounded-xl"
                      disabled={submitting}
                    >
                      {isRTL ? '❌ إلغاء' : '❌ Cancel'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;