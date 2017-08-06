import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette } from 'styled-theme'
import glamorous from 'glamorous';
import { Link } from 'components';
import NavLink from 'react-router-dom/Navlink';
import renderIf from 'render-if'
import {Motion, spring} from 'react-motion';


const styles = {
  imgstyle: {
    borderRadius: '100px',
    borderStyle: 'solid',
    borderWidth: '10px',
    borderColor: '#D3D0CB'
  }
}


class ProfileImg extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }

  render(){
    return (
      <div>
        <img style={styles.imgstyle} src={require('../../../../public/profileimage.jpg')} />
      </div>
    )
  }
}
export default ProfileImg
