import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateUser} from '../redux/action-creators'
import Header from '../components/Header';
import './profile.css'



class Profile extends Component {

constructor(props){
    super(props)
    this.state= {
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        gender: this.props.user.gender,
        hair_color: this.props.user.hair_color,
        eye_color: this.props.user.eye_color,
        hobby: this.props.user.hobby,
        birthday_day: this.props.user.birthday_day,
        birthday_month: this.props.user.birthday_month,
        birthday_year: this.props.user.birthday_year,
    }
}

enterValue(event){
    this.setState({
        [event.target.name]: event.target.value
    })
}

updateUser(){
    this.props.updateUser(this.state)
}
cancel(){
    this.setState({
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        gender: this.props.user.gender,
        hair_color: this.props.user.hair_color,
        eye_color: this.props.user.eye_color,
        hobby: this.props.user.hobby,
        birthday_day: this.props.user.birthday_day,
        birthday_month: this.props.user.birthday_month,
        birthday_year: this.props.user.birthday_year,
    })
}

    render() {
      return (
        <div>
            <Header />
            <div className='profileBody'>
            <section className='profileHeader'>
                <div className='imgDiv'>
                <div  ><img className='profileImg' alt='Profile' src={this.props.user.image}/></div>
                    <h3>{`${this.props.user.first_name} ${this.props.user.last_name}`}</h3>
                </div>
                <div className='profileButtonContainer'>
                    <button className='darkGreyButton' onClick={()=>this.updateUser()}>Update</button>
                    <button className='greyButton' onClick={()=>this.cancel()}>Cancel</button>
                </div>
            </section>

            <section className='profileInfo'>
                <form>
                    <label>First Name</label>
                    <input name='first_name' type='text' value={this.state.first_name} onChange={(event)=>this.enterValue(event)}/>
                    <label>Last Name</label>
                    <input name='last_name' type='text' value={this.state.last_name} onChange={(event)=>this.enterValue(event)}/>
                    <label>Gender</label>
                    <select name='gender'  value={this.state.gender} onChange={(event)=>this.enterValue(event)}>
                        <option value='female'>Female</option>
                        <option value='male'>Male</option>
                    </select>
                    <label>Hair Color</label>
                    <select name='hair_color'  value={this.state.hair_color} onChange={(event)=>this.enterValue(event)}>
                        <option value='brown'>Brown</option>
                        <option value='blonde'>Blonde</option>
                        <option value='red'>Red</option>
                        <option value='grey'>Grey</option>
                        <option value='other'>Other</option>
                    </select>
                    <label>Eye Color</label>
                    <select name='eye_color'  value={this.state.eye_color} onChange={(event)=>this.enterValue(event)}>
                        <option value='brown'>Brown</option>
                        <option value='blue'>Blue</option>
                        <option value='green'>Green</option>
                        <option value='grey'>Grey</option>
                        <option value='other'>Other</option>
                    </select>
                    <label>Hobby</label>
                    <select name='hobby'  value={this.state.hobby} onChange={(event)=>this.enterValue(event)}>
                        <option value='hiking'>Hiking</option>
                        <option value='climbing'>Climbing</option>
                        <option value='fishing'>Fishing</option>
                        <option value='rafting'>Rafting</option>
                        <option value='video games'>Video Games</option>
                    </select>
                    <label>Birthday </label>
                    <div className='birthday'>
                        <select  name='birthday_month'  value={this.state.birthday_month} onChange={(event)=>this.enterValue(event)}>
                            <option value='january'>January</option>
                            <option value='february'>February</option>
                            <option value='march'>March</option>
                            <option value='april' >April</option>
                            <option value='may'>May</option>
                            <option value='june'>June</option>
                            <option value='july'>July</option>
                            <option value='august'>August</option>
                            <option value='september'>September</option>
                            <option value='october'>October</option>
                            <option value='november'>November</option>
                            <option value='december'>December</option>
                        </select>
                        <input  type='number' name='birthday_day'  value={this.state.birthday_day} placeholder='Day' onChange={(event)=>this.enterValue(event)}/>
                        <input type='number' name='birthday_year'  value={this.state.birthday_year} placeholder='Year' onChange={(event)=>this.enterValue(event)}/>
                    </div>
                </form>
            </section>
            </div>
        </div>
      );
    }
  }

  function mapStateToProps ({ user }) {
    return { user };
    }
  
  export default connect(mapStateToProps , { updateUser })(Profile); 