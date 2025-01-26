import { useContext } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";

const Footer = () => {
    const { theme } = useContext(AuthContext);

    return (
        <footer className={`${(theme === "dark") ? 'max-w-[5000px] mx-auto bg-black' : 'max-w-[5000px] mx-auto bg-orange-100'}`}>
            {/* Footer Links Section */}
            <div className="pb-12 footer text-base-content p-10 pt-16 justify-evenly">
                {/* Explore Links */}
                <nav className="items-center flex flex-col">
                    <h6 className="font-bold text-xl pb-3 text-orange-700">FoodLink</h6>
                    <p className="text-center text-gray-600">Discover the joy of giving with FoodLink! From sharing meals to spreading kindness, every act of generosity creates a brighter tomorrow.</p>
                </nav>

                {/* Contact Information */}
                <div className="items-center flex flex-col lg:mx-0 mx-auto">
                    <h6 className="font-bold text-xl pb-3 text-orange-700">Contact Us</h6>
                    <div className="text-center text-gray-600">
                        <p>Email: <a href="mailto:support@FoodLink.com" className="text-orange-700">support@FoodLink.com</a></p>
                        <p>Phone: <a href="tel:+1234567890" className="text-orange-700">+88 01770-452285</a></p>
                        <p>Address: 123 FoodLink Blvd, Dhaka, Bangladesh</p>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="items-center flex flex-col lg:mx-0 mx-auto my-auto">
                    <h6 className="font-bold text-xl pb-3 text-orange-700">Follow Us</h6>
                    <div className="flex gap-20 lg:gap-5">
                        <a href="https://www.facebook.com/mahfuzhasanreza/" target="_blank" rel="noopener noreferrer" className="text-orange-700 text-xl">
                            <FaFacebookF />
                        </a>
                        <a href="https://www.instagram.com/mahfuzhasanreza/" target="_blank" rel="noopener noreferrer" className="text-orange-700 text-xl">
                            <FaInstagram />
                        </a>
                        <a href="https://www.linkedin.com/in/mahfuzhasanreza/" target="_blank" rel="noopener noreferrer" className="text-orange-700 text-xl">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="py-4 bg-orange-700 text-white text-center">
                <p className="md:text-base text-sm">© {new Date().getFullYear()} FoodLink. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
