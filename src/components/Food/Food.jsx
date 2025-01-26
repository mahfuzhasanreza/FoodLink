
import React from "react";
import { Link } from "react-router-dom";

const Food = ({ food = {} }) => {
    const {
        _id,
        foodImage,
        foodName,
        foodQuantity,
        pickupLocation,
        expiredDateTime,
        donatorName,
        donatorEmail,
    } = food;

    if (!food || Object.keys(food).length === 0) {
        return (
            <div className="text-center text-red-500">
                Food details are not available.
            </div>
        );
    }

    return (
        <div className="card bg-slate-200 w-full p-8 m-0 shadow-xl">
            <figure>
                <img src={foodImage} className="h-[200px]" alt={foodName} />
            </figure>
            <div className="card-body">
                <h2 className="text-orange-700 font-bold text-xl">{foodName}</h2>

                <div className="text-lg text-gray-500">
                    <p>Quantity: {foodQuantity}</p>
                    <p>Pickup Location: {pickupLocation}</p>
                    <p>Expire Date: {new Date(expiredDateTime).toLocaleString()}</p>
                    <p>Donator: {donatorName}</p>
                </div>

                <Link to={`/food/${_id}`}>
                    <button className="btn text-orange-700 border-orange-700 rounded-full">
                        See Details
                    </button>
                </Link>
            </div>
        </div>
    );
};


export default Food;
