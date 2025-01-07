import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div className="text-center mt-6">
      <div className="text-white text-xl font-semibold">
        {`Welcome ${name}, your current image submission count is ...`}
      </div>
      <div className="text-white text-4xl font-bold mt-4">{entries}</div>
    </div>
  );
};

export default Rank;
