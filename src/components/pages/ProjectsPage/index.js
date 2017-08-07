// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React, { Component } from 'react'
import { PrimaryNavigationGlam, AlignContainer } from 'components'
import styled from 'styled-components';
import glamorous from 'glamorous';
import {Motion, spring} from 'react-motion';
import renderIf from 'render-if';
import {VelocityComponent, VelocityTransitionGroup} from 'velocity-react';
import './main.css';

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
`

const Flex1 = styled.div`
  flex: 1;
`
const Flex2 = styled.div`
  flex: 2;
`
const Flex10 = styled.div`
  flex: 10;
`

const Flex9 = styled.div`
  flex: 9;
`
//dark gray #393E41
//light gray #D3D0CB
//off white #E7E5DF

const styles = {
  projectrow: {
    width: '80%',
    position: 'relative',
    overflow: 'scroll'
  },
  imgscale: {
    maxWidth: '100%',
    maxHeight: '100%',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  contentcontainer: {
    position: 'absolute',
    zIndex: "-1",
    background: "#232526",  /* fallback for old browsers */
    background: "-webkit-linear-gradient(to left, rgb(52, 57, 60), #232526)", /* Chrome 10-25, Safari 5.1-6 */
    background: "linear-gradient(to left, rgb(52, 57, 60), #232526)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  },
  ulstyle: {
    listStyle: 'none',
    textAlign: 'left',
    margin:'0px'
  }
}

const ExplanationSubHeader = glamorous.div(
  {
    fontSize: '25px',
    textDecoration: 'underline',
    fontWeight: 'bold',
    fontColor: 'black',
    textAlign: 'left',
    lineHeight: '10px',
    marginBottom: '0px',
    marginLeft: '10px',
    '& > p':{
      margin: '15px'
    }
  }
)

const ExplanationBox = glamorous.div(
  {
    height: '300px',
    backgroundColor: '#232526',
    // position: 'absolute',
    zIndex: '500',
    display: 'inline-block',
    float: 'left',
    opacity: '1',
    color: 'white',
    fontSize: '25px',
    textAlign: 'center',
    verticalAlign: 'center',
    overflow: 'scroll',
  },
  ({width})=>({
    width: width
  }),
  ({opacity})=>({
    opacity: opacity
  })
)

const ProjectHeader = glamorous.div(
  {
    width: '90%',
    backgroundColor: '#393E41',
    position:'absolute',
    pointerEvents: 'none',
    textAlign: "center",
    top: '5%',
    padding: '5px',
    zIndex: '700',
    textAlign: "center",
    opacity: '1',
    borderRadius: '10px',
    color: '#D3D0CB'
  },
  ({font})=>({
    fontSize: font
  })
)

const TitleBox = glamorous.div(
  {
    height: '300px',
    backgroundColor: '#393E41',
    // position: 'absolute',
    zIndex: '500',
    display: 'inline-block',
    float: 'left',
    opacity: '1',
    color: '#D3D0CB',
    fontSize: '25px',
    textAlign: 'center',
    verticalAlign: 'center',
    overflow: 'scroll',
  },
  ({width})=>({
    width: width
  }),
  ({opacity})=>({
    opacity: opacity
  })
)

const ExplanationPadding = glamorous.div(
  {
    color: 'white',
    // position: 'absolute',
    // zIndex: '1',
    paddingRight: '10px',
    opacity: '0',
    overflowY: 'scroll'
  },
  ({opacity})=>({
    opacity: opacity
  })
)

const LinkButton = glamorous.div(
  {
    padding: '10px',
    backgroundColor: 'rgb(54, 60, 63)',
    borderRadius: '10px',
    width: '200px',
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: "5px",
    borderColor: "#393E41",
    color: '#E7E5DF',
    ":hover": {
      backgroundColor: 'tomato',
      color: 'white',
      cursor: 'pointer'
    }
  }
)

const TitlePadding = glamorous.div(
  {
    color: 'white',
    // position: 'absolute',
    padding: '20px',
    // zIndex: '1',
    opacity: '0'
  },
  ({opacity})=>({
    opacity: opacity
  })
)

const ChipBox = glamorous.div(
  {
    maxHeight: '45%',
    maxWidth: '45%',
    margin: '60px auto',
    pointerEvents: 'none'
  }
)

const PictureBox = glamorous.div(
  {
    height: '280px',
    width: '280px',
    position:'relative',
    textAlign: 'center',
    verticalAlign: 'center',
    padding: '10px',
    minWidth: '300px',
    // position: 'absolute',
    zIndex: '500',
    backgroundColor: 'tomato',
    ":hover":{
      cursor: 'pointer'
    }
  }
)

const LearnMore = glamorous.div(
  {
    width: '100%',
    fontSize: '30px',
    backgroundColor: '#D3D0CB',
    position:'absolute',
    top: '80%',
    left: '0',
    zIndex: '700',
    textAlign: "center",
    opacity: '.7',
    color: 'tomato'
  }
)

class ProjectsPage extends Component{
  constructor(props){
    super(props);
    this.state={
      springarray: [0,0,0,0,0,0,0],
      arrayshow: [null, null, null, null, null, null],
      pictureclickarray: [0, 0, 0, 0, 0, 0,0],
      slideboxarray: [null, null, null, null, null, null, null],
      FadeInprevious: [false, false, false, false, false, false, false],
      timescalled: [0,0,0,0,0,0,0],
      timescalledcounter: [0,0,0,0,0,0,0],
      sliderdelay: [0,0,0,0,0,0,0],
      faderdelay: [0,0,0,0,0,0,0],
      titledelay: [0,0,0,0,0,0,0]
    }
  }

  windowopener(url){
    window.open(url);
  }

  pictureboxclicked(springindex){
    console.log('clicked the PictureBox');
    var pictureclickarray = this.state.pictureclickarray;
    var arrayshow = this.state.arrayshow;
    var slideboxarray = this.state.slideboxarray;
    var sliderdelay = this.state.sliderdelay;
    var faderdelay = this.state.faderdelay;
    var titledelay = this.state.titledelay;
    if (this.state.pictureclickarray[springindex] % 2 === 0){
      console.log('inside pictureclickarray % 2 === 0')
      arrayshow[springindex] = true;
      slideboxarray[springindex] = true;
      pictureclickarray[springindex] = 1;
      sliderdelay[springindex] = 1000;
      faderdelay[springindex] = 5500;
      titledelay[springindex] = 0;
      this.setState({pictureclickarray:pictureclickarray, arrayshow:arrayshow, slideboxarray:slideboxarray, sliderdelay:sliderdelay, faderdelay:faderdelay, titledelay:titledelay}, ()=>{
        console.log('after setstate on pictureclickarray %2===0 and arrayshow is ', this.state.arrayshow[springindex], ' slideboxarray is ', this.state.slideboxarray[springindex], ' sliderdelay ', this.state.sliderdelay[springindex], ' titledelay ', this.state.titledelay[springindex]);
      });
    }else{
      console.log('inside pictureclickarray % 2 === 1');
      arrayshow[springindex] = false;
      slideboxarray[springindex] = false;
      pictureclickarray[springindex] = 0;
      sliderdelay[springindex] = 1000;
      faderdelay[springindex] = 0;
      titledelay[springindex] = 5500;
      this.setState({pictureclickarray: pictureclickarray, arrayshow: arrayshow, slideboxarray: slideboxarray, sliderdelay: sliderdelay, faderdelay: faderdelay, titledelay: titledelay}, ()=>{
        console.log('after setstate on pictureclickarray %2===1 and arrayshow is ', this.state.arrayshow[springindex], ' slideboxarray is ', this.state.slideboxarray[springindex], ' titledelay ', this.state.titledelay[springindex]);
      })
    }
  }



  render(){



    return (
      <div>
        <PrimaryNavigationGlam className="navbarfixed"/>
        <br/><br/>
        <AlignContainer style={styles.contentcontainer}>
          <FlexColumn>
            <Flex1/>
            <br/>
            <Flex1>
              <AlignContainer>
                <FlexRow style={styles.projectrow}>
                  <VelocityComponent animation={{width: this.state.slideboxarray[0]===true?'100%':'0%' }} delay={this.state.sliderdelay[0]} duration={5000}>
                      <ExplanationBox>
                        <VelocityComponent animation={{opacity: this.state.arrayshow[0]===true?'1':'0'}} delay={this.state.faderdelay[0]} duration={1000}>
                          <ExplanationPadding>
                            <br/>
                            <ExplanationSubHeader>
                              <p>
                                Motivation:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                I had had difficulties using sockets before in a previous project so I wanted a cool project involving the use of fast socket streaming. An art project sounded fun.
                              </li>
                            </ul>
                            <ExplanationSubHeader>
                              <p>
                                Technologies Used:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                The primary technologies that I used were Phoenix, which is a back end framework built on top of Elixir and Erlang, and Vue.js a javascript front end. I decided to use these technologies because Phoenix has wonderful socket support and it&#39;s functional architecture is very fast, while Vue.js is a light weight framework allowing quick development. For deployment I used an application called nanobox which is a 'docker lite' clone that posts and packages to AWS. It was incredibly useful as it had good feature support for Phoenix. I also spent a lot of time on learning html5 canvas.
                              </li>
                            </ul>
                            <ExplanationSubHeader>
                              <p>
                                Features:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                Live drawing on streamed sockets
                              </li>
                              <li>
                                Shared timer
                              </li>
                              <li>
                                Color and width picker for brush strokes
                              </li>
                              <li>
                                Emit stickers to canvas
                              </li>
                              <li>
                                Socket voting on final picture
                              </li>
                              <li>
                                Final picture shown to all users
                              </li>
                            </ul>
                            <br/>
                            <AlignContainer>
                              <LinkButton onClick={()=>{this.windowopener('http://pennydrop.nanoapp.io')}}>
                                See Live Project!
                              </LinkButton>
                            </AlignContainer>
                            <br/>
                          </ExplanationPadding>
                        </VelocityComponent>
                      </ExplanationBox>
                  </VelocityComponent>
                    <PictureBox onClick={()=>{this.pictureboxclicked(0)}}>
                      <img style={styles.imgscale} src={require('../../../../public/LiveDrawingGame.png')} />
                      <VelocityComponent animation={{opacity: this.state.arrayshow[0]===true?'0':'0.7'}} delay={this.state.titledelay[0]} duration={1000}>
                        <LearnMore>click to learn more</LearnMore>
                      </VelocityComponent>
                      <ProjectHeader font={`30px`}>Phoenix/Vue.js Live Drawing Demo</ProjectHeader>
                    </PictureBox>
                  <VelocityComponent animation={{width: this.state.slideboxarray[0]===true?'0%':'100%' }} delay={this.state.sliderdelay[0]} duration={5000}>
                      <TitleBox>
                        <VelocityComponent animation={{opacity: this.state.arrayshow[0]===true?'0':'1'}} delay={this.state.titledelay[0]} duration={1000}>
                          <TitlePadding>
                            <div className="projectheader">
                              <p>Live Drawing Application</p>
                            </div>
                            <div className="projectsubheader">
                              <p>This is a live drawing application that I made. It allows different users to log in to the website at once and draw together at the same time. The canvas is shared by each browser client and images and brush strokes are transmitted in real time. </p>
                            </div>
                          </TitlePadding>
                        </VelocityComponent>
                      </TitleBox>
                  </VelocityComponent>
                </FlexRow>
              </AlignContainer>
            </Flex1>
            <br/>
            <Flex1>
              <AlignContainer>
                <FlexRow style={styles.projectrow}>
                  <VelocityComponent animation={{width: this.state.slideboxarray[1]===true?'100%':'0%' }} delay={this.state.sliderdelay[1]} duration={5000}>
                      <ExplanationBox>
                        <VelocityComponent animation={{opacity: this.state.arrayshow[1]===true?'1':'0'}} delay={this.state.faderdelay[1]} duration={1000}>
                          <ExplanationPadding>
                            <br/>
                            <ExplanationSubHeader>
                              <p>
                                Motivation:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                I really enjoy going to hackathons to work on cool projects and meet other developers. I chose kiwi compute not based on the idea, but I learned it was an awesome idea, but because I talked with the people on the team and thought they were nice. The project itself is an IDE that allows kids to learn Python in the browser. What makes it different from other Python IDEs is that it is very intuitive to use even for middle schoolers because it has a very nice UI and good explanations.
                              </li>
                            </ul>
                            <ExplanationSubHeader>
                              <p>
                                Technologies Used:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                The primary technologies that were used in the project were material-ui design for react as well as an IDE that the project champions had come with. However, my primary contribution was to create the backend in node.js. The features section will list my add-ons.
                              </li>
                            </ul>
                            <ExplanationSubHeader>
                              <p>
                                Backend Features:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                Written in Node.js
                              </li>
                              <li>
                                Uses bcrypt to hash passwords for extra security
                              </li>
                              <li>
                                User account creation and log in
                              </li>
                              <li>
                                Users can save and retrieve code
                              </li>
                              <li>
                                User can pick from drop down of past saved projects
                              </li>
                              <li>
                                Users can name projects when they save
                              </li>
                            </ul>
                            <br/>
                            <AlignContainer>
                              <LinkButton onClick={()=>{this.windowopener('https://github.com/patientplatypus/kiwi_compute')}}>
                                Go to Github!
                              </LinkButton>
                            </AlignContainer>
                            <br/>
                          </ExplanationPadding>
                        </VelocityComponent>
                      </ExplanationBox>
                  </VelocityComponent>
                    <PictureBox onClick={()=>{this.pictureboxclicked(1)}}>
                      <br/><br/><br/><br/><br/>
                      <img style={styles.imgscale} src={require('../../../../public/kiwicompute.png')} />
                      <VelocityComponent animation={{opacity: this.state.arrayshow[1]===true?'0':'0.7'}} delay={this.state.titledelay[1]} duration={1000}>
                        <LearnMore>click to learn more</LearnMore>
                      </VelocityComponent>
                      <ProjectHeader font={`25px`}>ATXHack4Change Hack Project</ProjectHeader>
                    </PictureBox>
                  <VelocityComponent animation={{width: this.state.slideboxarray[1]===true?'0%':'100%' }} delay={this.state.sliderdelay[1]} duration={5000}>
                      <TitleBox>
                        <VelocityComponent animation={{opacity: this.state.arrayshow[1]===true?'0':'1'}} delay={this.state.titledelay[1]} duration={1000}>
                          <TitlePadding>
                            <div className="projectheader">
                              <p>Hackathon Charity Project</p>
                            </div>
                            <div className="projectsubheader">
                              <p>At the ATXHack4Change hackathon I was on a small team that worked on this project. It&#39;s an IDE for Python that is made to be easy for children to learn how to program. It has an intuitive graphical interface and helper utilities.</p>
                            </div>
                          </TitlePadding>
                        </VelocityComponent>
                      </TitleBox>
                  </VelocityComponent>
                </FlexRow>
              </AlignContainer>
            </Flex1>
            <br/>
            <Flex1>
              <AlignContainer>
                <FlexRow style={styles.projectrow}>
                  <VelocityComponent animation={{width: this.state.slideboxarray[2]===true?'100%':'0%' }} delay={this.state.sliderdelay[2]} duration={5000}>
                      <ExplanationBox>
                        <VelocityComponent animation={{opacity: this.state.arrayshow[2]===true?'1':'0'}} delay={this.state.faderdelay[2]} duration={1000}>
                          <ExplanationPadding>
                            <br/>
                            <ExplanationSubHeader>
                              <p>
                                Motivation:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                This was my first portfolio. I wanted it to be personalized to my own tastes, have a consistent color theme and feel that it was 'of one piece', and stand out from other people (which I wanted to accomplish in part with animations). Although it was one of the first things I built, I&#39;m pretty proud of it.
                              </li>
                            </ul>
                            <ExplanationSubHeader>
                              <p>
                                Technologies Used:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                Written primarily in jQuery, html, css. It uses the velocity.js animation library to position a lot of the divs on click (such as the about me header and my projects section). I use processing.js to show a pong game, google-map-react along with google maps to show an interactive modal of my travels.
                              </li>
                            </ul>
                            <ExplanationSubHeader>
                              <p>
                                Backend Features:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                Smooth scrolling with navigation bar on Single Page Application (SPA)
                              </li>
                              <li>
                                Animations using velocity.js animation library
                              </li>
                              <li>
                                Skills section featuring API calls, CSS div fun, and database store and retrieval
                              </li>
                              <li>
                                Google maps interactive picture modal
                              </li>
                              <li>
                                Message box that emails my gmail account
                              </li>
                            </ul>
                            <br/>
                            <AlignContainer>
                              <LinkButton onClick={()=>{this.windowopener('https://github.com/patientplatypus/portfolio_web')}}>
                                Go to Github!
                              </LinkButton>
                            </AlignContainer>
                            <br/>
                          </ExplanationPadding>
                        </VelocityComponent>
                      </ExplanationBox>
                  </VelocityComponent>
                    <PictureBox onClick={()=>{this.pictureboxclicked(2)}}>
                      <img style={styles.imgscale} src={require('../../../../public/portfolio1.png')} />
                      <VelocityComponent animation={{opacity: this.state.arrayshow[2]===true?'0':'0.7'}} delay={this.state.titledelay[2]} duration={1000}>
                        <LearnMore>click to learn more</LearnMore>
                      </VelocityComponent>
                      <ProjectHeader font={`30px`}>First Portfolio Webpage</ProjectHeader>
                    </PictureBox>
                  <VelocityComponent animation={{width: this.state.slideboxarray[2]===true?'0%':'100%' }} delay={this.state.sliderdelay[2]} duration={5000}>
                      <TitleBox>
                        <VelocityComponent animation={{opacity: this.state.arrayshow[2]===true?'0':'1'}} delay={this.state.titledelay[2]} duration={1000}>
                          <TitlePadding>
                            <div className="projectheader">
                              <p>My Very First Portfolio</p>
                            </div>
                            <div className="projectsubheader">
                              <p>An old version of my portfolio it is a cool web application in it&#39;s own right. It features animations and popups, smooth scrolling and good form design using bootstrap tables.</p>
                            </div>
                          </TitlePadding>
                        </VelocityComponent>
                      </TitleBox>
                  </VelocityComponent>
                </FlexRow>
              </AlignContainer>
            </Flex1>
            <br/>
            <Flex1>
              <AlignContainer>
                <FlexRow style={styles.projectrow}>
                  <VelocityComponent animation={{width: this.state.slideboxarray[3]===true?'100%':'0%' }} delay={this.state.sliderdelay[3]} duration={5000}>
                      <ExplanationBox>
                        <VelocityComponent animation={{opacity: this.state.arrayshow[3]===true?'1':'0'}} delay={this.state.faderdelay[3]} duration={1000}>
                          <ExplanationPadding>
                            <br/>
                            <ExplanationSubHeader>
                              <p>
                                Motivation:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                I wanted to build an application that was not only useful, but was something that I could see myself using and would be beneficial for me. I also wanted to build a fully featured app that both felt consistent and had a lot of features that could be used together. So I built a job tracker that organizes my job search and also allows me to send emails, put things on a calendar, scrape web pages, and keep a contact list.
                              </li>
                            </ul>
                            <ExplanationSubHeader>
                              <p>
                                Technologies Used:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                Written in react on the front end and node.js on the back end. It imports a react-calendar component, scrapes web pages using Cheerio, uses a small node library for email delays, utilizes html5 native voice recognition features, uses react-dropzone for email attachments, material-ui for component prettification.
                              </li>
                            </ul>
                            <ExplanationSubHeader>
                              <p>
                                Features:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                Voice Recognition browse between tabs (ie 'go to calendar' goes to calendar page)
                              </li>
                              <li>
                                Website scraping on search allows user to search Meetup for meetups, and linkedin/builtinaustin for jobs. Returns items and allows user to add meetups to calendar page, and jobs to saved jobs. Saved jobs can be sent to email section.
                              </li>
                              <li>
                                Contact list that allows user to add contacts, add email address and search through contacts. Contact can be sent to email page along with notes about the person.
                              </li>
                              <li>
                                Email section allows the user to make templates that will use the job description to prepopulate the message box. Can use dropzone to add attachments to email. Also allows the user to send delayed emails.
                              </li>
                              <li>
                                Calendar section allows user to add notes, displays meetups sent to calendar as well as when an email was sent. Allows user to delete items as well.
                              </li>
                            </ul>
                            <br/>
                            <AlignContainer>
                              <LinkButton onClick={()=>{this.windowopener('https://github.com/patientplatypus/platypusTracker')}}>
                                Go to Github!
                              </LinkButton>
                            </AlignContainer>
                            <br/>
                          </ExplanationPadding>
                        </VelocityComponent>
                      </ExplanationBox>
                  </VelocityComponent>
                    <PictureBox onClick={()=>{this.pictureboxclicked(3)}}>
                      <img style={styles.imgscale} src={require('../../../../public/jobtracker.png')} />
                      <VelocityComponent animation={{opacity: this.state.arrayshow[3]===true?'0':'0.7'}} delay={this.state.titledelay[3]} duration={1000}>
                        <LearnMore>click to learn more</LearnMore>
                      </VelocityComponent>
                      <ProjectHeader font={`30px`}>Personal Job Tracker</ProjectHeader>
                    </PictureBox>
                  <VelocityComponent animation={{width: this.state.slideboxarray[3]===true?'0%':'100%' }} delay={this.state.sliderdelay[3]} duration={5000}>
                      <TitleBox>
                        <VelocityComponent animation={{opacity: this.state.arrayshow[3]===true?'0':'1'}} delay={this.state.titledelay[3]} duration={1000}>
                          <TitlePadding>
                            <div className="projectheader">
                              <p>Personal App to Track Job Applications</p>
                            </div>
                            <div className="projectsubheader">
                              <p>This application was made to make the job search easier and more organized. It allows me to search for jobs by scraping job boards, keep an organized contacts list, a calendar that job items and notes can be added to, and automated email page. Voice recognition used for navigation.</p>
                            </div>
                          </TitlePadding>
                        </VelocityComponent>
                      </TitleBox>
                  </VelocityComponent>
                </FlexRow>
              </AlignContainer>
            </Flex1>
            <br/>
            <Flex1>
              <AlignContainer>
                <FlexRow style={styles.projectrow}>
                  <VelocityComponent animation={{width: this.state.slideboxarray[4]===true?'100%':'0%' }} delay={this.state.sliderdelay[4]} duration={5000}>
                      <ExplanationBox>
                        <VelocityComponent animation={{opacity: this.state.arrayshow[4]===true?'1':'0'}} delay={this.state.faderdelay[4]} duration={1000}>
                          <ExplanationPadding>
                            <br/>
                            <ExplanationSubHeader>
                              <p>
                                Motivation:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                I wanted to make an application that would allow me to play around with both Python and mySQL. So I made a CRUD (Create Read Update Delete) application that allows a user to sell pictures to other users.
                              </li>
                            </ul>
                            <ExplanationSubHeader>
                              <p>
                                Technologies Used:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                Written in React for the Front End and Python Flask for the backend. It uses a lot of SQL database read/writes as well as lots of flexbox for the grid layout. Uses a particularly good modal popup that I made as a plug and play standalone react component. CSS styling for the bank and 'platybucks money holder'.
                              </li>
                            </ul>
                            <ExplanationSubHeader>
                              <p>
                                Features:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                Users can 'buy' pictures from the internet with 20 'platybucks', a fictional currency.
                              </li>
                              <li>
                                Users can put their picturs up for sale to other users and buy from other users.
                              </li>
                              <li>
                                Platybucks container section for the user (designed in CSS - the 'bank')
                              </li>
                              <li>
                                User dashboard where they can see their pictures for sale.
                              </li>
                              <li>
                                All pictures for sale section that allows a user to see all pictures for sale and buy one.
                              </li>
                              <li>
                                A 'buy from other users' section where the current user can click on others, see their pictures, and buy one they have for sale
                              </li>
                              <li>
                                Consistent color themes with nice modal popups
                              </li>
                              <li>
                                Over time the currency inflates, but only the bottom 20% of users by currency get new platybucks
                              </li>
                            </ul>
                            <br/>
                            <AlignContainer>
                              <LinkButton onClick={()=>{this.windowopener('https://github.com/patientplatypus/pythonpictureswapper')}}>
                                Go to Github!
                              </LinkButton>
                            </AlignContainer>
                            <br/>
                          </ExplanationPadding>
                        </VelocityComponent>
                      </ExplanationBox>
                  </VelocityComponent>
                    <PictureBox onClick={()=>{this.pictureboxclicked(4)}}>
                      <br/><br/><br/><br/><br/>
                      <img style={styles.imgscale} src={require('../../../../public/pictureswapper.png')} />
                      <VelocityComponent animation={{opacity: this.state.arrayshow[4]===true?'0':'0.7'}} delay={this.state.titledelay[4]} duration={1000}>
                        <LearnMore>click to learn more</LearnMore>
                      </VelocityComponent>
                      <ProjectHeader font={`30px`}>Python Picture Swapper</ProjectHeader>
                    </PictureBox>
                  <VelocityComponent animation={{width: this.state.slideboxarray[4]===true?'0%':'100%' }} delay={this.state.sliderdelay[4]} duration={5000}>
                      <TitleBox>
                        <VelocityComponent animation={{opacity: this.state.arrayshow[4]===true?'0':'1'}} delay={this.state.titledelay[4]} duration={1000}>
                          <TitlePadding>
                            <div className="projectheader">
                              <p>CRUD App, Allows Users to 'Sell' Pictures</p>
                            </div>
                            <div className="projectsubheader">
                              <p> I made a crud application with a Python backend that allows users to put pictures in a dashboard and trade with other users using 'platybucks'. Features mySQL database tables as well as currency inflation and purchase user flows. </p>
                            </div>
                          </TitlePadding>
                        </VelocityComponent>
                      </TitleBox>
                  </VelocityComponent>
                </FlexRow>
              </AlignContainer>
            </Flex1>
            <br/>
            <Flex1>
              <AlignContainer>
                <FlexRow style={styles.projectrow}>
                  <VelocityComponent animation={{width: this.state.slideboxarray[5]===true?'100%':'0%' }} delay={this.state.sliderdelay[5]} duration={5000}>
                      <ExplanationBox>
                        <VelocityComponent animation={{opacity: this.state.arrayshow[5]===true?'1':'0'}} delay={this.state.faderdelay[5]} duration={1000}>
                          <ExplanationPadding>
                            <br/>
                            <ExplanationSubHeader>
                              <p>
                                Motivation:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                I wanted to design a resume and business cards that would stand out from the crowd, and I learned from a friend that it was possible to print a resume to pdf after designing it in html/css. The resume is currently deprecated (*not my current*), but the business card is current. Silly and fun, doing this helps me practice some of my styling.
                              </li>
                            </ul>
                            <ExplanationSubHeader>
                              <p>
                                Technologies Used:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                HTML/CSS
                              </li>
                            </ul>
                            <ExplanationSubHeader>
                              <p>
                                Features:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                It&#39;s a business card!
                              </li>
                              <li>
                                It&#39;s a resume!
                              </li>
                            </ul>
                            <br/>
                            <AlignContainer>
                              <LinkButton onClick={()=>{this.windowopener('https://github.com/patientplatypus/resume_html')}}>
                                Go to resume!
                              </LinkButton>
                            </AlignContainer>
                            <br/>
                            <AlignContainer>
                              <LinkButton onClick={()=>{this.windowopener('https://github.com/patientplatypus/businesscards')}}>
                                Go to card!
                              </LinkButton>
                            </AlignContainer>
                            <br/>
                          </ExplanationPadding>
                        </VelocityComponent>
                      </ExplanationBox>
                  </VelocityComponent>
                    <PictureBox onClick={()=>{this.pictureboxclicked(5)}}>
                      <br/><br/><br/><br/><br/>
                      <img style={styles.imgscale} src={require('../../../../public/businesscard.png')} />
                      <VelocityComponent animation={{opacity: this.state.arrayshow[5]===true?'0':'0.7'}} delay={this.state.titledelay[5]} duration={1000}>
                        <LearnMore>click to learn more</LearnMore>
                      </VelocityComponent>
                      <ProjectHeader font={`30px`}>Resume/Business Cards in HTML</ProjectHeader>
                    </PictureBox>
                  <VelocityComponent animation={{width: this.state.slideboxarray[5]===true?'0%':'100%' }} delay={this.state.sliderdelay[5]} duration={5000}>
                      <TitleBox>
                        <VelocityComponent animation={{opacity: this.state.arrayshow[5]===true?'0':'1'}} delay={this.state.titledelay[5]} duration={1000}>
                          <TitlePadding>
                            <div className="projectheader">
                              <p>Programmatic Business Cards and Resume</p>
                            </div>
                            <div className="projectsubheader">
                              <p>I used HTML and CSS to design and make my own customizable business cards and resume. Fun and useful small applciation. </p>
                            </div>
                          </TitlePadding>
                        </VelocityComponent>
                      </TitleBox>
                  </VelocityComponent>
                </FlexRow>
              </AlignContainer>
            </Flex1>
            <br/>
            <Flex1>
              <AlignContainer>
                <FlexRow style={styles.projectrow}>
                  <VelocityComponent animation={{width: this.state.slideboxarray[6]===true?'100%':'0%' }} delay={this.state.sliderdelay[6]} duration={5000}>
                      <ExplanationBox>
                        <VelocityComponent animation={{opacity: this.state.arrayshow[6]===true?'1':'0'}} delay={this.state.faderdelay[6]} duration={1000}>
                          <ExplanationPadding>
                            <br/>
                            <ExplanationSubHeader>
                              <p>
                                Small Projects:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                Here is a list of small projects and miscellaneous code that I&#39;ve written. Some of it is deprecated or buggy so it doesn&#39;t work - for these I have not had time to go back and fix them up, but you can check out the code to see my thought process. Others I have also listed as deprecated as they may be in exotic languages and I have not had the time to get the code base back up. I&#39;ve included sections to links for deprecated and working examples.
                              </li>
                            </ul>
                            <ExplanationSubHeader>
                              <p>
                                Working Examples:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                Here are links to three small toys. I&#39;ve been playing on and off with things like Rust and Go lang for a while, so here is a working project link to a "Towers of Hanoi" puzzle solver in Rust. I also have here tic-tac-toe made in Python 3 - it has an "AI" that will play against you and win if you make an incorrect move. Finally I have a ping pong game that I made in a language called Processing (here it is processing.js as it is ported to work in html canvas). This last is linked to in my first portfolio.
                              </li>
                            </ul>
                            <br/>
                            <AlignContainer>
                              <LinkButton onClick={()=>{this.windowopener('https://play.integer32.com/?gist=1cf6b353444e2cab17fbfccd3193d5ef&version=undefined')}}>
                                Rust Towers Solver
                              </LinkButton>
                            </AlignContainer>
                            <br/>
                            <AlignContainer>
                              <LinkButton onClick={()=>{this.windowopener('https://repl.it/HzbX')}}>
                                Python3 TicTacToe
                              </LinkButton>
                            </AlignContainer>
                            <br/>
                            <AlignContainer>
                              <LinkButton onClick={()=>{this.windowopener('https://github.com/patientplatypus/portfolio_web/blob/master/js/pingpong.pde')}}>
                                Ping Pong
                              </LinkButton>
                            </AlignContainer>
                            <br/>
                            <ExplanationSubHeader>
                              <p>
                                Deprecated Code:
                              </p>
                            </ExplanationSubHeader>
                            <ul style={styles.ulstyle}>
                              <li>
                                I have in my deprecated list two mobile applications. Each of these is working, but is little more than a boilerplate. However, I did learn about strict typing while developing the iOs Swift application and it does run - it even taught me how to use redux in iOs. The React Native application was the first time that I&#39;ve used mobX, another state management library, and I found that to be very useful. The last link is a Sudoku Solver written in Go lang. Given a Sudoku puzzle it will programmatically will solve it. The code may not be runnable, given dependency/environment updating, but it is a nice example to look at.
                              </li>
                            </ul>
                            <br/>
                            <AlignContainer>
                              <LinkButton onClick={()=>{this.windowopener('https://github.com/patientplatypus/FirstSwiftProj')}}>
                                Swift
                              </LinkButton>
                            </AlignContainer>
                            <br/>
                            <AlignContainer>
                              <LinkButton onClick={()=>{this.windowopener('https://github.com/patientplatypus/reactnativemobx')}}>
                                React Native
                              </LinkButton>
                            </AlignContainer>
                            <br/>
                            <AlignContainer>
                              <LinkButton onClick={()=>{this.windowopener('https://github.com/patientplatypus/SudokuSolver')}}>
                                Sudoku Solver
                              </LinkButton>
                            </AlignContainer>
                            <br/>
                          </ExplanationPadding>
                        </VelocityComponent>
                      </ExplanationBox>
                  </VelocityComponent>
                    <PictureBox onClick={()=>{this.pictureboxclicked(6)}}>
                      <ChipBox>
                        <img style={styles.imgscale} src={require('../../../../public/computerchip.png')} />
                      </ChipBox>
                      <VelocityComponent animation={{opacity: this.state.arrayshow[6]===true?'0':'0.7'}} delay={this.state.titledelay[6]} duration={1000}>
                        <LearnMore>click to learn more</LearnMore>
                      </VelocityComponent>
                      <ProjectHeader font={`30px`}>Various Other Projects</ProjectHeader>
                    </PictureBox>
                  <VelocityComponent animation={{width: this.state.slideboxarray[6]===true?'0%':'100%' }} delay={this.state.sliderdelay[6]} duration={5000}>
                      <TitleBox>
                        <VelocityComponent animation={{opacity: this.state.arrayshow[6]===true?'0':'1'}} delay={this.state.titledelay[6]} duration={1000}>
                          <TitlePadding>
                            <div className="projectheader">
                              <p>A Group of Small Projects and Boilerplates</p>
                            </div>
                            <div className="projectsubheader">
                              <p>Here are a few links to smaller projects that I&#39;ve made. There are links to example repos as well as to my github.</p>
                            </div>
                          </TitlePadding>
                        </VelocityComponent>
                      </TitleBox>
                  </VelocityComponent>
                </FlexRow>
              </AlignContainer>
            </Flex1>
            <Flex1/>
          </FlexColumn>
          <br/>
        </AlignContainer>
      </div>
    )
  }
}

export default ProjectsPage
