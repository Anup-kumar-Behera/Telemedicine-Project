import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Base from '../Core/Base'
import {Link} from 'react-router-dom'
import {doctorSignin} from '../Core/Auth'

export default function DoctorLogin() {
    const history = useHistory()        
    const [values, setValues] = useState({
        email:'',
        password:''
    })
    const {email, password} = values
    const login = async (e) => {
        e.preventDefault()
                // console.log({email, password})
                await doctorSignin({email, password})
                .then(
                    res => {
                        console.log(res)
                        if(res.data.status){
                            localStorage.setItem('user',JSON.stringify('doctor'))
                            localStorage.setItem('email',JSON.stringify(email))
                            history.push('/')
                        }else{
                            history.push('/doctor_login')
                            alert('!Invalid User Credentials')
                        }
                    }
                )
                .catch(err=>{
                    console.log('signin request failed')
                    }
                )
    }
    const LoginForm = () => {
        return(
            <div className='row' >
                {/* <div className='col-2'></div> */}
                <div className='col-8 mx-auto shadow-lg p-3 mb-5 bg-body rounded' style={{maxWidth:'500px', marginTop:'10%', backgroundColor:'red', padding:'20px', borderRadius:'0.5em'}}>
                    <h3 style={{textAlign:'center'}}>SignIn As a Doctor</h3>
                    <div className='text-left mx-auto'>
                        <form  
                            onSubmit={login}
                        >
                            <div className='form-group'>
                                <label className='text-dark'>Email</label>
                                <input className='form-control' 
                                placeholder= 'e.g. abc@example.com'
                                type='email'
                                value={email}
                                required
                                onChange={(e) => {setValues({...values, email:e.target.value})}}
                                />
                            </div>
                            <div className='form-group'>
                                <label className='text-dark'>Password</label>
                                <input className='form-control' 
                                placeholder='password'
                                type='password'
                                password = {password}
                                required
                                onChange={(e) => {setValues({...values, password:e.target.value})}}
                                />
                            </div>
                            <a href='reset_password'>forgot Password?</a><br/>
                            <button className='btn btn-success btn-block' 
                            style={{marginTop:'10px', marginLeft:'40%'}} 
                            type='submit'
                            >Submit</button>
                            <br/>
                            <div className='row'>
                                <div className='col'>
                                    <Link to='/doctor_signup'>Register Here</Link>
                                </div>
                                <div className='col'>
                                    <Link to='/signup' >Are you a patient?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* <div className='col-2'></div> */}
            </div>
        )
    }
    return (
        <Base>
            <div style={{ height:'100%', width:'100%' ,backgroundColor:'white'}}>
                {LoginForm()}
            </div>
        </Base>
    )
}
