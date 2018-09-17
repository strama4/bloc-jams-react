import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums.js';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: albumData
    };
  }

  render() {
    return (
      
      <section className="library mdl-grid">
        {
          this.state.albums.map((album, index) => 
          <div className="mdl-cell mdl-cell--3-col">
            <div className="album-card mdl-card mdl-shadow--16dp">
              <Link to={`album/${album.slug}`} key={index} >
                <div class="mdl-card__media">
                  <img src={album.albumCover} alt={album.title} height="200" />
                </div>
                <div>
                  <div className="mdl-card__subtitle">
                    <h2 className="mdl-card__subtitle-text">{album.title}</h2>
                  </div>
                  <div className>
                    <h2 className="mdl-card__subtitle-text">{album.artist}</h2>
                  </div>
                  <div>
                    <h2 className="mdl-card__subtitle-text">{album.songs.length} songs</h2>
                  </div>
                </div>
                
              </Link>
            </div>
          </div>
            
        )
        }
        
      </section>
    );
  }
}

export default Library;
