import React, { Component,} from 'react';
import ImageKit from 'imagekit-javascript';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './Components/Navigation/Navigation';
// import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Register from './Components/Register/Register';
import Signin from './Components/Signin/Signin';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import VantaBackground from './Components/Vanta/vanta';
import TypingEffect from './Components/TypingEffect/TypingEffect';
import './App.css';
// import Boundbox from './Components/FaceRecognition/Boundbox';

const initialState = {
  input: '',
  imageUrl: '',
  fileUrl: null,
  box: [],
  faceCount: '',
  route: 'signin',
  isSignedIn: false,
  // visible: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
  file: null,
  uploadedImageUrl: '',
  isUploading: false,
  apiResponse: null,
  FileName : 'Click To Upload Image',
  loading: false,
  progress: 0,
  percentage: "",

};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.sectionRef = React.createRef();


      // Initialize ImageKit instance
      this.imagekit = new ImageKit({
        publicKey: 'public_2cFR1za5B66cOp21VNf0BqyfyUU=', // Replace with your public API key
        urlEndpoint: 'https://ik.imagekit.io/lgddg4vjl', // Replace with your ImageKit URL Endpoint
        authenticationEndpoint: 'https://facerecapi.onrender.com/auth', // Replace with your server auth endpoint
      });
  
  }

  handleFileChange = (event) => {
    this.setState({box:[]});
    this.setState({faceCount:0});
    this.setState({percentage:""})
    this.setState({ file: event.target.files[0] },
      ()=>{
        this.setState({ FileName: this.state.file.name });
        const url = URL.createObjectURL(this.state.file); // Generate a temporary URL
        this.setState({ uploadedImageUrl: url });
      }
    );  
  };


  handleDetectionProgress = async () => {
    this.setState({ loading: true, progress: 0 });
  
    // Simulate progress increment
    const progressInterval = setInterval(() => {
      this.setState((prevState) => ({
        progress: prevState.progress < 99 ? prevState.progress + 1 : prevState.progress,
      }),()=>this.setState({percentage:`${this.state.progress}%`}));
    }, 150); // Adjust interval time for smoother progress
  
    try {
      await this.handleFileUpload(); // Trigger the file upload
      // await this.onButtonSubmit(this.state.uploadedImageUrl); // Trigger face detection
  
      clearInterval(progressInterval); // Stop progress increment on completion
      this.setState({ percentage: 'Done' }); // Set to 100% on completion
    } catch (error) {
      console.error("Error detecting faces:", error);
      clearInterval(progressInterval); // Ensure interval is cleared on error
    } finally {
      // Reset progress and loading state
      setTimeout(() => {
        this.setState({ loading: false, progress: 0 });
      }, 1000); // Optional delay for a smoother transition
    }
  };
  


  handleSuccess = (message) => {
    console.log('alert triggered');
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
    });
  };

  handleDetectionSuccess = (message) => {
    console.log("alert triggered");
    toast.success(
      <div>
        <strong className="block text-lg">Success!</strong>
        <span>{message}</span>
      </div>,
      {
        position: "top-right",
        autoClose: 15000,
      }
    );
  };

  handleSignUpSuccess = (message) => {
    console.log('alert triggered');
    toast.success(
      <div>
        <strong className="block text-lg">{message}</strong>
      </div>,
       {
        position: "top-right",
        autoClose: 15000,
      }
    );
  };


  handleError = (message) => {
    console.log('alert triggered');
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
    });
  };



  imageSubmitControl =() =>{

    if (!this.state.file) {this.handleError('No Image Uploaded')};

    if (!this.state.faceCount && this.state.file){this.handleDetectionProgress()};

     
    if(this.state.faceCount>1)
   { this.handleSuccess('Image already submitted. ' + this.state.faceCount + ' faces detected');
        this.scrollToSection();
       }
  
        else if(this.state.faceCount===1)
          { this.handleSuccess('Image already submitted. A face has been detected');
            

            this.scrollToSection();
          }

          

    

    }
  
    handleFileUpload = async () => {
      console.log("UPLOAD TRIGGERED");
      try {
        // Fetch authentication parameters from the backend
        const response = await fetch("https://facerecapi.onrender.com/imagekit-auth");
        const { token, signature, expire } = await response.json();
    
        console.log(token, signature, expire, "PARAMETERS");
    
        // Wrap the ImageKit upload in a Promise
        const result = await new Promise((resolve, reject) => {
          this.imagekit.upload(
            {
              file: this.state.file,
              fileName: this.state.file.name,
              token,
              signature,
              expire,
            },
            (err, result) => {
              if (err) {
                reject(err); // Reject the promise if there's an error
              } else {
                resolve(result); // Resolve the promise with the result
              }
            }
          );
        });
    
        console.log("Upload Successful: ", result);
    
        // Update the state with the uploaded image URL
        this.setState(
          { uploadedImageUrl: result.url },
          async() => {
            await this.onButtonSubmit(result.url);
          }
        );
    
      } catch (error) {
        console.error("Error during file upload: ", error);
        this.setState({ visible: false }, () => {
          this.handleError("Oops! Something went wrong...please try again later");
        });
      }
    };
    


 

   


  
 
  loadUser = (data) => {
    this.setState({ user: data });
  };




  scrollToSection = () => {
    if (this.sectionRef.current) {
      this.sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  calculateFaceLocation = (data) => {
    if(Object.keys(data.outputs[0].data.regions).length>1){
       let i = 0
    let faceLocInfo = []
    while(i<Object.keys(data.outputs[0].data.regions).length) {
    const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    faceLocInfo.push({
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    });
    i++

    }
    return(faceLocInfo)

    }
    else{
         const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return([{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }]);


    }
   

  }

  
enterOption = (event) => {
    if(event.key === 'Enter'){
      console.log('user pressed enter');
     this.onButtonSubmit();

    };
};

  displayFaceBox = (boxinfo) => {
    this.setState({ box: boxinfo },
    )
  };

  displayInfo = (info) => {
    this.setState({faceCount:info},
      ()=> {
      if (info > 1) {
      this.handleDetectionSuccess(`${info} faces detected in your image`);
    } else if (info === 1) {
      this.handleDetectionSuccess('A face has been detected in your image');
    } else {
      this.handle.Error('No faces found in your image');
    }
      }
    );
    this.setState({visible: false});
   
    
    // Ensure the scrollToSection is called after the alert is handled
    this.scrollToSection();
    
            
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = async (url) => {
    try {
      console.log('onButtonSubmit TRIGGERED with image url:',url);
  
      // Make API call to the backend
      const response = await fetch('https://facerecapi.onrender.com/imageUrl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: url }),
      });
  
      const data = await response.json(); // Await response.json() for parsed data
  
      console.log(Object.keys(data.outputs[0].data.regions).length);
      console.log(data);
  
      if (data) {
        this.displayFaceBox(this.calculateFaceLocation(data));
        this.displayInfo(Object.keys(data.outputs[0].data.regions).length);
  
        // Update user entry count
        const updateResponse = await fetch('https://facerecapi.onrender.com/image', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: this.state.user.id }),
        });
  
        const count = await updateResponse.json();
        this.setState(Object.assign(this.state.user, { entries: count }));
        console.log(count, 'COUNT');
      } else {
        alert('No response');
      }
    } catch (err) {
      this.handleError('No face Detected...pls try another image');
      console.error(err);
    }
  };
  

 



  // onButton ends here..


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, box, fileUrl,
      uploadedImageUrl,FileName,loading,percentage } = this.state;
    return (
      <div className="App">
        {/* Vanta Background */}
        <div className="vanta-background">
          <VantaBackground />
        </div>

        {/* Foreground Content */}
        <div className="content">
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          <div className="w-full max-w-lg mx-auto p-4 text-center">
          <ToastContainer />
          </div>
          {route === 'home' ? (
            <div>
              
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
                 
                  <ImageLinkForm
                    handleFileChange ={this.handleFileChange}
                    imageSubmitControl={this.imageSubmitControl}
                    progress={percentage}
                    loading={loading}
            
                    enterOption={this.enterOption}
                    // visible={visible}
                    FileName = {FileName}
                  />
                   <div ref={this.sectionRef}>
                  <FaceRecognition box={box} imageUrl={imageUrl} 
                  uploadedImageUrl={uploadedImageUrl} fileUrl={fileUrl} />
                  </div>
            </div>
          ) : (
            route === 'signin' ||route === 'signout' ? (
              <div>
                 {route==='signin' &&
                 <div>
                  <TypingEffect
                  text=" Welcome! Sign in to experience the magic of face detection AI..." speed={100}
                 textStyle="text-white text-xl font-semibold" />
                 <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} 
                 handleSuccess={this.handleSuccess}
                 handleError={this.handleError}
         /></div>
                 }
                  {route==='signout' && <TypingEffect text=" Goodbye...Come Back Soon!" speed={100}
              textStyle="text-white text-xl font-semibold"/>}
                 
             
              </div>
            ) : (
              <div>
             
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}
                  handleSignUpSuccess={this.handleSignUpSuccess}
                  handleError={this.handleError}
              />
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default App;












// OLD CODE

// import React, { useRef } from 'react';

// const App = () => {
//   const sectionRef = useRef(null);

//   const scrollToSection = () => {
//     sectionRef.current.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div>
//       <button onClick={scrollToSection}>Go to Section</button>
//       <div style={{ height: '100vh', background: 'lightgray' }}>
//         <h1>Page Top</h1>
//       </div>
//       <div
//         ref={sectionRef}
//         style={{
//           height: '100vh',
//           background: 'lightblue',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <h1>Target Section</h1>
//       </div>
//     </div>
//   );
// };

// export default App;















































































// import React, { Component } from 'react';
// import Navigation from './Components/Navigation/Navigation';
// import Logo from './Components/Logo/Logo';
// import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
// import Rank from './Components/Rank/Rank';
// import Register from './Components/Register/Register';
// import Signin from './Components/Signin/Signin';
// import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
// import VantaBackground from './Components/Vanta/vanta';
// import './App.css';






// const initialState = {
//       input: '',
//       imageUrl: '',
//       box: [],
//       faceCount :'',
//       route: 'signin',
//       isSignedIn: false,
//       visible:false,
//       user: {
//         id: '',
//         name: '',
//         email: '',
//         entries: 0,
//         joined: ''
//       }
//     }
  


// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       input: '',
//       imageUrl: '',
//       box: [],
//       faceCount :'',
//       route: 'signin',
//       isSignedIn: false,
//       visible:false,
//       user: {
//         id: '',
//         name: '',
//         email: '',
//         entries: 0,
//         joined: ''
//       }
//     }
//   }

//   loadUser = (data) => {
//     this.setState({user: {
//       id: data.id,
//       name: data.name,
//       email: data.email,
//       entries: data.entries,
//       joined: data.joined
//     }})
//   }

//   calculateFaceLocation = (data) => {
//     if(Object.keys(data.outputs[0].data.regions).length>1){
//        let i = 0
//     let faceLocInfo = []
//     while(i<Object.keys(data.outputs[0].data.regions).length) {
//     const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
//     const image = document.getElementById('inputimage');
//     const width = Number(image.width);
//     const height = Number(image.height);
//     faceLocInfo.push({
//       leftCol: clarifaiFace.left_col * width,
//       topRow: clarifaiFace.top_row * height,
//       rightCol: width - (clarifaiFace.right_col * width),
//       bottomRow: height - (clarifaiFace.bottom_row * height)
//     });
//     i++

//     }
//     return(faceLocInfo)

//     }
//     else{
//          const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
//     const image = document.getElementById('inputimage');
//     const width = Number(image.width);
//     const height = Number(image.height);
//     return([{
//       leftCol: clarifaiFace.left_col * width,
//       topRow: clarifaiFace.top_row * height,
//       rightCol: width - (clarifaiFace.right_col * width),
//       bottomRow: height - (clarifaiFace.bottom_row * height)
//     }]);


//     }
   

//   }



//   displayFaceBox = (boxinfo) => {
//     this.setState({box:boxinfo})
//     console.log(this.state.box,'state')
//     console.log(boxinfo,'raw')
//   }


//   onInputChange = (event) => { 
//     this.setState({input: event.target.value});
//   }



// enterOption = (event) => {
//     if(event.key === 'Enter'){
//       console.log('user pressed enter');
//      this.onButtonSubmit();

//     };
    
//   }

// displayInfo = (info) => {

//   this.setState({faceCount:info});
//   this.setState({visible: false});
//   if(info>1){
//   alert(info +" Faces Detected. Hit 'OK' to view");
//           }
//   else{alert("A face has been detected. Hit 'OK' to view")}
          
// }






//   onButtonSubmit = () => {

//     if (this.state.imageUrl!==this.state.input) {


//     this.setState({imageUrl: this.state.input});
//       this.setState({visible: true});

    
   

//     //api call will be made from the backend instead
//     fetch('https://facerecapi.onrender.com/imageUrl', {
//             method: 'post',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               input: this.state.input
//             })
//           })
//     .then(response=>response.json())
//     // .then(console.log()) //after a fetch remember to do a response.json()
//       .then(response => {
//         console.log(Object.keys(response.outputs[0].data.regions).length)
//         console.log(response);
//         if (response) {
//                   fetch('https://facerecapi.onrender.com/image', {
//             method: 'put',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               id: this.state.user.id
//             })
//           })
//             .then(res => res.json())
//             .then(count => {
//               this.setState(Object.assign(this.state.user, { entries: count}))
//             });
//           this.displayFaceBox(this.calculateFaceLocation(response))
//           this.displayInfo(Object.keys(response.outputs[0].data.regions).length)
         
//         }
//           else{alert('no response')};
//       })
//       .catch(err => console.log(err));

//     }

//     else{ if(this.state.faceCount>1)

//     { setTimeout( alert('URL already submitted. ' + this.state.faceCount + ' Faces Detected!'),2000)
//      }

//       else if(this.state.faceCount===1){setTimeout(alert('URL already submitted. A face has been Detected'),2000)
//    }

// }

//   }




























//   onRouteChange = (route) => {
//     if (route === 'signout') {
//       this.setState(initialState)
//     } else if (route === 'home') {
//       this.setState({isSignedIn: true})
//     }
//     this.setState({route: route});
//   }

//   render() {
//     const { isSignedIn, imageUrl, route, box, visible} = this.state;
//     return (
//       <div className="App">
//            <VantaBackground >

//         <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
//         { route === 'home'
//           ? <div>
//               <Logo />
//               <Rank
//                 name={this.state.user.name}
//                 entries={this.state.user.entries}
//               />
       

//               <ImageLinkForm
//                 onInputChange={this.onInputChange}
//                 onButtonSubmit={this.onButtonSubmit}
//                 enterOption = {this.enterOption}
//                 visible={visible}
//               />
      
//               <FaceRecognition box={box} imageUrl={imageUrl} />
//             </div>
//           : (
//              route === 'signin'
//              ?
//                <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            
//              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
//             )
//         }

// </VantaBackground >

//       </div>
//     );
//   }
// }

// export default App;




