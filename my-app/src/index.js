import React from 'react';
import ReactDOM from 'react-dom';
// import App from './GoogleRecording'
// import Test from './WindowsServies'

const {detect} = require('detect-browser');
const browser = detect();

//bug involving the conditional returning of components based on browser type

class Sorting extends React.Component{
    constructor(props){
        super(props);
        this.content= this.content.bind(this);
    }

    content(){
        if(browser && browser.name ==='chrome'){
            console.log(browser.name);
            //rendering google chrome component
            let AppComp= require('./GoogleRecording').default;
            return(
                <div>
                    <h3>Chrome!</h3>
                    <AppComp />
                </div>
            )
        }
        else if(browser && (browser.name ==='firefox' || browser.name === 'edge')){
            console.log(browser.name);
            let Microsoft=require('./WindowsServies').default;
            return(
                <div>
                    <h3>{browser.name}</h3>
                    <Microsoft />
                </div>
            )
        }
        else{
            return(
                <h5>Browser not supported!</h5>
            )
        }
    }

    render(){
        return(
            <div>
                {this.content()}
            </div>
        )
    }
}


ReactDOM.render(
    <Sorting />,
    document.getElementById('root')
)