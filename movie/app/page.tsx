
"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/app/utils/type";
import useFavorites from "@/app/hooks/useFavourites";
import AppHeader from "./components/context/AppHeader";
import MovieHeroDisplay from "./components/context/MovieHeroDisplay";
import MovieList from "./components/context/MovieList";
function LoadingState({ message = "Loading content..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[50vh] bg-gray-100 dark:bg-gray-900">
      <p className="text-xl text-gray-700 dark:text-gray-300">{message}</p>
    </div>
  );
}

function ErrorStateDisplay({ errorMessage }: { errorMessage: string | null }) {
  return (
    <div className="flex items-center justify-center min-h-[50vh] bg-red-100 dark:bg-red-800 p-6 rounded-lg shadow-md mx-auto max-w-lg text-center">
      <div>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">Oops! Something Went Wrong</h3>
        <p className="text-red-600 dark:text-red-400">{errorMessage || "An unknown error occurred."}</p>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Please try refreshing the page or check back later.</p>
      </div>
    </div>
  );
}


export default function HomePage() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | undefined>(undefined);
  const [latestMovies, setLatestMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function fetchPageData() {
      setIsLoading(true);
      setError(null);
      setFeaturedMovie(undefined);
      setLatestMovies([]);

      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        if (!apiKey) {
          throw new Error("TMDB API key is not configured.");
        }
        const [featuredResponse, latestResponse] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`),
          fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
        ]);

        if (!featuredResponse.ok) {
          const errData = await featuredResponse.json().catch(() => ({}));
          throw new Error(`Failed to fetch featured movie: ${errData.status_message || featuredResponse.statusText}`);
        }
        if (!latestResponse.ok) {
          const errData = await latestResponse.json().catch(() => ({}));
          throw new Error(`Failed to fetch latest movies: ${errData.status_message || latestResponse.statusText}`);
        }

        const featuredData = await featuredResponse.json();
        const latestData = await latestResponse.json();

        console.log("Featured Data:", featuredData);
        console.log("Latest Movies Data:", latestData);

        if (featuredData.results && featuredData.results.length > 0) {
          setFeaturedMovie(featuredData.results[0] as Movie);
        } else {
          console.warn("No featured movie found from API.");
        }

        if (latestData.results && latestData.results.length > 0) {
          setLatestMovies(latestData.results as Movie[]);
        } else {
          console.warn("No latest movies found from API.");
        }

      } catch (err) {
        console.error("Error fetching page data:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPageData();
  }, []);

  if (isLoading) {
    return (
      <>
        <AppHeader />
        <LoadingState />
      </>
    );
  }

  if (error) {
    return (
      <>
        <AppHeader />
        <ErrorStateDisplay errorMessage={error} />
      </>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppHeader />

      <main>
        {featuredMovie ? (
          <MovieHeroDisplay
            movie={featuredMovie}
            onAddFavorite={addFavorite}
            onRemoveFavorite={removeFavorite}
            isMovieFavorite={isFavorite}
          />
        ) : (
          <div className="h-[70vh] flex items-center justify-center bg-gray-300 dark:bg-gray-700">
            <p className="text-xl text-gray-700 dark:text-gray-200">No featured movie to display right now.</p>
          </div>
        )}

        <MovieList movies={latestMovies} title="Popular Movies & Series" />
      </main>
    </div>
  );
}
