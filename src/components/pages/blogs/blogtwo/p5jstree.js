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

const TreeButton = glamorous.div(
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

class P5Wrapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      number: 5,
      OurTree: null,
      started: 'notyet',
      newtreeitem: null,
      pingcounter: 0
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.newtreeitem!=this.props.newtreeitem){
      this.setState({
        pingcounter: this.state.pingcounter+1
      }, ()=>{
        console.log('value of pingcounter is ', this.state.pingcounter);
        if(this.state.OurTree===null && this.state.pingcounter === 1){
          //first part
              var ourtree = Tree(nextProps.newtreeitem, 0, 0)
              console.log('ourtree is ', ourtree);
              this.setState({
                OurTree: ourtree,
              })
        }
        if(this.state.OurTree!=null && this.state.pingcounter > 1){
          //every subsequent part
              var ourtree = this.state.OurTree
              console.log('inside first elseif and the value of ourtree is ', ourtree);
              treeadder(ourtree, this.props.newtreeitem, 0)
              this.setState({
                OurTree: ourtree
              }, ()=>{
                console.log('value of OurTree after all operations', this.state.OurTree);
              })
        }
      })
    }

    function Node(data, depth) {
      console.log('inside node');
      this.data = data;
      this.depth = depth;
      this.right = null;
      this.left = null;
    }

    function Tree(data, depth){
      console.log('inside tree');
      var node = new Node(data, depth);
      return(node)
    }

    function treeadder(ourtree, newtreeitem, depth){
      console.log('inside treeadder');
      console.log('value of ourtree ', ourtree);
      console.log('value of newtreeitem ', newtreeitem);
      if(depth === 0){
        if (ourtree.right!=null){
          var rightnode = Tree(ourtree.right)
          var resetright = rightnode.data
        }
        if (ourtree.left!=null){
          var leftnode = Tree(ourtree.left)
          var resetleft = leftnode.data
        }
      }
        if (ourtree.left===resetleft){
          depth = 1
        }else if (ourtree.right===resetright){
          depth = 1
        }else{
          depth = depth + 1
        }

      if(newtreeitem>ourtree.data && ourtree.right===null){
        ourtree.right = Tree(newtreeitem, depth);
        return
      }
      if(newtreeitem<=ourtree.data && ourtree.left===null){
        ourtree.left = Tree(newtreeitem, depth);
        return
      }
      if(newtreeitem>ourtree.data && ourtree.right!=null){
        treeadder(ourtree.right, newtreeitem, depth);
        return
      }
      if(newtreeitem<=ourtree.data && ourtree.left!=null){
        treeadder(ourtree.left, newtreeitem, depth);
        return
      }
    }
  }

  componentDidMount() {
    var mods = [];
    var firstcords = [0, 0];


    var sketch = (p) => {
      var gray = 0;
      p.setup = () => {
        p.createCanvas(1000, 800);
        p.textSize(15);
        p.background(gray);
        p.stroke(this.state.number%255, 255, 255);
        p.fill(this.state.number%255, 255, 255, 127);
        var treedata = [[500,100]]

      };
      p.draw = () => {
        p.background(gray);
        p.stroke(this.state.number%255, 255, 255);
        p.fill(this.state.number%255, 255, 255, 127);
        var sendright = 0;
        var sendleft = 0;
        if(this.state.OurTree!=null){
          drawellipse(this.state.OurTree, 0, 0, null, null);
        }
        function drawellipse(ourtree, right, left, previousx, previousy, rightorleft){
          var currentx = 500+(700/(1.2*(ourtree.depth+1))*(right-left))
          var currenty = 100+50*(right+left)
          if (previousx!=null){
            console.log('value of currentx, currenty FOR LINE', currentx, " ", currenty, " ", previousx, " ", previousy);
            p.line(currentx, currenty, previousx, previousy);
          }
          if (previousx === null){
            currentx = 500
            currenty = 100
          }else{
            if (rightorleft === 'right'){
              // console.log('inside right if');
              currentx = previousx + 50 + (300/ourtree.depth+1)
              currenty = previousy + 50
              console.log('value of currentx, currenty FOR CIRCLE', currentx, " ", currenty);
            }
            if (rightorleft === 'left'){
              // console.log('inside left if');
              console.log('value of currentx, currenty FOR CIRCLE', currentx, " ", currenty);
              currentx = previousx - 50 - (300/ourtree.depth+1)
              currenty = previousy + 50
            }
          }
          p.ellipse(currentx, currenty, 50 , 50)
          if(ourtree.right!=null){
            sendright = right + 1
            drawellipse(ourtree.right, right, left, currentx, currenty, "right")
          }
          if(ourtree.left!=null){
            sendleft = left + 1
            drawellipse(ourtree.left, right, sendleft, currentx, currenty, "left")
          }
        }
      };
    };
    this.canvas = new p5(sketch, this.refs.wrapper)
  }



  render() {
    return <div ref="wrapper"></div>
  }
}


class BlogTwo extends Component{
  constructor(props){
    super(props);
    this.state = {
      addToTree: '',
      newtreeitem: null,
      inputarray: []
    }
  }

  addTreefunc(){
    console.log('inside add to tree click. value of addToTree is ', this.state.addToTree);
    var newtreeitem = parseInt(this.state.addToTree);
    var inputarray = this.state.inputarray;
    var pushinput = null;
    var skip = false;
    if (inputarray.length>0){
      inputarray.forEach(input=>{
        console.log('value of input ', input);
        console.log('value of newtreeitem', newtreeitem);
        if (input===newtreeitem){
          console.log('input already added!');
          skip = true;
        }else{
          pushinput = newtreeitem;
        }
      })
    }else{
      pushinput = newtreeitem
    }
    console.log('value of pushinput is ', pushinput);
    if (skip===false){
      inputarray.push(pushinput)
      this.setState({
        newtreeitem: newtreeitem,
        inputarray: inputarray
      })
    }
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
            <AlignContainer>
              <P5Wrapper newtreeitem={this.state.newtreeitem} inputarray={this.state.inputarray}/>
              <br/>
              <input className="addToTree" value={this.state.addToTree} onClick={(e)=>{this.setState({addToTree: ""})}} onChange={(e)=>{this.setState({addToTree:e.target.value})}} placeholder="addToTree"/>
              <TreeButton onClick={()=>{this.addTreefunc()}}>Add # To Tree</TreeButton>
            </AlignContainer>
          </AlignContainer>
        </OverlapContainer>
      </OutermostDiv>
    )
  }
}

export default BlogTwo
