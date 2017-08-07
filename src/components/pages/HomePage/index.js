// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React, { Component } from 'react'
import { PrimaryNavigationGlam, AlignContainer, ProfileImg } from 'components'
import styled from 'styled-components';
import Anime from 'react-anime';
import glamorous from 'glamorous';
import {VelocityComponent, VelocityTransitionGroup} from 'velocity-react';
import renderIf from 'render-if'
import './main.css';
import {Motion, spring} from 'react-motion';
var fileDownload = require('react-file-download');
import axios from 'axios';

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
const Flex3 = styled.div`
  flex: 3;
`
const Flex4 = styled.div`
  flex: 4;
`
const Flex6 = styled.div`
  flex: 6;
`
const Flex7 = styled.div`
  flex: 7;
`
const Flex8 = styled.div`
  flex: 8;
`
const Flex5 = styled.div`
  flex: 5;
`
const Flex10 = styled.div`
  flex: 10;
`
const Flex12 = styled.div`
  flex: 12;
`
const Flex9 = styled.div`
  flex: 9;
`

const PageItems = styled.div`
  flex:1 1 auto;
  text-align:center;
  margin:0px;
`

const PageGrid = styled.div`
  flex-direction:column;
  flex-wrap:wrap;
  backgroundColor: black;
  width:100%;
  height:100%;
`


const ImgBox = glamorous.div(
  {
    width: '100%',
    height: '0%',
    maxHeight: '200vh',
    display: 'flex',
    flexDirection: 'row'
  },
  ({height})=>({
    height: height
  })
)

const BlahBlahDiv = glamorous.div(
  {
    padding: '25px',
    margin: '30px',
    borderRadius: "20px",
    backgroundColor: 'rgb(70, 60, 50)',
    fontSize: '30px',
    position: 'relative',
    zIndex: '10',
    fontWeight: 'bold',
    color: '#E7E5DF',
    width: 'auto',
    height: '50vh'
  }
)

const ResumeButton = glamorous.div(
  {
    padding: '10px',
    fontSize: '25px',
    textAlign: 'center',
    borderRadius: '10px',
    borderStyle: 'solid',
    borderColor: '#393E41',
    backgroundColor: '#D3D0CB',
    ":hover":{
      cursor: 'pointer',
      backgroundColor: 'tomato',
      color: 'white'
    }
  }
)

const SocialMediaHolder = glamorous.div(
  {
    display:'flex',
    flexDirection: 'row',
    textAlign: 'center',
    margin: '0 auto',
    right: '5px',
    width: '100%'
  }
)

const ColumnJusified = glamorous.div(
  {
    display: "flex",
    justifyContent: "space-between",
    width: '100%',
    flexDirection: 'column'
  }
)



