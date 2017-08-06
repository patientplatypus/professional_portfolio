// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React, { Component } from "react"
import styled from "styled-components"
import renderIf from "render-if"

const FlexContainer = styled.div`
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
`
const FlexRow = styled.div`
  flex-direction: row;
`


const styles = {
  images: {
    width: "200px",
    height: "auto",
    paddingLeft: "40px",
    paddingRight: "40px"
  }
}

class Modal extends Component{
  constructor(props){
    super(props);
    this.state = {
      openModal: false,
      modalopen: 0,
      modalclosed: 0
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.isOpen===true && this.state.openModal===false){
      document.body.scrollTop = window.scrollY;
      document.body.style.overflow = "hidden";
      this.setState({
        openModal: true
      })
    }
    if(nextProps.isOpen===false && this.state.openModal===true){
      document.body.style.overflow = "visible";
      this.setState({
        openModal: false
      })
    }
  }

  sendtoCloseModal(e){
    e.preventDefault();
    this.props.closeCallback();
  }

  render(){
    if (this.props.isOpen === false){
      return null
    }

    let modalStyle = {
      position: "absolute",
      top: window.scrollY + window.innerHeight/2,
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: "9999",
      background: "transparent",
      pointerEvents: 'none',
      overflow: "hidden",
      minWidth: "80vw",
      minHeight: "40vh",
      maxWidth: "100vw",
      maxHeight: "100vh",
      overflowY: "auto",
    }

    let backdropStyle = {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: window.scrollY + "px",
      left: "0px",
      zIndex: "9998",
      background: "rgba(0,0,0,0.3)",
      overflow: "hidden"
    }

    return(
      <div>
        <div style={modalStyle}>
          {this.props.children}
        </div>
        <div onClick={(e)=>{this.sendtoCloseModal(e)}} style={backdropStyle}></div>
      </div>
    )



  }
}

export default Modal
