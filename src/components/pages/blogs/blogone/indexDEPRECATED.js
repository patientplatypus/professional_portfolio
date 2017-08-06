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
// import {createClassFromSpec} from 'react-vega';
import VegaLite, {createClassFromLiteSpec} from 'react-vega-lite';
import BarChartLite from "./BarChartLite";
import LineChartLite from './LineChartLite';
// import Vega from 'react-vega';
// import vegaLite from 'vega-lite';
import renderIf from 'render-if';
import LineChart from './LineChart';

// import BarChart from './BarChart';

const LineSpec = {
  "width": 600,
  "height": 300,
  "layer": [
    {
      "selection": {
        "index": {
          "type": "single", "on": "mousemove",
          "encodings": ["x"],
          "nearest": true
        }
      },
      "mark": "line",
      "encoding": {
        "x": {"field": "date", "type": "temporal", "axis": null},
        "y": {"field": "closing price", "type": "quantitative"},
      }
    },
    {
      "transform": [
        {"filter": {
          "and": ["index.date", {"selection": "index"}]
        }}
      ],
      "mark": "rule",
      "encoding": {
        "x": {"field": "date", "type": "temporal", "axis": null}
      }
    }
  ]
};


const LineSpecData = []




const ChartContainer = glamorous.div(
  {
    backgroundColor: 'white',
    padding: '5px',
  }
)

const testData = {
  "table": [
    {"category": "A", "amount": 28},
    {"category": "B", "amount": 55},
    {"category": "C", "amount": 43},
    {"category": "D", "amount": 91},
    {"category": "E", "amount": 81},
    {"category": "F", "amount": 53},
    {"category": "G", "amount": 19},
    {"category": "H", "amount": 87}
  ]
};

const testData2 = {
  "table": [
    {"x": 1,  "y": 28}, {"x": 2,  "y": 55},
    {"x": 3,  "y": 43}, {"x": 4,  "y": 91},
    {"x": 5,  "y": 81}, {"x": 6,  "y": 53},
    {"x": 7,  "y": 19}, {"x": 8,  "y": 87},
    {"x": 9,  "y": 52}, {"x": 10, "y": 48},
    {"x": 11, "y": 24}, {"x": 12, "y": 49},
    {"x": 13, "y": 87}, {"x": 14, "y": 66},
    {"x": 15, "y": 17}, {"x": 16, "y": 27},
    {"x": 17, "y": 68}, {"x": 18, "y": 16},
    {"x": 19, "y": 49}, {"x": 20, "y": 10}
  ]
};


const barDataLite = {
  "values": [
    {"a": "A","b": 20}, {"a": "B","b": 34}, {"a": "C","b": 55},
    {"a": "D","b": 19}, {"a": "E","b": 40}, {"a": "F","b": 34},
    {"a": "G","b": 91}, {"a": "H","b": 78}, {"a": "I","b": 25}
  ]
};

function handleHover(...args){
  console.log(args);
}




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
  floatleft: {
    display: 'inline-block',
    float: 'left'
  }
}

const Constructionsign = glamorous.div(
  {
    fontSize: '25px'
  }
)

const UnderConstruction = glamorous.div(
  {
    textAlign: 'center',
    margin: '0 auto',
    fontSize: '50px',
    color: 'tomato',
    padding: '30px',
    backgroundColor: '#393E41',
    borderRadius: '20px',
    borderColor: '#393E41',
    borderStyle: 'solid'
  }
)


const UnderConstructionSub = glamorous.div(
  {
    textAlign: 'center',
    margin: '0 auto',
    fontSize: '20px',
    color: 'tomato',
    padding: '20px',
    backgroundColor: '#393E41',
    borderRadius: '20px',
    borderColor: '#393E41',
    borderStyle: 'solid'
  }
)

const BackButton = glamorous.div(
  {
    padding: '5px',
    color: 'black',
    backgroundColor: 'white'
  }
)
// self.props.history.push({
//         pathname: '/picturemain',
//         state: {
//           name: this.state.name
//         }
//       })


class BlogOne extends Component{
  static propTypes = {
    history: PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
    this.state={
      dailyDates: [],
      dailyOpen: [],
      dailyHigh: [],
      dailyLow: [],
      dailyClose: [],
      dailyVol: [],
      dailyTableClose: {"values":[]}
    }
  }

