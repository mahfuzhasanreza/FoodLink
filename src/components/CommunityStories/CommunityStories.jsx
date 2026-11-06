import React from 'react';
import storyImg1 from '../../assets/mz-banner-4.jpg';
import storyImg2 from '../../assets/mz-banner-2.jpg';
import storyImg3 from '../../assets/mz-banner1.jpg';

const CommunityStories = () => {
  const stories = [
    {
      name: "John Doe",
      story: "I donated surplus food from my bakery, helping 50 families in need. FoodLink made it so easy to give back to the community.",
      image: storyImg1,
    },
    {
      name: "Sarah Smith",
      story: "During a tough time, I was able to find meals for my family through FoodLink. The kindness and support are unmatched.",
      image: storyImg2, 
    },
    {
      name: "Michael Johnson",
      story: "FoodLink connected me with a local community of food donors, allowing me to share extra food with families struggling to make ends meet.",
      image: storyImg3, 
    },
  ];

  return (
    <section className="mx-5 rounded-lg py-16 bg-gray-50" id="community-stories">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-orange-700">Heartwarming Stories</h2>
        <p className="text-lg text-gray-600 mb-10">
          Hear from our amazing community members who are making a difference!
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={story.image}
                alt={story.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{story.name}</h3>
                <p className="text-gray-600 mt-4">{story.story}</p>
              </div>
            </div>
          ))}
        </div>

     
      </div>
    </section>
  );
};

export default CommunityStories;
