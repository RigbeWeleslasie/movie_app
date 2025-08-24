
"use client";

import { useState, useEffect } from "react";
import { Movie } from "@/app/utils/movieDetails";

const FAVORITES_KEY = "myFavorites"; 

export default function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);


  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        const parsedFavorites: Movie[] = JSON.parse(stored);
     
        if (Array.isArray(parsedFavorites)) {
         
          const uniqueFavoritesMap = new Map<number, Movie>();
          parsedFavorites.forEach(movie => {
            if (!uniqueFavoritesMap.has(movie.id)) {
              uniqueFavoritesMap.set(movie.id, movie);
            }
          });
          const uniqueFavoritesArray = Array.from(uniqueFavoritesMap.values());
          setFavorites(uniqueFavoritesArray);
        

        } else {
          console.warn("Data in localStorage for favorites was not an array. Resetting.");
          setFavorites([]);
          localStorage.setItem(FAVORITES_KEY, JSON.stringify([]));
        }
      } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error);
        setFavorites([]); 
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([]));
      }
    }
  }, []); 
  const addFavorite = (movieToAdd: Movie) => {
    if (favorites.some((favMovie) => favMovie.id === movieToAdd.id)) {
      console.log(`Movie with ID ${movieToAdd.id} (${movieToAdd.title || 'Untitled'}) is already in favorites.`);
      return; 
    }
    const updatedFavorites = [...favorites, movieToAdd];
    setFavorites(updatedFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (idToRemove: number) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== idToRemove);
    setFavorites(updatedFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  };
  const isFavorite = (idToCheck: number): boolean => {
    return favorites.some((movie) => movie.id === idToCheck);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
