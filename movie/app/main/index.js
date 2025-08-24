import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { fetchLatestMovies, searchMovies } from '../utils/tmdb';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchLatestMovies().then(data => setMovies(data.results));
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      // Show latest movies if search empty
      const data = await fetchLatestMovies();
      setMovies(data.results);
      setSearching(false);
      return;
    }
    setSearching(true);
    const data = await searchMovies(query);
    setMovies(data.results);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <main className="p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </main>
    </>
  );
}
