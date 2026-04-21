import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Home, 
  Car, 
  Laptop, 
  Smartphone, 
  Briefcase, 
  Bus, 
  Stethoscope 
} from 'lucide-react';

export type ListingTypeValue = 
  | 'property' 
  | 'car' 
  | 'electronics' 
  | 'mobile' 
  | 'job' 
  | 'vehicle_booking' 
  | 'doctor_booking';

interface ListingTypeSelectorProps {
  value: ListingTypeValue;
  onChange: (value: ListingTypeValue) => void;
  disabled?: boolean;
}

const listingTypes = [
  {
    value: 'property' as ListingTypeValue,
    name_en: 'Property',
    name_ar: 'عقار',
    icon: Home,
    color: 'from-blue-500 to-blue-600',
  },
  {
    value: 'car' as ListingTypeValue,
    name_en: 'Car',
    name_ar: 'سيارة',
    icon: Car,
    color: 'from-green-500 to-green-600',
  },
  {
    value: 'electronics' as ListingTypeValue,
    name_en: 'Electronics',
    name_ar: 'إلكترونيات',
    icon: Laptop,
    color: 'from-purple-500 to-purple-600',
  },
  {
    value: 'mobile' as ListingTypeValue,
    name_en: 'Mobile & Tablet',
    name_ar: 'موبايل وتابلت',
    icon: Smartphone,
    color: 'from-pink-500 to-pink-600',
  },
  {
    value: 'job' as ListingTypeValue,
    name_en: 'Job',
    name_ar: 'وظيفة',
    icon: Briefcase,
    color: 'from-orange-500 to-orange-600',
  },
  {
    value: 'vehicle_booking' as ListingTypeValue,
    name_en: 'Book a Vehicle',
    name_ar: 'حجز سيارة',
    icon: Bus,
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    value: 'doctor_booking' as ListingTypeValue,
    name_en: 'Book a Doctor',
    name_ar: 'حجز طبيب',
    icon: Stethoscope,
    color: 'from-red-500 to-red-600',
  },
];

const ListingTypeSelector: React.FC<ListingTypeSelectorProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {language === 'ar' ? 'نوع الإعلان' : 'Listing Type'}
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {listingTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = value === type.value;

          return (
            <button
              key={type.value}
              type="button"
              onClick={() => !disabled && onChange(type.value)}
              disabled={disabled}
              className={`
                relative flex flex-col items-center justify-center p-4 rounded-lg 
                border-2 transition-all duration-200
                ${
                  isSelected
                    ? `border-transparent bg-gradient-to-br ${type.color} text-white shadow-lg scale-105`
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-800'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <Icon
                className={`w-8 h-8 mb-2 ${
                  isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                }`}
              />
              <span className={`text-sm font-medium text-center ${
                isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300'
              }`}>
                {language === 'ar' ? type.name_ar : type.name_en}
              </span>
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ListingTypeSelector;
