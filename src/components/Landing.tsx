import React, { useState, useEffect } from 'react';
import problem from '../assets/problem.png';
import service from '../assets/service.png';
import { gapi } from 'gapi-script';
import Login from '../components/Login';
import Logout from '../components/Logout'; // Import the Logout component
import { Link } from 'react-router-dom';

const client_id = "#############3";

export default function Landing() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const googleId = localStorage.getItem('googleId');

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: client_id,
        scope: ""
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const updateUser = () => {
    setUser(JSON.parse(localStorage.getItem('user') || 'null'));
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-[#0acffe] to-[#495aff]'>
      <header className='bg-white text-black shadow-lg flex flex-row justify-between items-center p-5'>
        <div className='flex items-center gap-3'>
          <h1 className='font-bold tracking-widest text-4xl text-indigo-600'>Fixxy</h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wrench text-indigo-600"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        </div>
        <nav>
          <ul className='flex flex-row gap-5 text-gray-600'>
            <li className='hover:text-indigo-600 transition-colors cursor-pointer font-semibold'>Home</li>
            <li className='hover:text-indigo-600 transition-colors cursor-pointer font-semibold'>About</li>
              
              <Link to={'/complaints'}>
                <li className='hover:text-indigo-600 transition-colors cursor-pointer font-semibold'>Complaint</li>
              </Link>
            
            <Link to={'/viewcomplaint'}>
              <li className='hover:text-indigo-600 transition-colors cursor-pointer font-semibold'>View My Complaints</li>
            </Link>
            <li> {user && (
          <Logout onLogout={updateUser} />
        )}</li>
          </ul>
        </nav>
        {/* Render Logout button if user is logged in */}
       
      </header>
      <div className='flex flex-col gap-10 mt-20 px-5'>
        <div className='flex flex-row justify-around items-center'>
          <div className='flex flex-col gap-3 max-w-4xl bg-white rounded-r-full shadow-xl shadow-gray-700 p-5'>
            <h1 className='font-semibold text-6xl max-sm:text-2xl text-gray-500 leading-tight text-center'>
              Have an issue in your room?
            </h1>
            <p className='text-gray-400 text-3xl max-sm:text-xl'>
              Any issues in your room can be solved by just registering here.
            </p>
            <p className='text-gray-400 text-3xl max-sm:texy-xl'>
              No need to look for the authority to complain.
            </p>
          </div>
          <img
            src={problem}
            alt="Problem Illustration"
            className='w-1/3 max-w-xl object-contain'
          />
        </div>
        <div className='flex flex-row justify-around items-center'>
        <img 
            src={service}
            alt="Service Illustration"
            className='w-1/3 max-w-xl object-contain service'
          />
          <div className='flex flex-col gap-3 max-w-5xl bg-black rounded-l-full shadow-xl shadow-gray-700 p-10'>
            <h1 className='font-semibold text-6xl text-white leading-tight text-center'>
              What service do we provide?
            </h1>
            <p className='text-gray-400 text-3xl'>
              Every basic maintenance service is provided
            </p>
            <p className='text-gray-400 text-3xl'>
              <ol className='flex flex-row gap-4 p-4'>
                <li>1. Plumbing</li>
                <li>2. Carpentry</li>
                <li>3. Electrical</li>
                <li>4. WiFi issues</li>
              </ol>
            </p>
          </div>
        </div>
        <div className='flex flex-col items-center p-10 gap-10 bg-blue-950 rounded-xl shadow-lg'>
          <h1 className='text-6xl font-bold text-white text-center'>
            Let's get started
          </h1>
          {user ? (
            <div className='flex flex-col items-center gap-5'>
              <p className='text-4xl text-gray-300 text-center'>
                Welcome {user.name}
              </p>
              <p className='text-2xl text-gray-300 text-center'>
                Click here to register your room complaint
              </p>
              <Link to={'/complaints'}>
                <button className='bg-yellow-500 text-black max-w-lg p-5 rounded-full font-semibold text-3xl hover:shadow-lg transition-transform transform hover:scale-105'>
                  Complaint
                </button>
              </Link>
            </div>
          ) : (
            <div className='flex flex-col items-center gap-5'>
              <p className='text-4xl text-gray-300 text-center'>
                Login First to continue
              </p>
              <Login onLoginSuccess={updateUser} />
            </div>
          )}
        </div>
      </div>
      <footer>
        <div className='flex flex-row justify-center items-center p-5 bg-gray-800 text-white'>
          <p className='text-2xl'>© 2024 Fixxy. All rights reserved. Developed and Maintanined by Fixxy group.</p>
          
        </div>
      </footer>
    </div>
  );
}
