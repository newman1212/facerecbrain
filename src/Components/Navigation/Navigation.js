import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className="flex justify-end">
        <button
          onClick={() => onRouteChange('signout')}
          className="text-white text-lg underline px-4 py-2 hover:text-gray-300 focus:outline-none"
        >
          Sign Out
        </button>
      </nav>
    );
  } else {
    return (
      <nav className="flex justify-end space-x-4">
        <button
          onClick={() => onRouteChange('signin')}
          className="bg-blue-500 text-white text-lg px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Sign In
        </button>
        <button
          onClick={() => onRouteChange('register')}
          className="bg-blue-500 text-white text-lg px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Register
        </button>
      </nav>
    );
  }
};

export default Navigation;
