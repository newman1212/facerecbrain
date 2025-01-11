import React from 'react';
import Boundbox from './Boundbox';

const FaceRecognition = ({ box, uploadedImageUrl}) => {
  return (
    <div className="flex justify-center w-full max-w-4xl mx-auto pt-1 p-4 relative">

    <div className="relative mt-4">
      <img id="inputimage" alt="" src={uploadedImageUrl} className="w-full max-w-lg h-auto" />
      {box.map((face, i) => (
        <Boundbox
          key={i} // Ensuring unique keys for each box
          boxTop={face.topRow}
          boxDown={face.bottomRow}
          boxLeft={face.leftCol}
          boxRight={face.rightCol}
        />
      ))}
    </div>
  </div>
  
  );
}

export default FaceRecognition;




