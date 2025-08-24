"use client";

import useFavorites from "@/app/hooks/useFavourites";
import MovieCard from "./MovieCard"; 
import React from 'react';


export default function FavoritesList() {
  
  const { favorites, removeFavorite, isFavorite } = useFavorites();

  const NoFavoritesMessage = (
    <div className="text-center py-16 px-6">
      <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-6">
        {"You haven't added any movies to your favorites yet."}
      </p>
     
    </div>
  );

  if (!favorites || favorites.length === 0) {
    return NoFavoritesMessage;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {favorites.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onRemoveFavorite={() => removeFavorite(movie.id)}
          isFavorite={true} 
        />
      ))}
    </div>
  );
}
