import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';

// 서버 올릴 때 앞주소 맟추기
// const baseURL = window.location.host;
axios.defaults.baseURL = '/api/'; //local-전용
axios.defaults.withCredentials = true;
axios.defaults.headers = {
	'Content-Type': 'application/json'
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
