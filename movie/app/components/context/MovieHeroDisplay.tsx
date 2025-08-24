
"use client";

import { Movie } from "@/app/utils/type";

interface MovieHeroDisplayProps { 
  movie: Movie; 
  onAddFavorite: (movie: Movie) => void;
  isMovieFavorite: (id: number) => boolean; 
}

const DEFAULT_BACKDROP_PLACEHOLDER = "/images/default-backdrop.jpg"; 

export default function MovieHeroDisplay({ movie, onAddFavorite, isMovieFavorite }: MovieHeroDisplayProps) {
  if (!movie) {
    return <div className="h-[70vh] flex items-center justify-center bg-gray-700 text-white">Loading hero...</div>;
  }

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : DEFAULT_BACKDROP_PLACEHOLDER; 

  const isCurrentlyFavorite = isMovieFavorite(movie.id); 
  
  let favoriteButton;
  if (isCurrentlyFavorite) {
    favoriteButton = (
      <button 
        disabled 
        className="mt-5 px-6 py-3 w-auto sm:w-1/5 bg-gray-600 text-gray-300 rounded-lg cursor-not-allowed shadow-md text-sm sm:text-base"
      >
        Added to Favorites
      </button>
    );
  } else {
    favoriteButton = (
      <button
        onClick={() => onAddFavorite(movie)} 
        className="mt-5 px-6 py-3 w-auto sm:w-1/5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out text-sm sm:text-base"
      >
        Add to Favorites
      </button>
    );
  }

  return (
    <section
      className="relative h-[70vh] sm:h-[80vh] bg-cover bg-center text-white p-6 sm:p-10 flex flex-col justify-end sm:justify-center items-center sm:items-start text-center sm:text-left"
      style={{ 
        backgroundImage: backdropUrl ? `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%), url(${backdropUrl})` : 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%)',
        backgroundColor: (!backdropUrl && !movie.backdrop_path) ? '#2D3748' : undefined
      }}
    >
      <div className="bg-black bg-opacity-30 p-4 rounded-md sm:bg-transparent sm:p-0"> 
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-3 drop-shadow-lg">
          {movie.title || "Movie Title"} 
        </h1>
        <p className="max-w-xl sm:max-w-3xl mb-6 text-base sm:text-lg lg:text-xl drop-shadow-md line-clamp-3 sm:line-clamp-none">
          {movie.overview || "No overview."}
        </p>
        {favoriteButton}
      </div>
    </section>
  );
}
