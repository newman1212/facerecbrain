import React from 'react';
import Spinner from 'react-spinner-material';




class Signin extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      signInEmail : '',
      signInPassword: '',
      visible:false
    }

  }

onEmailChange = (event) => {
  this.setState({signInEmail : event.target.value})
}


onPasswordChange = (event) => {
  this.setState({signInPassword : event.target.value})
}

onSubmitSignIn = () => {
    this.setState({visible:true});
  fetch('https://facerecapi.onrender.com/signin',{
    method:'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(
      {email:this.state.signInEmail,
      password:this.state.signInPassword
    }),
  }).then(response=>response.json())
  .then(user=>{if(user.email || this.state.signInEmail==='guest@gmail.com'){
    this.props.loadUser(user);
    this.props.onRouteChange('home');
      this.setState({visible:false});
  }
  else {alert('hmmm something went wrong, check your login details')};
    this.setState({visible:false});
    
  }    
  
);
}


 enterOption = (event) => {
    if(event.key === 'Enter'){
      console.log('user pressed enter');
      this.onSubmitSignIn();

    };
    
  }

  render(){

    const {onRouteChange} = this.props
      const {visible} = this.state

     return (
      <>
      <p className="f2 green pa3 fw6">Hi there, for a quick demo you might want to use the following login details:</p>
      <span className="f3 green  pa3 fw6" >Email : guest@gmail.com</span> <br/>
       <span className="f3 green  pa3 fw6" >Password : guest123</span>
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure" onKeyDown = {this.enterOption}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 light-blue  mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy light-blue f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent  hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy light-blue f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer light-blue f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>

                <div className = 'center'>
                  <Spinner radius={30} color= "white" stroke={5} visible={visible}  />
              </div>
           
            <div className="lh-copy mt3">
              <p onClick={()=>onRouteChange('register')} className="f6 link dim black white db pointer">
              Don't have an account yet? Register</p>
            </div>
          </div>
        </main>
      </article>
      </>
    );

  }
}


export default Signin;