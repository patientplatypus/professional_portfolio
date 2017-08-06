import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette } from 'styled-theme'
import glamorous from 'glamorous';
import { Link } from 'components';
import NavLink from 'react-router-dom/Navlink';
import renderIf from 'render-if'
import {Motion, spring} from 'react-motion';

const NavGlam = glamorous.div(
  {
    display: 'flex',
    flexDirection: 'row',
    width:'100%',
    pointerEvents: 'none',
    listStyle: 'none',
    fontWeight: 'bolder',
    backgroundColor: 'purple',
  }
);


//dark gray #393E41
//light gray #D3D0CB
//off white #E7E5DF

//active



const Nav = styled.nav`
  display: flex;
  list-style: none;
  width: 100%;
  position: fixed;
  height: 75px;
  zIndex: 900;
  top: 0;
  left: 0;
  background-color: #D3D0CB;
  text-decoration: none;
  vertical-align: center;
  text-align: center;

  > :not(:first-child) {
    margin-left: 1rem;
  }
  a {
    font-weight: 300;
    color: #E7E5DF;
    text-decoration: none;
    vertical-align: center;
    text-align: center;
    padding: 20px;
    margin: 10px;
    font-weight: bolder;
    background-color:  #393E41;
    font-size: 1.25rem;
    &.active {
      color: white;
      background-color: tomato;
    }
  }
  a:hover{
    color: white;
    background-color: tomato;
    font-style: italic;
  }
  .projects{
    font-weight: 300;
    color: orange;
    text-decoration: none;
    vertical-align: center;
    text-align: center;
    padding: 20px;
    margin: 10px;
    font-weight: bolder;
    background-color: black;
    font-size: 1.25rem;
    &.active {
      color: white;
      background-color: tomato;
    }
  }
  .projects:hover{
    color: white;
    background-color: tomato;
    font-style: italic;
    vertical-align: center;
  }
  .project{
    background-color: purple
    vertical-align: center;
    text-align: center;
    margin-top: 30px;
    margin-left: 5px;
  }
`

const NavGlamLi = glamorous.div(
  {
    display: 'flex',
    flex:'1',
    position:'relative',
    fontWeight: 'bolder',
    zIndex: '1',
    alignItems: 'center',
    verticalAlign: 'center',
    pointerEvents: 'none',
    textAlign: 'center',
    padding: '10px',
    margin: '10px'
  },
  ({clicked})=>({
    backgroundColor:clicked==='true'?`tomato`:`black`,
    color:clicked==='true'?`white`:`orange`
  })
);

const styles = {
  navlink: {
    position:'absolute',
    zIndex: '999'
  }
}

class PrimaryNavigationGlam extends Component{
  constructor(props){
    super(props);
    this.state={
      projectsvisible: false
    }
  }

  // componentDidMount(){
  //   console.log('inside PrimaryNavigationGlam and clicked is ', this.props.clicked);
  //   console.log(this.props.clicked==='emoji'?`true`:`false`);
  // }



      navfunk(clicked){
        if (clicked==='true'){
          return(
            {
              display: 'flex',
              flex:'1',
              fontWeight: 'bolder',
              alignItems: 'center',
              verticalAlign: 'center',
              pointerEvents: 'none',
              textAlign: 'center',
              padding: '10px',
              margin: '10px',
              backgroundColor: 'tomato',
              color: 'white',
              textDecoration: 'none'
            }
          )
        }else{
          return(
            {
              display: 'flex',
              flex:'1',
              fontWeight: 'bolder',
              alignItems: 'center',
              verticalAlign: 'center',
              pointerEvents: 'none',
              textAlign: 'center',
              padding: '10px',
              margin: '10px',
              backgroundColor: 'black',
              color: 'orange',
              textDecoration: 'none'
            }
          )
        }
      }

      // motionfunk(spring){
      //   return(
      //     {
      //       width: spring
      //     }
      //   )
      // }

      // <Motion
      //     defaultStyle={{ width: 0 }}
      //     style={{ width:spring(100) }}
      //     >
      //   {style =>
      //     (

  render(){



    return (
      <Nav>
        <NavLink  to="/home" exact activeClassName="active">Home</NavLink>
        <NavLink  to="/about" activeClassName="active">About</NavLink>
        <NavLink  to="/projects" activeClassName="active">Projects</NavLink>
        <NavLink  to="/blog" activeClassName="active">Blog Archive</NavLink>
        <NavLink  to="/message" activeClassName="active">Message</NavLink>
      </Nav>
    )
  }
}
export default PrimaryNavigationGlam
