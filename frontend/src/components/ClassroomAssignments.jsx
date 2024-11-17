import React, { useEffect, useState } from 'react';
import { Book, ChevronRight, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const ClassroomAssignments = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/assignments/${classId}`, {
        headers: {
          'Authorization': Cookies.get('authToken')
        }
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch assignments');
      }

      setAssignments(response.data.assignments);
      setLoading(false);
    } catch (err) {
      setError(err.message);
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
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft size={20} />
          Back to Classrooms
        </button>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Book className="mr-2 h-8 w-8 text-blue-600" />
          Assignments
        </h1>
        <p className="mt-2 text-gray-600">
          View and submit your programming assignments
        </p>
      </div>

      {assignments.length === 0 ? (
        <div className="text-center py-12">
          <Book className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No Assignments</h3>
          <p className="mt-1 text-gray-500">There are no assignments available yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div
              key={assignment._id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {assignment.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        assignment.submitted == "submitted"
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {assignment.submitted == "submitted" ? 'Submitted' : 'Pending'}
                      </span>
                    </div>
                    
                    <p className="mt-2 text-gray-600">
                      {assignment.description}
                    </p>
                    
                    <div className="mt-4 flex items-center space-x-6">
                      {/* {console.log(assignment)} */}
                      {assignment.grade !== undefined && assignment.submitted != "pending" && (
                        <div className="flex items-center">
                          {assignment.grade >= 3 ? (
                            <CheckCircle className="h-5 w-5 mr-1 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 mr-1 text-red-500" />
                          )}
                          <span>Score: {assignment.grade}/10</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => navigate(`/assignment/${assignment._id}`)}
                    className="ml-4 flex items-center text-blue-600 hover:text-blue-700"
                  >
                    {assignment.submitted == "pending" ? 'Start' : 'View'} 
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassroomAssignments;