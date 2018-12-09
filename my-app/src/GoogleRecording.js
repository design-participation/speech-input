import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const {detect} = require('detect-browser');
const browser = detect();

//initialisation of web speech api for Google Chrome only
const SpeechRecog = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
const recognition= new SpeechRecog();

//changing the default properties of speech recognition
recognition.continous=true;
recognition.interimResults= true;
recognition.lang='en-US'


// Component to Record Speech
class Recording extends React.Component{
    constructor(props){
        super(props)
        this.state={message:"Press to Record",listening:false}
        // this.handleClick= this.handleClick.bind(this)
        this.toggleListen= this.toggleListen.bind(this)
        this.handleListen = this.handleListen.bind(this)
    }

    componentDidMount(){
        console.log(recognition);
    }

    //toggling function to initiate speech recognition. handleListen is called in callback to process the speech recognition logic
    toggleListen(){
        console.log("Hello")
        this.setState({
            //stop listening when button is pressed
            listening: !this.state.listening
        },() => {this.handleListen()})

    }

    //speech recognition logic
    handleListen(){
        console.log('listening?', this.state.listening)

        if(this.state.listening){
            recognition.start()
            recognition.onend=()=> {
                console.log("conitue listening")
                recognition.start()
            }
        }
        else{
            //press button to stop recording
            console.log('stop')
            recognition.stop()
            recognition.onend=() =>{
                console.log("stopped listening per click")
            }

        }

        recognition.onstart= ()=>{
            console.log("Listening")
        }
        //getting the words from speech recognition
        let finalTranscript=''
        recognition.onresult= event => {
            let interimTranscript=''
            //the following for loop is based from the documentation provided by MDN
            for(let i= event.resultIndex; i<event.results.length;i++){
                const transcript = event.results[i][0].transcript;
                if(event.results[i].isFinal){
                    finalTranscript+= transcript +=' ';
                }
                else{
                    interimTranscript += transcript;
                }
            }
            //putting the words in the respective div
            document.getElementById('interim').innerHTML = interimTranscript;
            document.getElementById('final').innerHTML=finalTranscript;
            //listening to 'Stop listening' command to stop recognition
            const transcriptArr= finalTranscript.split(' ')
            const stopCmd = transcriptArr.slice(-3,-1)
            console.log('stopCmd',stopCmd)

            if(stopCmd[0] == 'stop' && stopCmd[1] === 'listening'){
                recognition.stop()
                recognition.onend = () =>{
                    console.log("stop listening per command")
                    const finalText = transcriptArr.slice(0,-3).join(' ')
                    document.getElementById('final').innerHTML = finalText
                }
            }
        }
        //checking whether there are any errors during recognition
        recognition.onerror = event =>{
            console.log("Error occured in recognition: " + event.error)
        }

        
    }


    render(){
        return(
            <div>
                {/* <h1>{this.state.message}</h1> */}
                {/* {this.state.active?"Stop":"Record"} */}
                <button className="btn btn-primary" onClick={this.toggleListen}>{!this.state.listening ? "Press to Record": "Press to Stop"}</button>
                <div className="col-6" id="final"></div>
                <div id="interim"></div>
            </div>
            
        )
    }
}


export default Recording;