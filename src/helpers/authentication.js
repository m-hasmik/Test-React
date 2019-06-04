import axios from 'axios'
import token from 'basic-auth-token'

function login(username, password) {
  const user = token(username, password)
  // add user from local storage to log user in
  localStorage.setItem('user', JSON.stringify(user))
  // return token for usage
  return user
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

export const authService = {
  login,
  logout
}

export const setAxiosInterceptors = token => {
  // Set the AUTH token for any request
  axios.interceptors.request.use(function(config) {
    config.headers.Authorization = `Basic ${token}`
    config.withCredentials = true
    return config
  })

  axios.interceptors.request.use(request => {
    // console.log('Starting Request', request)
    return request
  })

  axios.interceptors.response.use(response => {
    // console.log('Response:', response)
    return response
  })
}
