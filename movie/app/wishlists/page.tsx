import { useState } from "react";
import { Movie } from "../utils/type";

interface Props {
  movie: Movie;
  onAddFavorite: (movie: Movie) => void;
  isFavorite: boolean;
}

export default function MovieCard({ movie, onAddFavorite, isFavorite }: Props) {
  const [added, setAdded] = useState(false);

  const handleAddFavorite = () => {
    onAddFavorite(movie);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000); 
  };

  return (
    <div className="w-44 m-2 rounded-lg overflow-hidden shadow-lg bg-white">
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : "/placeholder.png"}
        alt={movie.title}
        className="w-full object-cover"
      />
      <div className="p-3">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-gray-700">Rating: {movie.vote_average}</p>
        {!isFavorite ? (
          <button
            onClick={handleAddFavorite}
            className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {added ? "Added to Favorites" : "Add to Favorites"}
          </button>
        ) : (
          <button disabled className="w-full px-3 py-2 bg-gray-500 text-white rounded cursor-not-allowed">
            In Favorites
          </button>
        )}
      </div>
    </div>
  );
}
