import React from 'react';
import problem from '../assets/problem.png';
import service from '../assets/service.png'

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-around items-center p-5 mt-20">
      <div className="flex flex-col gap-6 max-w-4xl  shadow-gray-700 p-8 lg:p-12">
        <h1 className="font-semibold text-4xl sm:text-7xl  bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text text-center lg:text-left">
          Have an issue in your room?                     
        </h1>
        <p className="text-zinc-200 text-xl sm:text-3xl mt-2">
          Any issues in your room can be solved by just registering here.<br></br>
          <br></br>
          No need to look for the authority to complain.
        </p>
       
        
      </div>
      <img
        src={service}
        alt="Problem Illustration"
        className="w-full sm:w-1/2 lg:w-1/3 max-w-lg object-contain mt-6 lg:mt-0"
      />
    </div>
  );
};

export default About;
