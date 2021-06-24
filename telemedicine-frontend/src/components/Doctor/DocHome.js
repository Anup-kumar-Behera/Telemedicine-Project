import React, { Component } from 'react'
import Base from '../Core/Base'
// import history from './History'
import {Table3, Table4} from '../Core/Table'

class Home extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            pendingAppointments:[],
            approvedAppointments:[],
            user: [],
            isLoaded : true,
            email:JSON.parse(localStorage.getItem('email'))
        }
    }
    componentDidMount() {
        // Promise.all([
        
    }
    componentUpdate = () => {
        fetch(`http://localhost:3001/doctor/appointments/${this.state.email}`).then(res => res.json())
        .then((data) => {
            // console.log('data1: ', data);
            let pending = []
            let approved = []

            data.appointments.map(data=>{
                if(data.status==='approved')
                    approved.push(data)
                // else if(data.status==='confirmed')
                //     confirmed.push(data)
                else if(data.status==='pending')
                   pending.push(data)

            })

            this.setState({
                isLoaded : true,
                pendingAppointments: pending,
                approvedAppointments: approved
            })
        }).catch(err => {
            console.log(err)
        })
    }
    approve = (data) => {
       
        
       
    }
    decline = () => {

    }
    calculate_age = (dob) => { 
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms); 
      
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
    render() {
        let {isLoaded, pendingAppointments, approvedAppointments} = this.state
        return (
            <Base>
                <div className="container">
                    <div className="row">
                    <div className="col-sm">
                    <h3 style={{textAlign: 'center', margin:'20px'}}>Pending Appointments</h3>
                            <hr/>
                            {isLoaded? (
                            <div style={{height:'auto', width:'100%'}}>
                                <Table3 dataFromApi={pendingAppointments} />
                            </div>
                            ):(
                                <div>
                                    <h5 style={{textAlign: 'center'}}> No pending Appointments</h5>
                                </div>
                            )}
                        </div>
                        <div className="col-sm">
                            <h3 style={{textAlign: 'center', margin:'20px'}}>In Queue</h3>
                            <hr/>
                            {isLoaded? (
                            <div style={{height:'auto', width:'100%'}}>
                                <Table4 dataFromApi={approvedAppointments} />
                            </div>
                            ):(
                                <div>
                                    <h5 style={{textAlign: 'center'}}> Queue Empty</h5>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Base>
        )
    }
}
export default  Home
