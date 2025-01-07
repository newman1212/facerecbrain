import React from 'react';
import Boundbox from './Boundbox';

const FaceRecognition = ({ imageUrl, box, fileUrl, uploadedImageUrl }) => {
  return (
    <div className='center ma'>

      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={uploadedImageUrl} width='500' height='auto'/>
      
      {
      box.map((face,i) => {
      return <Boundbox 
      key ={box[i].topRow} 
      boxTop={box[i].topRow} 
      boxDown={box[i].bottomRow} 
      boxLeft={box[i].leftCol}
      boxRight={box[i].rightCol}/>
    })

      }

      </div>

    </div>
  );
}

export default FaceRecognition;




