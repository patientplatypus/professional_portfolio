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

const SearchBox = glamorous.div(
  {
    position: "absolute",
    zIndex: 2,
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

const Xholder = glamorous.div(
  {
    position: "absolute",
    top: '0',
    height: '45px',
    width: '45px',
    zIndex: 5,
    backgroundColor: "black",
    borderRadius: '50px',
    right: "-60",
    ":hover": {
      backgroundColor: "white",
      cursor: 'pointer',
      right: '-65',
      top: '0',
      height: '50px',
      width: '50px'
    }
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
    height: "25px",
    fontSize: "15px"
  },
  searchspan: {
    display: 'inline-block',
    position: 'relative',
    padding: '10px',
    paddingBottom: '10px',
    zIndex: 1,
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
  }
}

const StockSearchButton = glamorous.div(
  {
    padding: '5px',
    backgroundColor: 'white',
    ":hover":{
      cursor: 'pointer'
    }
  }
)

class Searchstocks extends Component{
  constructor(props){
    super(props);
    this.state={
      stocksuggestions: [],
      stocksearch: '',
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
        stocksuggestions: []
      })
    }
  }

  searchstockchangefunc(e){
    var stocktosearch = e.target.value;
    this.setState({
      stocksearch: e.target.value,
    }, ()=>{
      var searchurl = "https://cors-anywhere.herokuapp.com/http://d.yimg.com/aq/autoc?query="+stocktosearch+"&region=US&lang=en-US"
      axios.get(searchurl)
      .then(response=>{
        console.log('response from yahoo is ', response.data);
        var tempArray = [];
        response.data.ResultSet.Result.forEach(item=>{
          if (item.symbol.indexOf(".") == -1){
            var tempObj = {};
            tempObj.name = item.name;
            tempObj.symbol = item.symbol;
            tempArray.push(tempObj);
          }
        })
        this.setState({
          stocksuggestions: tempArray
        })
      })
      .catch(err=>{
        console.log('error response from yahoo is ', err);
      })
    })
  }

  componentDidMount(){
    //call dummy herokuapp to wake it up!
    // wake up sleepyhead!
    var searchurl = "https://cors-anywhere.herokuapp.com/http://d.yimg.com/aq/autoc?query=AAPL&region=US&lang=en-US"
    axios.get(searchurl)
    .then(response=>{
      console.log('response from component mounted yahoo is ', response.data);
    })
    .catch(err=>{
      console.log('error response from component mounted yahoo is ', err);
    })
  }

  fromsearchsuggestions(e){
    var symbol = e.target.getAttribute('data-symbol');
    var name =  e.target.getAttribute('data-name');
    this.setState({
      stocksuggestions: [],
      stocksearch: symbol,
    }, ()=>{
      this.props.handlestocksearch(symbol, name);
    })
  }

  handlesearchbutton(){
    var searchurl = "https://cors-anywhere.herokuapp.com/http://d.yimg.com/aq/autoc?query="+this.state.stocksearch.toUpperCase()+"&region=US&lang=en-US"
    axios.get(searchurl)
    .then(response=>{
      this.setState({
        stocksearch: this.state.stocksearch.toUpperCase(),
        stocksuggestions: []
      })
      var firsthit = response.data.ResultSet.Result[0]
      this.props.handlestocksearch(firsthit.symbol, firsthit.name)
    })
    .catch(err=>{
      console.log('error response from yahoo is ', err);
    })
  }

  xholderclick(){
    this.setState({
      stocksearch: ''
    })
    this.props.hidegraphs();
  }

  render(){

    let stockSuggest;
      if(this.state.stocksuggestions.length!=0){
            stockSuggest = this.state.stocksuggestions.map((suggest,i) => {
              return (
                <SearchBoxInner data-name={suggest.name} data-symbol={suggest.symbol}  onClick={e=>this.fromsearchsuggestions(e)} key={i}>
                  <div style={styles.pointereventsnone}>
                    <p>
                      {suggest.name}
                    </p>
                  </div>
                  <div style={styles.pointereventsnone}>
                    <p>
                      {suggest.symbol}
                    </p>
                  </div>
                </SearchBoxInner>
              );
            });
      }

    return (
      <div style={styles.positionrelative}>
        <AlignContainer>
          <span style={styles.searchspan}>
            <StockSearchButton style={styles.floatright} onClick={()=>{this.handlesearchbutton()}}>Search Stocks</StockSearchButton>
            <input style={styles.stocksearchinput} value={this.state.stocksearch} onClick={(e)=>{this.setState({stocksearch: ''})}} onChange={(e)=>{this.searchstockchangefunc(e)}} type="searchstocks" name="searchstocks" placeholder="Search For Stocks"/>
            <VelocityComponent animation={{height: this.state.stocksuggestions.length>0?`${this.state.stocksuggestions.length*60}px`:'0px'}} duration={1000}>
              <SearchBox>
                {stockSuggest}
              </SearchBox>
            </VelocityComponent>
            {renderIf(this.props.showgraphs===true)(
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

export default Searchstocks
