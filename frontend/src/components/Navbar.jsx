import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Code2, BookOpen, Users, LogOut, Menu, X, Terminal } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  function logout() {
    Cookies.remove('authToken');
    Cookies.remove('role');
    Cookies.remove('userId');
    navigate('/');
  }

  function navClass() {
    let role = Cookies.get('role');
    if (role === 'teacher') {
      navigate('/admin/classrooms');
    } else {
      navigate('/classrooms');
    }
  }

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and Project Name */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg p-2">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-900 tracking-tight">Code</span>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">Classroom</span>
              </div>
            </div>
          </div>

          {/* Middle - Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-1">
              <Link
                to="/assignments"
                className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
              >
                <BookOpen className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Assignments
              </Link>
              <button
                onClick={navClass}
                className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
              >
                <Users className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Classrooms
              </button>
            </div>
          </div>

          {/* Right side - Logout Button */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <Terminal className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">
                {Cookies.get('role') === 'teacher' ? 'Teacher' : 'Student'} Mode
              </span>
            </div>
            <button
              className="flex items-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
              onClick={logout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50">
          <Link
            to="/assignments"
            className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-base font-medium transition-colors"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Assignments
          </Link>
          <button
            onClick={navClass}
            className="w-full flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-base font-medium transition-colors"
          >
            <Users className="h-5 w-5 mr-2" />
            Classrooms
          </button>
          <div className="flex items-center px-3 py-2 text-gray-600">
            <Terminal className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">
              {Cookies.get('role') === 'teacher' ? 'Teacher' : 'Student'} Mode
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;