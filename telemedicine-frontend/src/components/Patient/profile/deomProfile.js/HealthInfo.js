import React,{useState,useEffect} from 'react'
import axios from "axios"

function Info() {
 
    const [values,setValues] = useState({})
    const email = JSON.parse(localStorage.getItem("email"))
    useEffect(()=>{
        axios.get(`http://localhost:3001/patient/parameter/${email}`)
        .then(res=>{
            const user = res.data.user
            if(user==null)
            {
                setValues({
                    height : "",
                    weight : "",
                    bp : "",
                    bloodglucose : "",
                    pulseoxymetry : "",
                    diabetis : "",
                    cholesterol : ""
                })
            }
            else
            {
                setValues({
                    height : user.height?user.height:"",
                    weight : user.weight?user.weight:"",
                    bp : user.bp?user.bp:"",
                    bloodglucose : user.bloodglucose?user.bloodglucose:"",
                    pulseoxymetry : user.pulseoxymetry?user.pulseoxymetry:"",
                    diabetis : user.diabetis?user.diabetis:"",
                    cholesterol : user.cholesterol?user.cholesterol:""
                })
            }
        })
    },[])
    const submitHandler = (event)=>{
        event.preventDefault()
        axios.post(`http://localhost:3001/patient/parameter/${email}`,{
            height : values.height,
            weight : values.weight,
            bp : values.bp,
            bloodglucose : values.bloodglucose,
            pulseoxymetry : values.pulseoxymetry,
            diabetis : values.diabetis,
            cholesterol : values.cholesterol
        })
        .then(res=>{
            alert("changes saved")
            
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
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="height" >height (in feet)</label>
                    </div>
                    <div className="row">
                        <input  value={values.height} onChange={(e)=>setValues({...values,height:e.target.value})}></input>
                    </div>
                </div>   
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="weight" >weight (in kg)</label>
                    </div>
                    <div className="row">
                        <input  value={values.weight} onChange={(e)=>setValues({...values,weight:e.target.value})}></input>
                    </div>
                </div>   
            </div>
            <div className="row inputStyle">
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="bp" >bp</label>
                    </div>
                    <div className="row">
                        <input  value={values.bp} onChange={(e)=>setValues({...values,bp:e.target.value})}></input>
                    </div>
                </div>   
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="bloodglucose" >bloodglucose</label>
                    </div>
                    <div className="row">
                        <input  value={values.bloodglucose} onChange={(e)=>setValues({...values,bloodglucose:e.target.value})}></input>
                    </div>
                </div>   
            </div>
            <div className="row inputStyle">
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="pulseoxymetry" >pulseoxymetry</label>
                    </div>
                    <div className="row">
                        <input  value={values.pulseoxymetry} onChange={(e)=>setValues({...values,pulseoxymetry:e.target.value})}></input>
                    </div>
                </div>   
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="diabetis" >diabetis</label>
                    </div>
                    <div className="row">
                        <input  value={values.diabetis} onChange={(e)=>setValues({...values,diabetis:e.target.value})}></input>
                    </div>
                </div>   
            </div>
            <div className="row inputStyle"> 
                <div className="col-md-6 ">
                    <div className="row">
                        <label  className="labelStyle" htmlFor="cholesterol" >cholesterol</label>
                    </div>
                    <div className="row">
                        <input  value={values.cholesterol} onChange={(e)=>setValues({...values,cholesterol:e.target.value})}></input>
                    </div>
                </div>   
            </div>
            </div>
            
        </>
    )
}

export default Info
