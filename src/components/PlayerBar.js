import React, {Component} from 'react';

class PlayerBar extends Component {
    render() {
        return (
            <section className="player-bar">                
                <section id="time-control">                    
                    <p className="time-control no-spacing">
                        <input 
                            type="range" 
                            className="seek-bar mdl-slider mdl-js-slider" 
                            value={(this.props.currentTime / this.props.duration) || 0}
                            max="1"
                            min="0"
                            step="0.01"
                            onChange={this.props.handleTimeChange}
                        />
                    </p>
                    <div className="mdl-grid no-spacing">
                        <div className="mdl-cell mdl-cell--1-col current-time">{this.props.formatTime(this.props.currentTime)}</div>
                        <div className="mdl-layout-spacer"></div>
                        <button className = "mdl-cell mdl-cell--1-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" 
                            id="previous" onClick={this.props.handlePrevClick}>
                            <ion-icon name="skip-backward"></ion-icon>
                        </button>
                        <button className = "mdl-cell mdl-cell--1-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                                id="play-pause" onClick={this.props.handleSongClick}>
                            <ion-icon name={this.props.isPlaying ? "pause" : "play"}></ion-icon>
                        </button>
                        <button className = "mdl-cell mdl-cell--1-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                                id="next" onClick={this.props.handleForwardClick}>
                            <ion-icon name="skip-forward"></ion-icon>
                        </button>
                        <div className="mdl-layout-spacer"></div>
                        <div className="mdl-cell mdl-cell--1-col total-time">{this.props.formatTime(this.props.duration)}</div>
                        </div>  
                </section>
                <section id="volume-control" className="mdl-grid volume-control">
                    <div className="mdl-cell mdl-cell--1-col">
                        <ion-icon name="volume-low"></ion-icon>
                    </div>
                    <div className="mdl-cell mdl-cell--10-col">
                        <p >
                            <input 
                                type="range" 
                                className="seek-bar mdl-slider mdl-js-slider" 
                                value={this.props.volume}
                                max="1"
                                min="0"
                                step="0.01" 
                                onChange={this.props.handleVolumeChange}
                            />
                        </p>
                    </div>
                    <div className="mdl-cell mdl-cell--1-col">
                        <ion-icon name="volume-high"></ion-icon>
                    </div>
                </section>
                <section id="buttons">
                    
                </section>
            </section>
        );
    }
}

export default PlayerBar;