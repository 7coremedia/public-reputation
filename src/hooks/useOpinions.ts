import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Opinion {
    id: string;
    businessName: string; // Added to link opinions to businesses
    type: 'Complaint' | 'Praise' | 'Suggestion';
    proofUrls: string[]; // Assuming proof is stored as URLs
    story: string;
    rating: '😡 Horrible' | '😞 Disappointing' | '😐 Mid' | '🙂 Okay' | '😃 Good' | '🤩 Excellent';
    allowContact: boolean;
    anonymous: boolean;
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
            console.error("Error loading opinions from localStorage:", error);
            return []; // Return empty array in case of error
        }
    });

    // Save opinions to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(opinions));
        } catch (error) {
            console.error("Error saving opinions to localStorage:", error);
        }
    }, [opinions]); // Corrected dependency array

    const createOpinion = useCallback((opinionData: Omit<Opinion, 'id' | 'created_at' | 'businessName'>, businessName: string) => {
        const newOpinion: Opinion = {
            ...opinionData,
            id: uuidv4(),
            businessName, // Assign the business name
            created_at: new Date().toISOString(),
        };
        setOpinions(prevOpinions => [...prevOpinions, newOpinion]);
        return newOpinion;
    }, []);

    return {
        opinions,
        createOpinion,
        // Add other functions here as needed
    };
};

export default useOpinions;