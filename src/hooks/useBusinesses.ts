import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';

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

  const STORAGE_KEY = 'localBusinesses';

  const fetchBusinesses = useCallback(async () => {
    try {
      setLoading(true);
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: Business[] = JSON.parse(saved);
        setBusinesses(parsed);
      } else {
        // Seed storage with mock data on first run
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockBusinesses));
        setBusinesses(mockBusinesses);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load businesses');
      setBusinesses(mockBusinesses);
    } finally {
      setTimeout(() => setLoading(false), 200);
    }
  }, []);

  const persist = (items: Business[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    setBusinesses(items);
  };

  const createBusiness = async (
    businessData: Omit<Business, 'id' | 'created_at' | 'updated_at'>
  ) => {
    try {
      const now = new Date().toISOString();
      const newBiz: Business = {
        ...businessData,
        id: uuidv4(),
        created_at: now,
        updated_at: now,
      };
      const next = [newBiz, ...businesses];
      persist(next);
      return newBiz;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create business');
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
    loading,
    error,
    createBusiness,
    searchBusinesses,
  };
};