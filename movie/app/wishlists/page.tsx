"use client";
import AppHeader from "@/app/components/context/AppHeader";
import MovieList from "@/app/components/context/MovieList";
import useFavorites from "@/app/hooks/useFavourites"; 
import Link from "next/link";


export default function WishlistPage() { 
  const { favorites } = useFavorites(); 

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AppHeader />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-gray-800 dark:text-gray-100">
          My Wishlist 
        </h1>

        {favorites && favorites.length > 0 ? (
          <MovieList
            movies={favorites}
            title="" 
          />
        ) : (
          <div className="text-center py-16 px-6">
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-6">
              {"You haven't added any movies to your wishlist yet."}
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Browse Movies
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
