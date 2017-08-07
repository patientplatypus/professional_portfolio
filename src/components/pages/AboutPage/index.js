// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React, { Component } from 'react'
import { PrimaryNavigationGlam, AlignContainer } from 'components'
import styled from 'styled-components';
import Modal from './Modal';
import Anime from 'react-anime';
import glamorous from "glamorous";
import { css } from 'glamor';
import './main.css';
import renderIf from 'render-if';
import {Motion, spring} from 'react-motion';

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
const Flex10 = styled.div`
  flex: 10;
`

const Flex9 = styled.div`
  flex: 9;
`

const PageItems = styled.div`
  flex:1 1 auto;
  text-align:center;
  margin:0px;
`


// const PolaroidContainer = styled.div`
//   background-color: #F4F2ED;
//   padding: 20px;
// `

const PolaroidContainer = glamorous.div(
  {
    backgroundColor: '#F4F2ED',
    padding: '20px'
  },
  ({height})=>({
    height: height
  })
)

const styles = {
  imgholder: {
    width: '80%',
    borderRadius: '20px',
    borderWidth: '5px',
    borderStyle: 'solid',
    backgroundColor: 'rgba(57, 62, 65, 0.75)',
    borderColor: '#393E41',
    padding: '20px',
    flexWrap: 'wrap',
    alignContent: 'center',
    alignItems: 'stretch'
  },
  imgheader: {

  },
  fiddlestyle1: {
    marginLeft: '-10px'
  },
  imgrow: {
    margin: '10px'
  },
  arrowflex: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  developstyle: {
    position: 'relative'
  },
  contentcontainer: {
    position: 'absolute',
    zIndex: "-1",
    width: '100%',
    minHeight: '95vh',
    background: "#232526",  /* fallback for old browsers */
    background: "-webkit-linear-gradient(to left, rgb(52, 57, 60), #232526)", /* Chrome 10-25, Safari 5.1-6 */
    background: "linear-gradient(to left, rgb(52, 57, 60), #232526)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  },
}

const DevelopBox = glamorous.div(
  {
    backgroundColor: 'black',
    zIndex: '999',
  },
  ({opacity})=>({
    opacity: opacity
  })
)

const MarginHolder100px = glamorous.div(
  {
    height: '100px'
  }
)

const MarginHolder0px = glamorous.div(
  {
    height: '0px'
  }
)


const BlackBackground = glamorous.div(
  {
    backgroundColor: 'black',
    paddingTop: '20px',
    minWidth: '250px',
    minHeight: '188px',
    height: 'auto',
    width: 'auto',
    paddingBottom: '20px',
    paddingRight: '5px',
    paddingLeft: '5px'
  }
)

const PulseAnimate = glamorous.div({
  animation: `${css.keyframes({
    '0%': { transform: `scale(1.2)`, transformX: '0px' },
    '100%': { transform: `scale(0.8)`, transformX: '10px' },
  })} 1s infinite ease-in-out alternate`,
});

// #triangle-left {
// 	width: 0;
// 	height: 0;
// 	border-top: 50px solid transparent;
// 	border-right: 100px solid red;
// 	border-bottom: 50px solid transparent;
// }

// #triangle-right {
// 	width: 0;
// 	height: 0;
// 	border-top: 50px solid transparent;
// 	border-left: 100px solid red;
// 	border-bottom: 50px solid transparent;
// }


const RightTriangle = glamorous.div(
  {
    width: '0',
    height: '0',
    borderTop: '30px solid transparent',
    borderBottom: '30px solid transparent',
    // borderLeft: '60px solid #393E41',
    zIndex: '600',
    // ':hover':{
    //   borderLeft: '60px solid tomato',
    // }
  },
  ({opacity})=>({
    opacity: opacity
  }),
  ({color})=>({
    borderLeft: color
  })

  // ({top})=>({
  //   top: top
  // }),
  // ({left})=>({
  //   left: left
  // }),
  // ({font})=>({
  //   fontSize: font,
  //   width: font,
  //   height: font
  // })
);

const LeftTriangle = glamorous.div(
  {
    width: '0',
    height: '0',
    borderTop: '30px solid transparent',
    borderBottom: '30px solid transparent',
    zIndex: '600',
    // ':hover':{
    //   borderRight: '60px solid tomato',
    // }
  },
  ({opacity})=>({
    opacity: opacity
  }),
  ({color})=>({
    borderRight: color
  })

);

const WelcomeSplash = glamorous.div(
  {
    textAlign: 'center',
    margin: '0 auto',
    fontSize: '50px',
    color: 'white',
    padding: '30px',
    backgroundColor: '#393E41',
    borderRadius: '20px',
    borderColor: '#393E41',
    borderStyle: 'solid'
  }
)
const WelcomeSplashSubheader = glamorous.div(
  {
    textAlign: 'center',
    margin: '0 auto',
    fontSize: '20px',
    color: 'white',
    padding: '20px',
    backgroundColor: '#393E41',
    borderRadius: '20px',
    borderColor: '#393E41',
    borderStyle: 'solid'
  }
)


const FlexColumnVariable = glamorous.div(
  {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  ({height})=>({
    height: height
  })
)



const TriangleContainer = glamorous.div(
  {
    borderRadius: '10px',
    backgroundColor: '#D3D0CB',
    textAlign: 'center',
    verticalAlign: 'center',
    marginRight: '10px',
    marginLeft: '10px',
    padding: '10px',
    zIndex: '550'
  },
  ':hover':{
    backgroundColor: 'tomato',
  },
  ({moveright})=>({
    marginRight: moveright
  }),
  ({moveleft})=>({
    marginLeft: moveleft
  }),
);

const MarginContainer = glamorous.div(
  {
    width: '100px',
    height: '100px',
    backgroundColor: 'transparent',
    pointerEvents: 'none'
  },
)

const MarginContainer1px = glamorous.div(
  {
    width: '100px',
    height: '1px',
    backgroundColor: 'transparent',
    pointerEvents: 'none'
  },
)

const ColumnContainer = glamorous.div(
  {
    flexDirection:'column',
    flexWrap:'wrap',
    height: '110vh',
    // justifyContent: 'flex-start',
    width:'100%',
  }
)



class AboutPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      openPictureModal: false,
      pictureArrayIndex: 0,
      animateLeftTriangle: false,
      animateRightTriangle: false,
      movedefault: 0,
      rightcolor: '60px solid #393E41',
      leftcolor: '60px solid #393E41',
      movestyle: 5,
      switchindex: 0,
      developtimestart: 0,
      developtimefinish: 100
    }
  }

  openModal(modalpic){
    console.log('inside openModal');
    this.setState({
      openPictureModal: true,
      imgmodal: modalpic
    })
  }

  getImage(index, subindex){
    const ImageArray = [
      ['Sunset Over Australian Outback', 'http://68.media.tumblr.com/10f44f56e93fb3324d469f22be6689fb/tumblr_ng4vux9AGa1rw1i3co1_250.jpg', 'http://68.media.tumblr.com/10f44f56e93fb3324d469f22be6689fb/tumblr_ng4vux9AGa1rw1i3co1_1280.jpg',
      'Here is a picture of sunset over the the Austrialian Outback, 200 miles inland from Perth. I was fortunate to be able to work on a grain repository for 3 months in the wilderness. The natural beauty and wide open space made all the hard work worth it.'],
      ['Rainy Day, New Orleans', 'http://68.media.tumblr.com/3c7aac7fe07261e44484c8746e508ccf/tumblr_mp7pp5LjrV1rw1i3co2_250.jpg', 'http://68.media.tumblr.com/3c7aac7fe07261e44484c8746e508ccf/tumblr_mp7pp5LjrV1rw1i3co2_1280.jpg',
      'This is a picture I took at the Spotted Cat bar in the French Quarter in New Orleans. It was raining outside, the place was pretty empty and there were a couple people playing insturments that afternoon. There\'s something about this picture that feels nostalgic to me.'],
      ['Emeishan, Southern China', 'http://68.media.tumblr.com/2dda034f85eb5cc4d4d3e4af9d1a0733/tumblr_n3v61lg50Z1rw1i3co1_250.jpg', 'http://68.media.tumblr.com/2dda034f85eb5cc4d4d3e4af9d1a0733/tumblr_n3v61lg50Z1rw1i3co1_1280.jpg',
      'I climbed up Emeishan in southern China for three days during December a few years ago. The going was treacherous and the coditions were colder than cold, sometimes below ten degrees celsius. However, Mt. Emei is one of the four sacred mountains in Chinese Buddhism, so beautiful temples are dotted around the mountainside.'],
      ['Rainbow Mountain Peru', 'http://68.media.tumblr.com/87a054d67ec0533fb006d398bf00d650/tumblr_o87wj9YwfJ1rw1i3co5_250.jpg', 'http://68.media.tumblr.com/87a054d67ec0533fb006d398bf00d650/tumblr_o87wj9YwfJ1rw1i3co5_1280.jpg',
      'Discovered only recently this is a beautiful mountain a few hours outside of Cusco. The mineral content of the land causes the mountain to have a striped rainbox like appearance. Taken on the road to Ausangate.'],
      ['Qixing Mountain Taipei', 'http://68.media.tumblr.com/4e4ea346054e7df566531870482e7530/tumblr_n3v6bmz7h61rw1i3co1_250.jpg', 'http://68.media.tumblr.com/4e4ea346054e7df566531870482e7530/tumblr_n3v6bmz7h61rw1i3co1_1280.jpg',
      'North of Taipei there\'s a great deal of volcanic and thermal activity (the area is known for it\'s hotsprings). This moutain is active and the entire face smells from the sulfur vents.'],
      ['Cradle Mt. Tasmania', 'http://68.media.tumblr.com/62bfe982809f22ea42bbadef3e4b6f0a/tumblr_njzno9fbyE1rw1i3co1_250.jpg', 'http://68.media.tumblr.com/62bfe982809f22ea42bbadef3e4b6f0a/tumblr_njzno9fbyE1rw1i3co1_1280.jpg',
      'Located in Tasmania this national park has great bouldering up to beautiful and earie landscapes. This particular shot was taken in a saddle of a nearly 200 meter straight ascent!'],
      ['Lukla Airport, Nepal', 'http://68.media.tumblr.com/1f714ef91dd243a6dc728f698e231712/tumblr_n3v8x3ZqGG1rw1i3co1_250.jpg', 'http://68.media.tumblr.com/1f714ef91dd243a6dc728f698e231712/tumblr_n3v8x3ZqGG1rw1i3co1_1280.jpg',
      'This is the runway on the Everest side of the Kathmandu-to-Lukla airplane shuttle. The trip is only 30 minutes, but in a very small plane with some of the worst turbulance I\'ve ever had. The runway itself is on a very small strip of land and there is no margin for error. Scary!'],
      ['Mt. Everest, Nepal', 'http://68.media.tumblr.com/5f2faffabcade8b33e7cf9ea198e2a72/tumblr_n3v8fvlXMb1rw1i3co1_250.jpg', 'http://68.media.tumblr.com/5f2faffabcade8b33e7cf9ea198e2a72/tumblr_n3v8fvlXMb1rw1i3co1_1280.jpg',
      ' A picture I took of Mt Everest at the highest point on the basecamp trail (any farther and you start climbing it!). It took me two weeks to get there and it was a difficult and sometimes dangerous climb, but it remains one of the the most memorable times in my life.']
    ]
    return(ImageArray[index][subindex])
  }

  closeModal(){
    console.log('inside closeModal');
    this.setState({
      openPictureModal: false
    })
  }

  MouseEnterLeft(){
    console.log('inside MouseEnterLeft')
    this.setState({
      animateLeftTriangle: true
    }, ()=>{console.log('value of animateLeftTriangle after set is ', this.state.animateLeftTriangle);})
  }

  MouseExitLeft(){
    this.setState({
      animateLeftTriangle: false
    })
  }

  MouseEnterRight(){
    console.log('inside MouseEnterLeft')
    this.setState({
      animateRightTriangle: true
    }, ()=>{console.log('value of animateRightTriangle after set is ', this.state.animateRightTriangle);})
  }

  MouseExitRight(){
    this.setState({
      animateRightTriangle: false
    })
  }

  movedone(){
    console.log('inside movedone');
    var defaultwas = this.state.movedefault;
    var stylewas = this.state.movestyle;
    this.setState({
      movedefault: stylewas,
      movestyle: defaultwas
    })
  }

  lefttriangleclick(){

   if (this.state.pictureArrayIndex===0){
      this.setState({
        pictureArrayIndex: 7,
        developtimestart: 0,
        developtimefinish: 100
      })
    }else{
      this.setState({
        pictureArrayIndex: this.state.pictureArrayIndex-1,
        developtimestart: 0,
        developtimefinish: 100
      })
    }
    this.setState({
      leftcolor: '60px solid tomato'
    }, ()=>{
      setTimeout(()=>{
        this.setState({
          leftcolor: '60px solid  #393E41'
        })
      }, 500)
    })
  }
  righttriangleclick(){
    if (this.state.pictureArrayIndex===7){
      this.setState({
        pictureArrayIndex: 0
      })
    }else{
      this.setState({
        pictureArrayIndex: this.state.pictureArrayIndex+1
      })
    }
     this.setState({
       rightcolor: '60px solid tomato'
     }, ()=>{
       setTimeout(()=>{
         this.setState({
           rightcolor: '60px solid  #393E41'
         })
       }, 500)
     })
  }

  handlepicturerest(currentindex){

  }


  render(){
    return (
      <div>
        <PrimaryNavigationGlam className="navbarfixed"/>
        <br/><br/>
        <AlignContainer style={styles.contentcontainer}>
          <ColumnContainer>
            <PageItems>
              <AlignContainer>
                <br/>
                <FlexRow className="subheader">
                  <WelcomeSplash>
                    Welcome to my About Page!
                  </WelcomeSplash>
                </FlexRow>
                <FlexRow className="subheader">
                  <WelcomeSplashSubheader>
                    I really love to travel, here are some of my favorite pictures.
                  </WelcomeSplashSubheader>
                </FlexRow>
              </AlignContainer>
            </PageItems>
            <PageItems>
              <MarginHolder100px/>
            </PageItems>
            <PageItems>
              <AlignContainer>
                <FlexRow style={styles.imgholder}>
                  <FlexRow style={styles.imgrow}>
                    <Flex1>
                      <FlexColumnh100 style={styles.arrowflex}>
                        <Flex1><MarginContainer1px/></Flex1>
                        <Flex1>
                          <div>
                            {renderIf(this.state.animateLeftTriangle===false)(
                              <TriangleContainer  onMouseEnter={()=>this.MouseEnterLeft()} onMouseLeave={()=>this.MouseExitLeft()}>
                                <LeftTriangle color={this.state.leftcolor}/>
                              </TriangleContainer>
                            )}
                            {renderIf(this.state.animateLeftTriangle===true)(
                              <Motion
                                 defaultStyle={{ font: this.state.movedefault }}
                                 style={{ font: spring(this.state.movestyle, {stiffness: 100, damping: 1})}}
                                 onRest={()=>this.movedone()}
                               >
                               {style =>
                                 (
                                    <TriangleContainer  onMouseEnter={()=>this.MouseEnterLeft()} onMouseLeave={()=>this.MouseExitLeft()} moveright={`${style.font}px`} moveleft={`${10-style.font}px`} onClick={()=>this.lefttriangleclick()}>
                                        <LeftTriangle opacity={`${.80+style.font*2/100}`} color={this.state.leftcolor}/>
                                    </TriangleContainer>
                                  )
                                }
                              </Motion>
                            )}
                          </div>
                        </Flex1>
                        <Flex1><MarginContainer1px/></Flex1>
                      </FlexColumnh100>
                    </Flex1>
                    {/*this is the picture/description container*/}
                    <Flex1>
                     <FlexColumn>
                       <AlignContainer>
                         <PolaroidContainer>
                         <Flex1 style={styles.developstyle}>
                           <BlackBackground>
                             <Motion
                                defaultStyle={{ font: 0 }}
                                key={this.state.pictureArrayIndex}
                                style={{ font: spring(100, {stiffness: 10, damping: 100})}}
                                onRest={()=>this.handlepicturerest(this.state.pictureArrayIndex)}
                              >
                              {style =>
                                (
                                  <DevelopBox opacity={`${style.font/100}`}>
                                    <img src={this.getImage(this.state.pictureArrayIndex, 1)}/>
                                  </DevelopBox>
                                )
                              }
                              </Motion>
                           </BlackBackground>
                         </Flex1>
                         <Flex1>
                           <div onClick={()=>{this.openModal(this.getImage(this.state.pictureArrayIndex, 2))}} style={styles.fiddlestyle1} className='imgheader'>
                             <p>{this.getImage(this.state.pictureArrayIndex, 0)}</p>
                           </div>
                         </Flex1>
                         </PolaroidContainer>
                       </AlignContainer>
                     </FlexColumn>
                    </Flex1>
                    <Flex9 className='picturedescription'>
                      <FlexColumnh100>
                      <Flex1><MarginContainer1px/></Flex1>
                      <Flex1 className='picturedescriptioninner'>
                        <p>{this.getImage(this.state.pictureArrayIndex,3)}</p>
                      </Flex1>
                      <Flex1><MarginContainer1px/></Flex1>
                      </FlexColumnh100>
                    </Flex9>
                    <Flex1>
                      <FlexColumnh100 style={styles.arrowflex}>
                        <Flex1><MarginContainer1px/></Flex1>
                        <Flex1>
                          <div>
                            {renderIf(this.state.animateRightTriangle===false)(
                              <TriangleContainer  onMouseEnter={()=>this.MouseEnterRight()} onMouseLeave={()=>this.MouseExitRight()}>
                                <RightTriangle color={this.state.rightcolor}/>
                              </TriangleContainer>
                            )}
                            {renderIf(this.state.animateRightTriangle===true)(
                              <Motion
                                 defaultStyle={{ font: this.state.movedefault }}
                                 style={{ font: spring(this.state.movestyle, {stiffness: 100, damping: 1})}}
                                 onRest={()=>this.movedone()}
                               >
                               {style =>
                                 (
                                    <TriangleContainer  onMouseEnter={()=>this.MouseEnterRight()} onMouseLeave={()=>this.MouseExitRight()} moveright={`${style.font}px`} moveleft={`${10-style.font}px`} onClick={()=>{this.righttriangleclick()}}>
                                        <RightTriangle opacity={`${.80+style.font*2/100}`} color={this.state.rightcolor}/>
                                    </TriangleContainer>
                                  )
                                }
                              </Motion>
                            )}
                          </div>
                        </Flex1>
                        <Flex1><MarginContainer1px/></Flex1>
                      </FlexColumnh100>
                    </Flex1>
                  </FlexRow>
                </FlexRow>
              </AlignContainer>
            </PageItems>
          </ColumnContainer>
        </AlignContainer>


        <Modal isOpen={this.state.openPictureModal} closeCallback={this.closeModal.bind(this)}>
          <AlignContainer>
            <img src={this.state.imgmodal}/>
          </AlignContainer>
        </Modal>
      </div>
    )
  }
}

export default AboutPage
