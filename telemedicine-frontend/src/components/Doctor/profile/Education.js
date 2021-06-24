import React ,{useState,useEffect} from 'react'
import {Modal,Button} from "react-bootstrap"

import axios from "axios"
//components



const Education = () => {
    const iconStyle={
    fontSize  : 50
    }
    const spanStyle={
        color : "gray",
        cursor : "pointer"
    
    }
    const email = JSON.parse(localStorage.getItem("email"))
    const [education,setEducation] = useState([])
    const [values,setValues] = useState({})
    const [show,setShow] =useState(false)

    // const email = JSON.parse(localStorage.getItem("email"))
    useEffect(()=>{
        axios.get(`http://localhost:3001/doctor/geteducation/${email}`).then(
        educations=>{
            const result = educations.data.educations
            setEducation(result)
        }
        ).catch(err=>{
            console.log(err)
        })
    },[])

    const submitHandler = (e)=>{
        e.preventDefault()
        axios.post(`http://localhost:3001/doctor/addeducation/${email}`,
        {
            institute : values.institute,
            start : values.start,
            end : values.end,
            field : values.field
        })
        .then(res=>{
           if(res.data.status===1)
           {
             setEducation([...education,values])
             setShow(false)
           }
                
            else
                alert("wrong info")
            
        }
            
        )

    }

    console.log(education)
    
    // const addEducation = ()=>{
    //     alert("clicked")
    // }
    // console.log(education)
    
    return (
        <>
            <div className="row infoHeader">
                <div className="col-md-3">
                    <h5>Education History</h5>
                </div>
                <div className='col-md-6'>
                    <button type="button" onClick={()=>setShow(true)} className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                        Add Education
                    </button>
                    <Modal show={show}>
                        <Modal.Body>
                        <form onSubmit={submitHandler} >
                            <div className="row user-details">
                            <div className="row mt-2 input-box">
                                <div className="col-md-4">
                                    <label  className="details" htmlFor="institute">institute</label>
                                </div>
                                <div className="col-md-8">
                                    <input required name="institute" value={values.institute} onChange={(e)=>{setValues({...values,institute : e.target.value})}} type="text" />
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
                education.length===0?
                <p style={{fontSize : "25px",color : "blue",marginLeft : "5%"}}>No Education History......</p>
                : <table className="table" style={{width : "92%" ,marginLeft:"2%"}}>
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">institute</th>
                        <th scope="col">field</th>
                        <th scope="col">start time</th>
                        <th scope="col">end time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            education.map((data,index)=>{
                                return(
                                    <tr className="tableStyle">
                                        <th scope="row">{index+1}</th>
                                        <td>{data.institute}</td>
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



export default Education

//    <div className="row infoHeader">
//                 <div className="col-md-5 ">
//                     <h5>Education History<span><EditEducation /></span></h5>
//                     {/* <h5>Education History<span onClick ={addEducation}style={spanStyle}><AddIcon style={iconStyle} className="icon" /></span></h5> */}
//                 </div>
//             </div>
//             <div className="row mt-2 ml-2">
//             <ol className="listContainer">
//             {
//                 education.length==0?
//                 <p className="information">No Education history......</p>
//                 :
//                 education.map(data=>{
//                     return (
//                         <li className="listStyle">
//                             <div className="row">
//                                 <div className="col-md-3">
//                                     <p>Institute Name</p> 
//                                 </div>
//                                 <div className="col-md-8 items">
//                                     <p>{data.institute}</p>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-md-3 ">
//                                     <p>field </p> 
//                                 </div>
//                                 <div className="col-md-8 items">
//                                     <p>{data.field}</p>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-md-3">
//                                     <p>start time</p>
//                                 </div>
//                                 <div className="col-md-3 items">
//                                     <p>{data.start}</p>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-md-3">
//                                     <p>end time</p>
//                                 </div>
//                                 <div className="col-md-3 items">
//                                     <p>{data.end}</p>
//                                 </div>
//                             </div>
//                         </li>
//                     )
//                 })
//             }
//             </ol>
//             </div>

  