// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React, { Component, PropTypes } from 'react'
import { PrimaryNavigationGlam, AlignContainer } from 'components'
import glamorous from "glamorous";
import styled from 'styled-components';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';
// var ReactPIXI = require('react-pixi');
import a from './a.png';
import mariobigwalkforwardpng from '../../../../../public/mario_characters/sprites.png';
import mariobigwalkforwardjson from '../../../../../public/mario_characters/shoeboxtrial.json';
var PIXI = require('pixi.js');

const styles = {
  contentcontainer: {
    position: 'absolute',
    height: '110vh',
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

const BlogButton = glamorous.div(
  {
    padding: '10px',
    backgroundColor: 'white',
    color: 'black'
  }
)

const TitleDiv = glamorous.div(
  {
    padding: '10px',
    backgroundColor: 'white',
    color: 'black'
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


const OutermostDiv = glamorous.div(
  {
    maxHeight: '100vh',
    position: 'relative',
    marginTop: '75px'
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

class BlogTwo extends Component{
  constructor(props){
    super(props);
    this.animate = this.animate.bind(this);
  }

  componentDidMount(){
    this.renderer = PIXI.autoDetectRenderer(1366, 768);
    this.refs.gameCanvas.appendChild(this.renderer.view);
    this.stage = new PIXI.Container();
    this.stage.width = 400;
    this.stage.height = 400;

    console.log()

    PIXI.loader
       .add('img/pictures/avatar/dhrgedrh.json')
       .load(onAssetsLoaded);

       function onAssetsLoaded()
        {
            // create an array of textures from an image path
            var frames = [];
            var index = 0;
            for (var i = 0; i < 4; i++) {
                if (i === 0){
                  index = i+15;
                }else{
                  index = i+16;
                }

                // magically works since the spritesheet was loaded with the pixi loader
                frames.push(PIXI.Texture.fromFrame("mario_characters1_"+index+".png"));
            }

            // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
            var anim = new PIXI.extras.AnimatedSprite(frames);

            /*
            * An AnimatedSprite inherits all the properties of a PIXI sprite
            * so you can change its position, its anchor, mask it, etc
            */
            anim.x = 0;
            anim.y = 0;
            anim.anchor.set(0.5);
            anim.animationSpeed = 0.5;
            anim.play();

            this.stage.addChild(anim)// CRASH
    }

  }

  spriteLoaded(){
    console.log('yolo');
    var frames = [];
    var index = 0;
    console.log('hello there sailor');
    console.log(PIXI.utils.TextureCache)
    for (var i = 0; i < 3; i++) {
          if (i === 0){
            index = i+15;
          }else{
            index = i+16;
          }
          // var texture = PIXI.Texture.fromFrame("mario_characters1_"+index+".png");
          const textures = PIXI.loader.resources[mariobigwalkforwardpng].textures;
          textures["mario_characters1_"+index+".png"];
          marioTextures.push(texture);
     }
  }

  drawwalls(){

  }


  animate(){
    this.renderer.render(this.stage);
    // console.log('this.circle ', this.circle.vx);
    // this.circle.vx+=0.0001
    // this.circle.x+=this.circle.vx
    requestAnimationFrame(this.animate);
  }

  render(){
    return (
      <OutermostDiv>
        <PrimaryNavigationGlam className="navbarfixed"/>
        <div style={styles.navigationmargin}/>
        <OverlapContainer>
          <AlignContainer>
            <br/>
            <TitleDiv>
              Welcome to Blog Two
            </TitleDiv>
            <br/>
            <div className="game-canvas-container" ref="gameCanvas">
            </div>
            <br/>
          </AlignContainer>
        </OverlapContainer>
      </OutermostDiv>
    )
  }
}

export default BlogTwo
