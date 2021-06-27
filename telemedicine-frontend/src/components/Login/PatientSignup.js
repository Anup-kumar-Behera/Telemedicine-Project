import React, {useState} from 'react'
import Base from '../Core/Base'
import {useHistory, Link} from 'react-router-dom'
import {patientSignup} from '../Core/Auth'
const PatientSignup = () => {
    const history = useHistory()
    const [values, setValues] =  useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        data:[],
        success:false
    })
    const {name, confirmPassword, email, password} = values

    const signup = async (e) => {
        e.preventDefault()
        // alert(values.Name)
        if(password === confirmPassword)
        {
            await patientSignup({name, email, password})
            .then(
                res => {
                    // if(res.data.status === 1){
                    //     alert('Account successfully added')
                    //     history.push('/login')
                    // }else{
                    //     alert('Sorry the email already has been taken')
                    // }
                    console.log('signup', res)
                }
                
            )
            .catch(err=>{
                alert('signin request failed')
                }
            )
        }else{
            alert('password and confirm-password must be same')
        }
    }
  
    const signUpForm = () => {
        return(
            <div className='row' >
                <div className='col-2'></div>
                <div className='col-8 mx-auto shadow-lg p-3 mb-5 bg-body rounded' style={{maxWidth:'500px', marginTop:'5%', backgroundColor:'red', padding:'20px', borderRadius:'0.5em'}}>
                    <h3 style={{textAlign:'center'}}>Register As A Patient</h3>
                    <div className='text-left mx-auto'>
                        <form onSubmit={signup}>
                            <div className='form-group'>
                                <label className='text-dark'>Name</label>
                                <input className='form-control'
                                type='text' 
                                required
                                onChange={(e) => {setValues({...values,name: e.target.value})}}
                                placeholder='Enter Your Name'/>
                            </div>
                            <div className='form-group'>
                                <label className='text-dark'>Email</label>
                                <input className='form-control' type='email' 
                                required
                                onChange={(e) => {setValues({...values,email:e.target.value})}}
                                placeholder='e.g. abc@gmail.com'/>
                            </div>
                            <div className='form-group'>
                                <label className='text-dark'>Password</label>
                                <input className='form-control' type='password' 
                                required
                                onChange={(e) => {setValues({...values,password:e.target.value})}}
                                placeholder='password'/>
                            </div>
                            <div className='form-group'>
                                <label className='text-dark'>Confirm Password</label>
                                <input className='form-control' type='password' 
                                required
                                onChange={(e) => {setValues({...values,confirmPassword:e.target.value})}}
                                placeholder='password'/>
                            </div>
                            <button 
                            className='btn btn-success btn-block' 
                            style={{marginTop:'20px', marginBottom:'15px',
                             marginLeft:'40%'}} 
                             type='submit'
                             >REGISTER</button>
                        </form>

                            <br/>
                            <div className='row'>
                                <div className='col'>
                                    <Link to='/login' >Already have an account?</Link>
                                </div>
                                <div className='col'>
                                    <Link to='/doctor_signup' >Are you a doctor?</Link>
                                </div>
                            </div>
                    </div>
                </div>
                <div className='col-2'></div>
            </div>
        )
    }

    return (
        <Base>
            {signUpForm()}
        </Base>
    )
}
export default PatientSignup
