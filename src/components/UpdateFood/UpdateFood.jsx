import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Blocks } from 'react-loader-spinner';
import axios from 'axios';

const UpdateFood = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        foodName: '',
        foodImage: '',
        foodQuantity: '',
        pickupLocation: '',
        expiredDateTime: '',
        additionalNotes: '',
        donatorImage: user?.photoURL || '',
        donatorName: user?.displayName || '',
        donatorEmail: user?.email || '',
        status: 'available',
    });

    const [isLoading, setIsLoading] = useState(false);

    // Fetch the existing food data
    useEffect(() => {
        setIsLoading(true);
        // fetch(`https://a10-server-seven.vercel.app/food/${id}`)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setFormData(data);
        //     })
        //     .catch(() => {
        //         Swal.fire('Error', 'Failed to fetch food details!', 'error');
        //     })
        //     .finally(() => setIsLoading(false));
        axios.get(`https://a10-server-seven.vercel.app/food/${id}`, { withCredentials: true })
            .then((response) => {
                setFormData(response.data);
            })
            .catch(() => {
                Swal.fire('Error', 'Failed to fetch food details!', 'error');
            })
            .finally(() => setIsLoading(false));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        if (!formData.foodName || formData.foodName.length < 2) {
            Swal.fire('Error', 'Food Name must be at least 2 characters long!', 'error');
            return false;
        }
        if (!formData.foodImage || !/^https?:\/\/\S+$/.test(formData.foodImage)) {
            Swal.fire('Error', 'Food Image must be a valid link!', 'error');
            return false;
        }
        if (!formData.foodQuantity || isNaN(Number(formData.foodQuantity)) || Number(formData.foodQuantity) <= 0) {
            Swal.fire('Error', 'Food Quantity must be a positive number!', 'error');
            return false;
        }
        if (!formData.pickupLocation) {
            Swal.fire('Error', 'Pickup Location is required!', 'error');
            return false;
        }
        if (!formData.expiredDateTime) {
            Swal.fire('Error', 'Expiration Date/Time is required!', 'error');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (validateForm()) {
        //     setIsLoading(true);
        //     fetch(`https://a10-server-seven.vercel.app/food/${id}`, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData),
        //     })
        //         .then((res) => res.json())
        //         .then((data) => {
        //             if (data.modifiedCount > 0) {
        //                 Swal.fire('Success', 'Food updated successfully!', 'success');
        //                 navigate('/manage-foods'); // Redirect to a dashboard or another route
        //             } else {
        //                 Swal.fire('Info', 'No changes were made.', 'info');
        //             }
        //         })
        //         .catch(() => {
        //             Swal.fire('Error', 'Failed to update food. Try again!', 'error');
        //         })
        //         .finally(() => setIsLoading(false));
        // }

        if (validateForm()) {
            setIsLoading(true);
            axios
                .put(`https://a10-server-seven.vercel.app/food/${id}`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                })
                .then((res) => {
                    const data = res.data;
                    if (data.modifiedCount > 0) {
                        Swal.fire('Success', 'Food updated successfully!', 'success');
                        navigate('/manage-foods'); // Redirect to a dashboard or another route
                    } else {
                        Swal.fire('Info', 'No changes were made.', 'info');
                    }
                })
                .catch(() => {
                    Swal.fire('Error', 'Failed to update food. Try again!', 'error');
                })
                .finally(() => setIsLoading(false));
        }
        
    };

    return (
        <div className="px-4 max-w-2xl mx-auto my-16">
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
            <h1 className="text-5xl text-orange-700 font-bold">Update Food</h1>
            <form onSubmit={handleSubmit} className="mx-auto text-2xl space-y-4 mt-10">
                <div className="flex flex-col gap-3">
                    <label>Food Name</label>
                    <input
                        className="input input-bordered w-full max-w-2xl"
                        type="text"
                        name="foodName"
                        value={formData.foodName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label>Food Image (URL)</label>
                    <input
                        className="input input-bordered w-full max-w-2xl"
                        type="url"
                        name="foodImage"
                        value={formData.foodImage}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label>Food Quantity</label>
                    <input
                        className="input input-bordered w-full max-w-2xl"
                        type="number"
                        name="foodQuantity"
                        value={formData.foodQuantity}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label>Pickup Location</label>
                    <input
                        className="input input-bordered w-full max-w-2xl"
                        type="text"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label>Expiration Date/Time</label>
                    <input
                        className="input input-bordered w-full max-w-2xl"
                        type="datetime-local"
                        name="expiredDateTime"
                        value={formData.expiredDateTime}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label>Additional Notes</label>
                    <textarea
                        className="textarea max-w-2xl textarea-bordered"
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <button className="btn w-full btn-outline text-white bg-orange-700" type="submit">
                    Update Food
                </button>
            </form>
        </div>
    );
};

export default UpdateFood;
