import React ,{useState}from 'react'

import EditProfile from "./editProfile"

import {Modal,Button} from "react-bootstrap"


export function ModalComp(OriginalComp){
  
  return class NewComp extends React.Component
  {
    constructor(props)
    {
      super(props)
      this.state= {
        show : false
      }
    }
    enableModal = ()=>{
      this.setState({show : true})
    }
    disableModal = ()=>{
      this.setState({show : false})
    }
    render()
    {
    
      return (
        <>
        <button  type="button" onClick={this.enableModal} className="buttonStyle" data-toggle="modal" data-target="#exampleModalCenter">
            edit
        </button>
        <Modal show={this.state.show}>
        <Modal.Body>
          <OriginalComp close={this.disableModal}/>
        </Modal.Body>
        
      </Modal>
        </>
      )
    }
    
  }

  

}
// export default ModalComp

// function Modal2(children) {
//     const styles={width : "1000px"
//                 ,borderRadius : "10px"}

//     const [show,setShow]=useState(false)

  
   
// }

