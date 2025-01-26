import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";
import FAQSection from "../FAQSecton/FAQSection";
import { Blocks } from "react-loader-spinner"; // Ensure this package is installed
import FeaturedFoods from "../FeaturedFood/FeaturedFood";
import FoodNewsAndBlogs from "../FoodNewsAndBlogs/FoodNewsAndBlogs";
import CommunityStories from "../CommunityStories/CommunityStories";

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });


        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
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
        );
    }

    return (
        <div>
            <Helmet>
                <title>Home | FoodLink</title>
            </Helmet>

            {/* Banner Section */}
            <div data-aos="fade-down">
                <Banner />
            </div>

            <div data-aos="fade-up">
                <FeaturedFoods></FeaturedFoods>
            </div>

            <div data-aos="fade-up">
                <FoodNewsAndBlogs></FoodNewsAndBlogs>
            </div>


            <div data-aos="fade-up">
                <CommunityStories></CommunityStories>
            </div>

            <div data-aos="fade-down">
                <UpcomingEvents></UpcomingEvents>
            </div>

            <div data-aos="fade-up">
                <FAQSection></FAQSection>
            </div>
        </div>
    );
};

export default Home;
