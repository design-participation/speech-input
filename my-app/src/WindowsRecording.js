import { createFetchTokenUsingSubscriptionKey, SpeechGrammarList, SpeechRecognition, _default } from 'web-speech-cognitive-services';
import DictateButton from 'react-dictate-button';
import React from 'react';
import token from './secrets'

const extra ={ fetchToken: createFetchTokenUsingSubscriptionKey(token)}

const element= <h1>Hello Windows</h1>

class App extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleDictate = this.handleDictate.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleError = this.handleError.bind(this);
        this.state={
            start:false,
            final:false,
            interim:false,
            error:false
        }
    }

    handleClick(){
        console.log("start");
        this.setState(()=>({
            start:!this.state.start
        }))
    }

    handleDictate({result}){
        console.log("finalising");
        // alert(result.transcript);
        this.setState(()=>({
            error:null,
            final:result,
            interim:null
        }));
        // console.log(buildSpeechResult(this.state.final,true,true));
    }

    handleProgress({results}){
        console.log("Listening");
        this.setState(()=>({
            error:null,
            final:null,
            interim: results
        }));
        // if(this.state.start){
        //     _default.onend=()=>{
        //         console.log("continue")

        //     }
        // }
    }

    handleError({error}){
        console.warn(error);
        this.setState(()=>({error}));
    }

    render(){
        return(
            <div>
                <h1>Hello Windows</h1>
                <DictateButton
                extra={extra}
                onDictate={this.handleDictate}
                onError={this.handleError}
                onProgress={this.handleProgress}
                SpeechGrammarList={SpeechGrammarList}
                SpeechRecognition= {SpeechRecognition}
                onClick={this.handleClick}

                > Start Recording </DictateButton>
                <h2>Dictation result</h2>
                <div className="container">
                    <p>{this.state.error ? this.state.error : null}</p>
                    <p>Result: {this.state.final? this.state.final.transcript : ""}</p>
                    {/* <p>Interim: {this.state.interim ? this.state.interim.map((interim,index)=><span key={index}>{this.state.interim.transcript}</span>) : "fail"}</p> */}
                </div>
            </div>
        )
    }
}

export default App;