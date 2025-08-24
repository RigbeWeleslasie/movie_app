
"use client";

import Link from "next/link";
import SearchBar from "./SearchHeader";
import useFavorites from "@/app/hooks/useFavourites";

export default function AppHeader() {
    const { favorites } = useFavorites();

    return (
        <header className="flex flex-wrap sm:flex-nowrap justify-between items-center p-10 bg-black text-white shadow-md sticky top-0 z-50">
            <Link href="/" className="text-3xl font-extrabold hover:text-blue-400 transition">
                Movie
            </Link>
            <div className="w-full sm:w-auto order-3 sm:order-2 mt-4 sm:mt-0 mx-0 sm:mx-4 flex-grow sm:flex-grow-0">
                <SearchBar />
            </div>
            <Link href="/wishlists" className="order-2 sm:order-3">
                <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                >
                    Favorites ({favorites.length})
                </button>
            </Link>
        </header>
    );
}

