import { useState, useEffect, useCallback } from "react";
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

const mockBusinesses: Business[] = [
  // From Homepage
  {
    id: "1",
    name: "Pawsitively Purrfect Pet Store",
    category: "Pet Services",
    description: "Your one-stop shop for all your pet needs!",
    image_url: "/placeholder.svg",
    is_verified: true,
    is_claimed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "The Daily Grind Coffee Shop",
    category: "Food & Beverage",
    description: "Serving the freshest brews and pastries.",
    image_url: "/placeholder.svg",
    is_verified: false,
    is_claimed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Reflect & Restore Yoga Studio",
    category: "Health & Wellness",
    description: "Find your inner peace with our experienced instructors.",
    image_url: "/placeholder.svg",
    is_verified: true,
    is_claimed: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Code & Coffee Co-working Space",
    category: "Professional Services",
    description: "Productive environment for remote workers and freelancers.",
    image_url: "/placeholder.svg",
    is_verified: true,
    is_claimed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Green Thumb Landscaping",
    category: "Home Services",
    description: "Transforming your outdoor spaces into beautiful havens.",
    image_url: "/placeholder.svg",
    is_verified: false,
    is_claimed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Refurbished Electronics Outlet",
    category: "Retail",
    description: "Affordable and reliable refurbished gadgets.",
    image_url: "/placeholder.svg",
    is_verified: true,
    is_claimed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // From SubmitOpinion page
  {
    id: "7",
    name: "Reflection Beauty Clinic",
    category: "Health & Wellness",
    description: "State-of-the-art beauty treatments.",
    image_url: "/placeholder.svg",
    is_verified: true,
    is_claimed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Mary's Kitchen",
    category: "Food & Beverage",
    description: "Homestyle cooking with love.",
    image_url: "/placeholder.svg",
    is_verified: false,
    is_claimed: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "9",
    name: "72 Wears",
    category: "Fashion",
    description: "Trendy and affordable fashion for all.",
    image_url: "/placeholder.svg",
    is_verified: true,
    is_claimed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "10",
    name: "Quick Mart Express",
    category: "Retail",
    description: "Your neighborhood convenience store.",
    image_url: "/placeholder.svg",
    is_verified: false,
    is_claimed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];


export const useBusinesses = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinesses = useCallback(async () => {
    try {
      setLoading(true);
      // First, try to fetch from Supabase
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        // If Supabase fails or returns no data, use the mock data
        console.log("Supabase fetch failed or returned no data, falling back to mock businesses.");
        setBusinesses(mockBusinesses);
      } else {
        // Otherwise, use the data from Supabase
        setBusinesses(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error("Error fetching businesses, falling back to mock data.", err);
      setBusinesses(mockBusinesses); // Fallback to mock data on any exception
    } finally {
      // Simulate a short delay to prevent jarring UI flashes on fast networks
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }, []);

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

  const searchBusinesses = useCallback((query: string, category?: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = (businesses).filter(business => {
      const matchesQuery =
        business.name.toLowerCase().includes(lowerCaseQuery) ||
        business.category.toLowerCase().includes(lowerCaseQuery) ||
        business.description?.toLowerCase().includes(lowerCaseQuery);

      const matchesCategory = !category || category === "all" || business.category === category;
      return matchesQuery && matchesCategory;
    });
    setBusinesses(filtered); // Update the state with filtered businesses
  }, [businesses]); // Add businesses as a dependency

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  return {
    businesses,
    loading,    error,
    createBusiness,    searchBusinesses,
  };
};