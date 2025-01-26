import React, { useState, useEffect, useContext } from "react";
import { useLoaderData, Link } from "react-router-dom";
import Food from "../Food/Food";

const FeaturedFoods = () => {
    const foods = useLoaderData();
    const [loadedFoods, setLoadedFoods] = useState(foods);
    const [featuredFoods, setFeaturedFoods] = useState([]);

    useEffect(() => {
        // Sort foods by quantity and pick the top 6
        const sortedFoods = [...foods]
            .sort((a, b) => b.foodQuantity - a.foodQuantity)
            .slice(0, 6);
        setFeaturedFoods(sortedFoods);
    }, [foods]);

    return (
        <div className="mx-5 mt-4 md:mt-10 lg:mt-36 mb-10 lg:mb-36">
            <h2 className="mt-10 lg:mt-0 text-4xl md:text-5xl lg:text-6xl text-center font-bold mb-10 lg:mb-20 text-orange-700">
                Featured Foods
            </h2>

            {/* Top Featured Food Grid */}
            <div className="flex mx-auto">
                <div
                    className={`mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10`}
                >
                    {featuredFoods.map((food) => (
                        <Food
                            food={food}
                            loadedFoods={loadedFoods}
                            setLoadedFoods={setLoadedFoods}
                            key={food._id}
                        ></Food>
                    ))}
                </div>
            </div>

            {/* Show All Button */}
            <div className="text-center mt-8">
                <Link to="/available-foods">
                    <button className="btn bg-orange-700 text-white border-orange-700 rounded-full px-8 py-2">
                        Show All
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedFoods;
