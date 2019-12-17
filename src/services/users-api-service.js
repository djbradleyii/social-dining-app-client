import TokenService from '../services/token-service'
import config from '../config'

const UsersApiService = {
    getUsers() {
        return fetch(`${config.API_ENDPOINT}/users`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            },
        })
          .then(response => {
            if(!response.ok){
              throw new Error('Something went wrong. Please try again later.');
            }
            return response.json();
          })
      },
      getUserById(userId) {
        return fetch(`${config.API_ENDPOINT}/users/${userId}`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            },
        })
          .then(response => {
            if(!response.ok){
              throw new Error('Something went wrong. Please try again later.');
            }
            return response.json();
          })
      },
      getUsersEvents(userId) {
          //fetch events for the individual
        return fetch(`${config.API_ENDPOINT}/users/${userId}/events`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            },
        })
          .then(response =>{
            if(!response.ok){
              throw new Error('Something went wrong. Please try again later.');
            }
            return response.json();
          })
      },
      postEvent(userId, newEvent) {
        return fetch(`${config.API_ENDPOINT}/events`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${TokenService.getAuthToken()}`,
          },
          body: JSON.stringify({
            user_id: userId,
            newEvent,
          }),
        })
          .then(response =>{
            if(!response.ok){
              throw new Error('Something went wrong. Please try again later.');
            }
            return response.json();
          })
      } 
}

export default UsersApiService;