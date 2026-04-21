import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCountries, Country } from '../../hooks/useCountries';
import { Globe } from 'lucide-react';

interface CountrySelectorProps {
  value: number | null;
  onChange: (countryId: number | null) => void;
  disabled?: boolean;
  required?: boolean;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  value,
  onChange,
  disabled = false,
  required = true,
}) => {
  const { language } = useLanguage();
  const { countries, loading } = useCountries();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          {language === 'ar' ? 'الدولة' : 'Country'}
          {required && <span className="text-red-500">*</span>}
        </div>
      </label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : null)}
        disabled={disabled || loading}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="">
          {loading
            ? (language === 'ar' ? 'جاري التحميل...' : 'Loading...')
            : (language === 'ar' ? 'اختر الدولة' : 'Select Country')}
        </option>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {language === 'ar' ? country.name_ar : country.name_en}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
