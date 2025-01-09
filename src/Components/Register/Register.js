import React from 'react';
import Spinner from 'react-spinner-material';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      visible: false,
      showPassword: false,
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  onSubmitRegisterControl =()=>{
    const {name,email,password}=this.state;
      if(!name || !email || !password){this.props.handleError('please complete form')}
      else{this.onSubmitRegister()};

  }

  onSubmitRegister = () => {
    this.setState({ visible: true });
    fetch(

      // 'http://localhost:5000/register',
      
      'https://facerecapi.onrender.com/register', 
    {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        entries: 0,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.email && user.name) {
          this.props.loadUser(user);
          console.log(user,'USER INFO');
          this.props.onRouteChange('home');
          this.setState({ visible: false });
          this.props.handleSuccess('Account Created Successfully!');
        } else {
          this.props.handleError('Error creating account...pls try again later');
          this.setState({ visible: false });
        }
      });
  };

  enterOption = (event) => {
    if (event.key === 'Enter') {
      this.onSubmitRegisterControl();
    }
  };

  render() {
    const { onRouteChange } = this.props;
    const { visible, password, showPassword } = this.state;

    return (
      <article className="rounded-lg border border-gray-700 shadow-lg p-8 w-full max-w-md mx-auto mt-10 bg-gray-900/50">
        <main className="text-gray-200" onKeyDown={this.enterOption}>
          <div>
            <fieldset className="mb-4">
              <legend className="text-2xl font-semibold text-blue-400 mb-4">Register</legend>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
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
              <div className="relative mb-4">
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
                {password && (
                  <div
                    className="absolute top-1/2 right-3 transform -translate-y-1/6 cursor-pointer text-gray-400"
                    onClick={this.togglePasswordVisibility}
                  >
                    {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                  </div>
                )}
              </div>
            </fieldset>
            <div>
              <button
                onClick={this.onSubmitRegisterControl}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <span className="text-white text-lg font-bold font-mono"> Register</span>
              </button>
              <div className="flex justify-center mt-4">
                <Spinner radius={30} color="white" stroke={5} visible={visible} />
              </div>
            </div>
            <div className="mt-4 text-center">
              <p
                onClick={() => onRouteChange('signin')}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                Already have an account? Sign In
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
