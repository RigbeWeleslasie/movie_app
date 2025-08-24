"use client";

import useFavorites from "@/app/hooks/useFavourites";
import MovieCard from "./MovieCard"; 
import React from 'react'; 

export default function FavoritesList() {
  const { favorites, removeFavorite, isFavorite, addFavorite } = useFavorites(); 
  const NoFavoritesMessage = (
    <p className="text-center text-gray-500 dark:text-gray-400 mt-10 text-lg">
      {"You haven't added any movies to your favorites yet."} 
    </p>
  );

  if (!favorites || favorites.length === 0) {
    return (
      <div className="py-12"> 
        {NoFavoritesMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {favorites.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onRemoveFavorite={() => removeFavorite(movie.id)}
          isFavorite={isFavorite(movie.id)} 
        />
      ))}
    </div>
  );
}
