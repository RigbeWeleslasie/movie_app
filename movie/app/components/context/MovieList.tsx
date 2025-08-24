
"use client";

import { Movie } from "@/app/utils/type";
import MovieCard from "./MovieCard"; 
import useFavorites from "@/app/hooks/useFavourites";

interface MovieListProps {
  movies: Movie[];
  title?: string;
}

export default function MovieList({ movies, title = "Latest Movies & Series" }: MovieListProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (!movies || movies.length === 0) {
    return (
      <section className="p-5">
        <h2 className="text-3xl sm:text-4xl font-semibold mt-10 mb-8 text-gray-800 dark:text-gray-100">
          {title}
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No movies to display in this list right now.
        </p>
      </section>
    );
  }

  return (
    <section className="p-5">
      <h2 className="text-3xl sm:text-4xl font-semibold mt-10 mb-8 text-gray-800 dark:text-gray-100">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onAddFavorite={addFavorite} 
            onRemoveFavorite={removeFavorite}
            isCurrentlyFavorite={isFavorite(movie.id)} 
          />
        ))}
      </div>
    </section>
  );
}
