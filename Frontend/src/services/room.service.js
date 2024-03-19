import axios from 'axios'

const API_URL = 'http://localhost:5000/api/rooms/'

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

const getRooms = async () => {
  return await axios.get(API_URL).then(response => {
    return response.data
  })
}

const getRoombyId = async id => {
  return await axios.get(API_URL + `${id}`).then(response => {
    return response.data
  })
}

const newRoom = async data => {
  let {
    name,
    descripcion,
    comodidades,
    capacidad,
    tarifas,
    review,
    evaluacion,
    type
  } = data
  tarifas = parseInt(tarifas)
  capacidad = parseInt(capacidad)
  evaluacion = parseInt(evaluacion)

  return await axios.post(
    API_URL + 'new',
    {
      name,
      descripcion,
      comodidades,
      capacidad,
      tarifas,
      review,
      evaluacion,
      type
    },
    {
      headers: {
        'auth-token': getCookie('jwt')
      }
    }
  )
}

const deleteRoom = async id => {
  return await axios
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

const RoomService = {
  getRooms,
  getRoombyId,
  newRoom,
  deleteRoom
}

export default RoomService
