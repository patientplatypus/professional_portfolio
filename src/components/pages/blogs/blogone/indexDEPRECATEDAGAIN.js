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
import { LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
// import d3_scale from 'd3';
import { scaleTime } from 'd3-scale';
import {timeDay } from 'd3-time';

const data = [
  {uv: 0.4, y: 2.5},
  {uv: 3, y: 2.2},
  {uv: 2, y: 2.4},
  {uv: 2.8, y: 2.0},
  {uv: 1.1, y: 1.8},
  {uv: 2.39, y: 0.5},
  {uv: 3.49, y: 0.2},
];

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

const getTicks = (data) => {
  console.log('inside getTicks and data is ', data);
	if (!data || !data.length ) {return [];}

  const domain = [new Date(data[0].time), new Date(data[data.length - 1].time)];
	const scale = scaleTime().domain(domain).range([0, 1]);
  const ticks = scale.ticks(timeDay, 1);

  return ticks.map(entry => +entry);
};

const getTicksData = (data, ticks) => {
	if (!data || !data.length ) {return [];}
  const dataMap = new Map(data.map((i) => [i.time, i]));
  ticks.forEach(function (item, index, array) {
  	if(!dataMap.has(item)) {
    	data.push({time: item});
    }
	});
  return data;
}


const dateFormat = (time) => {
	return moment(time).format('DD/MM/YY');
};

const ChartContainer = glamorous.div(
  {
    backgroundColor: 'white',
    padding: '5px',
  }
)

const BackButton = glamorous.div(
  {
    padding: '5px',
    color: 'black',
    backgroundColor: 'white'
  }
)

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
      dailyTableClose: []
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
            console.log('for comparison here is the data constant ', data);
          })
        }
      });

    })
    .catch(err=>{
      console.log('catch from alphavantage is ', err);
    })
  }

  render(){
    // const data = {this.state.dailyTableClose}
    // const sortedData = this.state.dailyTableClose.sort(function(a, b) {
  	// 	return a.time - b.time;
		// });
    // const ticksArr = getTicks(sortedData);
    // const completeData = getTicksData(sortedData, ticksArr);
    // const completeSortedData = completeData.sort(function(a, b) {
    //   return a.time - b.time;
    // });
    //
    // const formattedTicks = ticksArr.map(dateFormat);
    //
    // console.log('these are the latest versions of the formattedTicks here: ', formattedTicks);
    // console.log('these are the latest versions of the ticksArr here: ', ticksArr);


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
          {renderIf(this.state.dailyTableClose.length>0)(
            <ChartContainer>
              <LineChart
                width={1000}
                height={400}
                margin={{ top: 5, right: 0, bottom: 0, left: 0 }}
                data={this.state.dailyTableClose}>
                  <Line type="linear" dataKey="uv" stroke="#82ca9d" />
                  <XAxis dataKey="time" padding={{ left: 20, right: 20 }} ticks={getTicks(this.state.dailyTableClose)} tickFormatter={dateFormat}/>
                  <YAxis dataKey="uv"  domain={['dataMin * 0.95', 'dataMax * 1.05']}/>
                  <Tooltip/>
              </LineChart>
            </ChartContainer>
          )}
        </AlignContainer>
        <br/>
      </div>
    )
  }
}

export default withRouter(BlogOne)


// dailyDates: dailyDates,
// dailyOpen: dailyOpen,
// dailyHigh: dailyHigh,
// dailyLow: dailyLow,
// dailyClose: dailyClose,
// dailyVol: dailyVol,


          // var dailyDatesTemp = dailyDates[x];
          // var dailyDatesClean = dailyDatesTemp.replace(/['"]+/g, '');

          // var dailyOpenTemp = dailyData[dailyDates[x]]['1. open'];
          // var dailyHighTemp = dailyData[dailyDates[x]]['2. high'];
          // var dailyLowTemp = dailyData[dailyDates[x]]['3. low'];
          // var dailyCloseTemp = dailyData[dailyDates[x]]['4. close'];
          // var dailyVolTemp = dailyData[dailyDates[x]]['5. volume'];

          // var dailyOpenClean = dailyOpenTemp.replace(/['"]+/g, '');
          // var dailyHighClean = dailyHighTemp.replace(/['"]+/g, '');
          // var dailyLowClean = dailyLowTemp.replace(/['"]+/g, '');
          // var dailyCloseClean  = dailyCloseTemp.replace(/['"]+/g, '');
          // var dailyVolClean = dailyVolTemp.replace(/['"]+/g, '');

          // dailyOpen.push(dailyOpenTemp);
          // dailyHigh.push(dailyHighTemp);
          // dailyLow.push(dailyLowTemp);
          // dailyClose.push(dailyCloseTemp);
          // dailyVol.push(dailyVolTemp);

          // dailyTableClose.push({"date": dailyDates[x], "closing price": dailyData[dailyDates[x]]['4. close']})
          // date: new Date(dailyDates[x]).getTime()
