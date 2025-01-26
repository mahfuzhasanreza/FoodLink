
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { Blocks } from "react-loader-spinner";

const FoodDetails = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const food = useLoaderData();
    const navigate = useNavigate();

    //console.log(food);

    const {
        _id,
        foodName,
        foodImage,
        foodQuantity,
        pickupLocation,
        expiredDateTime,
        additionalNotes,
        donatorName,
        donatorEmail,
        status,
    } = food;

    useEffect(() => {
        // Simulate data loading
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const handleRequest = (e) => {
        e.preventDefault();

        const requestData = {
            foodId: _id,
            foodName,
            foodImage,
            donatorName,
            donatorEmail,
            userEmail: user.email,
            requestDate: new Date().toISOString(),
            pickupLocation,
            expiredDateTime,
            additionalNotes: e.target.additionalNotes.value,
            status: "requested",
        };

        // console.log(requestData);  // Log request data to console for debugging

        // Send the request data to the backend
        fetch("https://a10-server-seven.vercel.app/request-food", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then((res) => res.json())
            .then((data) => {
                //     console.log(data, "DATAAAAAAAAAAAAAAAAAAAAAAAAA");
                if (data.insertId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Food requested successfully.",
                        icon: "success",
                        confirmButtonText: "Continue",
                    });
                    setModalOpen(false); // Close modal
                    navigate('/available-foods');
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: `${data.message}` || "Unable to request food. Please try again.",
                        icon: "error",
                        confirmButtonText: "Retry",
                    });
                }
            })
        // .catch((error) => {
        //     Swal.fire({
        //         title: "Error!",
        //         text: "Unable to send the request. Please try again.",
        //         icon: "error",
        //         confirmButtonText: "Retry",
        //     });
        // });
    };


    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <Blocks
                    height="100"
                    width="100"
                    color="#4fa94d"
                    ariaLabel="blocks-loading"
                    visible={true}
                />
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>{foodName || "Food Details"} | FoodLink</title>
            </Helmet>


            <div className="px-4 lg:px-0 container mx-auto py-10">
                <div className="flex items-center lg:items-start flex-col lg:flex-row gap-10">
                    {/* Image Section */}
                    <div className="flex-1">
                        <img src={foodImage} alt={foodName} className="rounded-lg shadow-lg w-full" />
                    </div>

                    {/* Details Section */}
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Food Name: {foodName}</h1>
                        <p className="mb-2">
                            <span className="font-bold">Quantity:</span> {foodQuantity}
                        </p>
                        <p className="mb-2">
                            <span className="font-bold">Pickup Location:</span> {pickupLocation}
                        </p>
                        <p className="mb-2">
                            <span className="font-bold">Expire Date:</span> {new Date(expiredDateTime).toLocaleString()}
                        </p>
                        <p className="mb-4">
                            <span className="font-bold">Additional Notes:</span> {additionalNotes}
                        </p>
                        <p className="mb-4">
                            <span className="font-bold">Donator:</span> {donatorName} ({donatorEmail})
                        </p>

                        <button
                            onClick={() => setModalOpen(true)}
                            className="px-5 py-3 bg-orange-600 w-full lg:w-1/2 hover:bg-gray-500 text-white font-semibold rounded-lg"
                        >
                            Request Food
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Section */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 lg:w-1/3 max-h-screen overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Request Food</h2>
                        <form onSubmit={handleRequest}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Food Name:</label>
                                <input
                                    type="text"
                                    value={foodName}
                                    readOnly
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Food Image:</label>
                                <input
                                    type="text"
                                    value={foodImage}
                                    readOnly
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Food ID:</label>
                                <input
                                    type="text"
                                    value={_id}
                                    readOnly
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Donator Email:</label>
                                <input
                                    type="text"
                                    value={donatorEmail}
                                    readOnly
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Donator Name:</label>
                                <input
                                    type="text"
                                    value={donatorName}
                                    readOnly
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">User Email:</label>
                                <input
                                    type="text"
                                    value={user.email}
                                    readOnly
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Request Date:</label>
                                <input
                                    type="text"
                                    value={new Date().toLocaleString()}
                                    readOnly
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Pickup Location:</label>
                                <input
                                    type="text"
                                    value={pickupLocation}
                                    readOnly
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Expire Date:</label>
                                <input
                                    type="text"
                                    value={new Date(expiredDateTime).toLocaleString()}
                                    readOnly
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Additional Notes:</label>
                                <textarea
                                    name="additionalNotes"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg w-full"
                            >
                                Request Food
                            </button>
                        </form>
                        <button
                            onClick={() => setModalOpen(false)}
                            className="mt-4 px-5 py-2 bg-red-600 text-white font-semibold rounded-lg w-full"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default FoodDetails;
