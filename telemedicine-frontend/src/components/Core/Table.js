import React from 'react'
import {useHistory, Link} from 'react-router-dom'
const Table = (props) => {
    let {dataFromApi} = props
    return (
        <div>
            <table className="table" >
                <tbody>
                    {dataFromApi.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <div className="card appointment" >
                                    <div className="card-body">
                                        <div className='row'>
                                            <div className="col-sm">
                                                <h6 className="card-title"><strong>Appointment no: </strong> {item.id}</h6>
                                                {/* <h6 className="card-text"><strong>Reason: </strong> {'headache'}</h6> */}
                                                <Link to="/go_somewhere" className="btn btn-primary">check</Link>
                                            </div>
                                            <div className="col-sm ">
                                            </div>
                                            <div className="col-sm">
                                                <h6><strong>Doctor: </strong><Link data-toggle="tooltip" 
                                                to={`/profile/doctor/${dataFromApi[index].doctorEmail}`}
                                                title="Click to see profile">{dataFromApi[index].name}</Link></h6>
                                                {/* {console.log('here',dataFromApi[index].name)} */}

                                                <h6><strong>Status: </strong>{dataFromApi[index].status}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const Table2 = (props) => {
    let {dataFromApi} = props
    console.log('data:',dataFromApi)
    const history = useHistory()

    const handleClick = (email) => {
        history.push(`/profile/doctor/${email}`)
    }
    const handleBook = (data) => {
        console.log('book',data)
        // document.getElementById("book-btn").disabled = 'true'
        fetch(`http://localhost:3001/bookappointment/${JSON.parse(localStorage.getItem('email'))}/${data.email}`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({})
        })
    }
    return(
        <div>
            <table className="table">
                <tbody>
                    {dataFromApi.map((item, index) => (
                        <tr key={index}>
                            <td>
                            <div className="card appointment" style={{}}>
                                    <div className="card-body">
                                        <div className='row'>
                                            <div className='col-sm'>
                                                  {item.picture?( <img className="profile-pic doc" alt="doc_image" style={{height:'100px'}} src="data:image/png;base64,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" />)
                                                :(<img className="profile-pic doc" alt="doc_image" style={{height:'100px'}} src={item.picture} />)}
                                            </div>
                                            <div className="col-sm">
                                                <div>
                                                    <p onClick={() => handleClick(dataFromApi[index].email)}>{true?
                                                    (<img alt="active" title="Active" src='https://icons.iconarchive.com/icons/custom-icon-design/flatastic-10/16/Trafficlight-green-icon.png'/>):
                                                    (<img alt="inactive" title="Inactive" src='https://icons.iconarchive.com/icons/custom-icon-design/flatastic-10/16/Trafficlight-red-icon.png'/>)}<span>    </span>
                                                    <strong>Dr. {dataFromApi[index].name}</strong></p>
                                                </div>
                                                <h6 className="card-text"><strong>Specialization: </strong> {dataFromApi[index].specialization}</h6>
                                                <h6 className="card-text"><strong>Language: </strong> {dataFromApi[index].specialization}</h6>
                                                <h6><strong>Experience: </strong>{dataFromApi[index].experience}</h6>
                                            </div>
                                            <div className="col-sm ">
                                            <h6><strong>Timing: </strong>{dataFromApi[index].start} - {dataFromApi[index].end}</h6>
                                                        <h6><strong>Locality: </strong>{dataFromApi[index].locality}</h6>
                                                        <h6><strong>Fee: </strong>{dataFromApi[index].fees}</h6>
                                            </div>
                                            <div className="col-sm">
                                                <button  style={{marginTop:'10%'}} className="btn btn-primary" onClick={() => handleBook(item)}>Book Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
 }
 
const Table3 = (props) => {
    let {dataFromApi} = props

    const approve = (data) => {
        console.log(data)
        fetch(`http://localhost:3001/doctor/approve/appointment/${data.id}`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ })
        }).then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const decline = () => {

    }
    return (
        <div>
            <table className="table">
                <tbody>
                    {dataFromApi.map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item.status === 'pending'?(
                                <div className="card appointment" style={{}}>
                                    <div className="card-body">
                                        <div className='row'>
                                            <div className="col-sm">
                                                <h6 className="card-title"><strong>Appointment no: </strong> {item.id}</h6>
                                                {/* <h6 className="card-text"><strong>Queue No: </strong> {'5'}</h6> */}
                                                {/* <h6 className="card-text"><strong>Reason: </strong> {'headache'}</h6> */}
                                                <h6 className="card-text"><strong>Status: </strong> {item.status}</h6>
                                            </div>
                                            <div className="col-sm">
                                                <h6><strong>Patient: </strong><Link data-toggle="tooltip" 
                                                to={`/profile/patient/${dataFromApi[index].email}`}
                                                title="Click to see profile">{item.name}</Link></h6>
                                                <h6><strong>Gender: </strong>{dataFromApi[index].gender}</h6>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between" style={{marginTop:'15px', marginLeft:'50px', marginRight:'50px'}}>
                                            {/* <Link to="/go_somewhere" className="btn btn-success">Approve</Link> */}
                                            {/* <Link to="/go_somewhere" className="btn btn-danger">Decline</Link> */}
                                            <button className="btn btn-primary" onClick={() => {approve(item)}}>Approve</button>
                                            <button className="btn btn-danger" onClick={decline}>Decline</button>
                                        </div>
                                    </div>
                                </div>
                                ):null
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


 const Table4 = (props) => {
    let {dataFromApi} = props
    console.log('data:',dataFromApi)
    const history = useHistory()

    const handleClick = (email) => {
        history.push(`/patient_profile/${email}`)
    }
    return(
        <div>
            <table className="table">
                <tbody>
                    {dataFromApi.map((item, index) => (
                        <tr key={index}>
                        {item.status === 'approved'?(

                            <td>
                                <div className="row">
                                    <div className="col-sm">
                                        <h6>AppointmentNo: {dataFromApi[index].id}</h6>
                                        <h6>QueueNo: {dataFromApi[index].queueNo}</h6>
                                        <h6>Timing: {dataFromApi[index].timing}</h6>
                                    </div>
                                    <div className="col-sm">
                                        <h6>Patient: <Link to={`/profile/patient/${dataFromApi[index].email}`}>{dataFromApi[index].name}</Link></h6>
                                    </div>
                                    <div className="col-sm">
                                        <button className="btn btn-warning"> Connect Now</button>
                                    </div>
                                </div>
                            </td>
                        ):null}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
 }
 export {Table, Table2, Table3, Table4}