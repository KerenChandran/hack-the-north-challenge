import React from 'react';
import Spinner from 'react-spinkit';
import logoSvg from '../../assets/black-logo.svg';
import './Loading.css';

export default () => (
  <div className="loading">
    <div className="loading-container">
      <img className="loading-logo" role="presentation" src={logoSvg}/>
      <div className="loading-information">
        <div className="loading-text">Loading Applicants</div>
        <Spinner spinnerName='three-bounce' noFadeIn/>
      </div>
    </div>
  </div>
);
