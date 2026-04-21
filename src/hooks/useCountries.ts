import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/config/api';

export interface Country {
  id: number;
  name_en: string;
  name_ar: string;
  code: string;
  phone_code: string;
  currency_code: string;
  currency_symbol: string;
  is_active: boolean;
}

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${API_URL}/countries`);
        if (response.data.success) {
          setCountries(response.data.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch countries');
        console.error('Error fetching countries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};

export const useCountryGovernorates = (countryId: number | null) => {
  const [governorates, setGovernorates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!countryId) {
      setGovernorates([]);
      return;
    }

    const fetchGovernorates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/countries/${countryId}/governorates`);
        if (response.data.success) {
          setGovernorates(response.data.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch governorates');
        console.error('Error fetching governorates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGovernorates();
  }, [countryId]);

  return { governorates, loading, error };
};

export const useGovernorateCities = (governorateId: number | null) => {
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!governorateId) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/governorates/${governorateId}/cities`);
        if (response.data.success) {
          setCities(response.data.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch cities');
        console.error('Error fetching cities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [governorateId]);

  return { cities, loading, error };
};
