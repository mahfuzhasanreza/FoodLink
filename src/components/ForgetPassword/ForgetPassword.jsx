import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase.init';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Access location object to get state passed from Login
    const [email, setEmail] = useState('');

    // Use the location to access the passed email from Login
    useEffect(() => {
        // console.log("Location state: ", location.state);
        // console.log(email);

        if (location.state?.inputEmail) {
            setEmail(location.state.inputEmail); // Auto-fill the email input
        }
    }, [location]);


    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
            <Helmet>
                <title>Reset Password | Eco-Adventure</title>
            </Helmet>
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-5">Reset Your Password</h1>
            <form className="card bg-white shadow-xl w-96 p-5 space-y-5">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        className="input input-bordered"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Allow user to modify email if needed
                        placeholder="Enter your email"
                        required
                    />

                </div>
                <button type="submit" className="btn btn-primary bg-orange-700 hover:bg-orange-500 text-white w-full">
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ForgetPassword;
