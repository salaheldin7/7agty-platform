import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCarMakes } from '../../hooks/useListingTypes';
import { Car } from 'lucide-react';

interface CarMakeSelectorProps {
  value: string;
  onChange: (make: string) => void;
  disabled?: boolean;
  required?: boolean;
}

const CarMakeSelector: React.FC<CarMakeSelectorProps> = ({
  value,
  onChange,
  disabled = false,
  required = true,
}) => {
  const { language } = useLanguage();
  const { carMakes, loading } = useCarMakes();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <Car className="w-4 h-4" />
          {language === 'ar' ? 'الماركة' : 'Make'}
          {required && <span className="text-red-500">*</span>}
        </div>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || loading}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="">
          {loading
            ? (language === 'ar' ? 'جاري التحميل...' : 'Loading...')
            : (language === 'ar' ? 'اختر الماركة' : 'Select Make')}
        </option>
        {[...carMakes].sort((a, b) => a.name.localeCompare(b.name)).map((make) => (
          <option key={make.name} value={make.name}>
            {make.name}
          </option>
        ))}
      </select>
      {value && carMakes.find(m => m.name === value)?.logo && (
        <div className="mt-2 flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <img
            src={carMakes.find(m => m.name === value)?.logo}
            alt={value}
            className="w-8 h-8 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">{value}</span>
        </div>
      )}
    </div>
  );
};

export default CarMakeSelector;
