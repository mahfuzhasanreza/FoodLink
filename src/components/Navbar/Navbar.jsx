import { Link, useNavigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import logo from '../../assets/logo-mz.png'

const Navbar = () => {
    const navigate = useNavigate();
    const { user, signOutUser, theme, setTheme } = useContext(AuthContext);
 

    const userName = user?.displayName;



    const handleSignOutUser = () => {
        signOutUser()
            .then(() => {
 
            })

    }

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className={`navbar bg-orange-600 text-white lg:px-10 mx-auto max-w-[5000px]`}>
            <Toaster />
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li><Link className="text-black" to="/">Home</Link></li>
                        <li><Link className="text-black" to="/available-foods">Available Food</Link></li>
                        <li><Link className="text-black" to="/add-food">Add Food</Link></li>
                        <li><Link className="text-black" to='/manage-foods'>Manage My Foods</Link></li>
                        <li><Link className="text-black" to='/my-food-request'>My Food Request</Link></li>
                        {
                            user ?
                                <></>
                                : (<li><Link className="md:hidden text-black" to="/register">Register</Link></li>)
                        }
                    </ul>
                </div>
                <Link to="/">
                    <img className="hidden md:flex w-16" src={logo} alt="" />
                </Link>
                <Link to="/" className="btn btn-ghost text-sm md:text-xl ml-0 lg:ml-5">FoodLink</Link>
                <Link to="/">
                    <button className="hidden lg:flex btn btn-ghost ml-5">Home</button>
                </Link>
            </div>
            <div className="navbar-end w-full">
                <Link to="/available-foods">
                    <button className="hidden lg:flex btn btn-ghost ml-5 w-full">Available Foods</button>
                </Link>
                <Link to="/add-food">
                    <button className="hidden lg:flex btn btn-ghost ml-5 w-full">Add Food</button>
                </Link>
                <Link to={`/manage-foods`}>
                    <button className="hidden lg:flex btn btn-ghost ml-5 w-full">Manage My Foods</button>
                </Link>
                <Link to={`/my-food-request`}>
                    <button className="mr-5 hidden lg:flex btn btn-ghost ml-5">My Food Request</button>
                </Link>

                {user ? (
                    <>
                        <div className="">

                            <Link to='/profile'>
                                <img
                                    // onClick={handleProfileClick}
                                    src={user.photoURL || ""}
                                    className="h-12 w-12 rounded-full mr-8 cursor-pointer"
                                    alt="User Profile"
                                />
                            </Link>
                        </div>
                        <button
                            onClick={handleSignOutUser}
                            className="ml-2 btn text-white btn-outline"
                        >
                            Logout
                        </button>
                    </>

                ) : (
                    <div className="flex items-center md:gap-4">
                        <Link to="/login">
                            <button className="p-3 btn btn-ghost md:btn-outline md:text-white bg-orange-700 text-white md:p-4">Login</button>
                        </Link>
                        <Link to="/register" className="hidden md:flex">
                            <button className="btn btn-ghost md:btn-outline bg-orange-700 text-white md:text-white">Register</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
