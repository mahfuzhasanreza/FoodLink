import React from 'react';

const FoodNewsAndBlogs = () => {
  const newsAndBlogs = [
    {
      title: 'Reducing Food Waste: How Communities Are Tackling the Challenge',
      date: 'December 20, 2024',
      excerpt: 'Food waste is a global issue, but communities worldwide are finding innovative ways to reduce waste and ensure surplus food reaches those in need. Discover inspiring stories and practical tips.',
    },
    {
      title: 'The Rise of Food Donation Platforms: Connecting Donors with Those in Need',
      date: 'December 15, 2024',
      excerpt: 'Online food donation platforms are transforming how surplus food is distributed, making it easier for donors and recipients to connect and combat hunger together.',
    },
    {
      title: 'How Food Donations are Changing Lives During the Holiday Season',
      date: 'December 10, 2024',
      excerpt: 'The holiday season is a time for giving, and food donations are making a significant impact on families struggling to put meals on their tables. Learn how you can contribute.',
    },
    {
      title: 'Top 5 Tips for Donating Food Safely and Effectively',
      date: 'December 5, 2024',
      excerpt: 'Donating food is a noble act, but it’s important to ensure your contributions are safe and beneficial. Here are five tips to help you donate responsibly and effectively.',
    },
    {
      title: 'How Expired Food Can Still Make a Difference',
      date: 'December 1, 2024',
      excerpt: 'Did you know that some expired food is still safe to consume? Learn how food donation organizations handle such items to reduce waste and provide meals to those in need.',
    },
    {
      title: 'The Role of Technology in Fighting Hunger and Food Waste',
      date: 'November 28, 2024',
      excerpt: 'Technology is playing a critical role in addressing hunger and food waste. From apps to AI, explore how innovation is helping connect surplus food with people who need it.',
    },
  ];
  

  return (
    <section className="container mx-auto p-5 my-16">
      <h2 className="text-4xl font-bold text-orange-700 text-center mx-8 mb-16">Latest Food News & Blogs</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsAndBlogs.map((item, index) => (
          <div key={index} className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-orange-700">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{item.date}</p>
            <p className="text-gray-800 mb-4">{item.excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoodNewsAndBlogs;
