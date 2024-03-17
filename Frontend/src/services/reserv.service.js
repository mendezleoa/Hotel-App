import axios from 'axios'

const API_URL = 'http://localhost:5000/api/reservaciones/'

function getCookie (cname) {
  let name = cname + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

const getReservabyId = async id => {
  return await axios.get(API_URL + id).then(response => {
    return response.data
  })
}

const newReservation = async reservaDetalle => {
  const room = reservaDetalle.room._id
  const { fechaInit, fechaSalida, totalimporte } = reservaDetalle

  return await axios.post(
    API_URL + 'new',
    {
      room,
      fechaInit,
      fechaSalida,
      totalimporte
    },
    {
      headers: {
        'auth-token': getCookie('jwt')
      }
    }
  )
}

const deleteReservation = id => {
  return axios
    .delete(API_URL + `delete/${id}`, {
      headers: {
        'auth-token': getCookie('jwt')
      }
    })
    .then(response => {
      if (!response.error) {
        return response.data
      } else {
        console.error(response.error)
        return ''
      }
    })
    .catch(error => {
      console.error(error)
    })
}

const ReservationService = {
  getReservabyId,
  newReservation,
  deleteReservation
}

export default ReservationService
