   
    import { useState, useEffect, useCallback } from 'react';
    import { Movie } from '@/app/utils/movieDetails'; 

    const FAVORITES_KEY = 'movieFavorites';

    export default function useFavorites() {
        const [favorites, setFavorites] = useState<Movie[]>([]);

        useEffect(() => {
            try {
                const storedFavorites = localStorage.getItem(FAVORITES_KEY);
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                }
            } catch (error) {
                console.error("Error loading favorites from localStorage:", error);
            }
        }, []);

        const saveFavorites = useCallback((newFavorites: Movie[]) => {
            try {
                localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
                setFavorites(newFavorites); 
            } catch (error) {
                console.error("Error saving favorites to localStorage:", error);
            }
        }, []);

        const addFavorite = useCallback((movieToAdd: Movie) => {
            if (favorites.find(fav => fav.id === movieToAdd.id)) {
                console.log("Movie already in favorites:", movieToAdd.title);
                return; 
            }
            const newFavorites = [...favorites, movieToAdd];
            saveFavorites(newFavorites);
            console.log("Added to favorites:", movieToAdd.title, newFavorites);
        }, [favorites, saveFavorites]);

        const removeFavorite = useCallback((idToRemove: number) => {
            const newFavorites = favorites.filter(movie => movie.id !== idToRemove);
            saveFavorites(newFavorites);
            console.log("Removed from favorites, ID:", idToRemove, newFavorites);
        }, [favorites, saveFavorites]);

        const isFavorite = useCallback((idToCheck: number): boolean => {
            return !!favorites.find(movie => movie.id === idToCheck);
        }, [favorites]);

        return { favorites, addFavorite, removeFavorite, isFavorite };
    }
    