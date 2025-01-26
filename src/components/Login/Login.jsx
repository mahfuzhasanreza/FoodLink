import { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const [success, setSuccess] = useState(false);
    const emailRef = useRef();


    
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;


        // Reset status
        setSuccess(false);


        try {
            const result = await signInUser(email, password);
            // console.log(result.user);
            setSuccess(true);
            e.target.reset();
            navigate(location?.state ? location.state : '/');
        } catch (error) {
            toast.error('Email and Password does not match'); // Trigger toast notification
        }
    };

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        navigate('/forget-password', { state: { inputEmail: email } });
    };


    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithGoogle();
            // console.log(result.user);
            navigate(location?.state ? location.state : '/');
        } catch (error) {
          //  console.error('Google login error:', error.message);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <Helmet>
                <title>Login | FoodLink</title>
            </Helmet>

            <ToastContainer />

            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Welcome Back!</h1>
                    <p className="py-6">
                    Log in to access your personalized dashboard, manage your food-sharing posts, and connect with a community dedicated to making a difference.
                    </p>
                </div>

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                ref={emailRef}
                                placeholder="Enter your email"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered"
                                required
                            />
                        

                            <label onClick={handleForgetPassword} className="label">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>

                        </div>

                        <div className="form-control mt-6">
                            <button className="btn border-none btn-primary bg-orange-700 hover:bg-orange-500 text-white">Login</button>
                        </div>
                    </form>

                    {success && <p className="text-orange-500 text-center mt-4">Login successful!</p>}

                    <div className='flex items-center'>
                        <hr className='ml-10 mr-2 w-1/2 border' />
                        <p className='text-gray-500'>Or</p>
                        <hr className='mr-10 ml-2 w-1/2 border' />
                    </div>
                    <button onClick={handleGoogleLogin}
                        className='btn btn-outline mx-2 md:mx-8 mt-7 border-5 text-black text-lg font-medium gap-5 hover:bg-purple-200 hover:border-purple-200 hover:text-black'>
                        <FcGoogle className='md:text-4xl text-lg'></FcGoogle>
                        Sign up with Google</button>

                    <p className="text-center text-gray-700 mt-6 mb-10">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-500 link link-hover">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
