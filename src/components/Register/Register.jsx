import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signInUser, createUser, signInWithGoogle } = useContext(AuthContext);


    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        const photo = event.target.photo.value;


        // console.log(email, password, name, photo);

        // reset error and status
        setErrorMessage('');


        if (password.length < 6) {
            setErrorMessage('Password should be 6 character or longer');
            toast.error(errorMessage);
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).+$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('At least one uppercase, one lowercase');
            toast.error(errorMessage);
            return;
        }


        createUser(email, password)
            .then(result => {
                // console.log(result.user);

                event.target.reset();
                navigate('/');


                const profile = {
                    displayName: name,
                    photoURL: photo
                }
                updateProfile(auth.currentUser, profile)
                    .then(() => {


                    })

                // signInUser(email, password);
                // event.target.reset();
                // navigate('/');
                logInUser(email, password);


            })
            .catch(error => {
                setErrorMessage(error.message);
                toast.error(errorMessage);
            })

    }

    const logInUser = async (email, password) => {
        try {
            const result = await signInUser(email, password);
            navigate(location?.state ? location.state : '/');
        } catch (error) {
          //  console.error('Sign in error:', error.message);
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithGoogle();
            navigate(location?.state ? location.state : '/');
        } catch (error) {
           // console.error('Google login error:', error.message);

        }
    };

    return (
        <div className='px-4 max-w-lg mx-auto'>
            <Helmet>
                <title>Register | FoodLink</title>
            </Helmet>

            <ToastContainer />


            <h2 className="text-4xl my-8">Register Now</h2>
            <form onSubmit={handleRegister}>
                <label className="input input-bordered flex items-center gap-2 my-8">
                    <input type="text" name='name' className="grow" placeholder="Name" required />
                </label>

                <label className="input input-bordered flex items-center gap-2 my-8">
                    <input type="text" name='photo' className="grow" placeholder="Photo URL" required />
                </label>

                <label className="input input-bordered flex items-center gap-2 my-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="email" name='email' className="grow" placeholder="Email" required />
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        className="grow"
                        placeholder='Password' required />

                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className='btn btn-xs'>
                        {
                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }
                    </button>
                </label>


                <button className='w-full btn btn-accent bg-orange-700 hover:bg-orange-500 text-white my-8 border-none'>Register</button>
            </form>



            <div className='flex items-center'>
                <hr className='ml-10 mr-2 w-1/2 border' />
                <p className='text-gray-500'>Or</p>
                <hr className='mr-10 ml-2 w-1/2 border' />
            </div>
            <button onClick={handleGoogleLogin}
                className='w-full btn btn-outline my-7 border-5 text-black text-lg font-medium gap-5 hover:bg-purple-200 hover:border-purple-200 hover:text-black'>
                <FcGoogle className='text-4xl'></FcGoogle>
                Sign up with Google</button>

            <p className='text-gray-700 mb-14 text-center'>
                Already have an account? Please <Link to='/login'>Login</Link>
            </p>

        </div>
    );
};

export default Register;