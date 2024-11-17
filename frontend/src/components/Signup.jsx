import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Code2, AlertCircle } from 'lucide-react';

// Utility component for consistent styling
const cn = (...classes) => classes.filter(Boolean).join(' ');

export const Signup = () => {
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
        name,
        email,
        password,
        role
      });
      if (res.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      setError('Signup Failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md space-y-8 relative">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg transform hover:scale-105 transition-transform duration-200">
            <Code2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Join CodeClassroom
          </h2>
          <p className="mt-2 text-gray-600 text-center">
            Start your learning journey today
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">I am a</label>
                <div className="mt-2 flex gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={role === 'student'}
                      onChange={() => setRole('student')}
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Student</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={role === 'teacher'}
                      onChange={() => setRole('teacher')}
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Teacher</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover:scale-[1.02]"
            >
              Create Account
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;