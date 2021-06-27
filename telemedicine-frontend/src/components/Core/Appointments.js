import React, { Component } from 'react'

import axios from "axios"

import {Table} from './Table'

import Base from "./Base"
// import {withRouter} from 'react-router-dom'
class Appointments extends Component {

    constructor(props) {
        super(props)
        this.state = {
            status:'all',
            dataFromApi: [],
            isLoaded:false,
            email : JSON.parse(localStorage.getItem("email")),
            user: JSON.parse(localStorage.getItem("user"))
        }
    }
    componentDidMount() {
        fetch(`http://localhost:3001/patient/appointments/${this.state.email}`)
        .then(res => res.json())
        .then(json => {
            console.log(json)

            if(json.status===1)
            {
                this.setState({...this.state,dataFromApi : json.appointments}) 
            }
            // if(json.pastappointments.length>0)
            //     this.setState({...this.state,dataFromApi : json.pastappointments}) 

        })
    }
    handleStatus = e => {
        console.log(e.target.value)
        this.setState({...this.state,status : e.target.value})
        // this.setState({status:e.target.value})

        
        if(this.state.user === 'patient'){
            axios.get(`http://localhost:3001/patient/appointments/${this.state.email}`)
            .then((res)=>{
                let result=[]
                if(res.data.status === 1)
                {
                    console.log(res.data.appointments)
                    if(this.state.status==="all")
                        result = res.data.appointments
                    else
                    {
                        res.data.appointments.map(data=>{
                            if(data.status===this.state.status)
                                result.push(data)
                            return true
                        })
                    }
                    
                    
                    this.setState({...this.state,dataFromApi : result})
                }
                console.log(res)
                
            })
        }else{
            axios.get(`http://localhost:3001/doctor/appointments/${this.state.email}`)
            .then((res)=>{
                let result=[]
                if(res.data.status === 1)
                {
                    console.log(res.data.appointments)
                    if(this.state.status==="all")
                        result = res.data.appointments
                    else
                    {
                        res.data.appointments.map(data=>{
                            if(data.status===this.state.status)
                                result.push(data)
                            return true
                        })
                    }
                    
                    
                    this.setState({...this.state,dataFromApi : result})
                }
                console.log(res)
                
            })
        }
        
        // http://localhost:3001/doctor/appointments/u@g.com

    }
    render() {
        return (
            <Base>
                {this.state.user === 'patient'?
                (
                    <div className="container">
                        <div className="" style={{margin:'50px'}} >
                            <select style={{textAlign:'center'}} value={this.state.status} onChange={this.handleStatus} className="form-select" aria-label="Default select example">
                                {/* <option selected>Open this select menu</option> */}
                                <option value='all'>All appointments</option>
                                <option value='pending'>Pending appointments</option>
                                <option value='approved'>approved appointments</option>
                                <option value="closed">Completed appointments</option>
                            </select>
                        </div>
                        <hr/>
                        <Table dataFromApi={this.state.dataFromApi}/>
                    </div>
                ):
                (
                    <div className="container">
                        <div className="" style={{margin:'50px'}} >
                            <select style={{textAlign:'center'}} value={this.state.status} onChange={this.handleStatus} className="form-select" aria-label="Default select example">
                                {/* <option selected>Open this select menu</option> */}
                                <option value='all'>All appointments</option>
                                <option value='pending'>Pending appointments</option>
                                <option value='approved'>approved appointments</option>
                                <option value="closed">Completed appointments</option>
                            </select>
                        </div>
                        <hr/>
                        <Table dataFromApi={this.state.dataFromApi}/>
                    </div>
                )
                }
                
            </Base>
        )
    }
}

export default  Appointments