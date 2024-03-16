import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth/'

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

const register = async (username, email, password) => {
  return await axios
    .post(API_URL + 'signup', {
      username,
      email,
      password
    })
    .then(response => {
      if (response.data) {
        const d = new Date()
        d.setTime(d.getTime() + 10 * 86400000)
        let expires = 'expires=' + d.toUTCString()
        document.cookie =
          'jwt =' + response.data.token + ';' + expires + ';path=/'
        localStorage.setItem('user', response.data.username)
      }
      return response.data
    })
    .catch(error => console.log(error))
}

const login = async (username, password) => {
  return await axios
    .post(API_URL + 'signin', {
      username,
      password
    })
    .then(response => {
      if (response.data) {
        const d = new Date()
        d.setTime(d.getTime() + 10 * 24 * 60 * 60 * 1000)
        let expires = 'expires=' + d.toUTCString()
        document.cookie =
          'jwt =' + response.data.token + ';' + expires + ';path=/'
        localStorage.setItem('user', response.data.username)
      }
      return response.data
    })
    .catch(error => console.log(error))
}

const logout = () => {
  localStorage.removeItem('user')
  return axios.post(API_URL + 'signout').then(response => {
    return response.data
  })
}

const getCurrentUser = () => {
  return localStorage.getItem('user')
}

const getUserData = async () => {
  const config = {
    headers: {
      'auth-token': getCookie('jwt')
    }
  }
  return axios.get(API_URL + 'get/', config).then(response => {
    return response.data
  })
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getUserData
}

export default AuthService
