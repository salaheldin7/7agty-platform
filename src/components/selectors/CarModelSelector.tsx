import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCarModels } from '../../hooks/useListingTypes';

interface CarModelSelectorProps {
  make: string;
  value: string;
  onChange: (model: string) => void;
  disabled?: boolean;
  required?: boolean;
}

const CarModelSelector: React.FC<CarModelSelectorProps> = ({
  make,
  value,
  onChange,
  disabled = false,
  required = true,
}) => {
  const { language } = useLanguage();
  const { models, loading } = useCarModels(make);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {language === 'ar' ? 'الموديل' : 'Model'}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || loading || !make}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="">
          {!make
            ? (language === 'ar' ? 'اختر الماركة أولاً' : 'Select Make First')
            : loading
            ? (language === 'ar' ? 'جاري التحميل...' : 'Loading...')
            : (language === 'ar' ? 'اختر الموديل' : 'Select Model')}
        </option>
        {[...models].sort((a, b) => a.localeCompare(b)).map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CarModelSelector;
