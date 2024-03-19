import axios from 'axios'

const API_URL = 'http://localhost:5000/api/blogs/'

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

const getBlogs = async () => {
  return await axios.get(API_URL).then(response => {
    return response.data
  })
}

const newBlog = async data => {
  let { mensaje } = data
  return await axios.post(
    API_URL + 'new',
    {
      mensaje
    },
    {
      headers: {
        'auth-token': getCookie('jwt')
      }
    }
  )
}

const deleteBlog = async id => {
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

const BlogsService = {
  getBlogs,
  newBlog,
  deleteBlog
}

export default BlogsService
