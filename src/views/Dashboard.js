import React, { Component } from 'react';
import './dashboard.css'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {setState, setFriends, addFriend, removeFriend} from '../redux/action-creators'
import Header from '../components/Header';
import FriendBox from '../components/FriendBox';
import services from '../redux/services';



class Dashboard extends Component {
    constructor(){
        super()
      this.state = {
          loading: true,
          recommendedFriends: [],
          filterFriends: null,
          filterRecommended: null
      }

    }

    componentWillMount(){
       this.props.setState();
       this.props.setFriends();
    }

    componentDidMount(){
        services.getRecommended()
            .then(users=>{  
                this.setState({
                    loading: false,
                    recommendedFriends: users,
                })
                
            })
    }

    changeFilter(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {

        let friends = [];
        if(this.state.loading === false){
            friends = this.props.friends
            .filter(friend=>{
                return friend[this.state.filterFriends] === this.props.user[this.state.filterFriends]
            }).map((friend, i)=>{
                return <FriendBox key={i} id={friend.id} img={friend.image} name={`${friend.first_name} ${friend.last_name}`} friendStatus={true}/>
            })
        }
        let recommendedFriends =[];
        if(this.state.loading === false){
            this.state.recommendedFriends.forEach(user => {
                const index = this.props.friends
                .findIndex(friend => friend.email === user.email)
                if (index === -1) recommendedFriends.push(user)
              });
            
            recommendedFriends = recommendedFriends
              .filter(friend=>{
                return friend[this.state.filterRecommended] === this.props.user[this.state.filterRecommended]
              }).map((user, i)=>{
                return <FriendBox key={i} id={user.id} img={user.image} name={`${user.first_name} ${user.last_name}`}  friendStatus={false}/>
             })   
        }
       
      return (
        <div >
           <Header title='Dashboard'/>
           <div className='dashboardBody'>
                <section className='dashboardHeader'>
                        <div className='profileBox'>
                            <div  ><img className='profileImg' alt='Profile' src={this.props.user.image}/></div>
                            <div className='nameDiv'>
                                <h3>{`${this.props.user.first_name} ${this.props.user.last_name}`}</h3>
                               <Link to='/profile'> <button className='greyButton'>Edit Profile</button></Link>
                            </div>
                        </div>
                        <div className='appInfo'>
                            Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!
                        </div>
                </section>

                <section className='friendsContainer'>
                        <div className='titleDiv'>
                                <h3>Friends</h3>
                                <span>Sort By: 
                                    <select name='filterFriends' onChange={(event)=>{this.changeFilter(event)}}>
                                        <option value={null}>All</option>
                                        <option value='hobby'>Hobby</option>
                                        <option value='hair_color'>Hair Color</option>
                                        <option value='eye_color'>Eye Color</option>
                                        <option value='gender'>Gender</option>
                                        <option value='birthday_year'>Birthday Year</option>
                                    </select>
                                </span>
                        </div>
                        <div className='friends'>
                            {friends}
                        </div>
                </section>

                <section className='recommendedFriendsContainer'>
                        <div className='titleDiv'>
                                <h3>Recommended Friends</h3>
                                <span>Sort By: 
                                    <select name='filterRecommended' onChange={(event)=>{this.changeFilter(event)}}>
                                        <option value={null}>All</option>
                                        <option value='hobby'>Hobby</option>
                                        <option value='hair_color'>Hair Color</option>
                                        <option value='eye_color'>Eye Color</option>
                                        <option value='gender'>Gender</option>
                                        <option value='birthday_year'>Birthday Year</option>
                                    </select>
                                </span>
                        </div>
                        <div className='recommendedFriends'>
                            {recommendedFriends}
                        </div>
                </section>
            </div>
        </div>
      );
    }
  }
  
  function mapStateToProps ({ user, friends }) {
    return { user, friends };
    }
  
  export default connect(mapStateToProps , { setState, setFriends, addFriend, removeFriend })(Dashboard); 