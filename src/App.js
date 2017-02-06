import React, { Component } from 'react';

// Component
import Applicants from './containers/Applicants';
import './App.css';
import logoSvg from './assets/white-logo.svg';

class App extends Component {
  render() {
    return (
      <div>
        <header className='header'>
          <div className='logo'>
            <img role="presentation" src={logoSvg}/>
          </div>
          <h1>Hack the North // Applicants</h1>
        </header>
        <section>
          <Applicants />
        </section>
      </div>
    );
  }
}

export default App;
