import React, { Component } from 'react'
import Base from '../Core/Base'
import {Table2} from '../Core/Table'
class AppointmentBooking extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            specializations : [],
            specialization: '',
            languages:[],
            language:'',
            locality:'',
            experience:'',
            high:'',
            low:'',
            localities: [],
            experiences: [],
            fees:[],
            doctors:[],
            isLoaded: false,
        }
    }
    componentDidMount() {
        
        Promise.all([
            fetch('http://localhost:3001/selectData').then(res => res.json()),
            fetch('http://localhost:3001/getAllDoctors')
            // {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ experience:this.state.experience, specialization:this.state.specialization,
            //         language: this.state.language, high:this.state.high, low:this.state.low, locality:this.state.locality
            //     })
            // }
            .then(res => res.json())
            ])
            .then(([data1, data2]) => {
                // console.log('data1: ', data1);
                // console.log('data2: ', data2);
                this.setState({
                    isLoaded : true,
                    doctors:data2.result
                })
            }).catch(error =>{
                console.log('error: ', error)
            })
    }
    handleSearch = e => {
        e.preventDefault()
        fetch('http://localhost:3001/getAllDoctors',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ experience:this.state.experience, specialization:this.state.specialization,
                    language: this.state.language, high:this.state.high, low:this.state.low, locality:this.state.locality
                })
            })
            .then(res => res.json())
            .then(json => {
                console.log('search:', json)
            })
            .catch(err => {
                console.log('error: ', err)
            })
    }
    handleSpecialization = e => {
        this.setState({specialization:e.target.value})
    }
    handleLanguage = e => {
        this.setState({language: e.target.value})
    }
    handleLocality = e => {
        this.setState({locality: e.target.value})
    }
    handleExperience = e => {
        this.setState({experience: e.target.value})
    }
    handleLow = e => {
        this.setState({low: e.target.value})
    }
    handleHigh= e => {
        this.setState({high: e.target.value})
    }
    render() {
        return (
            <Base>
                <div>
                    <h3 style={{textAlign: 'center'}}>Search Doctors/Specialists</h3>
                    <div className="container">
                        <form>
                    <div className="row" style={{margin:'40px'}}>
                        <div className="col-sm">
                            <label className='text-dark'>Specialization</label>
                                <select value={this.state.specialization} onChange={this.handleSpecialization} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                    {/* <option selected>medicine specialist</option> */}
                                    <option value="10">gynecologist</option>
                                    <option value="11">eye specialist</option>
                                    <option value="12">psychiatrist</option>
                                    <option value="13">neurologist</option>
                                </select>
                        </div>
                        <div className="col-sm">
                            <label className='text-dark'>Language</label>
                                <select value={this.state.language} onChange={this.handleLanguage} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                    {/* <option selected>medicine specialist</option> */}
                                    <option value="10">English</option>
                                    <option value="11">eye specialist</option>
                                    <option value="12">psychiatrist</option>
                                    <option value="13">neurologist</option>
                                </select>
                        </div>
                        <div className="col-sm">
                            <label className='text-dark'>Locality</label>
                                            <select value={this.state.locality} onChange={this.handleLocality} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                {/* <option selected>medicine specialist</option> */}
                                                <option value="10">Rourkela</option>
                                                <option value="11">eye specialist</option>
                                                <option value="12">psychiatrist</option>
                                                <option value="13">neurologist</option>
                                            </select>
                        </div>
                        <div className="col-sm">
                        <label className='text-dark'>Min. Experience</label>
                                            <select value={this.state.experience} onChange={this.handleExperience} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                {/* <option selected>medicine specialist</option> */}
                                                <option value="10">2</option>
                                                <option value="11">eye specialist</option>
                                                <option value="12">psychiatrist</option>
                                                <option value="13">neurologist</option>
                                            </select>
                        </div>
                        <div className="col-sm">
                        <label className='text-dark'>Min. Fee Range</label>
                                            <select value={this.state.low} onChange={this.handleLow} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                {/* <option selected>medicine specialist</option> */}
                                                <option value="10">200</option>
                                                <option value="11">eye specialist</option>
                                                <option value="12">psychiatrist</option>
                                                <option value="13">neurologist</option>
                                            </select>
                        </div>
                        <div className="col-sm">
                        <label className='text-dark'>Max. Fee Range</label>
                                            <select value={this.state.high} onChange={this.handleHigh} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                {/* <option selected>medicine specialist</option> */}
                                                <option value="10">200</option>
                                                <option value="11">eye specialist</option>
                                                <option value="12">psychiatrist</option>
                                                <option value="13">neurologist</option>
                                            </select>
                        </div>
                        <div className="col-sm">
                            <button className="btn btn-secondary" onClick={this.handleSearch} style={{marginTop:'20px'}}>Search</button>
                        </div>
                    </div>
                    
                    </form>
                    </div>
                    <div>
                        <hr/>
                        <div>
                            <div className="container">
                                {this.state.isLoaded?(<Table2 dataFromApi = {this.state.doctors} />):
                                (<h2>No data</h2>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Base>
        )
    }
}
export default  AppointmentBooking
