import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth/'

const register = (username, email, password) => {
  return axios.post(API_URL + 'signup', {
    username,
    email,
    password
  })
}

const login = async (username, password) => {
  return await axios
    .post(API_URL + 'signin', {
      username,
      password
    })
    .then(response => {
      if (response.data) {
        console.log(JSON.stringify(response.data))
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

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser
}

export default AuthService
