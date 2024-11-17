import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Code2, AlertCircle, Lock } from 'lucide-react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        email,
        password
      });
      Cookies.set('authToken', res.data.token);
      Cookies.set('role', res.data.role);
      Cookies.set('userId', res.data.id);
      
      if (res.status === 200) {
        if (res.data.role === "student") {
          navigate('/classrooms');
        } else {
          navigate('/admin/classrooms');
        }
      }
    } catch (error) {
      console.error(error);
      setError('Invalid Email or Password, user does not exist.');
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
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-600 text-center">
            Continue your coding journey
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                </div>
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
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Sign in
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
          >
            Register now
          </Link>
        </p>

        {/* Sign in badges */}
        <div className="mt-6 flex justify-center space-x-4">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Secure login
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            End-to-end encrypted
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;