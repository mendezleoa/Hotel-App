import axios from 'axios'

const API_URL = 'http://localhost:5000/api/reservaciones/'

const newReservation = (habitacion) => {
  return axios.post(API_URL + 'new', {
    habitacion
  })
}

const ReservationService = {
  newReservation
}

export default ReservationService