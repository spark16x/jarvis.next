import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      <p className="mt-4 text-lg text-gray-600">Loading...</p>
    </div>
  );
};

export default LoadingPage;