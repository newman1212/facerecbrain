import React from 'react';
import Spinner from 'react-spinner-material';

const ImageLinkForm = ({  imageSubmitControl, FileName, enterOption, visible, handleFileUpload,  handleFileChange }) => {
  return (
    <div className="text-center">
      <p className="text-lg font-bold text-blue-400 mb-4">
        This magic algorithm will detect faces in your pictures. Give it a try
      </p>
      <div className="flex justify-center">
        <div
          className="bg-gray-900 shadow-md rounded-lg p-4 flex space-x-2 w-full max-w-md"
          onKeyDown={enterOption}
					>
			<label
				htmlFor="fileInput"
				className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 focus:ring-2 focus:ring-purple-400 focus:outline-none flex items-center justify-center"
            onClick={imageSubmitControl}
          >
            {visible ? (
				<div className="flex items-center justify-center space-x-2">
					<Spinner radius={20} color="white"  stroke={3} visible={visible} />
					<span className="text-white text-sm">Detecting...</span>
				</div>
              
            ) : (
              'Detect'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;









// ROUGH CODE:


// import ImageKit from "imagekit-javascript";

// class App extends React.Component {
//   state = {
//     file: null,
//     uploadUrl: "",
//   };

//   handleFileChange = (event) => {
//     this.setState({ file: event.target.files[0] });
//   };

 













//   render() {
//     return (
//       <div>
//         <input type="file" onChange={this.handleFileChange} />
//         <button onClick={this.handleUpload}>Upload</button>
//         {this.state.uploadUrl && (
//           <div>
//             <p>Uploaded Image URL:</p>
//             <a href={this.state.uploadUrl} target="_blank" rel="noopener noreferrer">
//               {this.state.uploadUrl}
//             </a>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default App;
