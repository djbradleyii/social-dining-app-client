import TokenService from './token-service';
import config from '../config';

const AttendeesApiService = {
  getAllAttendees() {
    return fetch(`${config.API_ENDPOINT}/attendees`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((responseJson) => Promise.reject(responseJson));
        }
        return response.json();
      });
  },
  getAttendeeById(attendeeId) {
    return fetch(`${config.API_ENDPOINT}/attendees/${attendeeId}`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((responseJson) => Promise.reject(responseJson));
        }
        return response.json();
      });
  },
  postAttendee(newAttendee) {
    return fetch(`${config.API_ENDPOINT}/attendees`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newAttendee),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((responseJson) => Promise.reject(responseJson));
        }
        return response.json();
      });
  },
  deleteAttendee(event_id) {
    return fetch(`${config.API_ENDPOINT}/attendees`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ event_id }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((responseJson) => Promise.reject(responseJson));
        }
      });
  },
};

export default AttendeesApiService;
