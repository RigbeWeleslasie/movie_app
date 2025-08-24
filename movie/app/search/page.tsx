
"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Movie } from '@/app/utils/type';
import AppHeader from '../components/context/AppHeader';

function LoadingState() {
    return <div className="text-center py-10">Searching for movies...</div>;
}

function ErrorState({ message }: { message: string }) {
    return <div className="text-center py-10 text-red-500">Error: {message}</div>;
}

export default function SearchResultsPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (query) {
            async function fetchSearchResults() {
                setIsLoading(true);
                setError(null);
                setSearchResults([]);
                try {
                    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                    if (!apiKey) {
                        throw new Error("API key not configured for search.");
                    }
                    const response = await fetch(
                        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`
                    );

                    if (!response.ok) {
                        const errData = await response.json().catch(() => ({}));
                        throw new Error(`Search API request failed: ${errData.status_message || response.statusText}`);
                    }

                    const data = await response.json();
                    if (data.results) {
                        setSearchResults(data.results as Movie[]);
                    } else {
                        setSearchResults([]);
                    }
                } catch (err) {
                    console.error("Search fetch error:", err);
                    setError(err instanceof Error ? err.message : "Failed to fetch search results.");
                } finally {
                    setIsLoading(false);
                }
            }
            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [query]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <AppHeader />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                    Search Results {query ? `for "${query}"` : ""}
                </h1>
                {isLoading && <LoadingState />}
                {error && <ErrorState message={error} />}
                {!isLoading && !error && searchResults.length === 0 && query && (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        No movies found for "{query}". Try a different search term.
                    </p>
                )}
                {!isLoading && !error && searchResults.length === 0 && !query && (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        Please enter a search term to find movies.
                    </p>
                )}
                {!isLoading && !error && searchResults.length > 0 && (
                    <MovieList movies={searchResults} title="" />

                )}
            </main>
        </div>
    );
}

