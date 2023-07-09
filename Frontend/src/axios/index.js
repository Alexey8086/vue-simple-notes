import axios from 'axios'
import router from '@/router'

const $host = axios.create({
  baseURL: process.env.VUE_APP_BASE_SERVER_URL
})

const $authHost = axios.create({
  baseURL: process.env.VUE_APP_BASE_SERVER_URL
})

$authHost.interceptors.response.use(null, (e) => {
  const errorMsg = e.response.data?.message ? e.response.data.message : 'Unauthorized'
  if (e.response.status === 500 || e.response.status === 403 || e.response.status === 401) {
    router.push(`/signin?message=${errorMsg}`)
  }

  return errorMsg
})

const authInterceptor = (req) => {
  const token = localStorage.getItem('jwt-token')
  if (token) {
    req.headers.authorization = `Bearer ${token}`
  }
  return req
}

const authInterceptorMultipart = (req) => {
  const token = localStorage.getItem('jwt-token')
  req.headers['Content-Type'] = 'multipart/form-data'
  if (token) req.headers.authorization = `Bearer ${token}`
  
  return req
}

$authHost.interceptors.request.use(authInterceptor, (e) => {

  return e
})


// host для multipart/form-data объектов
const $authHostMultipart = axios.create({
  baseURL: process.env.VUE_APP_BASE_SERVER_URL,
})

$authHostMultipart.interceptors.response.use(null, (e) => {
  const errorMsg = e.response.data?.message ? e.response.data.message : 'Unauthorized'
  if (e.response.status === 500 || e.response.status === 403 || e.response.status === 401) {
    router.push(`/signin?message=${errorMsg}`)
  }

  return errorMsg
})

$authHostMultipart.interceptors.request.use(authInterceptorMultipart, (e) => {
  
  return e
})


export {
  $host,
  $authHost,
  $authHostMultipart,
}