import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SpeechRecognition from 'react-speech-recognition';
import PropTypes from 'prop-types';

//initialisation of web speech api
// const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

const hello= <h1>Hello World</h1>

const propTypes ={
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool,
    startListening: PropTypes.func
}
class Dictaphone extends React.Component {
    render() {
      const { transcript, resetTranscript, browserSupportsSpeechRecognition , startListening } = this.props
  
    //   if (!browserSupportsSpeechRecognition) {
    //     return null
    //   }
  
      return (
        <div>
          <button onClick={startListening}>Reset</button>
          <span>{transcript}</span>
        </div>
      )
    }
}

Dictaphone.propTypes=propTypes

export default SpeechRecognition(Dictaphone)

class Recording extends React.Component{
    constructor(props){
        super(props)
        this.state={message:"Click to Start",active:false}
        this.handleClick= this.handleClick.bind(this)
    }

    handleClick(){
        this.setState({message:"Recording",active: !this.state.active},()=>{
            if(!this.state.active){
                this.setState({message:"Click to Start"})
            }
        })
    }

    render(){
        return(
            <div>
                <h1>{this.state.message}</h1>
                <button className="btn btn-primary" onClick={this.handleClick}>{this.state.active?"Stop":"Record"}</button>
            </div>
            
        )
    }
}

ReactDOM.render(
    <Dictaphone />,
    document.getElementById('root')
)

ReactDOM.render(
    hello,
    document.getElementById('sub')
)