import React, {useState} from 'react'
import Base from '../Core/Base'
import {useHistory, Link} from 'react-router-dom'
import {patientSignin} from '../Core/Auth'
const PatientLogin = () => {
    
    const [values, setValues] = useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        didRedirect:false
    })
    const {email, password} = values
    // const {user} = isAuthenticated()
    const history = useHistory()

    const login = async (e) => {
        e.preventDefault()
        await patientSignin({email, password})
        .then(
            res => {
                console.log(res)
                if(res.data.status){
                    localStorage.setItem('user',JSON.stringify('patient'))
                    localStorage.setItem('email',JSON.stringify(email))
                    history.push('/')
                }else{
                    history.push('/login')
                    alert('Invalid User Credentials')
                }
            }
        )
        .catch(err=>{
            console.log('signin request failed')
            }
        )
        // Axios.post('http://localhost:3001/patient/login', {
        //     email:email,
        //     password:password,
        // }).then((res) => {
        //     console.log(res)
        //     localStorage.setItem('email', JSON.stringify(email))
        //     localStorage.setItem('user', JSON.stringify('patient'))
        //     history.push('/patient')
        // })
    }
    const LoginForm = () => {
        return(
            <div>
                <div className='row' >
                <div className='col-2'></div>
                <div className='col-8 mx-auto shadow-lg p-3 mb-5 bg-body rounded' 
                style={{maxWidth:'500px', marginTop:'10%', backgroundColor:'red', 
                padding:'20px', borderRadius:'0.5em'}}>
                    <h3 style={{textAlign:'center'}}>SignIn As a Patient</h3>
                    <div className='text-left mx-auto'>
                        <form  
                            onSubmit={login}
                        >
                            <div className='form-group'>
                                <label className='text-dark'>Email</label>
                                <input className='form-control' 
                                placeholder='e.g. abc@example.com'
                                type='email'
                                required
                                onChange={(e) => {setValues({...values, email:e.target.value})}}
                                />
                            </div>
                            <div className='form-group'>
                                <label className='text-dark'>Password</label>
                                <input className='form-control' 
                                placeholder='password'
                                type='password'
                                required
                                onChange={(e) => {setValues({...values, password:e.target.value})}}
                                />
                            </div>
                            <Link to='/forgot_password'>forgot Password?</Link><br/>
                            <button className='btn btn-success btn-block' 
                            style={{marginTop:'10px', marginLeft:'40%'}} 
                            type='submit'
                            >Submit</button>
                            <br/>
                            <div className='row'>
                                <div className='col'>
                                    <Link to='/signup' >Register Here</Link>
                                </div>
                                <div className='col'>
                                    <Link to='/doctor_login' >Are you a doctor?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-2'></div>
            </div>
            </div>
        )
    }

    return (
        <Base>
            {LoginForm()}
        </Base>
    )
}
export default PatientLogin