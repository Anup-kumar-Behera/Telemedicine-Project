import React, {useState , useEffect } from 'react'
import {Link, useHistory } from 'react-router-dom'
import {isAuthenticated} from '../Core/Auth'
const Navbar =() =>  {
    const history = useHistory()
    console.log(localStorage.getItem('user'))
    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('email')
        localStorage.removeItem('user')
        history.push('/login')
    }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Telemedicine</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated() && localStorage.getItem('user') && localStorage.getItem('user') === JSON.stringify('patient')?(<ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/patient/appointments">Appointments</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/patent/medicalRecords">Medical Records</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/patient/profile">Profile</Link>
                        </li>
                    </ul>):null}
                    {isAuthenticated() && localStorage.getItem('user') && localStorage.getItem('user') === JSON.stringify('doctor')?(<ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/doctor/appointments">Appointments</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to={`/doctor_profile/${JSON.parse(localStorage.getItem('email'))}`}>Profile</Link>
                        </li>
                    </ul>):null}
                    <form className="d-flex">
                        {!isAuthenticated() ?   <Link className="btn btn-outline-success" to='/login'>Patient</Link>:null}
                        {!isAuthenticated() ?(<Link className="btn btn-outline-success" to='/doctor_login'>Doctor</Link>):null}
                        {isAuthenticated() ?(<button className="btn btn-outline-success" onClick={logout} type="submit">Logout</button>):null}
                    </form>
                    </div>
                </div>
                </nav>
            </div>
        )
}
export default Navbar