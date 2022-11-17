import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Register from './Components/Register/Register';
import Signin from './Components/Signin/Signin';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';
import ParticlesBg from 'particles-bg'


const app = new Clarifai.App({
  apiKey:'90becc86e9d9432486ab240eb4387cf5'

});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      // user: {
      //   id: '',
      //   name: '',
      //   email: '',
      //   entries: 0,
      //   joined: ''
      // }
    }
  }

  calculateFaceLocation =(data)=> {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
     return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }


  onRouteChange = (route) => {
    if(route=== 'signout'){
      this.setState({isSignedIn:false})
    } else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }


  onInputChange = (event) => {
   this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,this.state.input).then(response=>console.log('hi',response))
    // .then(response =>this.displayFaceBox(this.calculateFaceLocation(response)))
    // .catch(err=>console.log(err));
    

  }






  render(){
    const {isSignedIn, imageUrl, route, box} = this.state
  return (
      <div className="App">
        {/*<ParticlesBg type="lines"  bg={true} />*/}
        <Navigation onRouteChange={this.onRouteChange} isSignedIn ={isSignedIn}/>
        {route==='home'?
        <div>
          <Logo/>
          <Rank/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>  
          <FaceRecognition box={box} imageUrl = {imageUrl}/>
        </div>
        :(route === 'signin'?
          <Signin onRouteChange={this.onRouteChange}/>
          :<Register onRouteChange={this.onRouteChange}/>
          )

      }

      </div>
    );
  }
}

export default App;

// TDL
// 1. Fix particles issue






