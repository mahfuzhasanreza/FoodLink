import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
    const { user } = useContext(AuthContext); // Fetch logged-in user's data from AuthContext

    if (!user) {
        return <p>Loading...</p>;
    }


    return (
        <div className="px-5 min-h-screen bg-base-200 flex flex-col items-center pt-10">

            <Helmet>
                <title>Profile | FoodLink</title>
            </Helmet>

            <h1 className="text-3xl font-bold lg:mt-0 mt-10">Welcome, {user.displayName || 'User'}!</h1>

            <div className="card bg-white shadow-xl w-96 mt-10 p-5">
                <div className="flex justify-center mb-5">
                    <img
                        src={user.photoURL || ''}
                        alt="User Avatar"
                        className="rounded-full w-32 h-32 object-cover"
                    />
                </div>
                <div className="space-y-3 text-center">
                    <p><strong>Name:</strong> {user.displayName || 'Not Provided'}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
