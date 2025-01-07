import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className="flex justify-end mt-4 pr-4"> {/* Added pr-4 */}
        <button
          onClick={() => onRouteChange('signout')}
          className="bg-[#c0355d] text-white text-md px-4 py-1 rounded-full hover:bg-white-600 focus:outline-none transition-all ease-in-out duration-200"
        >
          Sign Out
        </button>
      </nav>
    );
  } else {
    return (
      <nav className="flex justify-end mt-4 pr-4 space-x-3"> {/* Added pr-4 */}
        <button
          onClick={() => onRouteChange('signin')}
          className="bg-blue-500 text-white text-md px-4 py-1 rounded-full hover:bg-blue-600 focus:outline-none transition-all ease-in-out duration-200"
        >
          Sign In
        </button>
        <button
          onClick={() => onRouteChange('register')}
          className="bg-green-500 text-white text-md px-4 py-1 rounded-full hover:bg-green-500 focus:outline-none transition-all ease-in-out duration-200"
        >
          Register
        </button>
      </nav>
    );
  }
};

export default Navigation;
