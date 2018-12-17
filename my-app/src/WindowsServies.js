// Created by Kevin Gunawan

import React from 'react'
import createSpeechRecognitionPonyfill from 'web-speech-cognitive-services/lib/SpeechServices/SpeechToText/createSpeechRecognitionPonyfill';
import password from './secrets'


class MicrosoftRecording extends React.Component{
    constructor(props){
      super(props);
      this.state ={listening:false, message: 'Me'}
      this.toggleListen= this.toggleListen.bind(this);
      this.handleListen=this.handleListen.bind(this);
      this.stopRecognition =this.stopRecognition.bind(this);
    }
  
    toggleListen(){
        console.log("Hello")
          this.setState({
              //stop listening when button is pressed
              listening: !this.state.listening
          },() => {this.handleListen()})
    }
  
    handleListen(){
      var lastRecognized="";

      if(this.state.listening){
        var SpeechSDK = window.SpeechSDK;
        var speechConfig = SpeechSDK.SpeechConfig.fromSubscription(password,'southeastasia')
        // console.log(speechConfig);
        speechConfig.language="en-US";
        var audioConfig= SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        this.recognizer = new SpeechSDK.SpeechRecognizer(speechConfig,audioConfig);
        // console.log(recognizer);
        console.log("start")
        this.recognizer.recognizing =function(e){
          console.log(e)
          console.log("listening")
          document.getElementById('interim').innerHTML+="(recognizing)Reason: "+ SpeechSDK.ResultReason[e.result.reason] + "Text:" +e.result.text +"\r\n";
          document.getElementById('final').innerHTML= lastRecognized + e.result.text;
          
        };
  
        this.recognizer.recognized = function(s,e){
          console.log(e);
          console.log("recognised")
  
          if(e.result.reason === SpeechSDK.ResultReason.NoMatch){
            var noMatchDetail = SpeechSDK.NoMatchDetails.fromResult(e.result);
            document.getElementById('interim').innerHTML+= "(recognized) Reason: "+ SpeechSDK.ResultReason[e.result.reason] +" NoMatchReason: "+SpeechSDK.NoMatchReason[noMatchDetail.reason]+ "\r\n";
            
          }
          else{
            document.getElementById('interim').innerHTML+="(recognized) Reason: " + SpeechSDK.ResultReason[e.result.reason]+ " Text: "+e.result.text +'\r\n';
          }
  
          lastRecognized += e.result.text +"\r\n";
          document.getElementById('final').innerHTML+= lastRecognized;
  
        }
  
        this.recognizer.canceled = function(s,e){
          console.log(e);
          document.getElementById('interim').innerHTML+="(cancel) Reason: " +SpeechSDK.CancellationReason[e.reason];
          if(e.reason === SpeechSDK.CancellationReason.Error){
            document.getElementById('interim').innerHTML+=": "+ e.errorDetails;  
  
          }
          document.getElementById('interim').innerHTML+="\r\n";
        }
  
        this.recognizer.sessionStarted =function (s,e){
          console.log(e);
          document.getElementById('interim').innerHTML+= "(sessionStarted) SessionId: "+ e.sessionId +"\r\n";
        }
  
        this.recognizer.sessionStopped =function(s,e){
          console.log(e);
          document.getElementById('interim').innerHTML+= "(sessionStopped) SessionId: "+ e.sessionId +"\r\n";
  
        }
  
        this.recognizer.speechStartDetected =function(s,e){
          console.log(e);
          document.getElementById('interim').innerHTML+= "(speechStartDetected) SessionId: "+ e.sessionId +"\r\n";
        }
  
        this.recognizer.speechEndDetected = function(s,e){
          console.log(e);
          document.getElementById('interim').innerHTML+= "(speechEndDetected) SessionId: "+ e.sessionId +"\r\n";
        }
    
        this.recognizer.startContinuousRecognitionAsync();

      }
      else{
          //press button to stop recording
          {this.stopRecognition()}
          console.log('stop')
          
  
      }

     
    }
  
    stopRecognition(){
      this.recognizer.stopContinuousRecognitionAsync(
        ()=>{
          this.recognizer.close();
          this.recognizer=undefined;
        },
        (err)=>{
          this.recognizer.close();
          this.recognizer=undefined;
        }
      )
      
    }
  
    render(){
      return(
        <div>
          <p>Testing of microsoft</p>
          <button onClick={this.toggleListen}>Click to listen</button>
          <div id="interim"></div>
          {/* put this div in the other index.js that encompassess the model */}
          <div id="final"></div>
        </div>
      )
    }
  
    
  }

export default MicrosoftRecording
