import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './index.html';


const hello= <h1>Hello World</h1>

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
    <Recording />,
    document.getElementById('root')
)

ReactDOM.render(
    hello,
    document.getElementById('sub')
)