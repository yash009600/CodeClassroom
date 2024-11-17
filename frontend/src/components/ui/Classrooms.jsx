import React, { useState, useEffect } from 'react';
import { Users, UserCircle, School, Plus } from 'lucide-react';
import { Card, CardHeader, CardContent } from './Card';
import axios from 'axios';
import Cookies from 'js-cookie';

const Classrooms = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [joinError, setJoinError] = useState(null);

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => { 
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/classrooms`, {
        headers: {
          'Authorization': Cookies.get('authToken')
        }
      });
      // console.log(res);
      setClassrooms(res.data.classrooms);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleJoinClass = async (e) => {
    e.preventDefault();
    setJoinError(null);
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/classrooms/join`, 
        { classCode },
        {
          headers: {
            'Authorization': Cookies.get('authToken')
          }
        }
      );

      // Refresh the classrooms list
      await fetchClassrooms();
      setIsJoinDialogOpen(false);
      setClassCode('');
    } catch (err) {
      setJoinError(err.response?.data?.message || 'Failed to join classroom');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <School className="mr-2 h-8 w-8 text-blue-600" />
            My Classrooms
          </h1>
          <p className="mt-2 text-gray-600">
            View and manage all your enrolled classrooms
          </p>
        </div>
        <button
          onClick={() => setIsJoinDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Join Class
        </button>
      </div>

      {/* Join Class Modal */}
      {isJoinDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Join a Classroom</h2>
                <button
                  onClick={() => {
                    setIsJoinDialogOpen(false);
                    setJoinError(null);
                    setClassCode('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleJoinClass} className="space-y-4">
                <div>
                  <label htmlFor="classCode" className="block text-sm font-medium mb-1">
                    Class Code
                  </label>
                  <input
                    id="classCode"
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                    placeholder="Enter class code"
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {joinError && (
                  <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                    {joinError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors disabled:bg-blue-400"
                >
                  {loading ? 'Joining...' : 'Join Classroom'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Classrooms Grid */}
      {classrooms.length === 0 ? (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No Classrooms</h3>
          <p className="mt-1 text-gray-500">You haven't joined any classrooms yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <Card 
              key={classroom._id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {classroom.name}
                    </h3>
                    <div className="mt-2 flex items-center text-gray-600">
                      <UserCircle className="h-5 w-5 mr-1" />
                      <span>{classroom.teacherName}</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
                    <Users className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-blue-600 font-medium">
                      {classroom.totalStudents}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => window.location.href = `/classroom/${classroom._id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Details →
                  </button>
                  
                  <span className="text-sm text-gray-500">
                    Created {new Date(classroom.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Classrooms;