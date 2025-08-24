"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Movie } from "@/app/utils/movieDetails"; 
import AppHeader from '../components/context/AppHeader'; 
import MovieList from '../components/context/MovieList'; 

function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 dark:border-blue-400 mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300">Searching for movies...</p>
        </div>
    );
}

function ErrorState({ message }: { message: string }) {
    return (
        <div className="text-center py-10 px-4">
            <div className="bg-red-100 dark:bg-red-800 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-200 p-6 rounded-lg shadow-md max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-2">Search Error</h3>
                <p>{message || "An unexpected error occurred."}</p>
            </div>
        </div>
    );
}

export default function SearchResultsPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (query && query.trim() !== "") { 
            async function fetchSearchResults() {
                setIsLoading(true);
                setError(null);
                setSearchResults([]); 
                try {
                    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                    if (!apiKey) {
                        throw new Error("API key not configured. Please check environment variables.");
                    }
                    const response = await fetch(
                        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`
                    );

                    if (!response.ok) {
                        let errorMsg = `Search API request failed. Status: ${response.status}`;
                        try {
                            const errData = await response.json();
                            errorMsg = errData.status_message || errorMsg;
                        } catch {  
                         throw new Error(errorMsg);}
                    }

                    const data = await response.json();
                    if (data.results && data.results.length > 0) {
                        setSearchResults(data.results as Movie[]);
                    } else {
                        setSearchResults([]); 
                    }
                } catch (err) {
                    console.error("Search fetch error:", err);
                    setError(err instanceof Error ? err.message : "An unknown error occurred while fetching search results.");
                } finally {
                    setIsLoading(false);
                }
            }
            fetchSearchResults();
        } else {
           
            setSearchResults([]);
            setIsLoading(false);
            setError(null);
        }
    }, [query]);

    const pageTitle = query ? (
        <>
            Results for <span className="text-blue-600 dark:text-blue-400">&quot;{query}&quot;</span>
        </>
    ) : (
        "Search Movies"
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <AppHeader />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl sm:text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-100">
                    {pageTitle}
                </h1>

                {isLoading && <LoadingState />}
                {error && <ErrorState message={error} />}

                {!isLoading && !error && (
                    <>
                        {searchResults.length === 0 && query && query.trim() !== "" && (
                            <p className="text-center text-gray-500 dark:text-gray-400 mt-10 text-lg">
                                {'No movies found for "'}
                                <span className="font-semibold">{query}</span>
                                {'". Try a different search term.'}
                            </p>
                        )}
                        {searchResults.length === 0 && (!query || query.trim() === "") && (
                            <p className="text-center text-gray-500 dark:text-gray-400 mt-10 text-lg">
                                Please enter a search term in the header to find movies.
                            </p>
                        )}
                        {searchResults.length > 0 && (
                            <MovieList movies={searchResults} title={`Search Results (${searchResults.length})`} />
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
