import axios from 'axios'

const API_URL = 'http://localhost:5000/api/rooms'

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

const RoomService = {
  getRooms
}

export default RoomService
