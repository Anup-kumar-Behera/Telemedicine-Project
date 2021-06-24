import React, {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
// import Axios from 'axios'
import Base from '../Core/Base'
import {doctorSignup} from '../Core/Auth'
const DoctorSignup = () => {
    const history = useHistory()

    const [values, setValues] =  useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        data:[],
        // signupSuccess:false,
        success:false
    })
    const {name, confirmPassword, email, password} = values

    const signup = async (e) => {
            e.preventDefault()
            if(password === confirmPassword)
            {
                await doctorSignup({name, email, password})
                .then(
                    res => {
                        if(res.data.status === 1){
                            alert('Account successfully added')
                            history.push('/doctor_login')
                        }else{
                            alert('Sorry the email already has been taken')
                        }
                        console.log(res)
                    }
                )
                .catch(err=>{
                    alert('signup request failed')
                    }
                )
            }
            else{
                alert('password and confirm-password must be same')
            }
    }

    const signUpForm = () => {
        return(
            <div className='row' >
                <div className='col-2'>
                    
                </div>
                <div className='col-8 mx-auto shadow-lg p-6 mb-5 bg-body rounded' style={{maxWidth:'700px' , marginTop:'5%', padding:'50px'}}>
                    <h3 style={{textAlign:'center'}}>Register As A Doctor</h3>
                    <div className='text-left mx-auto'>
                        <form onSubmit={signup}>
                            <div className='form-group'>
                                <label className='text-dark'>Name</label>
                                <input className='form-control' 
                                type='text' 
                                required
                                value={name}
                                
                                onChange={(e) => {setValues({...values, name:e.target.value})}}
                                placeholder='Enter Your Name'/>
                            </div>
                            <div className='form-group'>
                                <label className='text-dark'>Email</label>
                                <input className='form-control' type='email' 
                                required
                                value = {email}
                                onChange={(e) => {setValues({...values, email:e.target.value})}}
                                placeholder='e.g. abc@gmail.com'/>
                            </div>
                            <div className='form-group'>
                                <label className='text-dark'>Password</label>
                                <input className='form-control' type='password' required
                                value = {password}
                                onChange={(e) => {setValues({...values, password:e.target.value})}}
                                data-toggle='password'
                                placeholder='password'/>
                            </div>
                            <div className='form-group'>
                                <label className='text-dark'>Confirm Password</label>
                                <input className='form-control' type='password' 
                                required value={confirmPassword}
                                onChange={(e) => {setValues({...values, confirmPassword:e.target.value})}}
                                placeholder='password' />
                            </div>
                            <button 
                            className='btn btn-success btn-block' 
                            style={{marginTop:'20px', marginBottom:'15px',
                             marginLeft:'40%'}} 
                             >REGISTER</button>
                            <br/>
                            <div className='row'>
                                <div className='col'>
                                    <Link to='/doctor_login' >Already have an account?</Link>
                                </div>
                                <div className='col'>
                                    <Link to='/signup' >Are you a patient?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-2'></div>
            </div>
        )
    }
    return (
        <Base>
            <div>
                {signUpForm()}
            </div>
        </Base>
    )
}
export default DoctorSignup