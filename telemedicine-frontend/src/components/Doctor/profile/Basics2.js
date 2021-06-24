import React,{useState,useEffect} from 'react'
import axios from "axios"

function Basics2({info,setInfo,address,setAddress}) {
    const imgStyle={
        height : "100%",
        width : "100%",
        borderRadius : "10%",
    }
    const inputStyle={
        display : "none",
        visibility : "none"
    }
    const email = JSON.parse(localStorage.getItem("email"));
    let Img = info.picture?info.picture:"data:image/png;base64,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"
    const saveChanges = ()=>{
        console.log(address)
        axios.post(`http://localhost:3001/doctor/profile/${email}`,{
            phone : info.phone,
            gender : info.gender,
            dob : info.dob,
            specialization:info.specialization,
            experience : info.experience,
            start : info.start,
            end : info.end,
            houseno : address.houseno,
            city : address.city,
            state : address.state,
            pin : address.pin,
            country : address.country,
            fees : info.fees


        }).then(res=>{
            alert("changes saved")
        })
    }
    const changeDocPhoto = (e)=>{
        const data = new FormData()

        data.append("file",e.target.files[0]);
        data.append("upload_preset","instagram-clone");
        data.append("cloud_name","kulabanta");

        fetch("https://api.cloudinary.com/v1_1/kulabanta/image/upload",{
            
            method : "post",
            body : data
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            axios.post(`http://localhost:3001/doctor/profileimage/${email}`,{
                url : data.secure_url
            })
            .then(res=>{
                console.log(res.data)
                if(res.data.status===1)
                {
                    alert("profile pic changed")
                    setInfo({...info,picture:data.secure_url})

                    Img = data.secure_url
                    
                    // image = JSON.parse(localStorage.getItem("picture"))
                }
            })
        })
        .catch(err =>{
            console.log(err);
        })
    }

   
    return (
        <>
        <div className="row">
                <div className="col-md-3">
                <div className="Container">
                    <img src={Img} className="profile-pic doc-profile-image" style={{borderRadius:'0%'}} alt="Snow" />
                    <label htmlFor="profileSelector" className="btn">change photo</label>
                    <input type="file" style={inputStyle} onChange={changeDocPhoto} id="profileSelector"/>
                </div>
                    
                </div>
                <div className="col-md-8">
                    <div classname="row">
                        <h5 id="myname">{info.name}</h5>
                    </div>
                    <div classname="row">
                        <h6 >{info.active ? "Active" : "Inactive"}</h6>
                    </div>   
                </div>
        </div>
        <div className="row infoContainer">
                <div className="row infoHeader">
                    <div className="col-md-4">
                        <h5>Basics Information</h5>
                    </div>
                    <div className="col-md-8">
                        <button className="btn btn-primary" onClick={saveChanges} style={{float : "right",width: "30%"}} >Save changes</button>
                    </div>
                </div>
                <div className="row inputStyle">
                <div className="col-md-6 ">
                    <div className="row">
                        <label className="labelStyle" htmlFor="email" >email</label>
                    </div>
                    <div className="row">
                        <input  disabled value={info.email} ></input>
                    </div>
                </div>   
                <div className="col-md-6 ">
                    <div className="row">
                        <label  className="labelStyle" htmlFor="phone" >phone</label>
                    </div>
                    <div className="row">
                        <input  value={info.phone?info.phone:null} onChange={(e)=>setInfo({...info,phone:e.target.value})}></input>
                    </div>
                </div>   
            </div>
            <div className="row inputStyle">
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="dob" >dob</label>
                    </div>
                    <div className="row">
                        <input  value={info.dob} type="date" onChange={(e)=>setInfo({...info,dob:e.target.value}) }></input>
                    </div>
                </div>   
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="gender" >gender</label>
                    </div>
                    <div className="row">
                        <select style={{textAlign:'center'}} value={info.gender} onChange={(e)=>setInfo({...info,gender:e.target.value})} className="form-select" aria-label="Default select example">
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='others'>Others</option>
                        </select>
                        {/* <input  value={info.gender} onChange={(e)=>setInfo({...info,gender:e.target.value})}></input> */}
                    </div>
                </div>   
            </div>
            <div className="row inputStyle">
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="specialization" >specialization</label>
                    </div>
                    <div className="row">
                        <input  value={info.specialization} onChange={(e)=>setInfo({...info,specialization:e.target.value})}></input>
                    </div>
                </div>    
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="experience" >experience</label>
                    </div>
                    <div className="row">
                        <input  value={info.experience} onChange={(e)=>setInfo({...info,experience:e.target.value})}></input>
                    </div>
                </div>    
            </div>
            <div className="row  inputStyle">
                <div className="col-md-6  ">
                    <div className="row ">
                        <label className="labelStyle" htmlFor="start" >start time</label>
                    </div>
                    <div className="row" >
                        <input  value={info.start} onChange={(e)=>setInfo({...info,start:e.target.value})}></input>
                    </div>
                </div>   
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="end" >end time</label>
                    </div>
                    <div className="row">
                        <input  value={info.end} onChange={(e)=>setInfo({...info,end:e.target.value})}></input>
                    </div>
                </div>   
            </div>  
            </div>
            <div className="row inputStyle">
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="fees" >fees</label>
                    </div>
                    <div className="row">
                        <input  value={info.fees} onChange={(e)=>setInfo({...info,fees:e.target.value})}></input>
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
                        <input  value={address?address.houseno:null} onChange={(e)=>setAddress({...address,houseno : e.target.value})}></input>
                    </div>
                </div>   
                <div className="col-md-6 ">
                    <div className="row">
                        <label  className="labelStyle" htmlFor="city" >city</label>
                    </div>
                    <div className="row">
                        <input  value={address?address.city:null} onChange={(e)=>setAddress({...address,city:e.target.value})}></input>
                    </div>
                </div>   
            </div>
            <div className="row inputStyle">
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="pin" >pin</label>
                    </div>
                    <div className="row">
                        <input  value={address?address.pin:null} onChange={(e)=>setAddress({...address,pin:e.target.value})}></input>
                    </div>
                </div>   
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="state" >state</label>
                    </div>
                    <div className="row">
                        <input  value={address?address.state:null} onChange={(e)=>setAddress({...address,state:e.target.value})}></input>
                    </div>
                </div>   
            </div>
            <div className="row inputStyle">
                <div className="col-md-6">
                    <div className="row">
                        <label className="labelStyle" htmlFor="country" >country</label>
                    </div>
                    <div className="row">
                        <input  value={address?address.country:null} onChange={(e)=>setAddress({...address,country:e.target.value})}></input>
                    </div>
                </div>   
            </div>
            </div>
            <div className="row mt-2">
                <div className="row infoHeader">
                    <h5>Langauges</h5>
                </div>
                <div className="row mt-2 inputStyle">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-4">
                                <label className="labelStyle" htmlFor="language1" >language 1</label>
                            </div>
                            <div className="col-md-5">
                                <input  value={info.language1} onChange={(e)=>setInfo({...info,language1:e.target.value})}></input>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-4">
                                <label className="labelStyle" htmlFor="language2" >language 2</label> 
                            </div>
                            <div className="col-md-5">
                                <input  value={info.language2} onChange={(e)=>setInfo({...info,language2:e.target.value})}></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 inputStyle">
                <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-4">
                                <label className="labelStyle" htmlFor="language3" >language 3</label> 
                            </div>
                            <div className="col-md-5">
                                <input  value={info.language3} onChange={(e)=>setInfo({...info,language3:e.target.value})}></input>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-4">
                                <label className="labelStyle" htmlFor="language4" >language 4</label> 
                            </div>
                            <div className="col-md-5">
                                <input  value={info.language4} onChange={(e)=>setInfo({...info,language4:e.target.value})}></input>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </div>
    </>
    )
}

export default Basics2
