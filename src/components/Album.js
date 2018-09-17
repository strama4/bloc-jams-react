import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar.js';

class Album extends Component {
    constructor(props) {
        super(props);

        const album = albumData.find((album) => {
            return album.slug === this.props.match.params.slug
        });

        this.state = {
            album:  album,
            currentSong: album.songs[0],
            isPlaying: false,
            isHovering: null,
            currentTime: 0,
            duration: album.songs[0].duration,
            volume: 80
        };

        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }

    componentDidMount() {
        this.eventListeners = {
            timeupdate: e => {
                this.setState({ currentTime: this.audioElement.currentTime });
            },
            durationchange: e => {
                this.setState({ duration: this.audioElement.duration });
            },
            volumechange: e => {
                this.setState({ volume: this.audioElement.volume });
            }


        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
    }

    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true }); 
    }

    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false });
    }

    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
    }

    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (isSameSong && this.state.isPlaying) {
            this.pause();
        } else {
            if (!isSameSong) { this.setSong(song); }
            this.play();
        }
    }

    handleMouseOver(index) {
        this.setState({ isHovering: index });        
    }

    handleMouseOut() {
        this.setState({ isHovering: null });
    }

    renderIcons(song, index) {
        if (song === this.state.currentSong && this.state.isPlaying) {
            return <ion-icon name="pause"></ion-icon>;
        } 
        if (song === this.state.currentSong && !this.state.isPlaying) {
            return <ion-icon name="play"></ion-icon>;
        } 
        if (this.state.isHovering === index && song !== this.state.currentSong) {
            return <ion-icon name="play"></ion-icon>;
        }    
        return <span>{index + 1}. </span>
        }
        
    handlePrevClick() {
        const indexCurrent = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, indexCurrent - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleForwardClick() {
        const indexCurrent = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.min(indexCurrent + 1, this.state.album.songs.length-1);
        const newSong = this.state.album.songs[newIndex];
        if (newSong !== this.state.currentSong) {
            this.setSong(newSong);
            this.play();
        }
        // Button will not respond if already last song in the album.
    }

    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({ currentTime: newTime });
    }

    handleVolumeChange(e) {
        this.audioElement.volume = e.target.value;
        this.setState({ volume: e.target.value })
    }

    formatTime(time) {
        if (typeof time === 'number') {
            const minutes = ~~(time / 60);
            const remainingSeconds = ~~(time % 60); 
            const seconds = ("00" + remainingSeconds).slice(-2);
            return `${minutes}:${seconds}`;
        } else {
            return "0:00";
        }
        
    }
            
    render() {
        return (
            <div className="mdl-grid">
                <div className="mdl-layout-spacer"></div>
                <section className="album mdl-cell--middle mdl-cell--4-col">
                    <section id="album-info">
                        <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
                        <div className="album-details">
                            <h1 id="album-title">{this.state.album.title}</h1>
                            <h2 className="artist">{this.state.album.artist}</h2>
                            <div id="release-info">{this.state.album.releaseInfo}</div>
                        </div>
                    </section>
                    
                    <PlayerBar
                        isPlaying={this.state.isPlaying} 
                        currentSong={this.state.currentSong}
                        handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                        handlePrevClick={() => this.handlePrevClick()} 
                        handleForwardClick={() => this.handleForwardClick()} 
                        currentTime={(this.audioElement.currentTime)}
                        duration={(this.audioElement.duration)}
                        volume={this.audioElement.volume}
                        handleTimeChange={(e) => this.handleTimeChange(e)}
                        handleVolumeChange={(e) => this.handleVolumeChange(e)}
                        formatTime={(e) => this.formatTime(e)} 
                    />
                    <table id="song-list">
                        <colgroup>
                            <col id="song-number-column" />
                            <col id="song-title-column" />
                            <col id="song-duration-column" />
                        </colgroup>
                        <tbody>
                        { 
                            this.state.album.songs.map((song, index) => {
                                return (
                                    <tr key={index} className="song"                                 
                                    onClick={() => this.handleSongClick(song, index)}
                                    onMouseOver={() => this.handleMouseOver(index)}
                                    onMouseOut={() => this.handleMouseOut()}
                                    >
                                        {this.renderIcons(song, index)} {song.title} - {song.duration} seconds.
                                    </tr>
                                );
                            })
                        } 
                        </tbody>
                    </table>
                </section>
                <div className="mdl-layout-spacer"></div>
            </div>
            

        );        
    }
} 

export default Album;