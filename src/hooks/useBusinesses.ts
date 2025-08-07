import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Business {
  id: string;
  name: string;
  category: string;
  description?: string;
  image_url?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  latitude?: number;
  longitude?: number;
  is_verified: boolean;
  is_claimed: boolean;
  claimed_by?: string;
  created_at: string;
  updated_at: string;
}

export const useBusinesses = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBusinesses(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const searchBusinesses = async (query: string, category?: string) => {
    try {
      setLoading(true);
      let queryBuilder = supabase
        .from('businesses')
        .select('*');

      if (query) {
        queryBuilder = queryBuilder.or(`name.ilike.%${query}%,category.ilike.%${query}%`);
      }

      if (category && category !== 'all') {
        queryBuilder = queryBuilder.eq('category', category);
      }

      const { data, error } = await queryBuilder
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBusinesses(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createBusiness = async (businessData: Omit<Business, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .insert([businessData])
        .select()
        .single();

      if (error) throw error;
      await fetchBusinesses(); // Refresh the list
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  return {
    businesses,
    loading,
    error,
    fetchBusinesses,
    searchBusinesses,
    createBusiness,
  };
};