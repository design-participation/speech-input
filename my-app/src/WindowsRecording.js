import { createFetchTokenUsingSubscriptionKey, SpeechGrammarList, SpeechRecognition } from 'web-speech-cognitive-services';
import DictateButton from 'react-dictate-button';
import React from 'react';
import token from './secrets'

const extra ={ fetchToken: createFetchTokenUsingSubscriptionKey(token)}

const element= <h1>Hello Windows</h1>

class App extends React.Component{
    constructor(props){
        super(props);
        this.handleDictate = this.handleDictate.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleError = this.handleError.bind(this);
        this.state={
            final:false,
            interim:false,
            error:false
        }
    }

    handleDictate({result}){
        console.log("finalising");
        alert(result.transcript);
        this.setState(()=>({
            error:null,
            final:result,
            interim:null
        }));
    }

    handleProgress({results}){
        console.log("Listening");
        // alert(results.transcript);
        this.setState(()=>({
            error:null,
            final:null,
            interim: results
        }));
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

                > Start Recording </DictateButton>
                <h2>Dictation result</h2>
                <div className="container">
                    <p>{this.state.error ? this.state.error : null}</p>
                    <p>Result: {this.state.final? this.state.final.transcript : "fail"}</p>
                    <p>Interim: {this.state.interim ? this.state.interim.map((interim,index)=><span key={index}>{this.state.interim.transcript}</span>) : "fail"}</p>
                </div>
            </div>
        )
    }
}

export default App;