// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React, { Component } from 'react'
import { PrimaryNavigationGlam, AlignContainer } from 'components'
import styled from 'styled-components'
import axios from 'axios';
import renderIf from 'render-if'
import glamorous from "glamorous";
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

const Callout = glamorous.div(
  {
    textAlign: "center",
    backgroundColor: "#393E41",
    color: "#E7E5DF",
    fontSize: '50px',
    borderRadius: "20px",
    padding: '20px',
    borderStyle: "none",
    width: '60%',
    margin: '0 auto'
  }
)

const ThanksBox = glamorous.div(
  {
    width: '60%',
    padding: '20px',
    backgroundColor: '#393E41',
    margin: '20px',
    color: '#E7E5DF',
    fontSize: '25px'
  }
)

const ButtonGlam = glamorous.div(
  {
    width: '80%',
    backgroundColor: '#393E41',
    color: '#E7E5DF',
    padding: '14px 20px',
    margin: '8px 0',
    fontSize: '25px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    ':hover':{
      backgroundColor: 'tomato',
      color: 'white'
    }
  }
)


const styles = {
  button: {
    // marginTop: '6px',
    // marginRight: '10px',
    // marginBottom: '6px',
    width: '80vw',
    margin: '0 auto',
    backgroundColor: '#70A37F',
    color: 'white',
    padding: '14px 20px',
    margin: '8px 0',
    fontSize: '25px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  form: {
    minWidth: '80vw',
    textAlign:  'center'
  },
  input: {
    minWidth: '80vw',
    padding: '12px 20px',
    margin: '8px 0',
    display: 'inline-block',
    backgroundColor: '#D3D0CB',
    fontSize: '25px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
    // width: '1000px'
  },
  textarea:{
    minWidth: '80vw',
    minHeight: '40vh',
    fontSize: '25px',
    padding: '12px 20px',
    margin: '8px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#D3D0CB',
    boxSizing: 'border-box',
    rows:'10',
    cols: '40'
  },
  pagecontainer:{
    minHeight:"94vh",
    height: '110vh',
    background: "#232526",  /* fallback for old browsers */
    background: "-webkit-linear-gradient(to bottom, #414345, #232526)", /* Chrome 10-25, Safari 5.1-6 */
    background: "linear-gradient(to bottom, #414345, #232526)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
};



class MessagePage extends Component{
  constructor(props){
    super(props);
    this.state={
      emailvalue: 'Your email',
      bodyvalue: 'Your message',
      popupthanks: false
    }
  }

  submitfunc(e){
//     $.ajax({
//     url: "https://formspree.io/you@email.com",
//     method: "POST",
//     data: {message: "hello!"},
//     dataType: "json"
// });
    var messagevalue = 'email: '+this.state.emailvalue + 'body: ' + this.state.bodyvalue;
    e.preventDefault();
    axios.post('http://formspree.io/pweyand@gmail.com',{
      data: {message: messagevalue},
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response=>{
      console.log('response from formspree is ', response);
      this.setState({
        emailvalue: '',
        bodyvalue: '',
        popupthanks: true
      })
    })
    .catch(err=>{
      console.log('there was an error ', err);
    })
  }


  render(){
    return (
      <div>
        <AlignContainer>
          <PrimaryNavigationGlam/>
          <br/><br/>
          <FlexColumn style={styles.pagecontainer}>
            <Flex1>
              <Callout>
                <p>
                  Hi! Send me a message, and I&#39;ll be sure to get back to you.
                </p>
              </Callout>
            </Flex1>
            <Flex1>
            <FlexRow>
              <AlignContainer>
                <form style={styles.form}
                onSubmit={()=>{this.submitfunc()}}>
                    <input style={styles.input}
                    value={this.state.emailvalue}
                    onClick={()=>{this.setState({emailvalue: '', popupthanks: false})}}
                    onChange={(e)=>{this.setState({emailvalue:e.target.value, popupthanks: false})}}
                    type="email" name="email" placeholder="Your email"/><br/>
                    <textarea
                    value={this.state.bodyvalue}
                    onClick={()=>{this.setState({bodyvalue: '', popupthanks: false})}}
                    onChange={(e)=>{this.setState({bodyvalue:e.target.value, popupthanks: false})}}
                    style={styles.textarea} name="message" placeholder="Your message"></textarea>
                    <AlignContainer>
                      <ButtonGlam onClick={(e)=>{this.submitfunc(e)}}>Send</ButtonGlam>
                    </AlignContainer>
                    {renderIf(this.state.popupthanks===true)(
                      <AlignContainer>
                        <ThanksBox>
                          <p>
                            Thanks for reaching out. I&#39;ll be in touch!
                          </p>
                        </ThanksBox>
                      </AlignContainer>
                    )}
                </form>
              </AlignContainer>
            </FlexRow>
            </Flex1>
            <Flex1/>
          </FlexColumn>
        </AlignContainer>
      </div>
    )
  }
}

export default MessagePage
