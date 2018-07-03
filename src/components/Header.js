import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './header.css'



class Header extends Component {
    render() {
      return (
        <div className='header'>
            <div className='headerLogos'>
                <p className='headerAppTitle'>Helo</p>
               <Link to='/dashboard'> <div className='homeIcon' /></Link>
               <Link to='/search/1'> <div className='searchIcon' /></Link>
            </div>
            <p className='pageTitle'>{this.props.title}</p>
            <button className='logout'>Logout</button>
        </div>
      );
    }
  }
  
  export default Header;