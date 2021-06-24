import React,{useState,useEffect} from 'react'
import axios from "axios"

import Basics2 from "./Basics2"
import Base from '../../Core/Base'

import Certificate from "./Certificate"
import Education from "./Education"
import Hospital from "./Hospital"


import "./doctorProfile.css"

const DocProfile = ()=>{
    const [info,setInfo] = useState({})
    const [address,setAddress] = useState({})
    const email = window.location.pathname.split('/')
    console.log('email2', email[2])
    // const 
    useEffect(()=>{
        axios.get(`http://localhost:3001/doctor/profile/${email[2]}`)
        .then(res=>{
            const doctor = res.data.doctor
            console.log('profile:',doctor)
            setAddress(doctor.address)

            console.log(address)
            
            console.log(address)
            setInfo(doctor)
        })
    },[])
    
    
    return (
        <Base>
            <div className ="container profileContainer">
                <Basics2 info={info} setInfo={setInfo} address={address} setAddress={setAddress}/>
                <div className="row infoContainer">
                    <div className="row infoHeader">
                        <h5>certificate</h5>
                    </div>
                <Certificate info={{certificate : info.certificate,start : info.start,end : info.end}}/>
                </div>
                <div className="row infoContainer">
                <Education/>                
                </div>
                <div className="row infoContainer">
                    <Hospital/> 
                </div>
            </div>
        </Base>
    )

}
export default DocProfile
