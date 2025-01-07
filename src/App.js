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
  visible: false,
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
  FileName : 'Click To Upload Image'

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
    this.setState({ file: event.target.files[0] },
      ()=>{
        this.setState({ FileName: this.state.file.name });
        const url = URL.createObjectURL(this.state.file); // Generate a temporary URL
        this.setState({ uploadedImageUrl: url });
      }
    );  
  };

  handleSuccess = (message) => {
    console.log('alert triggered');
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
    });
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

    if (!this.state.faceCount && this.state.file){this.handleFileUpload()};

     
    if(this.state.faceCount>1)
   { this.handleSuccess('Image already submitted. ' + this.state.faceCount + ' Faces Detected!');
        this.scrollToSection();
       }
  
        else if(this.state.faceCount===1)
          { this.handleSuccess('Image already submitted. A face has been Detected');

            this.scrollToSection();
          }

          

    

    }
  

  handleFileUpload = async () => {

    console.log('UPLOAD TRIGGERED');
    this.setState({visible: true});
    try {
      // Fetch authentication parameters from the backend
      const response = await fetch("https://facerecapi.onrender.com/imagekit-auth");
      const { token, signature, expire } = await response.json();

      console.log(token,signature,expire, 'PARAMETERS');

     
      // Upload the file
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
            console.error("Upload Error: ", err);
          } else {
            console.log("Upload Successful: ", result);


            // this.setState({ uploadedImageUrl : result.url });
            // console.log(this.state.uploadedImageUrl, 'ImageURL')
            this.setState(
              { uploadedImageUrl: result.url },
              () => {
                console.log(this.state.uploadedImageUrl, 'ImageURL');
                this.onButtonSubmit(this.state.uploadedImageUrl);
              }
            );
            



            // this.onButtonSubmit();
          }
        }
      );
    } catch (error) {
      console.error("Error fetching authentication parameters: ", error);
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
      this.handleSuccess(`${info} Faces have been found in your image`);
    } else if (info === 1) {
      this.handleSuccess('A face has been found in your image');
    } else {
      this.handleSuccess('No faces found in your image');
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

  onButtonSubmit = (url) => {

   

      console.log('onButtonSubmit TRIGGERED!');

    
    //api call will be made from the backend instead
    fetch('https://facerecapi.onrender.com/imageUrl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: url,
            })
          })
    .then(response=>response.json())
    .then(console.log()) //after a fetch remember to do a response.json()
      .then(response => {
        console.log(Object.keys(response.outputs[0].data.regions).length)
        console.log(response);
        if (response) {
      
                  fetch('https://facerecapi.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(res => res.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            });
          this.displayFaceBox(this.calculateFaceLocation(response))
          this.displayInfo(Object.keys(response.outputs[0].data.regions).length)
          
         
        }
          else{alert('no response')};
      })
      .catch(err => console.log(err));

    }

 



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
    const { isSignedIn, imageUrl, route, box, visible, fileUrl,uploadedImageUrl,FileName } = this.state;
    return (
      <div className="App">
        {/* Vanta Background */}
        <div className="vanta-background">
          <VantaBackground />
        </div>

        {/* Foreground Content */}
        <div className="content">
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          <ToastContainer />
          {route === 'home' ? (
            <div>
              
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
                  <div ref={this.sectionRef}>
                  <ImageLinkForm
                    handleFileChange ={this.handleFileChange}
                    imageSubmitControl={this.imageSubmitControl}
            
                    enterOption={this.enterOption}
                    visible={visible}
                    FileName = {FileName}
                  />
                  <FaceRecognition box={box} imageUrl={imageUrl} 
                  uploadedImageUrl={uploadedImageUrl} fileUrl={fileUrl} />
                  </div>
            </div>
          ) : (
            route === 'signin' ? (
              <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            ) : (
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
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




