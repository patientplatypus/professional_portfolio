// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React, { Component, PropTypes } from 'react'
import { PrimaryNavigationGlam, AlignContainer } from 'components'
import glamorous from "glamorous";
import axios from 'axios';
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
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'

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

const ArticleField = glamorous.div(
  {
    backgroundColor: "rgb(211, 211, 211)",
    color: 'black',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop:"5px",
    marginBottom: '2px',
    textAlign: 'center',
    ':hover':{
      backgroundColor: 'black',
      color: 'white',
      cursor: "pointer"
    }
  }
)

const ArticleTitle = glamorous.div(
  {
    fontSize: '25px',
    paddingLeft: '5px',
    paddingRight: '5px',
    fontWeight: 'bolder',
    pointerEvents: 'none'
  }
)

const ArticleDescription = glamorous.div(
  {
    fontSize: '15px',
    fontWeight: 'bolder',
    paddingRight: '10px',
    paddingLeft: '10px',
    pointerEvents: 'none'
  }
)

const ArticleImage = glamorous.div(
  {
    width: 'auto',
    paddingLeft: '10px',
    paddingRight: '10px',
    height: 'auto',
    maxHeight: '100%'
  }
)

const RelativeParent = glamorous.div(
  {
    position: 'relative'
  }
)

const GrandparentHolder = glamorous.div(
  {
    position:'relative',
    height: '0px',
  }
)

const ArticlesHolder = glamorous.div(
  {
    backgroundColor: 'white',
    position:'relative',
    overflow: 'hidden',
    height: '0px',
    overflowY: 'scroll'
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
  image: {
    maxHeight: '100%',
    maxWidth: '100%'
  },
  relative: {
    position: 'relative'
  }
}

const Xholder = glamorous.div(
  {
    position: "fixed",
    top: '10',
    height: '50px',
    width: '50px',
    zIndex: 5,
    backgroundColor: "black",
    borderRadius: '50px',
    right: '10',
    ":hover": {
      backgroundColor: "white",
      cursor: 'pointer',
      right: '20',
      height: '60px',
      width: '60px'
    }
  }
)

class Articlebox extends Component{

  constructor(props){
    super(props);
    this.state={
      aflagclicked: -1,
      articlefieldref: {},
      loadingstatus: 'quiet'
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.newssource==="Click to Search News" && this.props.newssource!="Click to Search News"){
      this.props.xholdervisiblearticles(false);
    }
    if (this.props.newssource==="Click to Search News" && nextProps.newssource!="Click to Search News"){
      setTimeout(()=>{
        this.props.xholdervisiblearticles(true);
      },2200)
    }
    if (nextProps.aflagclicked!=this.state.aflagclicked) {
      this.setState({
        aflagclicked: nextProps.aflagclicked
      })
    }
    if (nextProps.newssource!=this.props.newssource && this.props.newssource==="Click to Search News"){
      this.setState({
        loadingstatus: 'loading'
      })
      console.log('LOADING ARTICLEBOX>>>');
    }
  }


  handlesendurl(e){
    var urltosend = e.target.getAttribute('data-url');
    this.props.articleurlassign(urltosend);
  }

  componentDidUpdate(nextState){
    var self = this;

    if (this.state.loadingstatus === "loading"){
      this.setState({
        loadingstatus: 'doneloading'
      })
      console.log('<<<DONE LOADING ARTICLEBOX');
    }

    if (this.props.newspublishedat.length>0){
      var scrolled = false;
      for (var x=0; x<this.props.newsarticlearray.length; x++ ){
        if (this.refs[x].props['data-activestatus']==='active'){
          if(scrolled===false){
            var containerref = this.refs['scrollcontainer'];
            scrollIntoViewIfNeeded(this.articlefield[x], {
              duration: 1500
            })
            var node = this.articlefield[x];
            this.flashcolor(node);
            self.props.resetsvgflag();
            scrolled=true;
          }
        }
      }
    }
  }

  flashcolor(node){
    var savedstyle = node.style
    node.style.backgroundColor = `rgb(0,0,0)`;
    node.style.color = `rgb(256,256,256)`
    setTimeout(()=>{
      node.style=savedstyle
    },1000)
  }

  componentDidMount(){
    console.log('$$$$$$$$$$$$');
    console.log('MOUNTED THE ARTICLEBOX');
    console.log('$$$$$$$$$$$$');
  }

  render(){

    let oneArticle;
    var self = this;
      if(this.props.newsarticlearray.length!=0){
            oneArticle = this.props.newsarticlearray.map((article,i) => {
              this.articlefield=[];
              if (this.props.newspublishedat.length>0){
                if (i===this.props.flagkeyclicked){
                  var activestatus = 'active'
                }else{
                  var activestatus = 'inactive'
                }
              }else{
                var activestatus = 'inactive'
              }
              return (
                <ArticleField
                key={i}
                data-url={article.url}
                data-activestatus={activestatus}
                ref={i}
                innerRef={r => (this.articlefield[i]=r)}
                onClick={(e)=>{this.handlesendurl(e)}}>
                  <ArticleTitle>
                    <p>
                      <ArticleImage><img style={styles.image} src={article.urlToImage}/></ArticleImage> {article.title}
                    </p>
                  </ArticleTitle>
                  <ArticleDescription>
                    <p>
                      {article.description}
                    </p>
                  </ArticleDescription>
                </ArticleField>
              );
            });
      }

    return (
      <div>
          <VelocityComponent animation={{height: this.props.newssource==="Click to Search News"?`0px`:'600px'}} duration={1000} delay={1000}>
            <ArticlesHolder innerRef={r => (this.articlesHolderRef = r)}>
              <AlignContainer>
                {oneArticle}
              </AlignContainer>
            </ArticlesHolder>
          </VelocityComponent>
      </div>
    )
  }
}

export default Articlebox
