import React from 'react';
import Spinner from 'react-spinner-material';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      visible: false,
      showPassword: false, // State to toggle password visibility
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };


  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  onSubmitSignIn = () => {
    this.setState({ visible: true });
    fetch('https://facerecapi.onrender.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.email || this.state.signInEmail === 'guest@gmail.com') {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
          this.setState({ visible: false });
        } else {
          alert('Hmmm, something went wrong. Check your login details.');
          this.setState({ visible: false });
        }
      });
  };

  enterOption = (event) => {
    if (event.key === 'Enter') {
      this.onSubmitSignIn();
    }
  };

  render() {
    const { onRouteChange } = this.props;
    const { visible, showPassword, signInPassword} = this.state;

    return (
      <>
        <p className="text-lg text-green-500 text-center mb-4">
          Hi there! For a quick demo, use the following login details:
        </p>
        <div className="text-center text-green-400">
          <p>Email: guest@gmail.com</p>
          <p>Password: guest123</p>
        </div>
        <article className="rounded-lg border border-gray-700 shadow-lg p-8 w-full max-w-md mx-auto mt-10 bg-gray-900/50">
          <main className="text-gray-200" onKeyDown={this.enterOption}>
            <div>
              <fieldset className="mb-4">
                <legend className="text-2xl font-semibold text-blue-400 mb-4">Sign In</legend>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded focus:ring-blue-500 focus:border-blue-500"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mb-4 relative">
                  <label className="block text-sm font-medium mb-1" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded focus:ring-blue-500 focus:border-blue-500"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                  />
                   {signInPassword && (
                    <div
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-400"
                      onClick={this.togglePasswordVisibility}
                    >
                      {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                    </div>
                   )}
                </div>
              </fieldset>
              <div>
                <button
                  onClick={this.onSubmitSignIn}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  Sign In
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <Spinner radius={30} color="white" stroke={5} visible={visible} />
              </div>
              <div className="mt-4 text-center">
                <p
                  onClick={() => onRouteChange('register')}
                  className="text-blue-400 hover:underline cursor-pointer"
                >
                  Don't have an account yet? Register
                </p>
              </div>
            </div>
          </main>
        </article>
      </>
    );
  }
}

export default Signin;
