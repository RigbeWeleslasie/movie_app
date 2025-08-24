"use client";

import useFavorites from "@/app/hooks/useFavourites";
import MovieCard from "./MovieCard";
import React from 'react';

export default function FavoritesList() {
  const { favorites, removeFavorite, isFavorite } = useFavorites();
  const NoFavoritesMessage = (
    <p className="text-center text-gray-500 mt-8">
      You haven't added any movies to your favorites yet.
    </p>
  );
  if (favorites.length === 0) {
    return NoFavoritesMessage;
  }
  return (
    <div className="flex flex-wrap gap-5 justify-center">
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

