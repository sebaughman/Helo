import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import './search.css';
import Header from '../components/Header';
import FriendBox from '../components/FriendBox'



class Search extends Component {
    constructor(){
        super()
        this.state={
            loading: true,
            searchCat: undefined,
            searchValue: undefined,
            pages: '',
            users: []
        }
    }

    componentDidMount(){
        axios.get(`/api/users/${this.props.match.params.page}`)
            .then(response=>{
                this.setState({
                    pages: response.data.pages,
                    users: response.data.users,
                    loading: false,
                })
            })
    }

   componentWillReceiveProps(props){
        this.setState({
            loading: true
        })
        axios.get(`/api/users/${props.match.params.page}`)
            .then(response=>{
                this.setState({
                    pages: response.data.pages,
                    users: response.data.users,
                    loading: false,
                })
            })
    }

    // enterValue(event){
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     })
    // }
   
    search(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    reset(){
       this.setState({
        searchCat: undefined,
        searchValue: undefined,
       })
    }
    
    render() {
        let pageButtons = []
        for(let i=1; i<this.state.pages; i++){
            pageButtons.push(i)
        }
        pageButtons = pageButtons.map((page, i)=>{
          
                   return Number(this.props.match.params.page) === page ?
                     <Link to={`/search/${page}`} key={i}>
                    <button className='pageButtonSelected' >{page}</button> </Link>
                    :
                    <Link to={`/search/${page}`} key={i} >
                    <button className='pageButton'  >{page}</button></Link>
                   
        })

        const isFriend = (u) => !!this.props.friends.find(f => f.email === u.email)
       
         let users = this.state.users
         .filter(user=>user[this.state.searchCat] === this.state.searchValue)
         .map((user, i)=>{
            let friendStatus = isFriend(user);
            return <FriendBox key={i} id={user.id} img={user.image} name={`${user.first_name} ${user.last_name}`}  friendStatus={friendStatus}/>
        })

      return (
          <div className='searchBody'>
          <Header />
        <div className='searchContainer'>
            
            <form className='searchHeader'>
                <div>
                    <select name='searchCat' value={this.state.searchCat} >
                        <option value='first_name'>First Name</option>
                        <option value='last_name'>Last Name</option>
                        <option value='hobby'>Hobby</option>
                        <option value='hair_color'>Hair Color</option>
                        <option value='eye_color'>Eye Color</option>
                        <option value='birthday_year'>Birthday Year</option>
                    </select>
                    <input type='text' name='searchValue'  value={this.state.searchValue} />
                    
                </div>

                <div className='searchButtonContainer'>
                    <button className='darkGreyButton' onClick={()=>this.search()}>Search</button>
                    <button className='greyButton' onClick={()=>this.reset()}>Reset</button>
                </div>
            </form>
      
            <div className='users'>
                {users}
              
            </div>
            <div className='pageButtonsContainer'>
                {pageButtons}
            </div>
        </div>
        </div>
      );
    }
  }
  
function mapStateToProps ({ user, friends }) {
    return { user, friends };
    }
  
  export default connect(mapStateToProps )(Search); 