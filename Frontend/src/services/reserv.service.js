import axios from 'axios'

const API_URL = 'http://localhost:5000/api/reservaciones/'

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const newReservation = (habitacion, capacidad, user) => {
  return axios.post(API_URL + 'new', {
    habitacion,
    capacidad,
    user
  },{
    headers: {
      'auth-token': getCookie('jwt')
    }
  })
}

const ReservationService = {
  newReservation
}

export default ReservationService