const styles = {
  teststyle: {
    width: '200px'
  },
  imgstyle: {
    marginTop: '10px',
    marginLeft: '20px',
  },
  containimg: {
    // maxHeight: '100%',
    // overflow: 'hidden'
    height: '0%',
    maxWidth: '100%'
  },
  headerstyle: {
    background: '#393E41', /* fallback for old browsers */
    background: '-webkit-linear-gradient(to right, #393E41, #434343)', /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to right, #393E41, #434343)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    width: '100%',
    position: 'relative'
  },
  ulstyle: {
    listStyle: 'none'
  },
  descriptionstyle:{
    lineHeight: '5px'
  },
  buttonrow: {
    background: '#485563', /* fallback for old browsers */
    background: '-webkit-linear-gradient(to right, #485563, #29323c)', /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to right, #485563, #29323c)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    paddingTop: '20px',
    paddingBottom: '20px'
  },
  blahblah: {
    background: '#393E41', /* fallback for old browsers */
    background: '-webkit-linear-gradient(to right, #434343, #393E41)', /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to right,  #434343, #393E41)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    width: '100%',
    overflow: 'auto',
    flexBasis: '0'
  },
  pagestyle: {
    height: '100vh',
    flexWrap: 'wrap',
    padding: '0px'
  },
  starrynight: {
    position: 'absolute',
    right: '0',
    bottom:'0',
    opacity: '0.1'
  },
  socialstyle: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  socialatag: {
    width: '100%',
    height: '100%'
  },
  columnjustify: {
    justifyContent: 'space-between'
  },
  contentcontainer: {
    position: 'absolute',
    zIndex: "-1",
    width: '100%',
    background: "#232526",  /* fallback for old browsers */
    background: "-webkit-linear-gradient(to left, rgb(52, 57, 60), #232526)", /* Chrome 10-25, Safari 5.1-6 */
    background: "linear-gradient(to left, rgb(52, 57, 60), #232526)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  },
}

const SocialPicHolder = glamorous.div(
  {
    flex: '1',
    height: '100px',
    minWidth: '155px',
    ':hover':{
      pointer: 'cursor'
    }
  }
)

// translateX: 250,
// scale: 2,
// rotate: '1turn'

class HomePage extends Component{
  constructor(props){
    super(props);
    this.state={
      animatebox: false,
      showresume: false
    }
  }

  animateboxclick(){

  }

  resumeButtonClicked(){
    console.log('resumeButtonClicked');
    if (this.state.showresume===false){
      this.setState({
        showresume: true
      })
    }else{
      this.setState({
        showresume: false
      })
    }
  }

  windowopener(url, href){
    if (url!='false'){
      window.open(url);
    }
    if (href!='false'){
      console.log('inside mail thing');
      var mailstring = 'mailto:pweyand@gmail.com?subject=I%20love%20your%20super%20duper%20awesome%20website&body=Hi!%20We%20should%20talk%20some%20time.';
      console.log('value of mailstring is ', mailstring);
      window.location.href = mailstring;
    }
  }

  downloadButtonClicked(){
    console.log('downloadButtonClicked');
    // axios.post('https://api.github.com/repos/patientplatypus/My-Resume/git/blobs/c5f944b8e0458d36edb90550d119f5fe18fc2103')
    // .then(response=>{
    //   console.log('github api call ', response);
    // })
    var url = 'http://68.media.tumblr.com/e78906cb5442634fe183d7217252adab/tumblr_otq55u4blQ1rw1i3co1_1280.png'

    fetch(url)
      .then((resp) => resp.blob())
      .then(function(data) {
        console.log('inside fetch data');
        console.log('data ', data);
        fileDownload(data, 'PeterTWeyandResume.png');
        })
      .catch(function(error) {
        // If there is any error you will catch them here
        console.log('fetch error and the error is ', error);
      });
  }

  componentDidMount(){
    console.log('showresume ', this.state.showresume);
  }

  render(){
    return (
      <div>
        <PrimaryNavigationGlam className="navbarfixed"/>
        <br/><br/>
          <AlignContainer style={styles.contentcontainer}>
            <PageGrid>
              <PageItems>
                <FlexRow style={styles.headerstyle}>
                  <Flex1 style={styles.imgstyle}>
                    <ProfileImg/>
                  </Flex1>
                  <Flex10>
                    <FlexColumn>
                      <Flex1 className="header">
                        Peter T Weyand
                      </Flex1>
                      <Flex1 className="subheader">
                        Front End Web Developer Actively Seeking Professional Roles
                      </Flex1>
                      <Flex1 style={styles.descriptionstyle} className="subheader">
                        <p>
                          Programmer Specializing in Front End Web Design
                        </p>
                        <p>
                          Projects in React, Node, Python, Swift, React Native, Vue.js, Phoenix, Rust, Go
                        </p>
                        <p>
                          Research Analyst at the Federal Reserve Board, Washington DC
                        </p>
                        <p>
                          Financial Analyst at a Top 5 Major US Bank
                        </p>
                        <p>
                          BA in Mathematics, Statistics & Economics from UIUC
                        </p>
                        <p>
                          World Traveler
                        </p>
                      </Flex1>
                    </FlexColumn>
                  </Flex10>
                </FlexRow>
                <FlexRow style={styles.buttonrow}>
                  <Flex4/>
                  <Flex6>
                    <FlexRow>
                      <Flex2>
                        <ResumeButton onClick={()=>{this.resumeButtonClicked()}}>
                          {renderIf(this.state.showresume===false)(
                            <div>
                              View Resume
                            </div>
                          )}
                          {renderIf(this.state.showresume===true)(
                            <div>
                              Hide Resume
                            </div>
                          )}
                        </ResumeButton>
                      </Flex2>
                      <Flex1/>
                      <Flex2>
                          <ResumeButton onClick={()=>{this.downloadButtonClicked()}}>
                            Download Resume
                          </ResumeButton>
                      </Flex2>
                      <Flex1/>
                    </FlexRow>
                  </Flex6>
                  <Flex1/>
                </FlexRow>
                      <VelocityComponent animation={{height: this.state.showresume===true?'5000px':'0px'}} duration={1000}>
                        <ImgBox>
                              <Flex1>
                                <VelocityComponent animation={{height: this.state.showresume===true?'100%':'0%'}} duration={1000}>
                                    <img style={styles.containimg} src={require('../../../../public/resume.jpg')}/>
                                </VelocityComponent>
                              </Flex1>
                        </ImgBox>
                      </VelocityComponent>
              </PageItems>
              <PageItems style={styles.blahblah}>
                <BlahBlahDiv>
                  <ColumnJusified>
                    <Flex1>
                      <p>
                        Hi! This is my blog and portfolio website.
                      </p>
                      <p>
                        I&#39;m a front end web developer specializing in react. I like to make websites and am currently on the job market.
                      </p>
                      <p>
                        This website is in active development with new blog posts and projects. Be sure to check back for updates.
                      </p>
                      <p>
                        I live in Austin, Texas.
                      </p>
                    </Flex1>
                    <Flex1>
                      <SocialMediaHolder>
                        <Flex4/>
                        <SocialPicHolder>
                           <img className='socialpointer' style={styles.socialstyle} target="_blank" onClick={()=>{this.windowopener('https://www.linkedin.com/in/peterweyand/', 'false')}} src={require('../../../../public/Linkedin.png')} />
                        </SocialPicHolder>
                        <SocialPicHolder>
                          <img className='socialpointer' style={styles.socialstyle} onClick={()=>{this.windowopener('false', ' true')}} src={require('../../../../public/envelope.png')} />
                        </SocialPicHolder>
                        <SocialPicHolder>
                          <img className='socialpointer' style={styles.socialstyle}
                          onClick={()=>{this.windowopener('https://github.com/patientplatypus', 'false')}} src={require('../../../../public/Github.png')} />
                        </SocialPicHolder>
                        <Flex4/>
                      </SocialMediaHolder>
                    </Flex1>
                  </ColumnJusified>
                </BlahBlahDiv>
              </PageItems>
            </PageGrid>
        </AlignContainer>
      </div>
    )
  }
}

export default HomePage
      //

      // <Motion
      //    defaultStyle={{ font: 0 }}
      //    style={{ font: spring(this.state.showresume, {stiffness: 20, damping: 200})}}
      //  >
      //  {style =>
      //    (
      //    )
      //  }
      // </Motion>
// <img src={require('../../../../public/PeterWeyandResumeSimpleFormatting.pdf')}/>
 // <img style={styles.containimg} src={require('../../../../public/resume.png')}/>
// <ul style={styles.ulstyle}>
//   <li>
//     Specializing in React
//   </li>
//   <li>
//     Specializing in React
//   </li>
//   <li>
//     Specializing in React
//   </li>
//   <li>
//     Specializing in React
//   </li>
//   <li>
//     Specializing in React
//   </li>
//   <li>
//     Specializing in React
//   </li>
// </ul>

// http://68.media.tumblr.com/5b404a384d9d451a30a2abfc97f684cc/tumblr_n3v6f93v7k1rw1i3co1_1280.jpg
