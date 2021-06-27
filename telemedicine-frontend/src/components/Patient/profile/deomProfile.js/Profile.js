import React ,{useState,useEffect}from 'react'
import Axios from 'axios'

import Info from "./Info"
import HealthInfo from "./HealthInfo"

import ProfileImage from "../../profile/profileImage"
import Base from "../../../Core/Base"


function Profile() {
    // const imgStyle={
    //     height : "100%",
    //     width : "100%",
    //     borderRadius : "10%",
    // }
    const [info,setInfo] = useState({})
    const [address,setAddress] = useState({})
    const email = JSON.parse(localStorage.getItem("email"));
    useEffect(()=>{
        Axios.get(`http://localhost:3001/patient/profile/${email}`)
        .then(res=>{

            if(res.data.status===1)
            {
                const user = res.data.user
                console.log("user",user)
                setAddress(JSON.parse(user.address))
    
                setInfo(user)
            }
           
        })
    },[])
    console.log(address)
    return (
        <Base>
        <div className ="container profileContainer border border-primary" style={{marginBottom:'50px', marginTop:"30px"}}>
            <div className="row">
                <div className="col-md-4">
                    <ProfileImage/>
                </div>
                <div className="col-md-4">
                    <h5 id="myname" style={{textAlign:'center'}}>{localStorage.getItem('name')}</h5>
                </div>
                <div className="col-md-4"></div>
            </div>
            
            <div className="row infoContainer">
                <Info info={info} setInfo = {setInfo} address={address} setAddress={setAddress}/>
            </div>
            <div className="row infoContainer">
                <HealthInfo/>
            </div>
            
        </div>
        </Base>
    )
}

export default Profile