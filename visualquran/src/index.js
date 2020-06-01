import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'

axios.defaults.baseURL='http://api.quran.com:3000/api/v3'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
