// import {API} from '../../backend'
import Axios from 'axios'
//API means ; http://localhost:8000/api/
const API = 'http://localhost:3001'
export const patientSignup = user => {
    return Axios.post("http://localhost:3001/patient/register",{
        name:user.name,
        email:user.email,
        password:user.password,
    }).then((res) => {
        return res
    }).catch((err) => {
        console.log(err)
    })
}
export const doctorSignup = user => {
    return Axios.post("http://localhost:3001/doctor/register",{
        name:user.name,
        email:user.email,
        password:user.password,
    }).then((res) => {
        return res
    }).catch((err) => {
        console.log(err)
    })
}

export const patientSignin = user => {
    return Axios.post('http://localhost:3001/patient/login', {
            email:user.email,
            password:user.password,
        }).then((res) => {
            return res
        })
}
export const doctorSignin = user => {
    return Axios.post('http://localhost:3001/doctor/login', {
            email:user.email,
            password:user.password,
        }).then((res) => {
            return res
        })
}

export const authenticate = (data, next) => {
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }
}

export const signout = next => {
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt')
        next()

        return fetch(`${API}/signout`, {
            method:"GET"
        })
        .then(response => console.log("Signout success"))
        .catch(err => console.log(err))
    }
}

export const isAuthenticated = () => {
    if(typeof window == 'undefined'){
        return false
    }
    if(localStorage.getItem('email')){
        return JSON.parse(localStorage.getItem('email'))
    }else{
        return false
    }
}