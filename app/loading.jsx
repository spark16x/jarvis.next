import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
  <div className="relative w-16 h-16">
  <div className="absolute top-0 left-0 w-full h-full rounded-full animate-spin">
  <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
  <div className="absolute top-0 left-0 w-full h-full bg-blue-500 rounded-full" style={{ clip: 'rect(0, auto, auto, 0)' }}></div>
  </div>
  <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden">
  <div className="absolute top-0 right-0 w-full h-full bg-red-500 rounded-full" style={{ clip: 'rect(0, auto, auto, 0)' }}></div>
  </div>
  <div className="absolute bottom-0 left-0 w-1/2 h-full overflow-hidden">
  <div className="absolute bottom-0 left-0 w-full h-full bg-yellow-500 rounded-full" style={{ clip: 'rect(0, auto, auto, 0)' }}></div>
  </div>
  <div className="absolute bottom-0 right-0 w-1/2 h-full overflow-hidden">
  <div className="absolute bottom-0 right-0 w-full h-full bg-green-500 rounded-full" style={{ clip: 'rect(0, auto, auto, 0)' }}></div>
  </div>
  </div>
  </div>
  </div>
  );
};

export default Loading;