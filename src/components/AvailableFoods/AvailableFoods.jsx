



import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Blocks } from "react-loader-spinner";
import Food from "../Food/Food";
import { useEffect, useState } from "react";

const AvailableFoods = () => {
    const foods = useLoaderData(); // Initial data from loader
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [loadedFoods, setLoadedFoods] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading spinner
    const [sortOption, setSortOption] = useState(""); // State for sorting option
    const [isThreeColumn, setIsThreeColumn] = useState(true); // State for layout toggle

    useEffect(() => {
        // Filter only available foods on initial load
        const availableFoods = foods.filter((food) => food.status === "available");
        setTimeout(() => {
            setLoadedFoods(availableFoods);
            setLoading(false); // Disable loading after data is set
        }, 1000); // Adjust delay as needed
    }, [foods]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter foods based on the search query
        const filteredFoods = foods.filter((food) => {
            return food.status === "available" && food.foodName.toLowerCase().includes(query);
        });
        setLoadedFoods(filteredFoods);
    };

    const handleSort = (e) => {
        const option = e.target.value;
        setSortOption(option);

        // Sort foods based on the selected option
        if (option === "expireDate") {
            const sortedFoods = [...loadedFoods].sort(
                (a, b) => new Date(a.expiredDateTime) - new Date(b.expiredDateTime)
            );
            setLoadedFoods(sortedFoods);
        }
    };

    const toggleLayout = () => {
        setIsThreeColumn(!isThreeColumn); // Toggle between three and two column layout
    };

    return (
        <div className="mt-10 lg:mt-36 mb-10 lg:mb-36">
            <Helmet>
                <title>Available Food | FoodLink</title>
            </Helmet>

            {/* Show Spinner if Loading */}
            {loading ? (
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
            ) : (
                <>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-center font-bold mb-10 lg:mb-20 text-orange-700">
                        Available Food
                    </h2>

                    {/* Search, Sort, and Layout Toggle Section */}
                    <div className="flex flex-col mx-auto md:flex-row justify-center px-10 mb-10 gap-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search by food name..."
                            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        />
                        <select
                            value={sortOption}
                            onChange={handleSort}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        >
                            <option value="">Sort By</option>
                            <option value="expireDate">Expire Date</option>
                        </select>
                        <button
                            onClick={toggleLayout}
                            className="px-4 py-2 bg-orange-700 text-white rounded-lg focus:outline-none hover:bg-orange-600"
                        >
                            Change Layout
                        </button>
                    </div>

                    {/* Foods Grid */}
                    <div className="flex mx-5">
                        <div
                            className={`mx-auto grid ${
                                isThreeColumn
                                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                                    : "grid-cols-1 md:grid-cols-2"
                            } gap-10`}
                        >
                            {loadedFoods.map((food) => (
                                <Food food={food} key={food._id} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AvailableFoods;
