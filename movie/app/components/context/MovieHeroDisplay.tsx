"use client";
import MovieList from "./MovieList";
import { Movie } from "@/app/utils/movieDetails";
const trendingMovie: Movie = {
  id: 1,
  title: "Inception",
  overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the chance to erase his criminal history.",
  poster_path: "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
  backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
  release_date: "2010-07-16",
  vote_average: 8.8,
};
const popularMovies: Movie[] = [
  { id: 2, title: "Interstellar", poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" } as Movie,
  { id: 3, title: "The Dark Knight", poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg" } as Movie,
  { id: 4, title: "Avatar", poster_path: "/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg" } as Movie,
];
export default function HomePage() {
  return (
    <main className="bg-black min-h-screen text-white">
      <section
        className="relative h-[80vh] w-full flex items-center justify-start px-6 sm:px-12"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${trendingMovie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg">
            {trendingMovie.title}
          </h1>
          <p className="text-base sm:text-lg mb-6 text-gray-200 line-clamp-3">
            {trendingMovie.overview}
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition">
              Show More
            </button>
          </div>
        </div>
      </section>
      <section className="relative z-10 -mt-10 space-y-16 p-6 sm:p-12 text-black justify-center">
        <MovieList movies={popularMovies} title="Popular Movies" />
        <MovieList movies={popularMovies} title="Top Rated" />
        <MovieList movies={popularMovies} title="Upcoming" />
      </section>
    </main>
  );
}











