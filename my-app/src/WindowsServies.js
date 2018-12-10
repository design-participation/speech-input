import React from 'react'
import createSpeechRecognitionPonyfill from 'web-speech-cognitive-services/lib/SpeechServices/SpeechToText/createSpeechRecognitionPonyfill';
import password from './secrets'

class MicrosoftRecording extends React.Component{
    constructor(props){
      super(props);
      this.state ={listening:false, message: 'Me'}
      this.toggleListen= this.toggleListen.bind(this);
      this.handleListen=this.handleListen.bind(this);
    }
  //getting speech services API
    async componentDidMount(){
      const{
        SpeechRecognition
      } = await createSpeechRecognitionPonyfill({
        //make sure endpoint is correct by stating the region
        region:'southeastasia',
        subscriptionKey: password
      });
  
      this.recognition= new SpeechRecognition();
      console.log(this.recognition)
      this.recognition.interimResults = true;
      this.recognition.lang ='en-US';
      
      
      // recognition.start();
    }
  
    toggleListen(){
        console.log("Hello")
          this.setState({
              //stop listening when button is pressed
              listening: !this.state.listening
          },() => {this.handleListen()})
    }
  
    handleListen(){
      if(this.state.listening){
        console.log("start")
        this.recognition.start()
        //libary doesnt support the following function apparently. Sometimes work sometimes doesnt
        this.recognition.onend=()=> {
          this.recognition.start()
          console.log("continue listening")
        }
      }
      else{
          //press button to stop recording
          this.recognition.stop()
          console.log('stop')
          //likewise for the following 
          this.recognition.onend=() =>{
              console.log("stopped listening per click")
          }
  
      }
  
      let finalTranscript='';
      // this.recognition.onresult =({results})=>{
      //   console.log(results);
      // }
      this.recognition.onresult= event=>{
        console.log(event);
        console.log(event.results);
        let interimTranscript='';
        let arr= event.results[0]
        let script = arr[0].transcript;
        if(arr.isFinal){
          finalTranscript += script += " ";
          document.getElementById('interim').innerHTML ="";
          
        }
        else{
          interimTranscript+=script;
          console.log(interimTranscript);
        }
        //putting the words in the respective div
        document.getElementById('interim').innerHTML += interimTranscript;
        document.getElementById('final').innerHTML+=finalTranscript;
      }
  
      this.recognition.onerror = event =>{
        console.log("Error occured in recognition: " + event.error)
      }
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
