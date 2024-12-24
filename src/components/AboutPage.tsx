import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="p-6 min-h-screen text-white">
      <div className="flex items-center justify-start gap-6 mb-10">
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text">
          About Us 
        </h1>
        <Link to="/">
          <button className="bg-gray-500 text-white px-6 py-3 rounded-xl w-28 h-10 text-sm sm:w-32 sm:h-12 sm:text-base lg:w-36 lg:h-14 lg:text-lg transition duration-300 ease-in-out hover:bg-gray-700">
            Home 🏠
          </button>
        </Link>
      </div>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-zinc-200 text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Why This? 🤔</h2>
          <p className="text-zinc-300 text-base sm:text-lg lg:text-xl leading-loose">
            Ever felt like walking to the complaints desk was more exhausting than solving the problem itself? 🚶💨
            <br />
            Now, you can submit complaints while snuggled up in your room. 🛏️ No shoes required. Just sit back, relax, and let your fingers do the complaining. 📲
          </p>
        </div>

        <div>
          <h2 className="text-zinc-200 text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Who Built This? 👷‍♂️</h2>
          <p className="text-zinc-300 text-base sm:text-lg lg:text-xl leading-loose">
            Created by someone who’s constantly annoyed by life’s little inconveniences 🥲, like remembering to register complaints.
            <br />
            So, instead of getting up and dealing with them, they decided to make this process as lazy-friendly as possible. 😌
            <br />
            Now, you too can complain without leaving the comfort of your bed. It’s laziness elevated to an art form. 🎨😴
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
