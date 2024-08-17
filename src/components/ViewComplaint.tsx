import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Complaints = {
  PostId: number;
  GoogleId: string;
  Complaint: string;
  Status: string;
  Name: string;
  RoomNumber: string;
  Floor: string;
  CreatedAt: string;
  UpdatedAt: string | null; // UpdatedAt can be null
};

export default function ViewComplaint() {
  const [complaints, setComplaints] = useState<Complaints[]>([]);
  const [error, setError] = useState<string | null>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const gId = user.googleId;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fixxyapi.rajvikash-r2022cse.workers.dev/posts/${gId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched Data:', data); // Log the fetched data to inspect its structure

        // Adjust to match the nested structure
        if (data.posts && data.posts.results && data.posts.results.length > 0) {
          const complaintsData = data.posts.results[0].results;
          if (Array.isArray(complaintsData)) {
            setComplaints(complaintsData);
          } else {
            console.error('Unexpected data format:', data);
            setError('Failed to load complaints. Unexpected data format.');
          }
        } else {
          console.error('Unexpected data format:', data);
          setError('Failed to load complaints. Unexpected data format.');
        }
      })
      .catch((error) => {
        console.error('Error fetching complaints:', error);
        setError('Error fetching complaints.');
      });
  }, [gId]);

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleDelete = (postId: number) => {
    fetch(`https://fixxyapi.rajvikash-r2022cse.workers.dev/posts/${gId}/${postId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Complaint deleted successfully') {
          // Remove the deleted complaint from the state
          setComplaints((prevComplaints) =>
            prevComplaints.filter((complaint) => complaint.PostId !== postId)
          );
        } else {
          console.error('Failed to delete complaint:', data);
          setError('Failed to delete complaint.');
        }
      })
      .catch((error) => {
        console.error('Error deleting complaint:', error);
        setError('Error deleting complaint.');
      });
  };

  return (
    <div className='flex flex-col h-screen bg-gray-100 p-4 items-center'>
      

      <div className='flex flex-col w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4 text-gray-800 text-center'>View your Posted Complaints</h2>

        {error ? (
          <p className='text-red-600 text-center'>{error}</p>
        ) : (
          <div className='flex flex-col gap-6'>
            {complaints.length > 0 ? (
              complaints.map((complaint) => {
                // Determine the status class
                const statusClass = complaint.Status === 'pending' ? 'text-orange-500' : 'text-green-500';

                return (
                  <div key={complaint.PostId} className='bg-gray-50 p-4 rounded-lg shadow-md'>
                    <div className='flex flex-row justify-between'>
                      <h3 className='text-2xl font-bold mb-2 text-gray-800'>{complaint.Complaint}</h3>
                      <button
                        className='text-red-600'
                        onClick={() => handleDelete(complaint.PostId)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                      </button>
                    </div>

                    <p className='text-lg font-semibold text-gray-600'>Room No: {complaint.RoomNumber}</p>
                    <p className='text-lg font-semibold text-gray-600'>
                      Status: <span className={statusClass}>{complaint.Status}</span>
                    </p>
                    <p className='text-sm text-gray-500'>Posted At: {new Date(complaint.CreatedAt).toLocaleDateString()}</p>
                    {complaint.Status === 'Resolved' && (
                      <p className='text-sm text-gray-500'>Updated At: {new Date(complaint.UpdatedAt || 'null').toLocaleDateString()}</p>
                    )}
                    
                  </div>
                );
              })
            ) : (
              <p className='text-center'>No complaints available</p>
            )}
          </div>
        )}
        <button
        type='button'
        onClick={handleBack}
        className='bg-purple-600 text-white py-2 px-4 rounded-md mb-4 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500'
      >
        Back
      </button>
      </div>
    </div>
  );
}
