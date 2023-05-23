import axios from 'axios'
import router from '../router'

const requestAxios = axios.create({
    baseURL: process.env.VUE_APP_FB_URI
})

// requestAxios.interceptors.response.use(null, error => {
//     if (error.response.status === 401) {
//         router.push('/signin?message=access_denied')
//     }
    
//     return Promise.reject(error)
// })

requestAxios.interceptors.response.use(null, (e) => {
    if (e.response.status === 401) {
        router.push('/signin?message=access_denied')
    }

    return Promise.reject(e)
})

export default requestAxios