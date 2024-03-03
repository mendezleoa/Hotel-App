import axios from 'axios'

const API_URL = 'http://localhost:5000/api/reservaciones/'

const newReservation = (habitacion, capacidad, user) => {
  return axios.post(API_URL + 'new', {
    habitacion,
    capacidad,
    user
  })
}

const ReservationService = {
  newReservation
}

export default ReservationService
