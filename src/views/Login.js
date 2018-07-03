import React, { Component } from 'react';
import axios from 'axios';
import './login.css'



class Login extends Component {
  constructor(){
    super();

    this.state = {
      email:'',
      password:''
    }
  }

  enterValue(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  login(){
    axios.post(`/api/login`, this.state)
      .then(response=>{
        this.props.history.push('/dashboard')
      })
      .catch(err=>{
        console.error(err)
      })
  }
  register(){
    axios.post(`/api/register`, this.state)
      .then(response=>{
        this.props.history.push('/dashboard')
      })
      .catch(err=>{
        console.error(err)
      })
  }



    render() {
      return (

        <div className='loginBody'>
        
        <div className='loginContainer'>
          <div className='logo' />
          <div className='loginTitle'> Helo </div>
          <input placeholder='Email' name='email' type='email' value={this.state.email} onChange={(event)=>{this.enterValue(event)}}/>
          <input placeholder='Password'  name='password' type='password' value={this.state.password} onChange={(event)=>{this.enterValue(event)}}/>
          <div className='loginButtonContainer'>
            <button className='loginButton' onClick={()=>this.login()}>Login</button>
            <button className='registerButton' onClick={()=>this.register()}>Register</button>
          </div>
        </div>
        </div>
      );
    }
  }
  
  export default Login;