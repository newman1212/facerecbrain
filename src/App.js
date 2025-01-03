import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Register from './Components/Register/Register';
import Signin from './Components/Signin/Signin';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import VantaBackground from './Components/Vanta/vanta';
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
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
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ user: data });
  };

  calculateFaceLocation = (data) => {
    // Your face location calculation logic here
  };

  displayFaceBox = (boxinfo) => {
    this.setState({ box: boxinfo });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    // Your image submission logic here
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, box, visible } = this.state;
    return (
      <div className="App">
        {/* Vanta Background */}
        <div className="vanta-background">
          <VantaBackground />
        </div>

        {/* Foreground Content */}
        <div className="content">
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          {route === 'home' ? (
            <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                enterOption={this.enterOption}
                visible={visible}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
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
