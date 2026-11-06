

import React, { useState, useEffect, useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { Blocks } from "react-loader-spinner";
import axios from "axios";
import { SERVER_URL } from '../../config';

const ManageMyFoods = () => {
  const allFoods = useLoaderData();
  const { user } = useContext(AuthContext); // Get the logged-in user
  const [userFoods, setUserFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const filteredFoods = allFoods.filter(
      (food) => food.donatorEmail === user?.email
    );
    setUserFoods(filteredFoods);
    setIsLoading(false);
  }, [allFoods, user]);





  const handleDeleteFood = (foodId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${SERVER_URL}/food/${foodId}`, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your food item has been deleted.", "success");
              setUserFoods(userFoods.filter((food) => food._id !== foodId));
            }
          })
          .catch((error) => {

          });
      }
    });
  };

  return (
    <div className="mt-10 lg:mt-36 mb-10 lg:mb-36 px-4 lg:px-20">
      <Helmet>
        <title>Manage My Foods | FoodLink</title>
      </Helmet>

      {isLoading ? (
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
          <h2 className="text-3xl lg:text-6xl text-center font-bold mb-10 lg:mb-20 text-orange-700">
            Manage My Foods
          </h2>

          {userFoods.length === 0 ? (
            <h3 className="text-orange-400 font-bold text-2xl lg:text-4xl my-20 lg:my-32 text-center">
              No Foods Added
            </h3>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-2 lg:px-4 py-2 text-sm lg:text-base">
                      Food Name
                    </th>
                    <th className="border border-gray-300 px-2 lg:px-4 py-2 text-sm lg:text-base">
                      Image
                    </th>
                    <th className="border border-gray-300 px-2 lg:px-4 py-2 text-sm lg:text-base">
                      Quantity
                    </th>
                    <th className="border border-gray-300 px-2 lg:px-4 py-2 text-sm lg:text-base">
                      Pickup Location
                    </th>
                    <th className="border border-gray-300 px-2 lg:px-4 py-2 text-sm lg:text-base">
                      Expire Date
                    </th>
                    <th className="border border-gray-300 px-2 lg:px-4 py-2 text-sm lg:text-base">
                      Notes
                    </th>
                    <th className="border border-gray-300 px-2 lg:px-4 py-2 text-sm lg:text-base">
                      Status
                    </th>
                    <th className="border border-gray-300 px-2 lg:px-4 py-2 text-sm lg:text-base">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userFoods.map((food) => (
                    <tr key={food._id}>
                      <td className="border border-gray-300 px-2 lg:px-4 py-2 text-sm lg:text-base">
                        {food.foodName}
                      </td>
                      <td className="border border-gray-300 px-2 lg:px-4 py-2">
                        <img
                          src={food.foodImage}
                          alt={food.foodName}
                          className="h-12 w-12 lg:h-16 lg:w-16 object-cover"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 lg:px-4 py-2 text-sm lg:text-base">
                        {food.foodQuantity}
                      </td>
                      <td className="border border-gray-300 px-2 lg:px-4 py-2 text-sm lg:text-base">
                        {food.pickupLocation}
                      </td>
                      <td className="border border-gray-300 px-2 lg:px-4 py-2 text-sm lg:text-base">
                        {new Date(food.expiredDateTime).toLocaleString()}
                      </td>
                      <td className="border border-gray-300 px-2 lg:px-4 py-2 text-sm lg:text-base">
                        {food.additionalNotes}
                      </td>
                      <td className="border border-gray-300 px-2 lg:px-4 py-2 text-sm lg:text-base">
                        {food.status}
                      </td>
                      <td className="border border-gray-300 px-2 lg:px-4 py-2 text-sm lg:text-base space-y-1 space-x-1">
                        <Link to={`/update-food/${food._id}`}>
                          <button className="px-2 lg:px-3 py-1 lg:py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mr-2 text-xs lg:text-sm">
                            Update
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteFood(food._id)}
                          className="px-2 lg:px-3 py-1 lg:py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-xs lg:text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageMyFoods;