  backfunc(){
    this.props.history.push({
            pathname: '/blog',
            state: {

            }
          })
  }




  componentDidMount(){
    axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=OAO5GXY4IMRLFLII')
    .then(response=>{
      console.log('return from alphavantage api is ', response);
      // .data["Time Series (Daily)"]["2017-03-29"]
      console.log('response.data["Time Series (Daily)"] ', response.data["Time Series (Daily)"]);
      console.log('response.data["Time Series (Daily)"] ', response.data["Time Series (Daily)"][0]);

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
          console.log(dailyData[dailyDates[x]]);
          console.log(dailyData[dailyDates[x]]['1. open']);
          dailyOpen.push(dailyData[dailyDates[x]]['1. open']);
          dailyHigh.push(dailyData[dailyDates[x]]['2. high']);
          dailyLow.push(dailyData[dailyDates[x]]['3. low']);
          dailyClose.push(dailyData[dailyDates[x]]['4. close']);
          dailyVol.push(dailyData[dailyDates[x]]['5. volume']);
          dailyTableClose.push({"date": dailyDates[x], "closing price": dailyData[dailyDates[x]]['4. close']})
          // dailyTableClose.push({"x": x, "y": dailyData[dailyDates[x]]['4. close']})
          // dailyTableClose.push({"x": x, "y": dailyData[dailyDates[x]]['4. close'], "d": dailyDates[x]})
          if (x === dailyDates.length-1){
            resolve(true)
          }
        }
      });

      promise.then(resolved=>{
        if (resolved){
          this.setState({
            dailyDates: dailyDates,
            dailyOpen: dailyOpen,
            dailyHigh: dailyHigh,
            dailyLow: dailyLow,
            dailyClose: dailyClose,
            dailyVol: dailyVol,
            dailyTableClose: {"values": dailyTableClose}
          }, ()=>{
            console.log('after setState and the value of dailyTableClose is, ', this.state.dailyTableClose);
            LineSpecData.push(this.state.dailyTableClose);
          })
        }
      });

    })
    .catch(err=>{
      console.log('catch from alphavantage is ', err);
    })
  }

  render(){
    return (
      <div>
        <PrimaryNavigationGlam className="navbarfixed"/>
        <br/><br/><br/><br/>
          <AlignContainer>
          <div>
            <p>
              blogone
            </p>
          </div>
          <br/>
          <BackButton onClick={()=>{this.backfunc()}}>
            <p>
              Back to Archive
            </p>
          </BackButton>
          </AlignContainer>
        <br/>
        <AlignContainer>
          <ChartContainer>
            <BarChartLite data={barDataLite} />
          </ChartContainer>
        </AlignContainer>
        <br/>
        <AlignContainer>
          {renderIf(this.state.dailyTableClose.values.length>0)(
            <ChartContainer>
              <div id='linecontainer'/>
            </ChartContainer>
          )}
        </AlignContainer>
        <br/>
      </div>
    )
  }
}

ReactDOM.render(
  <VegaLite spec={LineSpec} data={LineSpecData} />,
  document.getElementById('linecontainer')
);

// {renderIf(this.state.dailyTableClose.table.length>0)(
//   <ChartContainer>
//     <LineChart data={this.state.dailyTableClose} />
//   </ChartContainer>
// )}

// const testData2 = {
//   "table": [
//     {"x": 1,  "y": 28}, {"x": 2,  "y": 55},
//     {"x": 3,  "y": 43}, {"x": 4,  "y": 91},
//     {"x": 5,  "y": 81}, {"x": 6,  "y": 53},
//     {"x": 7,  "y": 19}, {"x": 8,  "y": 87},
//     {"x": 9,  "y": 52}, {"x": 10, "y": 48},
//     {"x": 11, "y": 24}, {"x": 12, "y": 49},
//     {"x": 13, "y": 87}, {"x": 14, "y": 66},
//     {"x": 15, "y": 17}, {"x": 16, "y": 27},
//     {"x": 17, "y": 68}, {"x": 18, "y": 16},
//     {"x": 19, "y": 49}, {"x": 20, "y": 10}
//   ]
// };

// ReactDOM.render(
//   <BarChart data={barData} onSignalHover={handleHover}/>,
//   document.getElementById('bar-container')
// );

export default withRouter(BlogOne)
