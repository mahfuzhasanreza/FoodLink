import React, { useState } from "react";
import Swal from "sweetalert2";

const ShowFood = ({ food, setUserFoods }) => {
    const { _id, name, category, price } = food;
    const [isEditing, setIsEditing] = useState(false);
    const [updatedFood, setUpdatedFood] = useState({ name, category, price });

    const handleUpdateFood = (e) => {
        e.preventDefault();
        fetch(`https://a10-server-seven.vercel.app/foods/${_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFood),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire("Updated!", "Food information updated successfully.", "success");
                    setIsEditing(false);
                    setUserFoods((prev) =>
                        prev.map((item) =>
                            item._id === _id ? { ...item, ...updatedFood } : item
                        )
                    );
                }
            });
    };

    return (
        <div>
            {isEditing ? (
                <form onSubmit={handleUpdateFood} className="p-4 bg-gray-100 rounded-md">
                    <input
                        type="text"
                        value={updatedFood.name}
                        onChange={(e) => setUpdatedFood({ ...updatedFood, name: e.target.value })}
                        className="mb-2 p-2 border rounded w-full"
                        placeholder="Food Name"
                    />
                    <input
                        type="text"
                        value={updatedFood.category}
                        onChange={(e) => setUpdatedFood({ ...updatedFood, category: e.target.value })}
                        className="mb-2 p-2 border rounded w-full"
                        placeholder="Category"
                    />
                    <input
                        type="number"
                        value={updatedFood.price}
                        onChange={(e) => setUpdatedFood({ ...updatedFood, price: e.target.value })}
                        className="mb-2 p-2 border rounded w-full"
                        placeholder="Price"
                    />
                    <button
                        type="submit"
                        className="mr-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                </form>
            ) : (
                <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Update
                </button>
            )}
        </div>
    );
};

export default ShowFood;
