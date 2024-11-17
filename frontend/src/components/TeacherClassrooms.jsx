import React, { useState, useEffect } from 'react';
import { Plus, Check, Copy } from 'lucide-react';
import Cookies from 'js-cookie';
import axios from 'axios';

const TeacherClassrooms = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [className, setClassName] = useState('');
  const [classrooms, setClassrooms] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/classrooms`, {
        headers: {
          'authorization': Cookies.get('authToken')
        }
      });
      setClassrooms(res.data.classrooms);
    } catch (error) {
      console.log("error at teacher classrooms");
    }
  };

  const handleCreateClass = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/classrooms/create`, 
        { name: className },
        {
          headers: {
            'authorization': Cookies.get('authToken'),
          }
        }
      );
      fetchClassrooms();
      setClassName('');
      setIsDialogOpen(false);
    } catch (error) {
      console.log("error at creating new classroom in handleclasscreation teacher classroom");
    }
  };

  const handleCodeClick = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000); // Reset after 2 seconds
    } catch (error) {
      console.log("Failed to copy to clipboard");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Classrooms</h1>
          <p className="text-gray-600">Manage your virtual classrooms</p>
        </div>
        
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Create New Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classrooms.map((classroom) => (
          <div
            key={classroom._id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold">{classroom.name}</h3>
              <button
                onClick={() => handleCodeClick(classroom.code)}
                className="text-sm text-gray-600 flex items-center gap-1 hover:text-blue-600 transition-colors"
              >
                Class Code: {classroom.code}  
                {copiedCode === classroom.code ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
            <div className="px-4 py-3 border-t">
              <p className="text-sm text-gray-600">
                {classroom.studentCount} student{classroom.studentCount !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="px-4 py-3 bg-gray-50 flex justify-end">
              <button
                onClick={() => {window.location.href = `/assignments/new/${classroom._id}`}}
                className="px-4 py-2 text-sm text-blue-600 border border-blue-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                View Class
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {classrooms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No classrooms created yet.</p>
        </div>
      )}

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Create New Classroom</h2>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleCreateClass} className="space-y-4">
                <div>
                  <label htmlFor="className" className="block text-sm font-medium mb-1">
                    Class Name
                  </label>
                  <input
                    id="className"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    placeholder="Enter class name"
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Create Classroom
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherClassrooms;