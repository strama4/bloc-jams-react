import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Album from './components/Album.js';
import Landing from './components/Landing.js';
import Library from './components/Library.js';

class App extends Component {
  render() {
    return (
      <div className="App mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">            
            <span className="mdl-layout__title">Bloc Jams</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation nav-spaced mdl-layout--large-screen-only">
              <Link to='/' className="mdl-navigation__link">Landing</Link>
              <Link to='/library' className="mdl-navigation__link">Library</Link>
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Bloc Jams</span>
          <nav className="mdl-navigation nav-spaced">
            <Link to='/' className="mdl-navigation__link">Landing</Link>
            <Link to='/library' className="mdl-navigation__link">Library</Link>
          </nav>
        </div>
        <main className="mdl-layout__content">
          <div className="page-content">
            <Route exact path="/" component={Landing} />
            <Route path="/library" component={Library} />
            <Route path="/album/:slug" component={Album} />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
