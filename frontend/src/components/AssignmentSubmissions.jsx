import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

const AssignmentSubmissions = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [expandedSubmission, setExpandedSubmission] = useState(null);

  const [editingGrade, setEditingGrade] = useState(null);
  const [gradeInput, setGradeInput] = useState("");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleGradeSubmit = async (studentId) => {
    const grade = parseInt(gradeInput);
    if (isNaN(grade) || grade < 0 || grade > 10) {
      alert("Please enter a valid grade between 0 and 10");
      return;
    }

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/assignments/${assignmentId}/grade/${studentId}`, {
        grade
      }, {
        headers: {
          'Authorization': Cookies.get('authToken')
        }
      });

      setSubmissions(submissions.map(sub => 
        sub.student === studentId ? { ...sub, grade } : sub
      ));
      setEditingGrade(null);
    } catch (error) {
      console.error("Error updating grade:", error);
      alert("Error updating grade. Please try again.");
    }
  };

  const startGrading = (submission) => {
    setEditingGrade(submission.student);
    setGradeInput(submission.grade?.toString() || "");
  };

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/assignments/view/${assignmentId}`, {
          headers: {
            'Authorization': Cookies.get('authToken')
          }
        });
        setSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };
    fetchSubmissions();
  }, [assignmentId]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft size={20} />
          Back to Assignments
        </button>
        <h1 className="text-2xl font-bold">Assignment Submissions</h1>
        <p className="text-gray-600">Review and grade student submissions</p>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.map((submission) => (
          <div 
            key={submission.student}
            className="border rounded-lg bg-white overflow-hidden"
          >
            {/* Submission Header */}
            <div className="p-4 bg-gray-50 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{submission.studentName}</h3>
                <p className="text-sm text-gray-600">
                  ID: {submission.student} | Submitted: {formatDate(submission.submittedAt)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {submission.grade !== null && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    Grade: {submission.grade}/10
                  </span>
                )}
                <button
                  onClick={() => setExpandedSubmission(
                    expandedSubmission === submission.student ? null : submission.student
                  )}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {expandedSubmission === submission.student ? "Hide Code" : "View Code"}
                </button>
              </div>
            </div>

            {/* Expanded Code View */}
            {expandedSubmission === submission.student && (
              <div>
                {/* Code Display */}
                <div className="p-4 bg-gray-900 text-white overflow-x-auto">
                  <pre className="font-mono text-sm">
                    <code>{submission.code}</code>
                  </pre>
                </div>

                {/* Grading Section */}
                <div className="p-4 bg-gray-50 border-t">
                  {editingGrade === submission.student ? (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleGradeSubmit(submission.student);
                      }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Grade (0-10)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={gradeInput}
                          onChange={(e) => setGradeInput(e.target.value)}
                          className="px-3 py-2 border rounded-md w-32"
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                        >
                          <Check size={16} />
                          Save Grade
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingGrade(null)}
                          className="px-4 py-2 border rounded-md hover:bg-gray-100 flex items-center gap-2"
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-2">
                      {submission.grade !== null ? (
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Grade: {submission.grade}/10</p>
                          <button
                            onClick={() => startGrading(submission)}
                            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
                          >
                            Edit Grade
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startGrading(submission)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Grade Submission
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {submissions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No submissions yet.</p>
        </div>
      )}
    </div>
  );
};

export default AssignmentSubmissions;