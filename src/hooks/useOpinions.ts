import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Opinion {
  id: string;
  user_id: string;
  business_id: string;
  type: 'complaint' | 'praise' | 'suggestion';
  title: string;
  content: string;
  rating?: number;
  status: 'pending' | 'under_review' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  is_anonymous: boolean;
  is_public: boolean;
  proof_files?: string[];
  created_at: string;
  updated_at: string;
  business?: {
    name: string;
    category: string;
  };
  profile?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export const useOpinions = (businessId?: string) => {
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchOpinions = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('opinions')
        .select(`
          *,
          business:businesses(name, category),
          profile:profiles(full_name, avatar_url)
        `);

      if (businessId) {
        query = query.eq('business_id', businessId);
      }

      const { data, error } = await query
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOpinions((data || []) as Opinion[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createOpinion = async (opinionData: {
    business_id: string;
    type: 'complaint' | 'praise' | 'suggestion';
    title: string;
    content: string;
    rating?: number;
    is_anonymous?: boolean;
    is_public?: boolean;
    proof_files?: string[];
  }) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      const { data, error } = await supabase
        .from('opinions')
        .insert([{
          ...opinionData,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;
      await fetchOpinions(); // Refresh the list
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateOpinionStatus = async (opinionId: string, status: Opinion['status']) => {
    try {
      const { error } = await supabase
        .from('opinions')
        .update({ status })
        .eq('id', opinionId);

      if (error) throw error;
      await fetchOpinions(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  useEffect(() => {
    fetchOpinions();
  }, [businessId, user]);

  return {
    opinions,
    loading,
    error,
    fetchOpinions,
    createOpinion,
    updateOpinionStatus,
  };
};