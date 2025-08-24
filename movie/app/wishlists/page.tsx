// app/favorites/page.tsx
"use client";

import AppHeader from "@/app/components/context/AppHeader"; // Adjust path if necessary
import MovieList from "@/app/components/context/MovieList";   // Adjust path if necessary
import useFavorites from "@/app/hooks/useFavourites";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites } = useFavorites(); // Get the current list of favorite movies

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          My Favorite Movies
        </h1>

        {favorites.length > 0 ? (
          <MovieList movies={favorites} title="" /> // Pass empty title or customize MovieList
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
              You haven't added any movies to your favorites yet.
            </p>
            <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition">
                Browse movies and find some favorites!
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
