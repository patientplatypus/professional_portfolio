// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React, { Component, PropTypes } from 'react'
import { PrimaryNavigationGlam, AlignContainer } from 'components'
import glamorous from "glamorous";
import axios from 'axios';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import renderIf from 'render-if';
import {VelocityComponent, VelocityTransitionGroup} from 'velocity-react';
import Iframe from 'react-iframe';

const SearchBox = glamorous.div(
  {
    position: "absolute",
    top: '50px',
    left: '10px',
    width: '288px',
    backgroundColor: 'gray',
    overflow: 'hidden',
    overflowY: 'auto',
    height: '0px',
  },
  ({height})=>({
    height: height
  })
)

const ArticleField = glamorous.div(
  {
    backgroundColor: "#D3D3D3",
    color: 'black',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop:"5px",
    marginBottom: '2px',
    textAlign: 'center',
    ':hover':{
      backgroundColor: 'black',
      color: 'white',
      cursor: "pointer"
    }
  }
)

const ArticleTitle = glamorous.div(
  {
    fontSize: '25px',
    fontWeight: 'bolder',
    pointerEvents: 'none'
  }
)

const ArticleDescription = glamorous.div(
  {
    fontSize: '15px',
    fontWeight: 'bolder',
    paddingRight: '10px',
    paddingLeft: '10px',
    pointerEvents: 'none'
  }
)

const ArticleImage = glamorous.div(
  {
    width: 'auto',
    paddingLeft: '10px',
    paddingRight: '10px',
    height: 'auto',
    maxHeight: '100%'
  }
)

const ArticlesHolder = glamorous.div(
  {
    backgroundColor: 'white',
    overflow: 'hidden',
    height: '0px',
    maxHeight: '600px',
    overflowY: 'scroll',
  }
)

const SearchBoxInner = glamorous.div(
  {
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    ":hover": {
      backgroundColor: "black",
      color: "white",
      cursor: 'pointer'
    }
  }
)


const styles = {
  contentcontainer: {
    position: 'absolute',
    zIndex: "-1",
    width: '100%',
    minHeight: '95vh',
    background: "#232526",  /* fallback for old browsers */
    background: "-webkit-linear-gradient(to left, rgb(52, 57, 60), #232526)", /* Chrome 10-25, Safari 5.1-6 */
    background: "linear-gradient(to left, rgb(52, 57, 60), #232526)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  },
  floatright: {
    display: 'inline-block',
    float: 'right',
    marginLeft: '5px',
    marginRight: '5px'
  },
  stocksearchinput: {
    height: "30px",
    fontSize: "15px"
  },
  searchspan: {
    display: 'inline-block',
    position: 'relative',
    padding: '10px',
    backgroundColor: 'black'
  },
  searchdropdown: {

  },
  pointereventsnone: {
    pointerEvents: 'none'
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%'
  },
  iframe: {
    position:'absolute',
    top:'0',
    left:'0',
    zIndex: 2
  },
  loading: {
    position: 'absolute',
    top: '20%',
    left:'3%',
    maxHeight: '100%',
    maxWidth: '100%',
    zIndex: 1,
    pointerEvents: 'none'
  }
}

const Xholder = glamorous.div(
  {
    position: "absolute",
    top: '10',
    height: '50px',
    width: '50px',
    zIndex: 3,
    backgroundColor: "black",
    borderRadius: '50px',
    left: '10',
    ":hover": {
      backgroundColor: "white",
      cursor: 'pointer',
      height: '60px',
      width: '60px'
    }
  }
)

const Frameholder = glamorous.div(
  {
    height: '600px',
    position: 'relative',
    backgroundColor: 'grey',
    borderWidth: '5px',
    borderColor: 'black',
    borderStyle: 'line',
  }
)


class Articleframe extends Component{

  constructor(props){
    super(props);
    this.state={

    }
  }

  handleclick(){
    this.props.articlexclicked();
  }

  componentDidMount(){
    console.log('&&&&&&&&&&&&');
    console.log('MOUNTED THE ARTICLEFRAME');
    console.log('&&&&&&&&&&&&');
  }

  render(){
    return (
      <div>
        <Frameholder>
          <iframe style={styles.iframe} width="100%" height="598px" src={this.props.articleurl} security="restricted" sandbox="">
          </iframe>
          <Xholder onClick={()=>{this.handleclick()}}>
            <img style={styles.image} src={require('../../../../../public/xred.png')}/>
          </Xholder>
          <img style={styles.loading} src={require('../../../../../public/loadinggif.gif')}/>
        </Frameholder>
      </div>
    )
  }
}

export default Articleframe
