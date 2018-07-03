import axios from 'axios';

const services = {
    
    getUser: ()=>{
         return axios.get(`/api/user`)
                .then(user=>user.data)
    },

    getFriends: ()=>{
      return  axios.get(`/api/friends`)
                .then(response=>response.data)
    },

    getRecommended: ()=>{
        return axios.get(`/api/recommended`)
                .then(response=>response.data)

    },
    addFriend: (id)=>{
        return  axios.post(`/api/friend`, {id:id})
        .then(response=>response.data)
    },
    removeFriend:(id)=>{
       return axios.put(`/api/friend`, {id: id})
        .then(response=>response.data)
    }
}


export default services