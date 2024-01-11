import React from 'react';
import './ImageLinkForm.css';
import Spinner from 'react-spinner-material';


const ImageLinkForm = ({onInputChange,onButtonSubmit,enterOption,visible}) => {






	return (
		<div >
		 
		 <p className='f3 light-blue'> 
		 This magic brain will detect faces in your pictures. Give it a try
		 </p>
		 <div className ='center'>
		 	<div className='form center pa4 br3 shadow-3' onKeyDown ={enterOption}>
				 <input className ='f4 pa2 w-70 center' type ='text' placeholder ='enter image url here' onChange ={onInputChange}/>
				 <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
				 onClick ={onButtonSubmit}> 
				 {visible?(<span className='center'><Spinner radius={20} color= "white" stroke={3} visible={visible} /></span>) 
				 :'Detect'}
           
       

				 </button>
			 </div>
		 </div>
		
		</div>
		
		);

};


export default ImageLinkForm;
