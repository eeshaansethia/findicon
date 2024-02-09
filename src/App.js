import React, { useState, useEffect } from 'react';
import './styles/app.css';
import logo from './assets/icon.png';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import PromptCard from './components/PromptCard';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [allPrompts, setAllPrompts] = useState([]);

  const getAllPrompts = async () => {
    await Axios.get('http://localhost:3001/prompts')
      .then((res) => {
        setAllPrompts(res.data);
        console.log(res.data);
      }).catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllPrompts();
  }, []);

  const getIcon = async () => {
    if (!prompt || prompt === '' || prompt === 'null') {
      toast('Enter a valid prompt!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setLoading(true);
    setIcon(null);
    await Axios.get(`http://localhost:3001/prompts/icon?prompt=${prompt}`)
      .then((res) => {
        if (res.status !== 200) {
          setLoading(false);
          toast(res.data.error, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return;
        }
        setLoading(false);
        console.log(res.data.icon);
        setIcon(res.data.icon.data[0].url);
        setProducts(res.data.products);
        getAllPrompts();
      }
      ).catch((error) => {
        setLoading(false);
        toast('Enter a valid prompt!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  }

  return (
    <div className="app">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="app-left">
        <div className="app-left-new">
          <button className="app-left-new-button">
            <i className="fa-regular fa-pen-to-square"></i>
            New Prompt
          </button>
        </div>
        <div className="app-left-prompts">
          {allPrompts.map((prompt, index) => {
            return <PromptCard key={index} name={prompt.name} icon={prompt.icon} />
          })}
        </div>
      </div>
      <div className="app-right">
        <h1 className="app-right-name">
          <div className="app-right-name-image">
            <img className="app-right-name-image-icon" src={logo} />
          </div>
          Findicon
        </h1>
        <div className="app-right-main">

        </div>
        <div className="app-right-bottom">
          <div className="app-right-search">
            <input className="app-right-search-input" type="text" placeholder="Type your prompt to get an icon.." value={prompt} required onChange={(e) => {
              setPrompt(e.target.value);
            }} />
            <button className="app-right-search-button" onClick={getIcon} disabled={!loading && prompt ? false : true} style={{
              cursor: !loading && prompt ? 'pointer' : 'not-allowed'
            }}>
              {!loading ? <i className="fa-solid fa-search" style={{
                fontSize: '1rem'
              }}></i> : <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              }
            </button>
          </div>
          {icon && !loading ?
            <div className="app-right-main-icon">
              <img className="app-right-main-icon-image" src={icon} />
            </div>
            :
            loading && !icon ? <div className="app-right-main-icon">
              <div className='placeholder-wave' style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px'
              }}></div>
            </div> : null
          }
        </div>
      </div>
    </div>
  );
}

export default App;
