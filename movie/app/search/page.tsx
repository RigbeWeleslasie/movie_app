"use client";
const api_key= process.env.NEXT_PUBLIC_TMDB_API_KEY;
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react'; 
import { Movie } from "@/app/utils/movieDetails"; 
import AppHeader from '../components/context/AppHeader'; 
import MovieList from '../components/context/MovieList'; 


function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400 mb-6"></div>
            <p className="text-xl font-medium text-gray-700 dark:text-gray-300">Searching for cinematic treasures...</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Please wait a moment.</p>
        </div>
    );
}
function ErrorState({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6">
            
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Oops! Something went wrong.</h3>
            <p className="text-md text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                {message || "We couldn't complete your search. Please try again later."}
            </p>
           
        </div>
    );
}


function SearchResultsComponent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (query && query.trim() !== "") {
            const currentSearchQuery: string = query; 
            async function fetchSearchResults() {
                setIsLoading(true);
                setError(null);
                setSearchResults([]);
                try {
                  
                    if (!api_key) throw new Error("API key not configured.");
                    
                    const response = await fetch(
                        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(currentSearchQuery)}&language=en-US&page=1&include_adult=false`
                    );

                    if (!response.ok) {
                        let errorMsg = `Search failed (Status: ${response.status})`;
                        try {
                            const errData = await response.json();
                            errorMsg = errData.status_message || errorMsg;
                        } catch { 
                        throw new Error(errorMsg);
                        }
                    }

                    const data = await response.json();
                    setSearchResults(data.results as Movie[] || []);
                } catch (err) {
                    console.error("Search fetch error:", err);
                    setError(err instanceof Error ? err.message : "An unknown error occurred.");
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-slate-200 dark:from-gray-900 dark:to-slate-800 transition-colors duration-300">
            <AppHeader />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                <div className="mb-10 md:mb-14 text-center">
                    {query && query.trim() !== "" ? (
                        <>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
                                Results for: <span className="text-blue-600 dark:text-blue-400">&quot;{query}&quot;</span>
                            </h1>
                            {searchResults.length > 0 && !isLoading && (
                                <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                                    Found {searchResults.length} {searchResults.length === 1 ? 'movie' : 'movies'}.
                                </p>
                            )}
                        </>
                    ) : (
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
                            Search Our Movie Database
                        </h1>
                    )}
                </div>

                {isLoading && <LoadingState />}
                {error && <ErrorState message={error} />}

                {!isLoading && !error && (
                    <>
                        {searchResults.length === 0 && query && query.trim() !== "" && (
                            <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-lg">
                               
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                                    No movies found for &quot;{query}&quot;
                                </h3>
                                <p className="text-md text-gray-600 dark:text-gray-400 max-w-md">
                                    Try refining your search, checking for typos, or using different keywords.
                                </p>
                            </div>
                        )}
                        {searchResults.length === 0 && (!query || query.trim() === "") && (
                            <div className="flex flex-col items-center justify-center text-center py-20 px-6">
                                
                                <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Start Your Search</h3>
                                <p className="text-md text-gray-500 dark:text-gray-400 max-w-md">
                                    Use the search bar in the header to find specific movies by title.
                                </p>
                            </div>
                        )}
                        {searchResults.length > 0 && (
                            <MovieList movies={searchResults} title="" /> 
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
export default function SearchResultsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-gray-100 to-slate-200 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center">
                <LoadingState /> 
            </div>
        }>
            <SearchResultsComponent />
        </Suspense>
    );
}

