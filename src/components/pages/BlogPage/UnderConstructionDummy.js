// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React, { Component } from 'react'
import { PrimaryNavigationGlam, AlignContainer } from 'components'
import glamorous from "glamorous";
import styled from 'styled-components';

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






class BlogPage extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <PrimaryNavigationGlam className="navbarfixed"/>
        <br/><br/><br/><br/>
        <AlignContainer style={styles.contentcontainer}>
          <UnderConstruction style={styles.floatleft}>&#128679; Under Construction &#128679;</UnderConstruction>
          <br/>
          <UnderConstructionSub>Check back soon for updates!</UnderConstructionSub>
        </AlignContainer>
      </div>
    )
  }
}

export default BlogPage
