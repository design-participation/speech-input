// created by Kevin Gunawan

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
recognition.lang='en-US';
//introduce upto 10 different answer alternatives
recognition.maxAlternatives=10;

var ed= require('edit-distance');
var insert,remove,update;
insert=remove=function(node){return 1;};
update= function(stringA,stringB){return stringA!==stringB?1:0;};


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
            recognition.start();
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
        let finalTranscript='';
        let list="";
        recognition.onresult= event => {
            let interimTranscript=''
            console.log(event.results);
            console.log(event.resultIndex);
            //the following for loop is based from the documentation provided by MDN
            for(let i= event.resultIndex; i<event.results.length;i++){
                const transcript = event.results[i][0].transcript;
                const confidence = event.results[i][0].confidence;
                if(event.results[i].isFinal){
                    let finalArray=[];
                    let minArray=[];
                    for(let x=0;x<event.results[i].length;x++){
                        let script= event.results[i][x].transcript;
                        let conf= event.results[i][x].confidence;
                        //getting the min distance
                        let lev= ed.levenshtein(event.results[i][0].transcript,event.results[i][x].transcript,insert,remove,update);
                        finalArray.push({text:script,percent:conf,distance:lev.distance})
                        if(x!=0){
                            minArray.push(lev.distance);
                        }
                        if(x==1){
                            var wordErrorRates= ed.levenshtein(event.results[i][0].transcript,event.results[i][1].transcript,insert,remove,update).distance;
                            var wordErr= wordErrorRates / (event.results[i][0].transcript.length);
                            console.log("wordErr"+wordErr);
                        }
                    }
                    finalTranscript+= transcript;
                    console.log(finalArray);
                    console.log(minArray);
                    console.log(Math.min(...minArray));
                    //calculating the oracle
                    var oracle= (Math.min(...minArray)/finalTranscript.length);
                    console.log(oracle);
                    finalArray.forEach(element => {
                        list+="<li>"+element.text+"("+element.percent+","+element.distance +")"+"</li>"
                    });
                    // document.getElementById('results').innerHTML+= list;
                }
                else{
                    interimTranscript += transcript;
                }
            }
            //putting the words in the respective div
            document.getElementById('interim').innerHTML = interimTranscript;
            document.getElementById('final').innerHTML+='<strong>'+finalTranscript+'</strong>';
            if(oracle){
                document.getElementById('final').innerHTML+='<p>Oracle: '+oracle+' '+'WER: '+wordErr+'</p>';
            }
            if(list){
                document.getElementById('final').innerHTML+="<ol>"+list+"</ol>"+"<hr/>";
            }
            // document.getElementById('final').innerHTML+=oracle;
            list="";
            finalTranscript=""
            // document.getElementById(this.props.name).innerHTML=finalTranscript
            //listening to 'Stop listening' command to stop recognition
            const transcriptArr= finalTranscript.split(' ')
            const stopCmd = transcriptArr.slice(-3,-1)
            // console.log('stopCmd',stopCmd)

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
                <div id="interim"></div>
                <div className="col-6" id="final"></div>
            </div>
            
        )
    }
}


export default Recording;