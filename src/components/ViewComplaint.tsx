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
        console.log('Fetched Data:', data);
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
    <div className="flex flex-col items-center h-full p-8">
      <div className='mb-10'>
        <h1 className='font-semibold text-3xl text-zinc-200'>View Your Posted Complaints</h1>
      </div>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4">
        {complaints.length > 0 ? (
          complaints.map((complaint) => {
            const statusClass = complaint.Status === 'pending' ? 'text-orange-500' : 'text-green-500';

            return (
              <div
                key={complaint.PostId}
                className="bg-gray-50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,165,0,0.8)] hover:scale-105 p-6 rounded-lg shadow-md w-full max-w-lg mx-auto"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-bold text-gray-800">{complaint.Complaint}</h3>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(complaint.PostId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-trash-2"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  </button>
                </div>
                <p className="text-lg font-semibold text-gray-600">
                  Room No: {complaint.RoomNumber}
                </p>
                <p className="text-lg font-semibold text-gray-600">
                  Status: <span className={statusClass}>{complaint.Status}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Posted At: {new Date(complaint.CreatedAt).toLocaleDateString()}
                </p>
                {complaint.Status === 'Resolved' && (
                  <p className="text-sm text-gray-500">
                    Updated At: {new Date(complaint.UpdatedAt || 'null').toLocaleDateString()}
                  </p>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No complaints available</p>
        )}
      </div>

      <button
        type="button"
        onClick={handleBack}
        className="bg-zinc-600 text-white py-2 px-4 w-1/5  rounded-md mt-20 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        Back
      </button>
    </div>
  );
}
