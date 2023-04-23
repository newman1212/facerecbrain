import React from 'react';
import Spinner from 'react-spinner-material';



class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      visible : false
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }



  onSubmitRegister = () => {
       this.setState({visible:true});
    fetch('https://facerecapi.onrender.com/register',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(user=> { if (user.email && user.name){
        this.props.loadUser(user);
        this.props.onRouteChange('home');
          this.setState({visible:false})
      }
      else{alert(user)}
        this.setState({visible:false})


      })
  
  }

   enterOption = (event) => {
    if(event.key === 'Enter'){
      console.log('user pressed enter');
      this.onSubmitRegister();

    };
    
  }


  render() {
     const {onRouteChange} = this.props;
     const {visible} = this.state
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure" onKeyDown = {this.enterOption}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 light-blue ">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 light-blue" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 light-blue" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy  light-blue f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="" >
              <input
                onClick={this.onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib light-blue"
                type="submit"
                value="Register"
              />
              <div className = 'center'>
                  <Spinner radius={30} color= "white" stroke={5} visible={visible}  />
              </div>
           
            </div>
            <div className="lh-copy mt3">
              <p onClick={()=>onRouteChange('signin')} className="f6 link white db pointer">Already have an account? Sign In</p>
            </div>
            </div>
        </main>
      </article>
    );
  }

}



export default Register;