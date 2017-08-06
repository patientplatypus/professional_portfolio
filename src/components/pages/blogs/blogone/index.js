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
import {
  VictoryAxis,
  VictoryArea,
  VictoryBar,
  VictoryContainer,
  VictoryChart,
  VictoryLine,
  VictoryLegend,
  VictoryLabel,
  VictoryTooltip,
  VictoryPie,
  VictoryVoronoiContainer,
  VictoryScatter,
  VictoryStack,
  VictoryGroup,
  VictorySelectionContainer
}  from 'victory';
import {VelocityComponent, VelocityTransitionGroup} from 'velocity-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ascetic } from 'react-syntax-highlighter/dist/styles';
import Searchstocks from './Searchstocks';
import Searchnews from './Searchnews';
import Articlebox from './Articlebox';
import {Motion, spring} from 'react-motion';
import Articleframe from './Articleframe';
import './main.css';
// import '../../../../../.env';

const FirstGraph = () => {
  const codeString =
  `{renderIf(this.state.showgraphs===true)(
    <div>
      {renderIf(this.state.oneMinTableClose.length>0 && this.state.nottradingnow===false)(
        <ChartContainer>
          <VictoryChart width={600} height={470} scale={{x: "time"}}>
              <svg width="100" height="100">
                <rect x="0" y="7" width={`+"`"+"${700}"+"`"+`} height="40" fill="gray" opacity="0.3"/>
              </svg>
              <VictoryLabel
                text={() => `+"`"+"${this.state.stocksearchsent}"+"`"+` }
                x={60}
                y={25}
                style={{
                  fill: "black",
                  fontSize: 25
                }}
              />
              <VictoryAxis
               label="Date"
               tickCount={10}
               style={{
               axisLabel: {fontSize: 20, padding: 30},
               ticks: {stroke: "grey", size: 5},
               grid: {stroke: "rgba(153, 161, 166, 0.3)"},
               tickLabels: {fontSize: 8, padding: 2}
              }}/>
              <VictoryAxis dependentAxis
                label="Price"
                tickCount={10}
                style={{
                  axisLabel: {fontSize: 20, padding: 30},
                  grid:  {stroke: "rgba(153, 161, 166, 0.3)"},
                  ticks: {stroke: "grey", size: 5},
                  tickLabels: {fontSize: 12, padding: 1}
               }}
              />
              {timeFlags}
          {renderIf(this.state.exchangestatus==="exchangeopen")(
                  <VictoryLabel
                    text={() => `+"`"+"$${this.state.currentprice}"+"`"+` }
                    x={140}
                    y={25}
                    style={{
                      fill: "black",
                      fontSize: 25
                    }}
                  />
          )}

          {renderIf(this.state.exchangestatus==="exchangeopen")(
                  <VictoryLabel
                    text={() =>  `+"`"+"${this.state.oneMinCloseDif}% now"+"`"+`}
                    x={240}
                    y={25}
                    style={{
                      fill: Math.sign(this.state.oneMinCloseDif)===1 ? "green" : "red",
                      fontSize: 25
                    }}
                  />
          )}
          {renderIf(this.state.exchangestatus==="exchangeopen" || (this.state.exchangestatus==="exchangeclosed" && this.state.weekdaystatus==="weekday"))(
                  <VictoryLabel
                    text={() => `+"`"+"${this.state.todayMinCloseDif}% since open"+"`"+` }
                    x={370}
                    y={25}
                    style={{
                      fill: Math.sign(this.state.todayMinCloseDif)===1 ? "green" : "red",
                      fontSize: 25
                    }}
                  />
          )}
          {renderIf(this.state.exchangestatus==="exchangeclosed" && this.state.weekdaystatus==="weekend")(
                  <VictoryLabel
                    text={() => "It&#39;s the weekend, no data" }
                    x={170}
                    y={25}
                    style={{
                      fill: "black",
                      fontSize: 25
                    }}
                  />
          )}
          <VictoryLine
            style={{
              data: {stroke: "tomato"}
            }}
            data={this.state.oneMinTableClose}
            x="time"
            y="uv"
          />
          </VictoryChart>
        </ChartContainer>
      )}
    </div>
  )}
  `;
  return <SyntaxHighlighter language='javascript' className='codeStyling' style={ascetic}>{codeString}</SyntaxHighlighter>;
}

const SecondGraph = () => {
  const codeString =
  `let timeFlags;
    if(this.state.newssource!="Click to Search News" && this.state.newspublishedat.length>0 && this.state.oneMinTableClose.length>0){
          timeFlags = this.state.newspublishedat.map((aflag,i) => {
            var oneMinTableClosefirst = this.state.oneMinTableClose[this.state.oneMinTableClose.length-1];
            var oneMinTableCloselast = this.state.oneMinTableClose[0]
            var oneMinTableClosefirsttime = oneMinTableClosefirst.time;
            var oneMinTableCloselasttime = oneMinTableCloselast.time;
            var date = new Date(oneMinTableClosefirsttime);
            var millisecondsClosefirst = date.getTime();
            var date = new Date(oneMinTableCloselasttime);
            var millisecondsCloselast = date.getTime();
            var xvalue = 600*((aflag-millisecondsClosefirst)/(millisecondsCloselast-millisecondsClosefirst))
            if (xvalue>=0 && xvalue<=600){
              return (
                <Motion
                  defaultStyle={{ font: 0 }}
                  style={{ font: spring(this.state.arrowboxhover===i ? 2:1 , {stiffness: 50, damping: 100})}}
                  onRest={()=>{this.setState({arrowboxhover: -1})}}
                >
                  {style =>
                    (
                      <svg className='svgflag' onMouseOver={()=>{
                        if(style.font<1.01){
                          this.setState({arrowboxhover: i})
                        }
                      }}
                      onMouseDown={()=>{this.svgflagclick(aflag, i)}}
                      width="500px" height="500px" x={`+"`"+"${xvalue-10*style.font}"+"`"+`} y={`+"`"+"${420-40*style.font-15*(this.state.newspublishedat.length-i)*(style.font-1)-10*i}"+"`"+`} >

                        <polygon points={`+"`"+"${6*style.font},${30*style.font} ${14*style.font},${30*style.font} ${10*style.font},${40*style.font}"+"`"+`}
                        style={{fill:`+"`"+"rgb(255,100,50)"+"`"+`,stroke:'black',strokeWidth:1}} width="100%" height="100%" />
                        <polygon points={`+"`"+"${20*style.font},0 0,0 0,${30*style.font} ${20*style.font},${30*style.font}"+"`"+`}
                        style={{fill:`+"`"+"rgb(255,100,50)"+"`"+`,stroke:'black',strokeWidth:1}} width="100%" height="100%"/>
                        <VictoryLabel
                          text={() => `+"`"+"${i}"+"`"+` }
                          x={2}
                          y={15*style.font}
                          style={{
                            fill: "black",
                            fontSize: `+"`"+"${35*style.font}"+"`"+`
                          }}
                        />

                      </svg>
                    )
                  }
                </Motion>
              );
            }else{
              return(<div/>)
            }
          });
    }`;
  return <SyntaxHighlighter language='javascript' className='codeStyling' style={ascetic}>{codeString}</SyntaxHighlighter>;
}





