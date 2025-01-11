import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    <nav className="flex justify-between items-center mt-4 px-4">
      {/* Logo Text */}
      <div className="text-2xl font-bold text-[#FF4B4B] bg-[#FFFFFF] px-2 rounded">
        Face<span className="text-[#000000] -500">Finder</span>
      </div>


      {/* Conditional Buttons */}
      {isSignedIn ? (
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => onRouteChange('signout')}
            className="bg-[#c0355d]  px-4 py-1 rounded-full hover:bg-white-600 focus:outline-none transition-all ease-in-out duration-200"
          >
            <span className="text-white text-sm font-mono"> Sign Out</span>
          </button>
        </div>
      ) : (
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => onRouteChange('signin')}
            className="bg-blue-500  px-4 py-1 rounded-full hover:bg-blue-600 focus:outline-none transition-all ease-in-out duration-200"
          >
          <span className="text-white text-lg font-bold font-mono"> Sign In</span>
          </button>
          <button
            onClick={() => onRouteChange('register')}
            className="bg-green-500  px-4 py-1 rounded-full hover:bg-green-600 focus:outline-none transition-all ease-in-out duration-200"
          >
            <span className="text-white text-lg font-bold font-mono"> Sign up</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
