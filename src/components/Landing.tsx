import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import Login from '../components/Login';
import Logout from '../components/Logout'; 
import { Link } from 'react-router-dom';
import About from './About';
import About2 from './About2';
import Footer from './Footer';
import { Marquee } from './Marquee';

const client_id = "392980597886-hur0lq3lf73k39jea3t2mgvotnv776ut.apps.googleusercontent.com";

export default function Landing() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='min-h-screen'>
      <header className='bg-gray-950 rounded-b-3xl  fixed w-full top-0 z-50 shadow-lg p-5 flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <h1 className='font-bold tracking-widest text-4xl text-orange-600'>Fixxy</h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wrench text-indigo-600"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        </div>

        {/* Hamburger menu button - positioned absolutely at top right */}
        <div className="md:hidden absolute top-5 right-5">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`flex-col md:flex-row gap-5 items-center md:flex ${isOpen ? 'flex' : 'hidden'} md:block`}>
          <ul className='flex items-center flex-col md:flex-row gap-5 text-gray-300'>
            <li className='hover:text-indigo-600 transition-colors cursor-pointer font-semibold'>Home</li>
           <Link to={'/about'}> <li className='hover:text-indigo-600 transition-colors cursor-pointer font-semibold'>About</li></Link>
            <Link to={'/complaints'}>
              <li className='hover:text-indigo-600 transition-colors cursor-pointer font-semibold'>Complaint</li>
            </Link>
            <Link to={'/viewcomplaint'}>
              <li className='hover:text-indigo-600 transition-colors cursor-pointer font-semibold'>View My Complaints</li>
            </Link>
            {user && <li><Logout onLogout={updateUser} /></li>}
          </ul>
        </nav>
      </header>

      <div className='flex flex-col gap-10 mt-20 px-5'>
        <About />          
        <div className=' mt-28 mb-28'>
          <About2 />
        </div >
        <div className='flex flex-col items-center p-10 gap-10 bg-gray-950 rounded-xl shadow-lg'>
  <h1 className='text-6xl  font-bold text-white text-center mb-5'>
    Let's get started
  </h1>
  {user ? (
    <div className='flex flex-col items-center gap-5'>
      <p className='text-4xl  text-gray-200 text-center'>
        Welcome, {user.name}
      </p>
      <p className='text-2xl text-gray-300 text-center mb-8'>
        Click here to register your room complaint
      </p>
      <Link to={'/complaints'}>
        <button className='bg-yellow-500 text-black px-10 py-6 rounded-full font-semibold text-3xl  hover:bg-yellow-600 transition-colors'>
          Complaint
        </button>
      </Link>
    </div>
  ) : (
    <div className='flex flex-col items-center gap-5'>
      <p className='text-4xl text-gray-200 text-center mb-5'>
        Login First to Continue
      </p>
      <Login onLoginSuccess={updateUser} />
    </div>
  )}
</div>
      </div>
          <Footer/>      
    </div>
  );
}
