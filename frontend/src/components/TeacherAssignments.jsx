import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

const TeacherAssignments = () => {
  const id = useParams();
  // console.log(id)
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);
  const fetchAssignments = async ()=>{
    try {
      // console.log(Cookies.get('authToken'))
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/assignments/${id.id}`, {
        headers : {
          // 'Authorization' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTdkMmMwYWJiMDg2MGYxYjhmM2Q4NiIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzI5NzA4ODkyLCJleHAiOjE3Mjk3MTI0OTJ9.lDNRMlC1b__zTQpoEJyzLBGEAS8Wi9uGHF-Q6zy_8cM"
          'authorization' : Cookies.get('authToken')
        }
      })
      // console.log(res.data.assignments)
      setAssignments(res.data.assignments);
    } catch (error) {
      console.log("error at teacher assignments")
    }
 }

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    
    // const newAssignment = {
    //   id: assignments.length + 1,
    //   title,
    //   description,
    //   submissions: 0,
    //   dueDate: '2024-11-15', // You might want to make this dynamic
    //   language: 'Python' // You might want to make this selectable
    // };
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/assignments/new/${id.id}`, {title, description}, {
        headers : {
          'Authorization' : Cookies.get('authToken')
        }
      })
    } catch (error) {
      console.log("error at creating new assignment in teacherassignments")
    }
    
    fetchAssignments();
    setTitle('');
    setDescription('');
    setIsDialogOpen(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <button 
            onClick={()=>{navigate(-1)}}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Classrooms
          </button>
          <h1 className="text-2xl font-bold">Assignments</h1>
          <p className="text-gray-600">Create and manage coding assignments</p>
        </div>
        
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Create Assignment
        </button>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map((assignment) => (
          <div
            key={assignment._id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{assignment.title}</h3>
                <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {/* {assignment.language} */}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{assignment.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                {/* <span>Due: {assignment.dueDate}</span> */}
                <span>{assignment.submissions.length} submissions</span>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 flex justify-end gap-2">
              <button
                onClick={() => {navigate(`/submissions/${assignment._id}`)}}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                View Submissions
              </button>
              <button
                onClick={() => {}}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {assignments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No assignments created yet.</p>
        </div>
      )}

      {/* Create Assignment Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Create New Assignment</h2>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleCreateAssignment} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Assignment Title
                  </label>
                  <input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter assignment title"
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter assignment description"
                    required
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Create Assignment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAssignments;