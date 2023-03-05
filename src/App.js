 import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Register from './Components/Register/Register';
import Signin from './Components/Signin/Signin';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';
import ParticlesBg from 'particles-bg';
import Spinner from 'react-spinner-material';
// import { BallBeat } from 'react-pure-loaders';
// import './Particles.css';






const initialState = {
      input: '',
      imageUrl: '',
      box: [],
      faceCount :'',
      route: 'signin',
      isSignedIn: false,
      visible:false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      faceCount :'',
      route: 'signin',
      isSignedIn: false,
      visible:false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

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



  displayFaceBox = (boxinfo) => {
    this.setState({box:boxinfo})
    console.log(this.state.box,'state')
    console.log(boxinfo,'raw')
  }


  onInputChange = (event) => { 
    this.setState({input: event.target.value});
  }



enterOption = (event) => {
    if(event.key === 'Enter'){
      console.log('user pressed enter');
     this.onButtonSubmit();

    };
    
  }

displayInfo = (info) => {

  this.setState({faceCount:info});
  this.setState({visible: false});
  if(info>1){
  alert(info +" Faces Detected. Hit 'OK' to view");
          }
  else{alert("A face has been detected. Hit 'OK' to view")}
          
}






  onButtonSubmit = () => {

    if (this.state.imageUrl!==this.state.input) {


    this.setState({imageUrl: this.state.input});
      this.setState({visible: true});

    
   

    //api call will be made from the backend instead
    fetch('https://facerecapi.onrender.com/imageUrl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
    .then(response=>response.json())
    // .then(console.log()) //after a fetch remember to do a response.json()
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

    else{ if(this.state.faceCount>1)

    { setTimeout( alert('URL already submitted. ' + this.state.faceCount + ' Faces Detected!'),2000)
     }

      else if(this.state.faceCount===1){setTimeout(alert('URL already submitted. A face has been Detected'),2000)
   }

}

  }




























  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box, visible} = this.state;
    return (
      <div className="App">
      <div className = 'bubbles'>
        <ParticlesBg type="lines" color ='#2a2c30' bg={true} />
        </div>

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
        <div>
              <Spinner radius={120} color= "white" stroke={5} visible={visible} />
        </div>


              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                enterOption = {this.enterOption}
              />
      
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;




