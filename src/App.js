import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';
import ParticlesBg from 'particles-bg'


const app = new Clarifai.App({
  apiKey:'90becc86e9d9432486ab240eb4387cf5'

});


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box:{},
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
  return (
      <div className="App">
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <ParticlesBg type="lines"  bg={true} />
        <FaceRecognition box={this.state.box} imageUrl = {this.state.imageUrl}/>

      </div>
    );
  }
}

export default App;

// TDL
// 1. Fix particles issue






