import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <>
      <Header />
      <main className="p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {favorites.length > 0 ? (
          favorites.map(movie => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No favorites added yet.</p>
        )}
      </main>
    </>
  );
}
