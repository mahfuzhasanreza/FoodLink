import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Blocks } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const MyFoodRequest = () => {
    const { user } = useContext(AuthContext);
    const [foodRequests, setFoodRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch the food requests for the logged-in user
    useEffect(() => {
        if (!user) return;

        setIsLoading(true);

        axios
            .get(`https://a10-server-seven.vercel.app/food-requests?userEmail=${user.email}`, { withCredentials: true })
            .then((response) => {
                setFoodRequests(response.data);
            })
            .catch(() => {
                Swal.fire('Error', 'Failed to fetch your food requests!', 'error');
            })
            .finally(() => setIsLoading(false));
    }, [user]);

    return (
        <div className="px-4 max-w-6xl mx-auto my-16">
            <Helmet>
                <title>My Food Request | FoodLink</title>
            </Helmet>
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Blocks
                        height="100"
                        width="100"
                        color="#4fa94d"
                        ariaLabel="blocks-loading"
                        visible={true}
                    />
                </div>
            )}

            <h1 className="text-5xl text-orange-700 font-bold mb-8">My Food Requests</h1>

            {foodRequests.length > 0 ? (
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full bg-white border-separate border border-gray-200 rounded-lg">
                        <thead className="bg-orange-500 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left">Food Name</th>
                                <th className="px-6 py-3 text-left">Donator Name</th>
                                <th className="px-6 py-3 text-left">Donator Email</th>
                                <th className="px-6 py-3 text-left">Request Date</th>
                                <th className="px-6 py-3 text-left">Pickup Location</th>
                                <th className="px-6 py-3 text-left">Expire Date</th>
                                <th className="px-6 py-3 text-left">Additional Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodRequests.map((request) => (
                                <tr key={request._id} className="border-t hover:bg-gray-100">
                                    <td className="px-6 py-4">{request.foodName}</td>
                                    <td className="px-6 py-4">{request.donatorName || 'N/A'}</td>
                                    <td className="px-6 py-4">{request.donatorEmail || 'N/A'}</td>
                                    <td className="px-6 py-4">
                                        {new Date(request.requestDate).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">{request.pickupLocation}</td>
                                    <td className="px-6 py-4">
                                        {request.expiredDateTime ? new Date(request.expiredDateTime).toLocaleString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">{request.additionalNotes || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-xl text-center mt-8">You have no food requests yet.</p>
            )}
        </div>
    );
};

export default MyFoodRequest;
