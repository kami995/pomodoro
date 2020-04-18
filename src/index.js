import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'

class App extends React.Component{
    constructor(props){
        super(props);
        this.loop = undefined;
        this.audio = React.createRef();
        this.state = {
            type: 'Session',
            breakLength: 5,
            sessionLength: 25,
            timer: 25 * 60,
            timerRunning: false
        }
    }
    reset = () => {
        this.setState({
            type: 'Session',
            breakLength: 5,
            sessionLength: 25,
            timer: 1500,
            timerRunning: false
        });
        clearInterval(this.loop);
        this.audio.current.pause();
        this.audio.current.currentTime = 0;
    }
    breakDec(){
        if(this.state.breakLength > 1 && this.state.timerRunning === false){
            this.setState({
                breakLength: this.state.breakLength - 1
            });
        }
    }
    breakInc(){
        if(this.state.breakLength < 60 && this.state.timerRunning === false){
            this.setState({
                breakLength: this.state.breakLength + 1
            });
        }
    }
    sessionDec(){
        if(this.state.sessionLength > 1 && this.state.timerRunning === false){
            this.setState({
                sessionLength: this.state.sessionLength - 1,
                timer: this.state.timer - 60
            });
        }
    }
    sessionInc(){
        if(this.state.sessionLength < 60 && this.state.timerRunning === false){
            this.setState({
                sessionLength: this.state.sessionLength + 1,
                timer: this.state.timer + 60
            });
        }
    }
    handleSS(){
        if(this.state.timerRunning){
            clearInterval(this.loop)
            this.setState({
                timerRunning: false
            });
        } else {
            this.setState({
                timerRunning: true
            });
            this.loop = setInterval(() => {
                if(this.state.timer <= 11 && this.state.timer > 0){
                    document.getElementById('time-left').style.color = 'DarkRed';
                } else {
                    document.getElementById('time-left').style.color = 'white';
                }
                if(this.state.timer === 0){
                    this.audio.current.play();
                    this.setState({
                        type: (this.state.type === 'Session') ? 'Break' : 'Session',
                        timer: (this.state.type === 'Session') ? (this.state.breakLength * 60) : (this.state.sessionLength * 60) 
                    })
                } else {
                    this.setState({
                        timer: this.state.timer - 1
                    });
                }
            }, 1000);
        }
    }

    render(){
        return(
            <div id="container">
                <h1 id="title">Pomodoro Clock</h1>
                <div id="btn-container">
                    <div id="break-set">
                        <h3 id="break-label">Break Length</h3>
                        <div id="break-decrement" onClick={() => this.breakDec()}>-</div>
                        <div id="break-length">
                            {this.state.breakLength}
                        </div>
                        <div id="break-increment" onClick={() => this.breakInc()}>+</div>
                    </div>
                    <div id="session-set">
                        <h3 id="session-label">Session Length</h3>
                        <div id="session-decrement" onClick={() => this.sessionDec()}>-</div>
                        <div id="session-length">
                            {this.state.sessionLength}
                        </div>
                        <div id="session-increment" onClick={() => this.sessionInc()}>+</div>
                    </div>
                </div>
                <div id="session">
                <h2 id="timer-label">{this.state.type}</h2>
                    <div id="time-left">
                        {(this.state.timer < 600) ? 0 : ''}
                        {Math.floor(this.state.timer / 60)}:
                        {(this.state.timer % 60 < 10)? 0 : ''}
                        {(this.state.timer  % 60)}
                    </div>
                </div>
                <div id="footer">
                    <div id="start_stop" onClick={() => this.handleSS()}>> / ll</div>
                    <div id="reset" onClick={(this.reset)}>reset</div>
                </div>
                <audio 
                ref = {this.audio}
                preload = ''
                type = "audio/wav"
                id = 'beep'
                src = 'http://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav'></audio>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))