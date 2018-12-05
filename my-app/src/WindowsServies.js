import React from 'react'
import { createFetchTokenUsingSubscriptionKey,SpeechRecognition } from 'web-speech-cognitive-services';
import password from './secrets'

const recognition = new SpeechRecognition();

recognition.lang='en-US';
recognition.fetchToken= createFetchTokenUsingSubscriptionKey(password);
// recognition.continuous=true;

const element= <h1>Hello Windows</h1>;

//Component to Record Speech
class Dictate extends React.Component{
    constructor(props){
        super(props)
        this.state={listening:false}
        this.toggleListen= this.toggleListen.bind(this)
        this.handleListen = this.handleListen.bind(this)
    }

    componentDidMount(){
        console.log(recognition);
    }

    toggleListen(){
        console.log("hello")
        this.setState({
            //start when button is first clicked and stop listening when clicked again
            listening: !this.state.listening
        },()=>{this.handleListen()})
    }

    //speech recognition logic
    handleListen(){
        console.log('listening?', this.state.listening)
        
        if(this.state.listening){
            recognition.start()
            // recognition.onend=()=>{
            //     console.log("continue listening")
            //     recognition.start()
            // }
        }
        else{
            console.log('stop')
            recognition.abort()
            recognition.onend=()=>{
                console.log("stop listening per click")
            }
        }

        recognition.onresult=({results})=>{
            console.log(results);
        }
    }

    render(){
        return(
            <div>
                <div>{element}</div>
                <button className="btn btn-primary" onClick={this.toggleListen}>Press me!</button>
            </div>
            
        )
    }
}


export default Dictate
