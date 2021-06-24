import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import PatientLogin from './components/Login/PatientLogin'
import PatientSignup from './components/Login/PatientSignup'
import DoctorSignup from './components/Login/DoctorSignup'
import DoctorLogin from './components/Login/DoctorLogin'
import Home from './components/Core/Home'
import PrivateRoute from './PrivateRoute'
import DocProfile from './components/Doctor/profile/DocProfile'
import AppointmentBooking from './components/Patient/AppointmentBooking'
import Profile from './components/Core/Profile'
import Appointments from './components/Core/Appointments'
import DocHome from './components/Doctor/DocHome'
import DemoProfile from './components/Patient/profile/deomProfile.js/Profile'
import Records from './components/Patient/medicalRecords/Records'
export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <PrivateRoute path='/' exact component={Home}/>
                    {/* <PrivateRoute path='/doctor' exact component={DocHome}  /> */}

                    {/* <ProtectedRoute exact path='/all_appointment' component={Appointments} /> */}
                    <PrivateRoute path='/all_appointments' component={Appointments}/>
                    <PrivateRoute path='/profile/doctor/:email' component={Profile}/>
                    <PrivateRoute path='/profile/patient/:email' component={Profile}/>
                    <PrivateRoute path='/patient/appointments' component={Appointments}/>
                    <PrivateRoute path='/doctor/appointments' component={Appointments}/>
                    <PrivateRoute path='/doctor_profile/:email' component={DocProfile}/>
                    <PrivateRoute path='/patient/profile' component={DemoProfile}/>
                    <PrivateRoute path='/patent/medicalRecords' component={Records}/>
                    {/* <Route path='/doctor'  component={DocHome}/> */}
                    <PrivateRoute path='/book_appointment' component={AppointmentBooking}/>
                    <Route path='/login' exact component={PatientLogin}/>
                    <Route path='/doctor_login' component={DoctorLogin}/>
                    <Route path='/signup' component={PatientSignup} />
                    <Route path='/doctor_signup' component={DoctorSignup} />
                </Switch>
            </Router>
        )
    }
}
