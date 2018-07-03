import services from './services'
import {SET_STATE, SET_FRIENDS, UPDATE_USER, ADD_FRIEND, REMOVE_FRIEND} from './constraints'



export function setState(){
    return {
        type: SET_STATE,
        payload: services.getUser()
    }
}

export function setFriends(){
    return {
        type: SET_FRIENDS,
        payload: services.getFriends()
    }
}
export function updateUser(payload){
    return {
        type: UPDATE_USER,
        payload: payload
    }
}
export function addFriend(id){
    return{
        type: ADD_FRIEND,
        payload: services.addFriend(id)
    }
}
export function removeFriend(id){
    return{
        type: REMOVE_FRIEND,
        payload: services.removeFriend(id)
    }
}