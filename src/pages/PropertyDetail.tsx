import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChatButton } from '@/components/ChatButton';
import { API_URL, API_BASE_URL } from '@/config/api';
import { SEO } from '@/components/SEO';
import { 
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
  ArrowRight,
  Bed,
  Bath,
  Maximize,
  Car,
  TreePine,
  Waves,
  Lock
} from 'lucide-react';

interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  formatted_price: string;
  listing_type?: string;
  category: string;
  rent_or_buy: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  floor_number?: number;
  total_floors?: number;
  built_year?: number;
  furnished?: boolean;
  has_parking?: boolean;
  has_garden?: boolean;
  has_pool?: boolean;
  has_elevator?: boolean;
  images: string[];
  location: string;
  location_country?: string;
  location_governorate: string;
  location_city: string;
  country?: {
    id: number;
    name: string;
  };
  governorate: {
    id: number;
    name_en: string;
    name_ar: string;
  };
  city: {
    id: number;
    name_en: string;
    name_ar: string;
  };
  status: string;
  is_featured: boolean;
  views_count: number;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    username?: string;
    phone?: string;
  };
  user_name: string;
  username?: string;
  user_phone: string;
  // Type-specific fields
  car_make?: string;
  car_model?: string;
  car_year?: number;
  car_condition?: string;
  car_mileage?: number;
  car_transmission?: string;
  car_fuel_type?: string;
  electronics_type?: string;
  electronics_brand?: string;
  electronics_condition?: string;
  mobile_brand?: string;
  mobile_model?: string;
  mobile_storage?: string;
  mobile_condition?: string;
  job_type?: string;
  job_experience_level?: string;
  job_employment_type?: string;
  job_location_type?: string;
  job_salary_min?: number;
  job_salary_max?: number;
  vehicle_type?: string;
  vehicle_with_driver?: boolean;
  vehicle_rental_duration?: string;
  doctor_specialty?: string;
  booking_type?: string;
}

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isRTL } = useLanguage();
  
  // Helper function to get full image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    return `${API_BASE_URL}${imagePath}`;
  };
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [showPhone, setShowPhone] = useState(false);
const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  useEffect(() => {
    fetchPropertyDetail();
  }, [id]);

  const fetchPropertyDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/properties/${id}`, { headers });
      
      if (!response.ok) {
        throw new Error('Property not found');
      }

      const data = await response.json();
      
      console.log('API Response:', data); // Debug log
      console.log('User data:', data.data?.user); // Debug log
      console.log('User phone from user object:', data.data?.user?.phone); // Debug log
      console.log('User phone from root:', data.data?.user_phone); // Debug log
      
      if (data.success && data.data) {
        const propertyData = {
          ...data.data,
          images: Array.isArray(data.data.images) 
            ? data.data.images 
            : typeof data.data.images === 'string' 
            ? JSON.parse(data.data.images) 
            : [],
          location_governorate: data.data.governorate?.name_en || data.data.location_governorate || '',
          location_city: data.data.city?.name_en || data.data.location_city || '',
          user_name: data.data.user?.name || data.data.user_name || 'Unknown',
          // Fix: Try multiple possible locations for phone number
          user_phone: data.data.user?.phone || data.data.phone || data.data.user_phone || ''
        };
        
        console.log('Processed Property Data:', propertyData); // Debug log
        console.log('Final User Phone:', propertyData.user_phone); // Debug log
        
        setProperty(propertyData);
      }
    } catch (err: any) {
      console.error('Error fetching property:', err);
      setError(isRTL ? 'فشل تحميل العقار' : 'Failed to load property');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'villa':
      case 'townhouse':
        return <Home className="w-6 h-6" />;
      case 'apartment':
        return <Building className="w-6 h-6" />;
      case 'commercial':
      case 'building':
        return <Warehouse className="w-6 h-6" />;
      default:
        return <Home className="w-6 h-6" />;
    }
  };

  const formatPrice = (price: number, type: string) => {
    const formatted = new Intl.NumberFormat(isRTL ? 'ar-EG' : 'en-US').format(price);
    return isRTL 
      ? (type === 'rent' ? `${formatted} جنيه/شهر` : `${formatted} جنيه`)
      : (type === 'rent' ? `EGP ${formatted}/mo` : `EGP ${formatted}`);
  };

  const generateSEOKeywords = (prop: Property) => {
    const categoryAr: Record<string, string> = {
      apartment: 'شقة',
      villa: 'فيلا',
      townhouse: 'تاون هاوس',
      land: 'أرض',
      commercial: 'عقار تجاري',
      building: 'مبنى',
      car: 'سيارة',
      electronics: 'إلكترونيات',
      mobile: 'موبايل',
      job: 'وظيفة',
      vehicle_booking: 'حجز سيارة',
      doctor_booking: 'حجز دكتور'
    };

    const typeAr = prop.rent_or_buy === 'rent' ? 'للإيجار' : 'للبيع';
    const typeEn = prop.rent_or_buy === 'rent' ? 'for rent' : 'for sale';
    const categoryEnLabel = prop.category || 'property';
    const categoryArLabel = categoryAr[prop.category] || 'عقار';

    const governorate = prop.governorate?.name_en || prop.location_governorate || '';
    const city = prop.city?.name_en || prop.location_city || '';
    const governorateAr = prop.governorate?.name_ar || '';
    const cityAr = prop.city?.name_ar || '';

    // Brand variations for better search visibility
    const brandKeywords = '7agty, حاجتي, حاجاتي, hagty, hagti, hagaty, hagati, 7agati, 7agaty';

    // Base keywords
    const baseKeywordsEn = [
      brandKeywords,
      `${categoryEnLabel} ${typeEn}`,
      `${categoryEnLabel} in ${city}`,
      `${categoryEnLabel} ${governorate}`,
      `${categoryEnLabel} Egypt`,
      `${categoryEnLabel} UAE`,
      `${categoryEnLabel} Saudi Arabia`,
      `${city} ${categoryEnLabel}`,
      `${city} real estate`,
      `property ${typeEn} ${city}`,
      `${categoryEnLabel} ${governorate} Egypt`,
      `buy ${categoryEnLabel} ${city}`,
      `${city} properties`,
      `${governorate} real estate`,
      `Egypt real estate`,
      `UAE real estate`,
      `Saudi Arabia real estate`,
      'Middle East marketplace',
      'Egyptian marketplace',
      'UAE marketplace',
      'Saudi marketplace',
    ];

    const baseKeywordsAr = [
      brandKeywords,
      `${categoryArLabel} ${typeAr}`,
      `${categoryArLabel} في ${cityAr}`,
      `${categoryArLabel} ${governorateAr}`,
      `عقارات ${cityAr}`,
      `${typeAr} ${cityAr}`,
      `${categoryArLabel} مصر`,
      `${categoryArLabel} الإمارات`,
      `${categoryArLabel} السعودية`,
      `عقارات ${governorateAr}`,
      `${categoryArLabel} للبيع ${cityAr}`,
      `${categoryArLabel} للإيجار ${cityAr}`,
      `شراء ${categoryArLabel} ${cityAr}`,
      `إيجار ${categoryArLabel} ${cityAr}`,
      'عقارات مصر',
      'عقارات الإمارات',
      'عقارات السعودية',
      'سوق مصري',
      'سوق إماراتي',
      'سوق سعودي',
      'سوق عقارات مصر',
      'سوق عقارات الإمارات',
      'سوق عقارات السعودية',
      'سوق الشرق الأوسط',
    ];

    // Add property-specific details
    if (prop.bedrooms) {
      baseKeywordsEn.push(
        `${prop.bedrooms} bedroom ${categoryEnLabel}`,
        `${prop.bedrooms} bed ${categoryEnLabel} ${city}`,
        `${prop.bedrooms}BR ${categoryEnLabel}`
      );
      baseKeywordsAr.push(
        `${categoryArLabel} ${prop.bedrooms} غرف`,
        `${categoryArLabel} ${prop.bedrooms} غرفة نوم`,
        `${prop.bedrooms} غرف ${cityAr}`
      );
    }

    if (prop.area) {
      baseKeywordsEn.push(
        `${prop.area} sqm ${categoryEnLabel}`,
        `${prop.area} square meters`,
        `${categoryEnLabel} ${prop.area}m2`
      );
      baseKeywordsAr.push(
        `${categoryArLabel} ${prop.area} متر`,
        `${prop.area} متر مربع`,
        `${categoryArLabel} ${prop.area}م`
      );
    }

    if (prop.bathrooms) {
      baseKeywordsEn.push(`${prop.bathrooms} bathroom ${categoryEnLabel}`);
      baseKeywordsAr.push(`${prop.bathrooms} حمام ${categoryArLabel}`);
    }

    // Add car-specific keywords
    if (prop.car_make) {
      baseKeywordsEn.push(
        `${prop.car_make} ${prop.car_model || ''} ${typeEn}`,
        `${prop.car_make} car Egypt`,
        `${prop.car_make} car UAE`,
        `${prop.car_make} car Saudi Arabia`,
        `${prop.car_make} ${city}`,
        `used cars Egypt`,
        `used cars UAE`,
        `used cars Saudi Arabia`,
        `cars for sale Egypt`,
        `cars for sale UAE`,
        `cars for sale Saudi`
      );
      baseKeywordsAr.push(
        `${prop.car_make} ${prop.car_model || ''} ${typeAr}`,
        `سيارة ${prop.car_make}`,
        `سيارات للبيع مصر`,
        `سيارات للبيع الإمارات`,
        `سيارات للبيع السعودية`,
        `سيارات مستعملة`,
        `سيارات مستعملة مصر`,
        `سيارات مستعملة الإمارات`,
        `سيارات مستعملة السعودية`,
        `${prop.car_make} ${cityAr}`
      );
    }

    // Add electronics-specific keywords
    if (prop.electronics_type) {
      baseKeywordsEn.push(
        `${prop.electronics_type} for sale`,
        `${prop.electronics_brand || ''} ${prop.electronics_type}`,
        `electronics Egypt`,
        `electronics UAE`,
        `electronics Saudi Arabia`,
        `${prop.electronics_type} ${city}`
      );
      baseKeywordsAr.push(
        `${prop.electronics_type} للبيع`,
        `إلكترونيات مصر`,
        `إلكترونيات الإمارات`,
        `إلكترونيات السعودية`,
        `${prop.electronics_type} ${cityAr}`
      );
    }

    // Add mobile-specific keywords
    if (prop.mobile_brand) {
      baseKeywordsEn.push(
        `${prop.mobile_brand} ${prop.mobile_model || ''} for sale`,
        `${prop.mobile_brand} mobile Egypt`,
        `${prop.mobile_brand} mobile UAE`,
        `${prop.mobile_brand} mobile Saudi Arabia`,
        `mobiles for sale ${city}`,
        `smartphones Egypt`,
        `smartphones UAE`,
        `smartphones Saudi Arabia`
      );
      baseKeywordsAr.push(
        `${prop.mobile_brand} ${prop.mobile_model || ''} للبيع`,
        `موبايل ${prop.mobile_brand}`,
        `موبايلات للبيع مصر`,
        `موبايلات للبيع الإمارات`,
        `موبايلات للبيع السعودية`,
        `تليفونات ${cityAr}`
      );
    }

    // Add job-specific keywords
    if (prop.job_type) {
      baseKeywordsEn.push(
        `${prop.job_type} job`,
        `jobs in ${city}`,
        `careers Egypt`,
        `careers UAE`,
        `careers Saudi Arabia`,
        `employment ${governorate}`,
        `work in ${city}`,
        `jobs Egypt`,
        `jobs UAE`,
        `jobs Saudi Arabia`
      );
      baseKeywordsAr.push(
        `وظيفة ${prop.job_type}`,
        `وظائف ${cityAr}`,
        `وظائف خالية مصر`,
        `وظائف خالية الإمارات`,
        `وظائف خالية السعودية`,
        `فرص عمل ${governorateAr}`,
        `وظائف في ${cityAr}`,
        `وظائف مصر`,
        `وظائف الإمارات`,
        `وظائف السعودية`
      );
    }

    // Add price range keywords
    if (prop.price) {
      const priceRange = prop.price < 1000000 ? 'affordable' : prop.price < 5000000 ? 'mid-range' : 'luxury';
      baseKeywordsEn.push(`${priceRange} ${categoryEnLabel}`);
      
      const priceRangeAr = prop.price < 1000000 ? 'رخيص' : prop.price < 5000000 ? 'متوسط السعر' : 'فاخر';
      baseKeywordsAr.push(`${categoryArLabel} ${priceRangeAr}`);
    }

    // Add features keywords
    if (prop.has_parking) {
      baseKeywordsEn.push('parking available', 'with parking');
      baseKeywordsAr.push('موقف سيارات', 'به جراج');
    }
    if (prop.has_garden) {
      baseKeywordsEn.push('with garden', 'garden view');
      baseKeywordsAr.push('به حديقة', 'حديقة خاصة');
    }
    if (prop.has_pool) {
      baseKeywordsEn.push('with pool', 'swimming pool');
      baseKeywordsAr.push('به حمام سباحة', 'مسبح');
    }

    const keywordsEn = baseKeywordsEn.filter(Boolean).join(', ');
    const keywordsAr = baseKeywordsAr.filter(Boolean).join(', ');

    return { keywordsEn, keywordsAr };
  };

  const nextImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

 const handleShowPhone = () => {
  setShowPhone(true);
};

const openLightbox = (index: number) => {
  setCurrentImageIndex(index);
  setIsLightboxOpen(true);
  document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
};

const closeLightbox = () => {
  setIsLightboxOpen(false);
  document.body.style.overflow = 'unset';
};

const nextImageLightbox = () => {
  if (property && property.images.length > 0) {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  }
};

const prevImageLightbox = () => {
  if (property && property.images.length > 0) {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  }
};

// Handle keyboard navigation
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isLightboxOpen) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextImageLightbox();
    } else if (e.key === 'ArrowLeft') {
      prevImageLightbox();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [isLightboxOpen, property]);

  if (loading) {
    return (
      <div className={`container mx-auto px-4 py-8 mt-20 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className={`container mx-auto px-4 py-8 mt-20 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            {isRTL ? 'العقار غير موجود' : 'Property Not Found'}
          </h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <Button onClick={() => navigate('/marketplace')}>
            {isRTL ? 'العودة إلى السوق' : 'Back to Marketplace'}
          </Button>
        </div>
      </div>
    );
  }

  const { keywordsEn, keywordsAr } = generateSEOKeywords(property);
  const categoryAr: Record<string, string> = {
    apartment: 'شقة',
    villa: 'فيلا',
    townhouse: 'تاون هاوس',
    land: 'أرض',
    commercial: 'عقار تجاري',
    building: 'مبنى',
    car: 'سيارة',
    electronics: 'إلكترونيات',
    mobile: 'موبايل',
    job: 'وظيفة'
  };
  const typeAr = property.rent_or_buy === 'rent' ? 'للإيجار' : 'للبيع';
  const typeEn = property.rent_or_buy === 'rent' ? 'for rent' : 'for sale';
  const categoryArLabel = categoryAr[property.category] || 'عقار';
  const governorate = property.governorate?.name_en || property.location_governorate || '';
  const city = property.city?.name_en || property.location_city || '';
  const governorateAr = property.governorate?.name_ar || property.location_governorate || '';
  const cityAr = property.city?.name_ar || property.location_city || '';

  // Enhanced title with brand variations
  const titleEn = `${property.title} | ${property.category} ${typeEn} in ${city} ${governorate} Egypt | 7agty حاجتي`;
  const titleAr = `${property.title} | ${categoryArLabel} ${typeAr} في ${cityAr} ${governorateAr} مصر | حاجتي 7agty`;
  
  // Enhanced description with more details
  const descEn = `${property.title} - ${property.category} ${typeEn} in ${city}, ${governorate}, Egypt. ${property.bedrooms ? `${property.bedrooms} bedrooms, ` : ''}${property.bathrooms ? `${property.bathrooms} bathrooms, ` : ''}${property.area ? `${property.area} sqm. ` : ''}${property.car_make ? `${property.car_make} ${property.car_model || ''}, ` : ''}${property.mobile_brand ? `${property.mobile_brand} ${property.mobile_model || ''}, ` : ''}Price: ${property.formatted_price}. Contact seller on 7agty حاجتي - Middle East's leading marketplace for properties, cars, electronics & jobs in Egypt, UAE & Saudi Arabia.`;
  
  const descAr = `${property.title} - ${categoryArLabel} ${typeAr} في ${cityAr}، ${governorateAr}، مصر. ${property.bedrooms ? `${property.bedrooms} غرف نوم، ` : ''}${property.bathrooms ? `${property.bathrooms} حمام، ` : ''}${property.area ? `${property.area} متر مربع. ` : ''}${property.car_make ? `${property.car_make} ${property.car_model || ''}، ` : ''}${property.mobile_brand ? `${property.mobile_brand} ${property.mobile_model || ''}، ` : ''}السعر: ${property.formatted_price}. تواصل مع البائع على حاجتي 7agty - أكبر سوق إلكتروني في الشرق الأوسط للعقارات والسيارات والإلكترونيات والوظائف في مصر والإمارات والسعودية.`;

  const propertyImage = property.images && property.images.length > 0 ? getImageUrl(property.images[0]) : 'https://7agty.com/og-image.jpg';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": property.rent_or_buy === 'rent' ? "RentAction" : "Product",
    "name": property.title,
    "description": property.description,
    "image": property.images && property.images.length > 0 ? property.images.map(img => getImageUrl(img)) : [propertyImage],
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "EGP",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Person",
        "name": property.user_name || property.user?.name
      }
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": governorate,
      "addressCountry": "Egypt"
    },
    ...(property.bedrooms && { "numberOfRooms": property.bedrooms }),
    ...(property.bathrooms && { "numberOfBathroomsTotal": property.bathrooms }),
    ...(property.area && { "floorSize": { "@type": "QuantitativeValue", "value": property.area, "unitCode": "MTK" } })
  };

  return (
  <>
    <SEO 
      title={titleEn}
      titleAr={titleAr}
      description={descEn}
      descriptionAr={descAr}
      keywords={keywordsEn}
      keywordsAr={keywordsAr}
      canonical={`https://7agty.com/property/${property.id}`}
      ogImage={propertyImage}
      structuredData={structuredData}
    />
    
    {/* Full-Screen Image Lightbox */}
    {isLightboxOpen && property && property.images.length > 0 && (
      <div 
        className="fixed inset-0 z-[9999] bg-black bg-opacity-95 flex items-center justify-center"
        onClick={closeLightbox}
      >
        {/* Close Button */}
        <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 z-[10000] w-12 h-12 flex items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-all"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Counter */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm z-[10000]">
          {currentImageIndex + 1} / {property.images.length}
        </div>

        {/* Previous Button */}
        {property.images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImageLightbox();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-[10000] w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-all"
            aria-label="Previous image"
          >
            <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        )}

        {/* Main Image */}
        <div 
          className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={getImageUrl(property.images[currentImageIndex])}
            alt={`${property.title} - Image ${currentImageIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        {/* Next Button */}
        {property.images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImageLightbox();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-[10000] w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-all"
            aria-label="Next image"
          >
            <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        )}

        {/* Thumbnail Strip - Desktop Only */}
        {property.images.length > 1 && (
          <div className="hidden md:flex absolute bottom-4 left-1/2 transform -translate-x-1/2 gap-2 bg-black bg-opacity-60 p-2 rounded-lg max-w-[90vw] overflow-x-auto">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={getImageUrl(image)}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover rounded cursor-pointer transition-all ${
                  currentImageIndex === index 
                    ? 'ring-2 ring-white opacity-100' 
                    : 'opacity-50 hover:opacity-75'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </div>
        )}

        {/* Swipe Indicators for Mobile */}
        <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-60 px-4 py-2 rounded-full">
          {isRTL ? 'اسحب لتغيير الصورة' : 'Swipe to change image'}
        </div>
      </div>
    )}
    
    <div className={`container mx-auto px-4 py-8 mt-20 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className={`mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {isRTL ? <ArrowRight className="w-4 h-4 ml-2" /> : <ArrowLeft className="w-4 h-4 mr-2" />}
          {isRTL ? 'رجوع' : 'Back'}
        </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-0">
              {property.images && property.images.length > 0 ? (
                <div className="relative">
                  <img
                    src={getImageUrl(property.images[currentImageIndex])}
                    alt={property.title}
                   className="w-full h-96 object-cover rounded-t-lg cursor-pointer"
onClick={() => openLightbox(currentImageIndex)}
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  
                  {property.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={prevImage}
                      >
                        <ArrowLeft className="w-6 h-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={nextImage}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </Button>
                      
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {property.images.length}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-t-lg">
                  <Home className="w-24 h-24 text-gray-400" />
                </div>
              )}
              
              {property.images && property.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={getImageUrl(image)}
                      alt={`${property.title} ${index + 1}`}
                      className={`w-20 h-20 object-cover rounded cursor-pointer ${
                        currentImageIndex === index ? 'ring-2 ring-green-600' : 'opacity-60 hover:opacity-100'
                      }`}
                     onClick={() => {
  setCurrentImageIndex(index);
  openLightbox(index);
}}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <CardTitle className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {getCategoryIcon(property.category)}
                  <span>{property.title}</span>
                </CardTitle>
                <div className="flex gap-2">
                  {property.listing_type && (
                    <Badge className="capitalize">
                      {property.listing_type.replace('_', ' ')}
                    </Badge>
                  )}
                  <Badge className={property.rent_or_buy === 'rent' ? 'bg-blue-600' : 'bg-green-600'}>
                    {isRTL ? (property.rent_or_buy === 'rent' ? 'إيجار' : 'شراء') : (property.rent_or_buy === 'rent' ? 'Rent' : 'Buy')}
                  </Badge>
                </div>
              </div>
              
              {/* Publisher Info */}
              {property.user && (
                <div className={`flex items-center gap-2 mt-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <User className="w-4 h-4" />
                  <span className="font-medium">{property.user_name}</span>
                  {property.username && (
                    <span className="text-gray-500">@{property.username}</span>
                  )}
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Type-Specific Details Section */}
              {property.listing_type === 'property' && (
                <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                  <h3 className="font-semibold text-lg mb-2">{isRTL ? 'تفاصيل العقار' : 'Property Details'}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {property.category && <div><strong>{isRTL ? 'الفئة:' : 'Category:'}</strong> <span className="capitalize">
                      {property.category === 'villa' ? (isRTL ? 'فيلا' : 'Villa') :
                       property.category === 'apartment' ? (isRTL ? 'شقة' : 'Apartment') :
                       property.category === 'land' ? (isRTL ? 'أرض' : 'Land') :
                       property.category === 'townhouse' ? (isRTL ? 'تاون هاوس' : 'Townhouse') :
                       property.category === 'building' ? (isRTL ? 'مبنى' : 'Building') :
                       property.category === 'commercial' ? (isRTL ? 'تجاري' : 'Commercial') :
                       property.category === 'other' ? (isRTL ? 'أخرى' : 'Other') :
                       property.category}
                    </span></div>}
                    {property.rent_or_buy && <div><strong>{isRTL ? 'النوع:' : 'Type:'}</strong> <span className="capitalize">{property.rent_or_buy === 'rent' ? (isRTL ? 'إيجار' : 'Rent') : (isRTL ? 'شراء' : 'Buy')}</span></div>}
                    {property.bedrooms && property.bedrooms > 0 && <div><strong>{isRTL ? 'غرف النوم:' : 'Bedrooms:'}</strong> {property.bedrooms}</div>}
                    {property.bathrooms && property.bathrooms > 0 && <div><strong>{isRTL ? 'الحمامات:' : 'Bathrooms:'}</strong> {property.bathrooms}</div>}
                    {property.area && property.area > 0 && <div><strong>{isRTL ? 'المساحة:' : 'Area:'}</strong> {property.area.toLocaleString()} {isRTL ? 'م²' : 'm²'}</div>}
                    {property.floor_number && <div><strong>{isRTL ? 'الطابق:' : 'Floor:'}</strong> {property.floor_number}</div>}
                    {property.total_floors && <div><strong>{isRTL ? 'إجمالي الطوابق:' : 'Total Floors:'}</strong> {property.total_floors}</div>}
                    {property.built_year && <div><strong>{isRTL ? 'سنة البناء:' : 'Built Year:'}</strong> {property.built_year}</div>}
                  </div>
                </div>
              )}
              
              {property.listing_type === 'car' && (property.car_make || property.car_model || property.car_year) && (
                <div className="bg-green-50 p-4 rounded-lg space-y-2">
                  <h3 className="font-semibold text-lg mb-2">{isRTL ? 'تفاصيل السيارة' : 'Car Details'}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {property.car_make && <div><strong>{isRTL ? 'الصانع:' : 'Make:'}</strong> <span className="capitalize">{property.car_make}</span></div>}
                    {property.car_model && <div><strong>{isRTL ? 'الطراز:' : 'Model:'}</strong> <span className="capitalize">{property.car_model}</span></div>}
                    {property.car_year && <div><strong>{isRTL ? 'السنة:' : 'Year:'}</strong> {property.car_year}</div>}
                    {property.car_condition && <div><strong>{isRTL ? 'الحالة:' : 'Condition:'}</strong> <span className="capitalize">
                      {property.car_condition === 'new' ? (isRTL ? 'جديد' : 'New') :
                       property.car_condition === 'used' ? (isRTL ? 'مستعمل' : 'Used') :
                       property.car_condition}
                    </span></div>}
                    {property.car_mileage && <div><strong>{isRTL ? 'المسافة:' : 'Mileage:'}</strong> {property.car_mileage.toLocaleString()} {isRTL ? 'كم' : 'km'}</div>}
                    {property.car_transmission && <div><strong>{isRTL ? 'ناقل الحركة:' : 'Transmission:'}</strong> <span className="capitalize">
                      {property.car_transmission === 'automatic' ? (isRTL ? 'أوتوماتيك' : 'Automatic') :
                       property.car_transmission === 'manual' ? (isRTL ? 'يدوي' : 'Manual') :
                       property.car_transmission}
                    </span></div>}
                    {property.car_fuel_type && <div><strong>{isRTL ? 'نوع الوقود:' : 'Fuel Type:'}</strong> <span className="capitalize">
                      {property.car_fuel_type === 'petrol' ? (isRTL ? 'بنزين' : 'Petrol') :
                       property.car_fuel_type === 'diesel' ? (isRTL ? 'ديزل' : 'Diesel') :
                       property.car_fuel_type === 'electric' ? (isRTL ? 'كهربائي' : 'Electric') :
                       property.car_fuel_type === 'hybrid' ? (isRTL ? 'هجين' : 'Hybrid') :
                       property.car_fuel_type}
                    </span></div>}
                  </div>
                </div>
              )}
              
              {property.listing_type === 'electronics' && (
                <div className="bg-purple-50 p-4 rounded-lg space-y-2">
                  <h3 className="font-semibold text-lg mb-2">{isRTL ? 'تفاصيل الإلكترونيات' : 'Electronics Details'}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {property.electronics_type && <div><strong>{isRTL ? 'النوع:' : 'Type:'}</strong> <span className="capitalize">
                      {(() => {
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
                    </span></div>}
                    {property.electronics_brand && <div><strong>{isRTL ? 'العلامة التجارية:' : 'Brand:'}</strong> <span className="capitalize">{property.electronics_brand}</span></div>}
                    {property.electronics_condition && <div><strong>{isRTL ? 'الحالة:' : 'Condition:'}</strong> <span className="capitalize">
                      {(() => {
                        const condition = property.electronics_condition?.toLowerCase().replace(/ /g, '_');
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
                        if (!condition) return property.electronics_condition;
                        return isRTL 
                          ? (conditionTranslations[condition] || property.electronics_condition)
                          : property.electronics_condition;
                      })()}
                    </span></div>}
                  </div>
                </div>
              )}
              
              {property.listing_type === 'mobile' && (property.mobile_brand || property.mobile_model) && (
                <div className="bg-pink-50 p-4 rounded-lg space-y-2">
                  <h3 className="font-semibold text-lg mb-2">{isRTL ? 'تفاصيل الهاتف' : 'Mobile Details'}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {property.mobile_brand && <div><strong>{isRTL ? 'العلامة التجارية:' : 'Brand:'}</strong> <span className="capitalize">{property.mobile_brand}</span></div>}
                    {property.mobile_model && <div><strong>{isRTL ? 'الطراز:' : 'Model:'}</strong> <span className="capitalize">{property.mobile_model}</span></div>}
                    {property.mobile_storage && <div><strong>{isRTL ? 'السعة:' : 'Storage:'}</strong> {property.mobile_storage}</div>}
                    {property.mobile_condition && <div><strong>{isRTL ? 'الحالة:' : 'Condition:'}</strong> <span className="capitalize">
                      {(() => {
                        const condition = property.mobile_condition?.toLowerCase().replace(/ /g, '_');
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
                        if (!condition) return property.mobile_condition;
                        return isRTL 
                          ? (conditionTranslations[condition] || property.mobile_condition)
                          : property.mobile_condition;
                      })()}
                    </span></div>}
                  </div>
                </div>
              )}
              
              {property.listing_type === 'job' && property.job_type && (
                <div className="bg-orange-50 p-4 rounded-lg space-y-2">
                  <h3 className="font-semibold text-lg mb-2">{isRTL ? 'تفاصيل الوظيفة' : 'Job Details'}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {property.job_type && <div><strong>{isRTL ? 'نوع الوظيفة:' : 'Job Type:'}</strong> <span className="capitalize">
                      {(() => {
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
                    </span></div>}
                    {property.job_employment_type && <div><strong>{isRTL ? 'نوع التوظيف:' : 'Employment Type:'}</strong> <span className="capitalize">
                      {property.job_employment_type === 'full_time' ? (isRTL ? 'دوام كامل' : 'Full Time') :
                       property.job_employment_type === 'part_time' ? (isRTL ? 'دوام جزئي' : 'Part Time') :
                       property.job_employment_type === 'contract' ? (isRTL ? 'عقد' : 'Contract') :
                       property.job_employment_type === 'freelance' ? (isRTL ? 'مستقل' : 'Freelance') :
                       property.job_employment_type}
                    </span></div>}
                    {property.job_location_type && <div><strong>{isRTL ? 'نوع الموقع:' : 'Location Type:'}</strong> <span className="capitalize">
                      {property.job_location_type === 'remote' ? (isRTL ? 'عن بعد' : 'Remote') :
                       property.job_location_type === 'onsite' ? (isRTL ? 'في الموقع' : 'Onsite') :
                       property.job_location_type === 'hybrid' ? (isRTL ? 'هجين' : 'Hybrid') :
                       property.job_location_type}
                    </span></div>}
                    {property.job_experience_level && <div><strong>{isRTL ? 'مستوى الخبرة:' : 'Experience Level:'}</strong> <span className="capitalize">
                      {(() => {
                        const experienceLevelTranslations: { [key: string]: string } = {
                          entry: 'مبتدئ',
                          junior: 'مبتدئ',
                          mid: 'متوسط',
                          senior: 'خبير',
                          expert: 'خبير متقدم',
                          manager: 'إداري'
                        };
                        return isRTL 
                          ? (experienceLevelTranslations[property.job_experience_level?.toLowerCase()] || property.job_experience_level)
                          : property.job_experience_level;
                      })()}
                    </span></div>}
                    {property.job_salary_min && property.job_salary_max && (
                      <div><strong>{isRTL ? 'الراتب:' : 'Salary:'}</strong> {property.job_salary_min.toLocaleString()} - {property.job_salary_max.toLocaleString()}</div>
                    )}
                  </div>
                </div>
              )}
              
              {property.listing_type === 'vehicle_booking' && property.vehicle_type && (
                <div className="bg-cyan-50 p-4 rounded-lg space-y-2">
                  <h3 className="font-semibold text-lg mb-2">{isRTL ? 'تفاصيل حجز المركبة' : 'Vehicle Booking Details'}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {property.vehicle_type && <div><strong>{isRTL ? 'نوع المركبة:' : 'Vehicle Type:'}</strong> <span className="capitalize">
                      {(() => {
                        const vehicleTypeTranslations: { [key: string]: string } = {
                          car: 'سيارة',
                          suv: 'سيارة دفع رباعي',
                          van: 'فان',
                          truck: 'شاحنة',
                          bus: 'حافلة',
                          motorcycle: 'دراجة نارية',
                          bicycle: 'دراجة',
                          boat: 'قارب',
                          yacht: 'يخت',
                          jet_ski: 'دراجة مائية',
                          other: 'أخرى'
                        };
                        return isRTL 
                          ? (vehicleTypeTranslations[property.vehicle_type?.toLowerCase()] || property.vehicle_type)
                          : property.vehicle_type;
                      })()}
                    </span></div>}
                    {property.vehicle_rental_duration && <div><strong>{isRTL ? 'مدة الإيجار:' : 'Rental Duration:'}</strong> <span className="capitalize">
                      {(() => {
                        const durationTranslations: { [key: string]: string } = {
                          hourly: 'ساعي',
                          daily: 'يومي',
                          weekly: 'أسبوعي',
                          monthly: 'شهري'
                        };
                        return isRTL 
                          ? (durationTranslations[property.vehicle_rental_duration?.toLowerCase()] || property.vehicle_rental_duration)
                          : property.vehicle_rental_duration;
                      })()}
                    </span></div>}
                    {property.vehicle_with_driver !== undefined && (
                      <div><strong>{isRTL ? 'خيار السائق:' : 'Driver Option:'}</strong> {property.vehicle_with_driver ? (isRTL ? 'مع سائق' : 'With Driver') : (isRTL ? 'قيادة ذاتية' : 'Self Drive')}</div>
                    )}
                  </div>
                </div>
              )}
              
              {property.listing_type === 'doctor_booking' && (property.doctor_specialty || property.booking_type) && (
                <div className="bg-red-50 p-4 rounded-lg space-y-2">
                  <h3 className="font-semibold text-lg mb-2">{isRTL ? 'تفاصيل حجز الطبيب' : 'Doctor Booking Details'}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {property.doctor_specialty && <div><strong>{isRTL ? 'التخصص:' : 'Specialty:'}</strong> <span className="capitalize">
                      {(() => {
                        const specialty = property.doctor_specialty?.toLowerCase().replace(/ /g, '_');
                        const specialtyTranslations: { [key: string]: string } = {
                          general: 'طب عام',
                          general_practitioner: 'طب عام',
                          dentist: 'أسنان',
                          dentistry: 'أسنان',
                          pediatrics: 'أطفال',
                          pediatrician: 'أطفال',
                          cardiology: 'قلب',
                          cardiologist: 'قلب',
                          dermatology: 'جلدية',
                          dermatologist: 'جلدية',
                          orthopedics: 'عظام',
                          orthopedist: 'عظام',
                          neurology: 'أعصاب',
                          neurologist: 'أعصاب',
                          psychiatry: 'نفسية',
                          psychiatrist: 'نفسية',
                          ophthalmology: 'عيون',
                          ophthalmologist: 'عيون',
                          ent: 'أنف وأذن وحنجرة',
                          otolaryngology: 'أنف وأذن وحنجرة'
                        };
                        if (!specialty) return property.doctor_specialty;
                        return isRTL 
                          ? (specialtyTranslations[specialty] || property.doctor_specialty)
                          : property.doctor_specialty;
                      })()}
                    </span></div>}
                    {property.booking_type && <div><strong>{isRTL ? 'نوع الحجز:' : 'Booking Type:'}</strong> <span className="capitalize">
                      {(() => {
                        const bookingType = property.booking_type?.toLowerCase().replace(/ /g, '_').replace(/-/g, '_');
                        const bookingTypeTranslations: { [key: string]: string } = {
                          online: 'استشارة أونلاين',
                          online_consultation: 'استشارة أونلاين',
                          in_person: 'حضوري',
                          inperson: 'حضوري',
                          clinic: 'حضوري',
                          visit: 'حضوري'
                        };
                        if (!bookingType) return property.booking_type;
                        return isRTL 
                          ? (bookingTypeTranslations[bookingType] || property.booking_type)
                          : property.booking_type;
                      })()}
                    </span></div>}
                  </div>
                </div>
              )}
              
              <div className={`flex items-center gap-2 text-2xl font-bold text-green-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <DollarSign className="w-8 h-8" />
                <span>{formatPrice(property.price, property.rent_or_buy)}</span>
              </div>

              <div className={`flex items-center gap-2 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>
                  {isRTL 
                    ? `${property.city?.name_ar || property.location_city}, ${property.governorate?.name_ar || property.location_governorate}`
                    : `${property.city?.name_en || property.location_city}, ${property.governorate?.name_en || property.location_governorate}`}
                  {property.location_country && `, ${property.location_country}`}
                </span>
              </div>

              <div className={`flex items-center gap-2 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Calendar className="w-5 h-5 flex-shrink-0" />
                <span>
                  {isRTL ? 'نُشر في: ' : 'Posted on: '}
                  {new Date(property.created_at).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {isRTL ? 'الوصف' : 'Description'}
                </h3>
                <p className="text-gray-700 leading-relaxed break-words whitespace-pre-wrap">
                  {property.description}
                </p>
              </div>

              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.bedrooms && (
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Bed className="w-5 h-5 text-green-600" />
                      <span>{property.bedrooms} {isRTL ? 'غرف نوم' : 'Bedrooms'}</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Bath className="w-5 h-5 text-green-600" />
                      <span>{property.bathrooms} {isRTL ? 'حمامات' : 'Bathrooms'}</span>
                    </div>
                  )}
                  {property.area && (
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Maximize className="w-5 h-5 text-green-600" />
                      <span>{property.area} {isRTL ? 'م²' : 'm²'}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className={isRTL ? 'text-right' : ''}>
                {isRTL ? 'معلومات البائع' : 'Seller Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-200 transition-colors"
                     onClick={() => navigate(`/profile/${property.user.id}`)}>
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="font-semibold cursor-pointer hover:text-green-600 transition-colors"
                     onClick={() => navigate(`/profile/${property.user.id}`)}>
                    {property.user_name}
                  </p>
                  <p className="text-sm text-gray-500">{isRTL ? 'البائع' : 'Seller'}</p>
                </div>
              </div>

              <div className="space-y-2">
                {/* Call Button */}
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    if (showPhone && property.user_phone) {
                      window.location.href = `tel:${property.user_phone}`;
                    } else {
                      setShowPhone(true);
                    }
                  }}
                >
                  <Phone className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {showPhone 
                    ? (isRTL ? 'اضغط للاتصال' : 'Click to Call')
                    : (isRTL ? 'عرض رقم الهاتف' : 'Show Phone Number')
                  }
                </Button>
                
                {/* Phone Number Display - Below Call Button */}
                {showPhone && (
                  property.user_phone ? (
                    <div 
                      className={`w-full p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300`}
                    >
                      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Phone className="w-5 h-5 text-white" />
                          </div>
                          <div className={isRTL ? 'text-right' : ''}>
                            <p className="text-xs text-gray-600 mb-0.5">
                              {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                            </p>
                            <a 
                              href={`tel:${property.user_phone}`}
                              className="text-lg font-bold text-blue-600 hover:text-blue-800 hover:underline"
                              dir="ltr"
                            >
                              {property.user_phone}
                            </a>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowPhone(false);
                          }}
                          className="h-8 w-8 p-0 hover:bg-blue-100"
                        >
                          <span className="text-gray-500 text-lg">✕</span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className={`w-full p-3 bg-yellow-50 border-2 border-yellow-200 rounded-lg ${isRTL ? 'text-right' : ''}`}>
                      <p className="text-sm text-gray-600">
                        {isRTL ? 'رقم الهاتف غير متوفر' : 'Phone number not available'}
                      </p>
                    </div>
                  )
                )}
                
                {/* Chat Button */}
                <ChatButton 
                  userId={property.user.id}
                  userName={property.user_name}
                  className="w-full bg-green-600 hover:bg-green-700"
                  variant="default"
                  showName={true}
                />
              </div>

              <div className="pt-4 border-t">
                <div className={`flex items-center justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-600">{isRTL ? 'المشاهدات:' : 'Views:'}</span>
                  <span className="font-semibold">{property.views_count}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};

export default PropertyDetail;