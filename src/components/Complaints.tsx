import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Complaints() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [complaint, setComplaint] = useState('');
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [floor, setFloor] = useState('');

  console.log("local storage data is", user);
  const gId = user.googleId;
  console.log("The google ID is -->", user.googleId);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const complaintData = {
      Name: name,
      RoomNumber: room,
      Floor: floor,
      Complaint: complaint,
      GoogleId: gId,
    };

    try {
      const response = await fetch(`https://fixxyapi.rajvikash-r2022cse.workers.dev/complaints/${gId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaintData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Complaint submitted successfully:', result);
        // Clear the form fields
        setName('');
        setRoom('');
        setFloor('');
        setComplaint('');
        // Show success notification
        toast.success('Complaint submitted successfully!');
      } else {
        console.error('Failed to submit complaint:', response.statusText);
        toast.error('Failed to submit complaint.');
      }
    } catch (error) {
      console.error('An error occurred while submitting the complaint:', error);
      toast.error('An error occurred while submitting the complaint.');
    }

    console.log('The complaint is submitted');
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-[#0acffe] to-[#495aff] flex flex-col items-center p-10'>
      <ToastContainer />
      <div className='flex flex-col items-center gap-8 p-8 bg-white rounded-lg shadow-lg max-w-3xl'>
        <h1 className='text-5xl font-semibold text-gray-800 bg-gray-100 p-6 rounded-full shadow-md max-sm:text-xl'>
          Post your complaints here
        </h1>
        <p className='text-xl text-gray-600 text-center'>
          The complaint will be forwarded to the Admin page and eventually be resolved.
        </p>
        <form onSubmit={onSubmit} className='flex flex-col gap-6 w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
          <div className='flex flex-col gap-4'>
            <label htmlFor="" className='text-2xl font-semibold text-gray-800'>Name :</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='Enter your name' className='p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow' />
            <label htmlFor="" className='text-2xl font-semibold text-gray-800'>Room Number :</label>
            <input type="text" value={room} onChange={e => setRoom(e.target.value)} placeholder='Enter your Room No' className='p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow' />
            <label htmlFor="" className='text-2xl font-semibold text-gray-800'>Floor :</label>
            <input type="text" value={floor} onChange={e => setFloor(e.target.value)} placeholder='Enter your floor' className='p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow' />
            <label htmlFor="complaint" className='text-2xl font-semibold text-gray-800'>Complaint :</label>
            <textarea
              name="complaint"
              id="complaint"
              value={complaint}
              onChange={e => setComplaint(e.target.value)}
              className='p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow'
              placeholder='Enter your complaint here'
            />
          </div>
          <div className=' flex flex-row justify-around'>
            <Link to={'/'}><button type='submit' className='bg-red-500  text-white p-4 rounded-lg shadow-md hover:bg-red-700 transition-colors font-semibold text-lg'>Back</button></Link>
            <button type='submit' className='bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors font-semibold text-lg'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
