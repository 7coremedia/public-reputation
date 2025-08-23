import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Opinion type aligned with usage across pages like `Home.tsx` and `BusinessPortal.tsx`
export interface Opinion {
  id: string;
  business_id: string;
  type: 'complaint' | 'praise' | 'suggestion';
  title: string;
  content: string;
  rating: number | null; // 1-5 or null
  status: 'pending' | 'reviewed' | 'resolved' | 'rejected';
  is_anonymous?: boolean;
  user_id?: string;
  profile?: { full_name?: string };
  created_at: string;
}

const STORAGE_KEY = 'localOpinions';

const useOpinions = () => {
  // Initialize opinions from localStorage or with an empty array
  const [opinions, setOpinions] = useState<Opinion[]>(() => {
    try {
      const savedOpinions = localStorage.getItem(STORAGE_KEY);
      return savedOpinions ? JSON.parse(savedOpinions) : [];
    } catch (error) {
      console.error('Error loading opinions from localStorage:', error);
      return [];
    }
  });

  // Save opinions to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(opinions));
    } catch (error) {
      console.error('Error saving opinions to localStorage:', error);
    }
  }, [opinions]);

  // Create and persist a new opinion
  const createOpinion = useCallback(
    (data: Omit<Opinion, 'id' | 'created_at'>) => {
      const newOpinion: Opinion = {
        ...data,
        id: uuidv4(),
        created_at: new Date().toISOString(),
      };
      setOpinions((prev) => [...prev, newOpinion]);
      return newOpinion;
    },
    []
  );

  return {
    opinions,
    createOpinion,
  };
};

export default useOpinions;