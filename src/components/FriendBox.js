import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addFriend, removeFriend} from '../redux/action-creators'
import './friendBox.css'



class FriendBox extends Component {

    render() {
      return (
        <div className='friendBox'>
            <img src={this.props.img} alt='profile' />
            <p> {this.props.name}</p>
            {this.props.friendStatus ? <button className='removeFriendButton' onClick={(id)=>this.props.removeFriend(this.props.id)}>Remove Friend</button>
            : <button className='addFriendButton' onClick={(id)=>this.props.addFriend(this.props.id)}>Add Friend</button>
            }
        </div>
      );
    }
  }
  
  function mapStateToProps ({ }) {
    return {  };
    }
  
  export default connect(mapStateToProps , { addFriend, removeFriend })(FriendBox); 