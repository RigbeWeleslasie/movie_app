import { Movie } from "@/app/utils/movieDetails";
import Link from "next/link";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie;
  onAddFavorite?: (movie: Movie) => void;
  onRemoveFavorite?: (id: number) => void;
  isFavorite?: boolean;
}

export default function MovieCard({
  movie,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
}: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "/images/placeholder-poster.png";

  const handleAddFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onAddFavorite) {
      onAddFavorite(movie);
    }
  };

  const handleRemoveFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onRemoveFavorite) {
      onRemoveFavorite(movie.id);
    }
  };

  const title = movie.title || "Untitled Movie";
  const rating = movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <div className="group rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:-translate-y-1 w-full">
     
      <Link 
        href={`/movie/${movie.id}`}
        className="block aspect-[2/3] relative w-full overflow-hidden" 
      >
        <Image
          src={posterUrl}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 ease-in-out group-hover:scale-110"
          priority={false}
        />
      </Link>
      <div className="p-4">
        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 truncate" title={title}>
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Rating: {rating}
        </p>
        <div className="mt-4">
          {isFavorite ? (
            onRemoveFavorite && (
              <button
                onClick={handleRemoveFavorite}
                className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
              >
                Remove Favorite
              </button>
            )
          ) : (
            onAddFavorite && (
              <button
                onClick={handleAddFavorite}
                className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
              >
                Add to Favorites
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

