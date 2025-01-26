import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Movie from "../Food/Food";
import Swal from "sweetalert2";
import ShowFavoriteMovie from "../ShowFavoriteMovie/ShowFavoriteMovie";
import { Helmet } from "react-helmet-async";
import { Blocks } from "react-loader-spinner"; // Ensure you have this library installed

const MyFavorite = () => {
    const movies = useLoaderData();
    const [loadedMovies, setLoadedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
            setLoadedMovies(movies);
            setIsLoading(false);
        }, 1000); // Adjust the delay as needed
    }, [movies]);

    // console.log(loadedMovies);

    return (
        <div className="mt-10 lg:mt-36 mb-10 lg:mb-36 px-20">
            <Helmet>
                <title>Favorites | FoodLink</title>
            </Helmet>

            {/* Loading Spinner */}
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Blocks
                        height="100"
                        width="100"
                        color="#4fa94d"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        visible={true}
                    />
                </div>
            )}

            {/* Content */}
            {!isLoading && (
                <>
                    <h2 className="text-5xl lg:text-6xl text-center font-bold mb-10 lg:mb-20 text-orange-700">
                        My Favorite Movies
                    </h2>

                    {loadedMovies.length === 0 ? (
                        <div>
                            <h3 className="text-orange-400 font-bold text-4xl my-32 text-center">
                                No Favorite Movie Added
                            </h3>
                        </div>
                    ) : (
                        ""
                    )}

                    {/* Movie Grid */}
                    <div className="flex mx-auto">
                        <div
                            className={`mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10`}
                        >
                            {loadedMovies.map((movie) => (
                                <ShowFavoriteMovie
                                    movie={movie}
                                    loadedMovies={loadedMovies}
                                    setLoadedMovies={setLoadedMovies}
                                    key={movie._id}
                                ></ShowFavoriteMovie>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyFavorite;
