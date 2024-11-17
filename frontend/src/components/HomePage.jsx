import React from 'react';
import { Code2, Users, BookOpen, Play, Award, Terminal } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex-shrink-0 flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg p-2">
        <Code2 className="h-6 w-6 text-white" />
      </div>
      <div className="flex items-center">
        <span className="text-xl font-bold text-gray-900 tracking-tight">Code</span>
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">Classroom</span>
      </div>
    </div>
  );
};

const HomePage = () => {
  const features = [
    {
      icon: <Terminal className="w-6 h-6 text-blue-500" />,
      title: "Interactive Code Editor",
      description: "Write and test code directly in your browser with support for multiple programming languages"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Virtual Classrooms",
      description: "Create or join coding classes with unique access codes and real-time interaction"
    },
    {
      icon: <Code2 className="w-6 h-6 text-blue-500" />,
      title: "Multiple Languages",
      description: "Support for C++, Java, Python and more programming languages"
    },
    {
      icon: <Play className="w-6 h-6 text-blue-500" />,
      title: "Real-time Compilation",
      description: "Instant code compilation and execution feedback for rapid learning"
    },
    {
      icon: <BookOpen className="w-6 h-6 text-blue-500" />,
      title: "Assignment Management",
      description: "Easy creation and submission of coding assignments with automated grading"
    },
    {
      icon: <Award className="w-6 h-6 text-blue-500" />,
      title: "Progress Tracking",
      description: "Monitor student progress and performance with detailed analytics"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center mt-5 ml-5">
        <Logo />
      </div>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Learn Coding with</span>
                  <span className="block text-blue-600">Interactive Classes</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                  A platform where teachers can create virtual coding classrooms, 
                  assign programming tasks, and help students learn to code effectively.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => window.location.href = '/signup'}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => window.location.href = '/login'}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything You Need to Teach and Learn Coding
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              A comprehensive platform designed for both educators and students
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="relative bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <div>
                    <div className="p-2 inline-block bg-blue-50 rounded-lg">
                      {feature.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start teaching?</span>
            <span className="block text-blue-200">Create your classroom today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => window.location.href = '/signup'}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Create Classroom
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;