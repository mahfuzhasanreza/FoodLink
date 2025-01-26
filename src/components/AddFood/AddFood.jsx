import { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { Blocks } from 'react-loader-spinner';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const AddFood = () => {
    const { user } = useContext(AuthContext);

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




    const mutation = useMutation({
        mutationFn: async (newFood) => {
            const response = await axios.post('https://a10-server-seven.vercel.app/food', newFood, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,  // This ensures cookies or credentials are included in the request
            });
            return response.data;  // Axios returns the response data directly
        },
        onMutate: () => {
            setIsLoading(true);
        },
        onSuccess: (data) => {
            if (data.insertedId) {
                Swal.fire('Success', 'Food added successfully!', 'success');
                setFormData({
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
            }
        },
        onError: () => {
            Swal.fire('Error', 'Failed to add food. Try again!', 'error');
        },
        onSettled: () => {
            setIsLoading(false);
        },
    });




    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            mutation.mutate(formData);
        }
    };

    return (

        <div className="px-4 max-w-2xl mx-auto my-16">

            <Helmet>
                <title>Add Food | FoodLink</title>
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
            <h1 className="text-5xl text-orange-700 font-bold">Add Food</h1>
            <form onSubmit={handleSubmit} className="mx-auto text-2xl space-y-4 mt-10">
                <div className="flex flex-col gap-3">
                    <label>Food Name</label>
                    <input
                        className="input input-bordered w-full max-w-2xl"
                        type="text"
                        name="foodName"
                        value={formData.foodName}
                        onChange={handleInputChange}
                        placeholder="Enter food name"
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
                        placeholder="Enter food image URL"
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
                        placeholder="Enter food quantity"
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
                        placeholder="Enter pickup location"
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
                        placeholder="Add any additional notes"
                    ></textarea>
                </div>
                <button className="btn w-full btn-outline text-white bg-orange-700" type="submit">
                    Add Food
                </button>
            </form>
        </div>
    );
};

export default AddFood;
