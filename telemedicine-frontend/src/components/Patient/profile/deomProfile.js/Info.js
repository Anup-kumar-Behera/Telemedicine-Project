import React,{useState,useEffect} from 'react'
import axios from "axios"

function Info() {
 
    const [values,setValues] = useState({})
    const [address,setAddress] = useState({})
    const email = JSON.parse(localStorage.getItem("email"))
    useEffect(()=>{
        axios.get(`http://localhost:3001/patient/profile/${email}`)
        .then(res=>{
            const user = res.data.user
            console.log(res)
            // console.log(doctor)
            setValues(user)

            if(user.address==null)
            {
                setAddress({
                    houseno : "",
                    city : "",
                    pin : "",
                    state : "",
                    country : ""
                })
            }
            else
            {
                setAddress({
                    houseno : user.address.houseno?user.address.houseno:"",
                    city : user.address.city ? user.address.city :"",
                    pin : user.address.pin ? user.address.pin :"",
                    state : user.address.state?user.address.state:"",
                    country : user.address.country?user.address.country:""
                })
            }
                
         
            
            
        })
    },[])

    const submitHandler = (event)=>{ 
        axios.post(`http://localhost:3001/patient/profile/${email}`,
            {
                phone:values.phone, 
                name : values.name,
                gender : values.gender,
                dob:values.dob,
                city : address.city,
                houseno : address.houseno,
                state : address.state,
                pin : address.pin,
                country : address.country
            }
        ).then(res=>{
           
            if(res.data.status===1)
            {
                alert("changes saved")
                
            }
        })
        
        
        
    }
    return (
        <>
        <div className="row infoContainer">
                <div className="row infoHeader">
                    <div className="col-md-4">
                        <h5>Basics Information</h5>
                    </div>
                    <div className="col-md-8">
                        <button className="btn btn-primary" onClick={submitHandler} style={{float : "right",width: "30%"}} >Save changes</button>
                    </div>
                </div>
                <div className="row inputStyle">
                <div className="col-md-6 ">
                    <div className="row">
                        <label className="labelStyle" htmlFor="email" >email</label>
                    </div>
                    <div className="row">
                        <input  disabled value={email} ></input>
                    </div>
                </div>
                <div className="col-md-6 ">
                    <div className="row">
                        <label  className="labelStyle" htmlFor="phone" >phone</label>
                    </div>
                    <div className="row">
                        <input  value={values.phone} onChange={(e)=>setValues({...values,phone:e.target.value})}></input>
                    </div>
                </div>
            </div>
            <div className="row inputStyle">
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="dob" >dob</label>
                    </div>
                    <div className="row">
                        <input type="date"  value={values.dob} onChange={(e)=>setValues({...values,dob:e.target.value})}></input>
                    </div>
                </div>   
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="gender" >gender</label>
                    </div>
                    <div className="row">
                        <select style={{textAlign:'center'}} value={values.gender} onChange={(e)=>setValues({...values,gender:e.target.value})} className="form-select" aria-label="Default select example">
                                {/* <option selected>Open this select menu</option> */}
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                <option value='others'>Others</option>
                            </select>
                        {/* <input  value={values.gender} onChange={(e)=>setValues({...values,gender:e.target.value})}></input> */}
                    </div>
                </div>   
            </div>
            </div>
            <div className="row infoContainer">
                <div className="row infoHeader">
                    <h5>Address</h5>
                </div>
                <div className="row inputStyle">
                <div className="col-md-6 ">
                    <div className="row">
                        <label className="labelStyle" htmlFor="houseno" >houseno</label>
                    </div>
                    <div className="row">
                        <input  value={address.houseno} onChange={(e)=>setAddress({...address,houseno:e.target.value})}></input>
                    </div>
                </div>   
                <div className="col-md-6 ">
                    <div className="row">
                        <label  className="labelStyle" htmlFor="city" >city</label>
                    </div>
                    <div className="row">
                        <input  value={address.city} onChange={(e)=>setAddress({...address,city:e.target.value})}></input>
                    </div>
                </div>   
            </div>
            <div className="row inputStyle">
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="pin" >pin</label>
                    </div>
                    <div className="row">
                        <input  value={address.pin} onChange={(e)=>setAddress({...address,pin:e.target.value})}></input>
                    </div>
                </div>   
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="state" >state</label>
                    </div>
                    <div className="row">
                        <input  value={address.state} onChange={(e)=>setAddress({...address,state:e.target.value})}></input>
                    </div>
                </div>   
            </div>
            <div className="row inputStyle">
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="country" >country</label>
                    </div>
                    <div className="row">
                        <input  value={address.country} onChange={(e)=>setAddress({...address,country:e.target.value})}></input>
                    </div>
                </div>   
            </div>
            </div>
        </>
    )
}

export default Info
