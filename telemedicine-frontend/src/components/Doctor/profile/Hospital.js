import React ,{useState,useEffect} from 'react'
import {Modal,Button} from "react-bootstrap"

import axios from "axios"



const Hospital = () => {
    const iconStyle={
    fontSize  : 50,
    }
    const spanStyle={
        color : "gray",
        cursor : "pointer"
    }
    const email = JSON.parse(localStorage.getItem("email"))
    const [hospital,setHospital] = useState([])
    const [values,setValues] = useState({})
    const [show,setShow] =useState(false)
    useEffect(
        ()=>{
            axios.get(`http://localhost:3001/doctor/gethospital/${email}`).then(
            hospitals=>{
                // console.log(hospitals)
                const result = hospitals.data.hospitals
                // console.log(result)
                setHospital(result)
            }
            ).catch(err=>{
                console.log(err)
            })

        },[]
    )
    const submitHandler = (e)=>{
        e.preventDefault()


        axios.post(`http://localhost:3001/doctor/addhospital/${email}`,
        {
            hospital : values.hospital,
            start : values.start,
            end : values.end,
            field : values.field
        })
        .then(res=>{
           if(res.data.status==1)
           {
             setHospital([...hospital,values])
             setShow(false)
           }
                
            else
                alert("wrong info")
        }
            
        )

    }
    
    
    return (
        <>
        <div className="row infoHeader">
            <div className="col-md-3">
                <h5>Hospital History</h5>
            </div>
            <div className="col-md-6">
                    <button type="button" onClick={()=>setShow(true)} className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter2">
                        Add Hospital
                    </button>
                    <Modal show={show}>
                    <Modal.Body>
                    <form onSubmit={submitHandler} >
                        <div className="row user-details">
                        <div className="row mt-2 input-box">
                            <div className="col-md-4">
                                <label  className="details" htmlFor="hospital">hospital</label>
                            </div>
                            <div className="col-md-8">
                                <input required name="hospital" value={values.hospital} onChange={(e)=>{setValues({...values,hospital : e.target.value})}} type="text" />
                            </div>
                        </div>
                        <div className="row mt-2 input-box">
                            <div className="col-md-4">
                                <label className="details" htmlFor="start">start</label>
                            </div>
                            <div className="col-md-8">
                                <input  required name="start" value={values.start} onChange={(e)=>{setValues({...values,start : e.target.value})}} type="text" />
                            </div>
                        </div>
                        <div className="row mt-2 input-box">
                            <div className="col-md-4">
                                <label className="details" htmlFor="end">end</label>
                            </div>
                            <div className="col-md-8">
                                <input  required name="end" value={values.end} onChange={(e)=>{setValues({...values,end : e.target.value})}} type="text" />
                            </div>
                        </div>
                        <div className="row mt-2 input-box">
                            <div className="col-md-4">
                                <label className="details" htmlFor="field">field</label>
                            </div>
                            <div className="col-md-8">
                                <input required name="field" value={values.field} onChange={(e)=>{setValues({...values,field : e.target.value})}} type="text" />
                            </div>
                        </div>

                        <div className="button">
                            <input type="submit" value="save"/>
                        </div> 
                        </div>
                    </form> 
                    </Modal.Body>
                    </Modal>
               
            </div>
                
        </div>
        <div className="row">
        {
        hospital.length==0?<p style={{fontSize : "25px",color : "blue",marginLeft : "5%"}}>No hospital History</p>:<table className="table" style={{width : "92%" ,marginLeft:"2%"}} >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Hospital</th>
            <th scope="col">field</th>
            <th scope="col">start time</th>
            <th scope="col">end time</th>
          </tr>
        </thead>
        <tbody>
          {
              hospital.map((data,index)=>{
                  return(
                      <tr className="tableStyle">
                          <th scope="row">{index+1}</th>
                          <td>{data.hospital}</td>
                          <td>{data.field}</td>
                          <td>{data.start}</td>
                          <td>{data.end}</td>
                      </tr>
                  )
              })
          }
        
         
        </tbody>
      </table>
    }
    </div>
    </>
        
    )
}

export default Hospital

