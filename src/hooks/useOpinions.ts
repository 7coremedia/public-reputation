import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Opinion {
    id: string;
    business_id: string;
    content: string;
    created_at: string | null;
    is_anonymous: boolean | null;
    is_public: boolean | null;
    priority: string | null;
    proof_files: string[] | null;
    rating: number | null;
    status: string | null;
    title: string | null;
    type: string | null;
    user_id: string | null;
}

const useOpinions = () => {    const [opinions, setOpinions] = useState<Opinion[]>([]);
    useEffect(() => {
        const fetchOpinions = async () => {
            const { data, error } = await supabase
                .from('opinions')
                .select('*'); // Fetch all opinions for now

            if (error) {
                console.error('Error fetching opinions:', error);
            } else {                // Cast to Opinion[] assumes data structure matches Opinion interface
                setOpinions(data as Opinion[]);
            }
        };
        fetchOpinions();
    }, []); // Empty dependency array to fetch only once on mount

    return {
        opinions,
    };
};

export default useOpinions;