const FlexRow = styled.div`
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  width: 100%;
`

const FlexColumn = styled.div`
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
`
const FlexColumnh100 = styled.div`
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`

const Flex1 = styled.div`
  flex: 1;
`
const Flex2 = styled.div`
  flex: 2;
`

const Flex3 = styled.div`
  flex: 3;
`

const Flex10 = styled.div`
  flex: 10;
`

const Flex9 = styled.div`
  flex: 9;
`

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

const OverlapContainer = glamorous.div(
  {
    // top: `${window.innerHeight-50}px`,
    marginTop: '3px',
    height: '100vh',
    overflow: 'hidden',
    overflowY: 'scroll',
    background: "#232526",  /* fallback for old browsers */
    background: "-webkit-linear-gradient(to left, rgb(52, 57, 60), #232526)", /* Chrome 10-25, Safari 5.1-6 */
    background: "linear-gradient(to left, rgb(52, 57, 60), #232526)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
)

const HalfHolder1 = glamorous.div(
  {
    display: 'inline-block',
    float: 'left',
    width: '60%'
  }
)
const HalfHolder2 = glamorous.div(
  {
    display: 'inline-block',
    float: 'left',
    width: '40%'
  }
)
const HalfHolder3 = glamorous.div(
  {
    display: 'inline-block',
    float: 'left',
    width: '100%'
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
  positionrelative: {
    position: 'relative',
    zIndex: 1
  },
  positionabsolute: {
    position: 'absolute',
    zIndex: 1,
    whiteSpace: 'nowrap',
  },
  newscontainer: {
    position: 'relative',
    paddingTop: '10px',
    paddingBottom: '10px',
    minHeight: '650px',
    maxHeight: '650px',
    textAlign: 'center',
    backgroundColor: "lightgrey"
  },
  stockcontainer: {
    position: 'relative',
    paddingTop: '10px',
    paddingBottom: '10px',
    minHeight: '650px',
    maxHeight: '650px',
    textAlign: 'center',
    backgroundColor: "darkgrey"
  },
  newsinstructions: {
    backgroundColor: 'white',
    marginTop: '150px',
    marginLeft: '20%',
    marginRight: '20%',
    color: 'black',
    padding: '10px',
    textAlign: 'center'
  },
  stocksinstructions: {
    backgroundColor: 'white',
    top: '160px',
    marginRight: '20%',
    marginLeft: '20%',
    position: 'absolute',
    zIndex: 1,
    color: 'black',
    padding: '10px',
    textAlign: 'center'
  },
  stocksinstructions2: {
    backgroundColor: 'white',
    top: '150px',
    marginTop: '5%',
    position: 'absolute',
    zIndex: 1,
    color: 'black',
    padding: '10px',
    textAlign: 'center'
  },
  newsflexcolumn: {
    position: 'absolute',
    maxWidth: '100%',
    width: '100%',
    maxHeight: '100%',
    zIndex: 2,
  },
  stockflexcolumn: {
    position: 'relative',
    maxWidth: '100%',
    width: '100%',
    maxHeight: '100%',
    zIndex: 2,
  },
  newsflexrow: {
    justifyContent: 'center',
  },
  stockshiddencontainer:{
    height: '600px',
    overflow: 'hidden',
    overflowY: 'scroll',
  },
  positionstocksearch:{
    position: 'absolute',
    zIndex: 10,
    top: '0'
  },
  brgrey: {
    backgroundColor: 'darkgrey',
    height: '10px',
    width: '100%'
  },
  brgrey2: {
    backgroundColor: 'lightgrey',
    height: '10px',
    width: '100%'
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
}

const SpanLink = glamorous.span(
  {
    backgroundColor: "orange",
    color: "blue",
    borderRadius: '10px',
    paddingLeft:"3px",
    paddingRight:"3px",
    paddingTop:"1px",
    paddingBottom:"1px",
    ":hover":{
      cursor: "pointer",
      backgroundColor: "blue",
      color: 'orange'
    }
  }
)

const StockSearchButton = glamorous.div(
  {
    padding: '10px',
    backgroundColor: 'white',
  }
)

const ChartContainer = glamorous.div(
  {
    backgroundColor: 'white',
    padding: '5px',
  }
)

const OutermostDiv = glamorous.div(
  {
    maxHeight: '100vh'
  }
)

const BackButton = glamorous.div(
  {
    padding: '5px',
    color: 'black',
    backgroundColor: 'white'
  }
)

const BlogTitle = glamorous.div(
  {
    fontSize: '55px',
    position: 'relative',
    color: '#2d8b3e',
    backgroundColor: '#f4c20d',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    borderRadius: '50px',
    lineHeight: '1px',
    marginTop: '5px',
    "& p":{
      padding: '0px',
      margin: '40px'
    }
  }
)

const TalkyBox = glamorous.div(
  {
    fontSize: '25px',
    backgroundColor: '#DCE0D9',
    color: '#171A21',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    maxWidth: '80%',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '3px',
    paddingBottom: '3px',
    textAlign: 'left',
    '& p':{
      margin:'0px'
    }
  },
  ({size})=>({
    fontSize: size
  }),
  ({backgroundColor})=>({
    backgroundColor: backgroundColor
  })
)

const BlogTitleSVG = glamorous.div(
  {
    position: 'absolute',
    top: '0%',
    left: '0%'
  }
)


class BlogOne extends Component{
  static propTypes = {
    history: PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
    var self = this;
    this.state={
      dailyDates: [],
      dailyOpen: [],
      dailyHigh: [],
      dailyLow: [],
      dailyClose: [],
      dailyVol: [],
      monthSectorTable: [],
      dailyTableClose: [],
      yearSectorTable: [],
      oneMinSectorTable: [],
      stocknamesaved: '',
      stocksuggestions: [],
      dailySectoryTable: [],
      stocksearch: 'MSFT',
      stocksearchsent: '',
      exchangestatus: 'exchangeopen',
      intradayinterval: 0,
      oneMinTableClose: [],
      selectnews: '',
      oneMinCloseDif: null,
      todayMinCloseDif: null,
      weekdaystatus: null,
      namearrayyear: [],
      namearraymonth: [],
      currentprice: null,
      newsarticlearray: [],
      newssource: 'Click to Search News',
      newsarticlepics: [],
      arrowboxhover: -1,
      newsresults: {},
      articleurl: '',
      xholderarticlevisible: 'false',
      showgraphs: false,
      newspublishedat: [],
      flagkeyclicked: -1,
      nottradingnow: false
    }
  }

  backfunc(){
    this.props.history.push({
            pathname: '/blog',
            state: {

            }
          })
  }

  articlexclicked(){
    this.setState({
      articleurl: ''
    })
  }

  xholdervisiblearticles(bool){
    this.setState({
      xholderarticlevisible: bool
    })
  }

  changenewssource(newssource){
    console.log('inside changenewssource and newssource is ', newssource);
    this.setState({
      newssource: newssource
    })
  }

  articleurlassign(articleurl){
    this.setState({
      articleurl: articleurl
    })
  }

  hidegraphs(){
    this.setState({
      showgraphs: false
    })
  }

  newsresults(newsresults){
    this.setState({
      newsresults: newsresults
    }, ()=>{
      console.log('results from newsresults callback are ', this.state.newsresults);
      var newsarticlearray = [];
      var newsarticlepics = [];
      var newspublishedat = [];
      newsresults.data.articles.forEach(article=>{
        newsarticlearray.push(article)
        newsarticlepics.push(article.urlToImage)
        var date = new Date(article.publishedAt); // some mock date
        var milliseconds = date.getTime();
        // var cleanedtime = moment(milliseconds).format('YYYY-MM-DD HH:MM:SS')
        newspublishedat.push(milliseconds)
      })
      this.setState({
        newsarticlearray: newsarticlearray,
        newsarticlepics: newsarticlepics,
        newspublishedat: newspublishedat
      }, ()=>{
        console.log('after setstate newsarticlearray');
        console.log('published at is, ', this.state.newspublishedat);
      })
    })
  }

  stocksearchfunc(){
    // this.clearallintervals();
    this.checkweekdaystatus();
    // this.searchnews();
    clearInterval(this.state.intradayinterval);
      this.setState({
        stocksearchsent: this.state.stocksearch.toUpperCase(),
        oneMinTableClose: [],
        oneMinSectorTable: [],
        monthSectorTable: [],
        showgraphs: true,
        yearSectorTable: [],
        exchangestatus: 'exchangeopen',
        stocksuggestions: "",
        dailyTableClose: []
      }, ()=>{

        this.intradaycallerfunc(this.state.exchangestatus);

        console.log('inside stocksearchfunc');

        var searchurl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+this.state.stocksearchsent+'&apikey='+process.env.alphavantagekey;

        axios.get(searchurl)
        .then(response=>{
          // console.log('return from alphavantage api is ', response);
          // .data["Time Series (Daily)"]["2017-03-29"]
          // console.log('response.data["Time Series (Daily)"] ', response.data["Time Series (Daily)"]);
          // console.log('response.data["Time Series (Daily)"] ', response.data["Time Series (Daily)"][0]);

          var dailyData = response.data["Time Series (Daily)"];
          var dailyDates = [];
          var dailyOpen = [];
          var dailyHigh = [];
          var dailyLow = [];
          var dailyClose = [];
          var dailyTableClose = [];
          var dailyVol = [];

          // build the index
          for (var x in dailyData) {
             dailyDates.push(x);
          }

          var promise = new Promise(resolve=>{
            for (var x = 0; x<dailyDates.length; x++){
              // console.log(dailyData[dailyDates[x]]);
              // console.log(dailyData[dailyDates[x]]['1. open']);

              dailyTableClose.push({x: x, uv: parseFloat(dailyData[dailyDates[x]]['4. close']), time: new Date(dailyDates[x]).getTime()})
              // dailyTableClose.push({"x": x, "y": dailyData[dailyDates[x]]['4. close'], "d": dailyDates[x]})
              if (x === dailyDates.length-1){
                resolve(true)
              }
            }
          });

          promise.then(resolved=>{
            if (resolved){
              this.setState({
                dailyTableClose: dailyTableClose
              }, ()=>{
                console.log('after setState and the value of dailyTableClose is, ', this.state.dailyTableClose);
              })
            }
          });

        })
        .catch(err=>{
          console.log('catch from alphavantage is ', err);
        })

      // https://www.alphavantage.co/query?function=SECTOR&apikey=demo

        var searchurl = 'https://www.alphavantage.co/query?function=SECTOR&apikey='+process.env.alphavantagekey;
        axios.get(searchurl)
        .then(response=>{
          console.log('here is the sector response ', response);
          // .data["Rank D: 1 Month Performance"]["Consumer Discretionary"]
          var onemonthperf = response.data["Rank D: 1 Month Performance"]
          var oneyearperf = response.data["Rank G: 1 Year Performance"]
          var namearraymonth = [];
          var namearrayyear = [];
          var oneyearperfarray = [];
          var onemonthperfarray = [];
          for (var x in onemonthperf){
            namearraymonth.push(x)
          }
          for (var x in oneyearperf){
            namearrayyear.push(x)
          }
          for (var y in namearraymonth){
            var tempmonthpercent = response.data["Rank D: 1 Month Performance"][namearraymonth[y]];
            var tempmonthpercentclean = parseFloat(tempmonthpercent);//.slice(0,-1);
            var tempObjMonth = {"x": namearraymonth[y], "y": tempmonthpercentclean, "label": `${namearraymonth[y]}: ${tempmonthpercentclean}%`};
            onemonthperfarray.push(tempObjMonth);
          }
          for (var y in namearrayyear){
            var tempyearpercent = response.data["Rank G: 1 Year Performance"][namearrayyear[y]];
            var tempyearpercentclean = parseFloat(tempyearpercent);//.slice(0,-1);
            var tempObjYear = {"x": namearrayyear[y], "y": tempyearpercentclean, "label": `${namearrayyear[y]}: ${tempyearpercentclean}%`};
            oneyearperfarray.push(tempObjYear);
          }
          // console.log('onemonthperfarray ', onemonthperfarray);
          console.log('value of tempyearpercent is ', tempyearpercent.slice(0,-1));
          this.setState({
            monthSectorTable: onemonthperfarray,
            yearSectorTable: oneyearperfarray,
            namearraymonth: namearraymonth,
            namearrayyear: namearrayyear
          }, ()=>{
            console.log('after setstate and monthSectorTable is ', this.state.monthSectorTable);
            console.log('after setstate and yearSectorTable is ', this.state.yearSectorTable);
          })
        })
        .catch(err=>{
          console.log('catch from alphavantage is ', err);
        })



      })
    // }, 1000)

  }

  intervalfunction(exchangestatus){
    console.log('inside intradayinterval');
    console.log('exchange status is ', this.state.exchangestatus);
    if(exchangestatus==="exchangeopen"){
      console.log('inside exchange open');
      var searchurl = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+this.state.stocksearchsent+'&interval=1min&outputsize=full&apikey='+process.env.alphavantagekey;

      axios.get(searchurl)
      .then(response=>{
        console.log('return from alphavantage api is ', response);
        // console.log('response.data["Time Series (1min)"] ', response.data["Time Series (1min)"]);
        // console.log('response.data["Time Series (1min)"] ', response.data["Time Series (1min)"][0]);

        if (response.data['Meta Data']['2. Symbol']===this.state.stocksearchsent){
          var oneMinData = response.data["Time Series (1min)"];
          var oneMinDates = [];
          var oneMinOpen = [];
          var oneMinHigh = [];
          var oneMinLow = [];
          var oneMinClose = [];
          var oneMinTableClose = [];
          var oneMinVol = [];
          var nottradingnow = false;

          // build the index
          for (var x in oneMinData) {
             oneMinDates.push(x);
          }

          var promise = new Promise(resolve=>{
            for (var x = 0; x<oneMinDates.length; x++){
              // console.log(oneMinData[oneMinDates[x]]);
              // console.log(oneMinData[oneMinDates[x]]['1. open']);

              var tradetime = new Date(oneMinDates[x]).getTime()
              var todaytime = Date.now();

              if (moment(tradetime).format('MMMM/DD/YY')===moment(todaytime).format('MMMM/DD/YY')){
                oneMinTableClose.push({x: x, uv: parseFloat(oneMinData[oneMinDates[x]]['4. close']), time: new Date(oneMinDates[x]).getTime()})
              }else{
                oneMinTableClose.push({x:x,uv:x,time:x})
                nottradingnow = true;
              }

              // oneMinTableClose.push({"x": x, "y": oneMinData[oneMinDates[x]]['4. close'], "d": oneMinDates[x]})
              if (x === oneMinDates.length-1){
                resolve(true)
              }
            }
          });

          promise.then(resolved=>{
            if (resolved){
              this.setState({
                oneMinTableClose: oneMinTableClose,
              }, ()=>{
                var lastvalue = this.state.oneMinTableClose[0];
                var onebeforevalue = this.state.oneMinTableClose[1];
                var exchangeopenvalue = this.state.oneMinTableClose[this.state.oneMinTableClose.length-1];
                //DOESNT WORK BETWEEN MIDNIGHT & 930!!!!
                console.log('lastvalue ', this.state.oneMinTableClose);
                // console.log('lastvalue time', lastvalue.time);
                // console.log('onebeforevalue ', onebeforevalue);
                // console.log("check if exchangeclosed: ", this.checkexchangeclose(lastvalue.time));
                var setexchangestatus = this.checkexchangeclose(lastvalue.time);
                var setpercentdif =  Math.round(((lastvalue.uv - onebeforevalue.uv)*100),2)/100;
                var setcurrentprice = Math.round(lastvalue.uv,-2);
                var setpercentdiftoday =  Math.round(((lastvalue.uv - exchangeopenvalue.uv)*100),2)/100;
                console.log('exchangeopenvalue ', exchangeopenvalue);
                console.log('setpercentdiftoday ', setpercentdiftoday);
                this.setState(
                  {
                    oneMinCloseDif: setpercentdif,
                    todayMinCloseDif: setpercentdiftoday,
                    currentprice: setcurrentprice,
                    exchangestatus: setexchangestatus
                  }
                )
                if (nottradingnow = true){
                  this.setState({
                    nottradingnow: true
                  })
                }
              })
            }
          });
        }

      })
      .catch(err=>{
        console.log('catch from alphavantage is ', err);
      })
    }else{
      var searchurl = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AMZN&interval=1min&apikey='+process.env.alphavantagekey;
      axios.get(searchurl)
      .then(response=>{
        // console.log('return from exchangeclosed is ', response.data["Time Series (1min)"]);
        var timeseries = response.data["Time Series (1min)"];
        // console.log('timeseries[0]', timeseries);
        var timeseriesarray = []
        for (var x in timeseries) {
           timeseriesarray.push(x);
        }
        // console.log('timeseriesarray', timeseriesarray[0]);
        // this.checkexchangeclose(lastvalue.time)
        // console.log('is the exchangeopen ? : ', this.checkexchangeclose(timeseriesarray[0]));
        var setexchangestatus = this.checkexchangeclose(timeseriesarray[0]);
        this.setState({
          exchangestatus: setexchangestatus
        })
      })
      .catch(err=>{
        console.log('catch from alphavantage is ', err);
      })
    }
  }

  intradaycallerfunc(exchangestatus){
    // https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo
    console.log('inside intradaycallerfunc');
    console.log('exchange status is ', this.state.exchangestatus);

    // var refreshIntervalId = setInterval(fname, 10000);
    this.intervalfunction(exchangestatus);

    var intradayinterval = setInterval(()=>{
      if (exchangestatus==="exchangeopen"){
        this.intervalfunction(exchangestatus)
      }
    },60000);
    this.setState({
      intradayinterval: intradayinterval
    })
  }

  dateFormat(time){
  	return moment(time).format('MMMM/DD/YY');
  };

  minFormat(time){
    return moment(time).format('h:mm:ss a');
  }

  checkexchangeclose(time){
    // console.log('inside checkexchangeclose');
    // console.log('day of week is...', moment(time).format('dddd'));
    // console.log('value of moment(time).format("h:mm") is ', moment(time).format('h:mm'));
    if (moment(time).format('h:mm')==="4:00"||moment(time).format('dddd')==="Saturday"||moment(time).format('dddd')==="Sunday"){
      return('exchangeclosed');
    }else{
      return('exchangeopen');
    }
  }

  checkweekdaystatus(time){
    if (moment(time).format('dddd')==="Saturday"||moment(time).format('dddd')==="Sunday"){
      console.log('inside weekend set');
      this.setState(
        {
          weekdaystatus: 'weekend'
        }
      )
    }else{
      console.log('inside weekday set');
      this.setState(
        {
          weekdaystatus: 'weekday'
        }
      )
    }
  }

  dateFiddle(d){
    var smallD = this.dateFormat(d.time);
    // console.log('value of D.setUTCSeconds(utcSeconds) is ', d.time);
    return(`$${d.y} on ${smallD}`);
  }

  minFiddle(d){
    var smallD = this.minFormat(d.time);
    return(`$${d.y} at ${smallD}`);
  }

  handlestocksearch(symbol, name){
    this.setState({
      stocksearch: symbol,
      showgraphs: true,
      stocknamesaved: name,
      stocksuggestions: ''
    }, ()=>{
      this.stocksearchfunc();
    })
  }

  svgflagclick(aflag, i){
    console.log('inside svgflagclick and the value of aflag: ', aflag, ' i: ', i);
    this.setState({
      flagkeyclicked: i
    }, ()=>{
      console.log('after setstate and the value of flagkeyclicked is ', this.state.flagkeyclicked);
    })
  }

  resetsvgflag(){
    this.setState({
      flagkeyclicked: -1
    })
  }

  componentDidMount(){
    document.body.style.overflow='hidden';
  }

  sendlocation(sendto){
    window.location.href = sendto;
  }

  render(){


    let timeFlags;
      if(this.state.newssource!="Click to Search News" && this.state.newspublishedat.length>0 && this.state.oneMinTableClose.length>0){
            timeFlags = this.state.newspublishedat.map((aflag,i) => {
              var oneMinTableClosefirst = this.state.oneMinTableClose[this.state.oneMinTableClose.length-1];
              var oneMinTableCloselast = this.state.oneMinTableClose[0]
              var oneMinTableClosefirsttime = oneMinTableClosefirst.time;
              var oneMinTableCloselasttime = oneMinTableCloselast.time;
              var date = new Date(oneMinTableClosefirsttime);
              var millisecondsClosefirst = date.getTime();
              var date = new Date(oneMinTableCloselasttime);
              var millisecondsCloselast = date.getTime();
              var xvalue = 600*((aflag-millisecondsClosefirst)/(millisecondsCloselast-millisecondsClosefirst))
              if (xvalue>=0 && xvalue<=600){
                return (
                  <Motion
                    defaultStyle={{ font: 0 }}
                    style={{ font: spring(this.state.arrowboxhover===i ? 2:1 , {stiffness: 50, damping: 100})}}
                    onRest={()=>{this.setState({arrowboxhover: -1})}}
                  >
                    {style =>
                      (
                        <svg className='svgflag' onMouseOver={()=>{
                          if(style.font<1.01){
                            this.setState({arrowboxhover: i})
                          }
                        }}
                        onMouseDown={()=>{this.svgflagclick(aflag, i)}}
                        width="500px" height="500px" x={`${xvalue-10*style.font}`} y={`${420-40*style.font-15*(this.state.newspublishedat.length-i)*(style.font-1)-10*i}`} >

                          <polygon points={`${6*style.font},${30*style.font} ${14*style.font},${30*style.font} ${10*style.font},${40*style.font}`}
                          style={{fill:`rgb(255,100,50)`,stroke:'black',strokeWidth:1}} width="100%" height="100%" />
                          <polygon points={`${20*style.font},0 0,0 0,${30*style.font} ${20*style.font},${30*style.font}`}
                          style={{fill:`rgb(255,100,50)`,stroke:'black',strokeWidth:1}} width="100%" height="100%"/>
                          <VictoryLabel
                            text={() => `${i}` }
                            x={2}
                            y={15*style.font}
                            style={{
                              fill: "black",
                              fontSize: `${35*style.font}`
                            }}
                          />

                        </svg>
                      )
                    }
                  </Motion>
                );
              }else{
                return(<div/>)
              }
            });
      }

      let timeFlagsDay;
        if(this.state.newssource!="Click to Search News" && this.state.newspublishedat.length>0 && this.state.dailyTableClose.length>0){
              timeFlagsDay = this.state.newspublishedat.map((aflag,i) => {
                var dailyTableClosefirst = this.state.dailyTableClose[this.state.dailyTableClose.length-1];
                var dailyTableCloselast = this.state.dailyTableClose[0]
                var dailyTableClosefirsttime = dailyTableClosefirst.time;
                var dailyTableCloselasttime = dailyTableCloselast.time;
                var date = new Date(dailyTableClosefirsttime);
                var millisecondsClosefirst = date.getTime();
                var date = new Date(dailyTableCloselasttime);
                var millisecondsCloselast = date.getTime();
                var xvalue = 550*((aflag-millisecondsClosefirst)/(millisecondsCloselast-millisecondsClosefirst))
                if (xvalue>=0 && xvalue<=600){
                  return (
                    <Motion
                      defaultStyle={{ font: 0 }}
                      style={{ font: spring(this.state.arrowboxhover===i ? 2:1 , {stiffness: 50, damping: 100})}}
                      onRest={()=>{this.setState({arrowboxhover: -1})}}
                    >
                      {style =>
                        (
                          <svg className='svgflag' onMouseOver={()=>{
                            if(style.font<1.01){
                              this.setState({arrowboxhover: i})
                            }
                          }}
                          onMouseDown={()=>{this.svgflagclick(aflag, i)}}
                          width="500px" height="500px" x={`${xvalue-10*style.font}`} y={`${420-40*style.font-15*(this.state.newspublishedat.length-i)*(style.font-1)-10*i}`} >

                            <polygon points={`${6*style.font},${30*style.font} ${14*style.font},${30*style.font} ${10*style.font},${40*style.font}`}
                            style={{fill:`rgb(255,100,50)`,stroke:'black',strokeWidth:1}} width="100%" height="100%" />
                            <polygon points={`${20*style.font},0 0,0 0,${30*style.font} ${20*style.font},${30*style.font}`}
                            style={{fill:`rgb(255,100,50)`,stroke:'black',strokeWidth:1}} width="100%" height="100%"/>
                            <VictoryLabel
                              text={() => `${i}` }
                              x={2}
                              y={15*style.font}
                              style={{
                                fill: "black",
                                fontSize: `${35*style.font}`
                              }}
                            />

                          </svg>
                        )
                      }
                    </Motion>
                  );
                }else{
                  return(<div/>)
                }
              });
        }
    return (
      <OutermostDiv>
        <PrimaryNavigationGlam className="navbarfixed"/>
        <br/><br/><br/><br/>
        <OverlapContainer>
        <FlexColumn>
          <Flex1>
            <AlignContainer>
              <BlogTitle className="blogtitlefont">
                <p>
                  Google&#160;&#160;Finance
                </p>
                <BlogTitleSVG>
                  <svg width="1000" height="1000" transform='translate(50 0)'>
                    <g transform='rotate(70) translate(-108 -235)'>
                      <rect x='19%' y='1%' width='63' height="63" fill="#4885ed" opacity='1'/>
                    </g>
                    <text fill="#ba2123" className="comicsvg" transform='rotate(11) translate(0 0)' x='19%' y='1%'>re-</text>
                  </svg>
                </BlogTitleSVG>
              </BlogTitle>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <TalkyBox className="TalkyBox">
                <p>
                  &#8195;Hi! Welcome to my blog post. This one is called Google "re-"Finance - I try and take the Google Finance API and make it a bit more user friendly. I will also be going over how to make VictoryCharts - an easy and intuitive graphing library - which might help you make dashboards at your company. I found this to be incredibly fun and useful, but I had to dig through a few libraries to get here so I wanted to show what I learned and maybe save you some time!
                </p>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <TalkyBox size={`${50}px`} className="TalkyBox">
                <p>
                  The Project
                </p>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <TalkyBox size={`${15}px`} className="TalkyBox">
                <p>
                  Note: On the first search please wait a few seconds - I make outside API calls, and it sometimes takes a little time for the databases to wakeup. Also, it should go without saying that this is for novelty purposes only and there is no guarantee to reflect the "up-to-the-minute" prices of any exchange. Always trade at your own risk.
                </p>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
        </FlexColumn>


        <br/>
        <FlexRow>
          <Flex1/>
          <Flex3 style={styles.stockcontainer}>
            <div style={styles.stockflexcolumn}>
              <div>
                <Searchstocks stocksearchfunc={this.stocksearchfunc.bind(this)}
                showgraphs={this.state.showgraphs} handlestocksearch={this.handlestocksearch.bind(this)} hidegraphs={this.hidegraphs.bind(this)}/>
              </div>
              <div style={styles.stockshiddencontainer}>
              {renderIf(this.state.showgraphs===true)(
                <div>
                  {renderIf(this.state.oneMinTableClose.length>0 && this.state.nottradingnow===false)(
                    <ChartContainer>
                      <VictoryChart width={600} height={470} scale={{x: "time"}}>
                          <svg width="100" height="100">
                            <rect x="0" y="7" width={`${700}`} height="40" fill="gray" opacity="0.3"/>
                          </svg>
                          <VictoryLabel
                            text={() => `${this.state.stocksearchsent}` }
                            x={60}
                            y={25}
                            style={{
                              fill: "black",
                              fontSize: 25
                            }}
                          />
                          <VictoryAxis
                           label="Date"
                           tickCount={10}
                           style={{
                           axisLabel: {fontSize: 20, padding: 30},
                           ticks: {stroke: "grey", size: 5},
                           grid: {stroke: "rgba(153, 161, 166, 0.3)"},
                           tickLabels: {fontSize: 8, padding: 2}
                          }}/>
                          <VictoryAxis dependentAxis
                            label="Price"
                            tickCount={10}
                            style={{
                              axisLabel: {fontSize: 20, padding: 30},
                              grid:  {stroke: "rgba(153, 161, 166, 0.3)"},
                              ticks: {stroke: "grey", size: 5},
                              tickLabels: {fontSize: 12, padding: 1}
                           }}
                          />
                          {timeFlags}
                      {renderIf(this.state.exchangestatus==="exchangeopen")(
                              <VictoryLabel
                                text={() => `$${this.state.currentprice}` }
                                x={140}
                                y={25}
                                style={{
                                  fill: "black",
                                  fontSize: 25
                                }}
                              />
                      )}

                      {renderIf(this.state.exchangestatus==="exchangeopen")(
                              <VictoryLabel
                                text={() => `${this.state.oneMinCloseDif}% now` }
                                x={240}
                                y={25}
                                style={{
                                  fill: Math.sign(this.state.oneMinCloseDif)===1 ? "green" : "red",
                                  fontSize: 25
                                }}
                              />
                      )}
                      {renderIf(this.state.exchangestatus==="exchangeopen" || (this.state.exchangestatus==="exchangeclosed" && this.state.weekdaystatus==="weekday"))(
                              <VictoryLabel
                                text={() => `${this.state.todayMinCloseDif}% since open` }
                                x={370}
                                y={25}
                                style={{
                                  fill: Math.sign(this.state.todayMinCloseDif)===1 ? "green" : "red",
                                  fontSize: 25
                                }}
                              />
                      )}
                      {renderIf(this.state.exchangestatus==="exchangeclosed" && this.state.weekdaystatus==="weekend")(
                              <VictoryLabel
                                text={() => `It's the weekend, no data` }
                                x={170}
                                y={25}
                                style={{
                                  fill: "black",
                                  fontSize: 25
                                }}
                              />
                      )}
                      <VictoryLine
                        style={{
                          data: {stroke: "tomato"}
                        }}
                        data={this.state.oneMinTableClose}
                        x="time"
                        y="uv"
                      />
                      </VictoryChart>
                    </ChartContainer>
                  )}
                </div>
              )}
              {renderIf(this.state.showgraphs===true)(
                <div>
                  {renderIf(this.state.oneMinTableClose.length>0 && this.state.nottradingnow===true)(
                    <ChartContainer>
                      <VictoryChart width={600} height={470}>
                          <svg width="100" height="100">
                            <g transform='translate(100,180)'>
                              <rect x="0" y="7" width={`450`} height="45" fill="black"/>
                              <VictoryLabel
                                text={() => `EXCHANGE CLOSED TODAY` }
                                x={0}
                                y={30}
                                style={{
                                  fill: "red",
                                  fontWeight: 'bolder',
                                  fontSize: 30
                                }}
                              />
                            </g>
                            <rect x="50" y="400" width={`550`} height="45" fill="rgba(0,0,0,1)"/>
                            <rect x="20" y="00" width={`45`} height="445" fill="rgba(0,0,0,1)"/>
                          </svg>
                      </VictoryChart>
                    </ChartContainer>
                  )}
                </div>
              )}
              <div style={styles.brgrey}/>
              {renderIf(this.state.showgraphs===true)(
                <div>
                  {renderIf(this.state.dailyTableClose.length>0)(
                    <ChartContainer>
                      <VictoryChart width={600} height={470} scale={{x: "time"}}>
                        <svg width="100" height="100">
                          <rect x="0" y="7" width={`${700}`} height="40" fill="gray" opacity="0.3"/>
                        </svg>
                        <VictoryLabel
                          text={() => `${this.state.stocknamesaved} - past 100 days` }
                          x={60}
                          y={25}
                          style={{
                            fill: "black",
                            fontSize: 25
                          }}
                        />
                        <VictoryAxis
                         label="Date"
                         tickCount={10}
                         style={{
                         axisLabel: {fontSize: 20, padding: 30},
                         ticks: {stroke: "grey", size: 5},
                         grid: {stroke: "rgba(153, 161, 166, 0.3)"},
                         tickLabels: {fontSize: 8, padding: 2}
                        }}/>
                        <VictoryAxis dependentAxis
                          label="Price"
                          tickCount={10}
                          style={{
                          axisLabel: {fontSize: 20, padding: 30},
                          grid: {stroke: "rgba(153, 161, 166, 0.3)"},
                          ticks: {stroke: "grey", size: 5},
                          tickLabels: {fontSize: 12, padding: 1}
                         }}
                        />
                        <VictoryLine
                          style={{
                            data: {stroke: "tomato"}
                          }}
                          data={this.state.dailyTableClose}
                          x="time"
                          y="uv"
                        />
                        {timeFlagsDay}
                      </VictoryChart>
                    </ChartContainer>
                  )}
                </div>
              )}
              <div style={styles.brgrey}/>
              {renderIf(this.state.showgraphs===true)(
                <div>
                  {renderIf(this.state.yearSectorTable.length>0 || this.state.monthSectorTable.length>0)(
                    <ChartContainer>
                        <VictoryChart width={600} height={470} domainPadding={{x: [50, 0]}}>
                          <svg width="100" height="100">
                            <rect x="0" y="7" width={`${700}`} height="40" fill="gray" opacity="0.3"/>
                          </svg>
                          <VictoryLabel
                            text={() => `Total Market By Sector` }
                            x={60}
                            y={25}
                            style={{
                              fill: "black",
                              fontSize: 25
                            }}
                          />
                          <VictoryGroup offset={20}
                            colorScale={["green", "red"]}
                            >
                            <VictoryBar
                              labelComponent={<VictoryTooltip/>}
                              categories={{
                                x: this.state.namearrayyear
                              }}
                              data={this.state.yearSectorTable}
                              style={{data: {width: 20},}}
                            />
                            <VictoryBar
                              labelComponent={<VictoryTooltip/>}
                              categories={{
                                x: this.state.namearraymonth
                              }}
                              data={this.state.monthSectorTable}
                              style={{data: {width: 20},}}
                            />
                          </VictoryGroup>

                          <g transform="translate(250,100) rotate(0)">
                            <rect x="-10" y="-10" width='330' height="80" fill="gray"/>
                            <VictoryLegend
                              data={[
                                {name: '1 Year Past Performance', symbol: { type: 'square'}},
                                {name: '1 Month Past Performance', symbol: { type: 'square'}},
                              ]}
                              style={{
                                labels: { fontSize: 25 },
                                parent: { border: "1px solid #ccc" }
                              }}
                              colorScale={['green', 'red']}
                            />
                          </g>

                          <VictoryAxis dependentAxis
                            label="% Change"
                            tickCount={10}
                            style={{
                              axisLabel: {fontSize: 20, padding: 30},
                              ticks: {stroke: "grey", size: 5},
                              tickLabels: {fontSize: 12, padding: 1}
                           }}
                          />
                          <VictoryAxis
                            label="Sector"
                            tickValues={[]}
                          />
                        </VictoryChart>
                    </ChartContainer>
                  )}
                </div>
              )}
              </div>
            </div>
            {renderIf(this.state.showgraphs===false)(
                <div style={styles.stocksinstructions}>
                  <p>
                    Click on box to search for stocks items. I have to call a remote server,
                    so please be a little patient!
                  </p>
                </div>
            )}
            {renderIf(this.state.showgraphs===true)(
              <AlignContainer>
                <div style={styles.stocksinstructions2}>
                  <p>
                    Loading!
                  </p>
                </div>
              </AlignContainer>
            )}
          </Flex3>
          <Flex3 style={styles.newscontainer}>
            <FlexColumn style={styles.newsflexcolumn}>
              <Flex1>
                <Searchnews newsresults={this.newsresults.bind(this)}
                  xholderarticlevisible={this.state.xholderarticlevisible}
                  articleurl={this.state.articleurl}
                  changenewssource={this.changenewssource.bind(this)}/>
              </Flex1>
              <Flex1 style={styles.newsflexrow}>
                {renderIf(this.state.articleurl!="")(
                  <div>
                    <HalfHolder1>
                      <Articleframe articleurl={this.state.articleurl}
                      articlexclicked={this.articlexclicked.bind(this)}/>
                    </HalfHolder1>
                    <HalfHolder2>
                      <Articlebox newsarticlepics={this.state.newsarticlepics}
                      resetsvgflag={this.resetsvgflag.bind(this)}
                      flagkeyclicked={this.state.flagkeyclicked}
                      newspublishedat={this.state.newspublishedat}
                      xholdervisiblearticles={this.xholdervisiblearticles.bind(this)}
                      newsarticlearray={this.state.newsarticlearray}
                      articleurlassign={this.articleurlassign.bind(this)}
                      newssource={this.state.newssource}/>
                    </HalfHolder2>
                  </div>
                )}
                {renderIf(this.state.articleurl==="")(
                  <HalfHolder3>
                    <Articlebox newsarticlepics={this.state.newsarticlepics}
                    resetsvgflag={this.resetsvgflag.bind(this)}
                    newspublishedat={this.state.newspublishedat}
                    flagkeyclicked={this.state.flagkeyclicked}
                    xholdervisiblearticles={this.xholdervisiblearticles.bind(this)}
                    newsarticlearray={this.state.newsarticlearray}
                    articleurlassign={this.articleurlassign.bind(this)}
                    newssource={this.state.newssource}/>
                  </HalfHolder3>
                )}
              </Flex1>
            </FlexColumn>
            {renderIf(this.state.newssource==="Click to Search News"&&this.state.articleurl==="")(
              <AlignContainer>
                <div style={styles.newsinstructions}>
                  <p>
                    Click on box to search for news items. Items are the top hits on their
                    respective news sites.
                  </p>
                </div>
              </AlignContainer>
            )}
            {renderIf(this.state.newssource!="Click to Search News"||this.state.articleurl!="")(
              <AlignContainer>
                <div style={styles.newsinstructions}>
                  <p>
                    Loading!
                  </p>
                </div>
              </AlignContainer>
            )}
          </Flex3>
          <Flex1/>
        </FlexRow>
        <br/>
        <FlexColumn>
          <Flex1>
            <AlignContainer>
              <TalkyBox size={`${50}px`} className="TalkyBox">
                <p>
                  Project Motivation
                </p>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <TalkyBox size={`${50}px`} backgroundColor={`transparent`} className="TalkyBox">
                <img style={styles.image} src={require('../../../../../public/googlefinancescreenshot.png')}/>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <TalkyBox size={`${25}px`} className="TalkyBox">
                <p>
                  &#8195;Here&#39;s a picture of one of my all time favorite APIs that I think is often overlooked - the google finance API. It is feature rich, including a voronoi bubble for the stock price, lots of data, and the ability to use the google search engine to search for news relevant to the stock.
                </p>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <TalkyBox size={`${25}px`} className="TalkyBox">
                <p>
                  &#8195;Clearly there&#39;s a lot here that is beyond the scope of what I can do. I&#39;m sure Google&#39;s AI is better than my own! However the large amounts of statistics make the page layout hard to read (what if I only care about the most important numbers?) and I find it a bit irritating that I can&#39;t read news and watch my stocks in real time. Also, and this may be my own personal design preference, I&#39;m not a huge fan of the huge amount of white space. While it does follow the classic Google design schema it makes all of those statistics seem like they&#39;re swimming around in space. One particular pain point is that the financial indicators along the top of the chart are all very small and smooshed to the left, but the entire right is one big open area!
                </p>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <TalkyBox size={`${25}px`} className="TalkyBox">
                <p>
                  &#8195;So I tried to take what I love, the clean lines and the news integration, and fit it into a nicer format that&#39;s easier on the eyes and lets me read the news.
                </p>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <TalkyBox size={`${50}px`} className="TalkyBox">
                <p>
                  Project in a Nutshell
                </p>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <TalkyBox size={`${25}px`} className="TalkyBox">
                <p>
                  &#8195;As you can see the project is broken down into a left and right side corresponding to stocks and news respectively.
                </p>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <TalkyBox size={`${25}px`} className="TalkyBox">
                <p>
                  &#8195;For the stocks I first made a bespoke drop down box that calls yahoo to pull a list of stocks while you type (remembering stock names and symbols can be a hassle). When you click an item or hit search I then call the alphavantage API (you can check it out <SpanLink onClick={()=>{this.sendlocation('http://www.alphavantage.co')}}>here</SpanLink>) to load three charts. The first chart calls alphavantage every minute to get the newest stockprice and displays the stock title as well as percent changes (all in real time!). The second chart displays the last 100 days change of the stock price, while the third chart displays overall performance of the market by sector. The floating icons in the first and second chart, which pop up when both the stock prices and articles are activated, link to the articles section. They display at what time the article was published and when you click on them it will scroll to the article, just like Google Finance does!
                </p>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <TalkyBox size={`${25}px`} className="TalkyBox">
                <p>
                  &#8195;The right hand side is where I display the articles. The API I use is just called newsapi (it was the first hit on Google and satisfied my needs quite nicely - check it out <SpanLink onClick={()=>{this.sendlocation('http://www.newsapi.org')}}>here</SpanLink>). When you click the search box you can choose between several news providers. Once selected the latest 10 articles will be displayed with pictures and headlines in a nice scrollable container. Clicking on any news article will open an iframe on the left and shrink the news item container. The search box drop down is the shrunk here as well. Much of the work that went into this side was the formatting in flexbox and getting all the animations such that it was both responsive (for most standard size computers - sorry no phones!), as well as nothing overlapped poorly (ie the searchbox overlaps the articles when needed and vice versa). Of course as previously mentioned the news articles are linked by the time of publication to the stock market charts.
                </p>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <TalkyBox size={`${50}px`} className="TalkyBox">
                <p>
                  Let&#39;s See Some Code
                </p>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <TalkyBox size={`${25}px`} className="TalkyBox">
                <p>
                  &#8195;This first code snippet is from my first chart that loads real time stock market data. After experimenting with Vega and D3 I found that I wanted a lighter weight code library that would work out of the box and did not take too much deep dive learning (I wanted to get started quickly). Formidable Labs has a couple cool projects and one of them is <SpanLink onClick={()=>{this.sendlocation('https://formidable.com/open-source/victory/')}}>Victory</SpanLink>, which is a wrapper around D3 that provides charts with some nice animations and is pre-configured to work as React components. This is super important as you don&#39;t have to worry about D3&#39;s DOM manipulation affecting React and vice versa (there are many articles that talk about this problem in more detail - <SpanLink onClick={()=>{this.sendlocation('http://eng.wealthfront.com/2017/02/14/integrating-d3-into-react/')}}>see here</SpanLink>). Vega configures a large JSON object to configure each of its graphics, which could be useful for larger projects, but seemed overkill (and a bit daunting) to make simpler, appealing charts.  I found that those two problems tended to be deal breakers when it came to getting an app quickly off the ground.
                </p>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <FirstGraph/>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <TalkyBox size={`${25}px`} className="TalkyBox">
                <p>
                  &#8195;As you can see the syntax is pretty intuitive. To make a chart you call a master component called VictoryChart. Inside you can define VictoryLine to make a line, VictoryAxis for an axis and so forth. The components can accept, as they live in the render function, changes to state - so configuring them to be dynamic is a snap. Also, since Victory uses D3 as a base and D3 itself, I believe, can accept SVG objects, this means pushing SVG into any VictoryChart will render them correctly. This is huge and allows you to do all sorts of cool customization. In the above I make a grey rectangular box for the title, for example. You might notice that I import "timeFlags". This was my mapped list of SVG objects that link to each of my news articles. Let&#39;s take a look at that.
                </p>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <SecondGraph/>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <TalkyBox size={`${25}px`} className="TalkyBox">
                <p>
                  &#8195;As you can see the core of this is a simple mapping of times to the x-axis. But I use the very popular react-motion library as a wrapper around customized svg polygons that change their position and size according to the spring value. So the nesting that can be used with a victorychart is (from outer to inner): VictoryChart->some mapped list->some animation library (you can use velocity.js here as well)->SVG object. While VictoryCharts gives you some default animations out of the box it&#39;s nice to know you can push your own customized ones as well. (btw if you&#39;ve never seen react-motion you should definitely <SpanLink onClick={()=>{this.sendlocation('https://github.com/chenglou/react-motion')}}>check it out</SpanLink>, it&#39;s pretty mind blowing).
                </p>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <TalkyBox size={`${50}px`} className="TalkyBox">
                <p>
                  Github
                </p>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
          <Flex1>
            <AlignContainer>
              <TalkyBox size={`${25}px`} className="TalkyBox">
                <p>
                  &#8195;You can see the source code for this project on Github  <SpanLink onClick={()=>{this.sendlocation('https://github.com/patientplatypus/professional_portfolio/tree/master/src/components/pages/blogs/blogone')}}>here</SpanLink> or you can see the source code for this entire site <SpanLink onClick={()=>{this.sendlocation('https://github.com/patientplatypus/professional_portfolio')}}>here</SpanLink>.
                </p>
              </TalkyBox>
            </AlignContainer>
          </Flex1>
          <br/>
        </FlexColumn>
        <br/><br/><br/><br/><br/><br/>
        </OverlapContainer>
      </OutermostDiv>
    )
  }
}

export default withRouter(BlogOne)
