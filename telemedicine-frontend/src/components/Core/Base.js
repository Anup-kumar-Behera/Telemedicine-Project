import React from 'react'
import Navbar from './Navbar'
import {SRLWrapper} from 'simple-react-lightbox'

const Base = ({className, children, name}) => {

    

//   useEffect(() => {
//     socket.on("FromAPI", data => {
//       setResponse(data);
//     });
//     alert(response)
//   }, []);

    return (
        <div style={{backgroundColor:'white', height:'100%', width:'100%'}}>
            <Navbar/>
            <div className="justify-content-center text-black">
                <h1>{name}</h1>
            </div>
            <SRLWrapper>
                <div className={className} >
                    {children}
                </div>
            </SRLWrapper>
        </div>
    )
}

export default  Base