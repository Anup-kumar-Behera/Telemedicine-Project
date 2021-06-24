import React ,{useState,useEffect}from 'react'
import Axios from "axios"
// import jsFileDownload from "js-file-download"

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import Base from "../../Core/Base"

const  Records = ()=> {
    // console.log("rendered")
    const [reports,setReports] = useState([])
    const [images,setImages] = useState([])

    

    useEffect(()=>{
        const email = JSON.parse(localStorage.getItem("email"))
        Axios.get(`http://localhost:3001/patient/health/prescription/${email}`).then(
            res=>{
                // console.log(res)
                setImages(res.data.user)
            }
        )
        Axios.get(`http://localhost:3001/patient/health/medicalRecords/${email}`).then(
            res=>{
                setReports(res.data.user)
            }
        )
    },[])

    


  
    const uploadPrescriptions = (e)=>{

        const email = JSON.parse(localStorage.getItem("email"))

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
            // console.log(data.secure_url)
            // console.log(data.created_at)
            Axios.post(`http://localhost:3001/patient/health/uploadPrescription/${email}`,{
                url : data.secure_url,
                description : "kula",
                date :  data.created_at
            })
            .then(res=>{
                alert("prescription upload")
                setImages(prev=>[...prev,res.data.pres])
                
            })
        })
        .catch(err =>{
            console.log(err);
        })
    }
    const addMedicalRecords = (e)=>{
        console.log("uploading")
        const email = JSON.parse(localStorage.getItem("email"))

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
            Axios.post(`http://localhost:3001/patient/health/uploadReports/${email}`,{
                url : data.secure_url,
                description : "kula",
                date :  data.created_at
            })
            .then(res=>{
                
                    alert("report uploaded")
                   
                    setReports(prev=>[...prev,res.data.pres])
                
            })
        })
        .catch(err =>{
            console.log(err);
        })
    }
  
    return (
        <Base>
        <div className="d-flex justify-content-center">
            < div className=" container section border border-primary" style={{marginTop:'30px', marginBottom:"50px", padding:'20px'}}>
                <div className="row">
                    <div className="row title"><h5>Prescriptions</h5></div>
                    <div className="row">
                        <div className="col-md-3 imageSection">
                            <label htmlFor="imageSelector1" className="imgSelectLabel">
                                <AddAPhotoIcon className="icon" style={{ fontSize: 120,marginTop : 35,marginLeft : 20 }}/>
                            </label>
                            <input type="file" id="imageSelector1"  onChange={uploadPrescriptions} />
                        </div>
                        {
                            images?
                            images.map((image,index)=>{

                                return(
                                    <div className="col-md-3 imageSection">
                                    <img src={image.url} key={`pres+${index}`}style={{height : "100%",width : "100%"}}/>
                                    </div> 
                                )
                                     
                            }):<p>No prescriptions ....</p>
                            

                        }
                    </div>
                </div>
                <div className="row">
                        <div className="row title"><h5>Medical records</h5></div>
                        <div className="col-md-3 imageSection">
                            <label for="imageSelector2" className="imgSelectLabel">
                                <AddAPhotoIcon className="icon" style={{ fontSize: 120,marginTop : 35,marginLeft : 20 }}/>
                            </label>
                            <input type="file" id="imageSelector2" onChange={addMedicalRecords} />
                        </div>
                        {

                            reports?reports.map((record,index)=>{

                                return(
                                    <div className="col-md-3 imageSection">
                                        <img src={record.url} key={`rec+${index}`} style={{height : "100%",width : "100%",margin:"0px",padding:"0px",borderRadius : "10px"}}/>
                                        
                                    </div> 
                                )
                                     
                            }):<p>No reports...</p>
                            

                        }

                </div>

            </div>
            
        </div>
        </Base>
    )
}

export default Records