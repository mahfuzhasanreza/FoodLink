import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const FAQSection = () => {
  // State to handle the visibility of answers
  const [activeIndex, setActiveIndex] = useState(null);
  const {theme}=useContext(AuthContext);



  const faqs = [
    {
      question: "What is Food Donation Portal?",
      answer: "Food Donation Portal is an online platform that connects donors with individuals in need by facilitating food donations and requests seamlessly.",
    },
    {
      question: "How can I donate food?",
      answer: "To donate food, log in to your account, click on the 'Add Food' button, and provide details like food name, quantity, pickup location, expiration date, and a photo. Your donation will then be listed on the portal.",
    },
    {
      question: "How can I request food?",
      answer: "To request food, browse the available donations, and click on the 'Request Food' button for your preferred item. You’ll need to confirm the request, and the donor will be notified.",
    },
    {
      question: "Is there a limit to how many food items I can request?",
      answer: "No, there’s no limit to the number of requests you can make. However, please request responsibly to ensure fairness and availability for others.",
    },
    {
      question: "Can I track my food requests?",
      answer: "Yes, you can track all your requests in the 'My Food Requests' section. You’ll find details about the donor, pickup location, and request status.",
    },
    {
      question: "What should I do if I have issues with a donation or request?",
      answer: "If you encounter any issues, you can reach out to our support team via the 'Contact Us' page, and we’ll assist you promptly.",
    },
    {
      question: "Is it free to use the Food Donation Portal?",
      answer: "Yes, the Food Donation Portal is completely free to use. Our goal is to help reduce food waste and assist those in need without any cost.",
    },
  ];
  

  // Toggle answer visibility
  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
// console.log(theme);
  return (

    <div className={`${(theme==='dark') ? 'faq-section py-16': 'faq-section py-16 bg-gray-100'}`}>
      <h2 className="text-4xl text-center font-bold text-orange-700 mb-8">Frequently Asked Questions</h2>
      
      <div className="mx-4 faq-container max-w-4xl lg:mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className={theme === "light"? " faq-item bg-white p-6 rounded-lg shadow-md":'faq-item  p-6 rounded-lg shadow-md bg-gray-700'}>
            <div 
              className="faq-question flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <h3 className={theme === "light"? 'text-xl font-semibold text-gray-800' : 'text-gray-400 text-xl font-semibold '}>{faq.question}</h3>
              <span className="text-gray-500">{activeIndex === index ? '-' : '+'}</span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer mt-4 text-gray-600">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
