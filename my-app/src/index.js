import React from 'react';
import ReactDOM from 'react-dom';
import App from './GoogleRecording'
import Test from './WindowsServies'

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
            return(
                <div>
                    <h3>Chrome!</h3>
                    <App />
                </div>
            )
        }
        else if(browser && browser.name ==='firefox'){
            console.log(browser.name);
            return(
                <div>
                    <h3>FireFox!</h3>
                    <Test />
                </div>
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