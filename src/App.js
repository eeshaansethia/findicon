import React, { useState } from 'react';
import './styles/app.css';
import logo from './assets/icon.png';
import Axios from 'axios';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [icon, setIcon] = useState('');

  const getIcon = async () => {
    console.log('Pressed!')
  }
  return (
    <div className="app">
      <div className="app-left">
        <div className="app-left-new">
          <button className="app-left-new-button">
            <i className="fa-regular fa-pen-to-square"></i>
            New Prompt
          </button>
        </div>
      </div>
      <div className="app-right">
        <h1 className="app-right-name">
          <div className="app-right-name-image">
            <img className="app-right-name-image-icon" src={logo} />
          </div>
          Findicon
        </h1>
        <div className="app-right-search">
          <input className="app-right-search-input" type="text" placeholder="Type your prompt to get an icon.." value={prompt} onChange={(e) => {
            setPrompt(e.target.value);
          }} />
          <button className="app-right-search-button" onClick={getIcon}>
            <i className="fa-solid fa-search" style={{
              fontSize: '1rem'
            }}></i>
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
