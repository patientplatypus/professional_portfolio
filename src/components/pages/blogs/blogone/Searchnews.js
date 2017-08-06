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
import './searchnews.css';


const SearchBox = glamorous.div(
  ({height})=>({
    height: height
  }),
  ({url=0})=>({
    position: "absolute",
    top: url>0?'53px':'50px',
    left: url>0?'10px':'10px',
    textAlign: url>0?'right':'center',
    zIndex: 10,
    width: url>0?'110%':'304px',
    backgroundColor: 'gray',
    overflow: 'hidden',
    overflowY: 'auto',
    height: '0px',
  })
)

const SearchNewsBox = glamorous.div(
  {
    position: "absolute",
    top: '50px',
    left: '10px',
    width: '288px',
    backgroundColor: 'gray',
    overflow: 'hidden',
    overflowY: 'auto',
    height: '0px',
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

const Xholder = glamorous.div(
  {
    position: "absolute",
    top: '70',
    height: '70px',
    width: '70px',
    zIndex: 5,
    backgroundColor: "black",
    borderRadius: '50px',
    right: "130",
    ":hover": {
      backgroundColor: "white",
      cursor: 'pointer',
      right: '115',
      top: '55',
      height: '100px',
      width: '100px'
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
  newssearchinput: {
    height: "30px",
    width: '300px',
    fontSize: "15px"
  },
  searchspan: {
    display: 'inline-block',
    position: 'relative',
    zIndex: 1,
    padding: '10px',
    backgroundColor: 'black'
  },
  searchdropdown: {

  },
  pointereventsnone: {
    pointerEvents: 'none'
  },
  positionrelative: {
    position: 'relative',
    zIndex: 1
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%'
  },
}

const StockSearchButton = glamorous.div(
  {
    padding: '10px',
    backgroundColor: 'white',
  }
)

class Searchnews extends Component{
  constructor(props){
    super(props);
    this.state={
      stocksuggestions: [],
      newsboxshow: false,
      newsboxvalue: "Click to Search News"
    }
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick = e => {
    if(!ReactDOM.findDOMNode(this).contains(e.target)) {
      this.setState({
        newsboxshow: false
      })
    }
  }

  componentDidUpdate(){
    console.log('inside searchnews and the value of this.props.articleurl is ', this.props.articleurl.length);
  }

  xholderclick(){
    this.setState({
      newsboxvalue: "Click to Search News"
    })
    this.props.changenewssource('Click to Search News');
  }

  searchnews(e){

    var self = this;
    this.setState(
      {
        newsboxshow: false,
        newsboxvalue: e.target.getAttribute('data-name')
      }
    )

    if (e.target.getAttribute('data-name')==="Bloomberg"){
      var searchurl = "https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey="+process.env.newsapikey
    }else if(e.target.getAttribute('data-name')==="Business Insider"){
      var searchurl = "https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey="+process.env.newsapikey
    }else if(e.target.getAttribute('data-name')==="Financial Times"){
      var searchurl = "https://newsapi.org/v1/articles?source=financial-times&sortBy=top&apiKey="+process.env.newsapikey
    }else if(e.target.getAttribute('data-name')==="Reuters"){
      var searchurl = "https://newsapi.org/v1/articles?source=reuters&sortBy=top&apiKey="+process.env.newsapikey
    }else if(e.target.getAttribute('data-name')==="The Economist"){
      var searchurl = "https://newsapi.org/v1/articles?source=the-economist&sortBy=top&apiKey="+process.env.newsapikey
    }else if(e.target.getAttribute('data-name')==="The Wall Street Journal"){
      var searchurl = "https://newsapi.org/v1/articles?source=the-wall-street-journal&sortBy=top&apiKey="+process.env.newsapikey
    }else if(e.target.getAttribute('data-name')==="BBC"){
      var searchurl = "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey="+process.env.newsapikey
    }else if(e.target.getAttribute("data-name")==="CNBC"){
      var searchurl = "https://newsapi.org/v1/articles?source=cnbc&sortBy=top&apiKey="+process.env.newsapikey
    }else if(e.target.getAttribute("data-name")==="Fortune"){
      var searchurl = "https://newsapi.org/v1/articles?source=fortune&sortBy=top&apiKey="+process.env.newsapikey
    }


    axios.get(searchurl)
    .then(response=>{
      console.log('response from calling news api for bloomberg', response);
      this.props.newsresults(response);
      this.props.changenewssource(self.state.newsboxvalue);
    })
    .catch(err=>{
      console.log('error from news api: ', err);
    })
  }

  newsdropdownfunc(){
    this.setState({
      newsboxshow: true,
      newsboxvalue: "Click to Search News"
    })
    this.props.changenewssource('Click to Search News');
  }

  render(){
    return (
      <div>
        <AlignContainer>
          <span style={styles.searchspan}>
          <input className="hidecursor" style={styles.newssearchinput} value={this.state.newsboxvalue} onClick={(e)=>{this.newsdropdownfunc()}} type="searchstocks" name="searchstocks" placeholder="Search For Stocks"/>
          <VelocityComponent animation={{height: this.state.newsboxshow===true?`250px`:'0px'}} duration={1000}>
            <SearchBox url={this.props.articleurl.length}>
              <SearchBoxInner data-name={"Business Insider"} onClick={e=>this.searchnews(e)}>
                <div style={styles.pointereventsnone}>
                  <p>
                    Business Insider
                  </p>
                </div>
              </SearchBoxInner>
              <SearchBoxInner data-name={"Reuters"} onClick={e=>this.searchnews(e)}>
                <div style={styles.pointereventsnone}>
                  <p>
                    Reuters
                  </p>
                </div>
              </SearchBoxInner>
              <SearchBoxInner data-name={"The Economist"} onClick={e=>this.searchnews(e)}>
                <div style={styles.pointereventsnone}>
                  <p>
                    The Economist
                  </p>
                </div>
              </SearchBoxInner>
              <SearchBoxInner data-name={"BBC"} onClick={e=>this.searchnews(e)}>
                <div style={styles.pointereventsnone}>
                  <p>
                    BBC
                  </p>
                </div>
              </SearchBoxInner>
              <SearchBoxInner data-name={"CNBC"} onClick={e=>this.searchnews(e)}>
                <div style={styles.pointereventsnone}>
                  <p>
                    CNBC
                  </p>
                </div>
              </SearchBoxInner>
            </SearchBox>
          </VelocityComponent>
          {renderIf(this.props.xholderarticlevisible===true && this.props.articleurl==="")(
            <Xholder onClick={()=>{this.xholderclick()}}>
              <img style={styles.image} src={require('../../../../../public/xred.png')}/>
            </Xholder>
          )}
          </span>
        </AlignContainer>
      </div>
    )
  }
}

export default Searchnews
