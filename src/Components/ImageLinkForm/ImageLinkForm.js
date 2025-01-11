import React from 'react';
import Spinner from 'react-spinner-material';
import TypingEffect from '../TypingEffect/TypingEffect';


const ImageLinkForm = ({ imageSubmitControl, FileName, 
  enterOption, progress,loading, handleFileChange 
}) => {
  return (
    <div className="text-center">
      {/* <p className="text-lg font-bold text-blue-400 mb-4">
        This magic algorithm will detect faces in your pictures. Give it a try
      </p> */}
     <div className="w-full max-w-lg mx-auto p-4 text-center">
  <TypingEffect
    text=" This magic algorithm will detect faces in your pictures. Give it a try"
    speed={100}
    textStyle="text-base sm:text-lg font-semibold text-blue-400"
  />
</div>

    <div className="flex justify-center w-full max-w-lg mx-auto p-4">
    <div
  className="bg-gray-900 shadow-md rounded-lg p-4 pb-2 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full"
  onKeyDown={enterOption}
>

    <label
      htmlFor="fileInput"
      className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full sm:w-auto text-center"
    >
      {FileName}
    </label>
    <input
      id="fileInput"
      className="hidden"
      type="file"
      accept="image/*"
      onChange={handleFileChange}
    />

    <button
      className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 focus:ring-2 focus:ring-purple-400 focus:outline-none w-full sm:w-auto text-center flex items-center justify-center"
      onClick={imageSubmitControl}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <Spinner radius={20} color="white" stroke={3} visible={true} />
          <span className="text-white text-sm">Detecting...</span>
          <span className="text-white text-md font-bold font-mono">{progress}</span>
        </div>
      ) : (
        <span className="text-white text-lg font-bold font-mono">Detect</span>
      )}
    </button>
  </div>
</div>

      

    </div>
  );
};

export default ImageLinkForm;
