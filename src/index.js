import React from 'react';
import ReactDOM from 'react-dom/client';
// import { customAxios } from './utils/axios';
import axios from 'axios';
import App from './App';

// http://127.0.0.1:5317/ - local
//axios.defaults.baseURL = 'http://192.168.1.18/'; //내부
//axios.defaults.baseURL = 'http://106.254.248.154:55317/'; //외부

// 서버 올릴 때 앞주소 맟추기
// const baseURL = window.location.host;
axios.defaults.baseURL = 'https://121.140.7.121:1444/api/'; //local-전용
// axios.defaults.baseURL = '/edu_api/v1'; //교육
// axios.defaults.baseURL = 'https://' + baseURL + '/api/v1';
axios.defaults.withCredentials = true;
axios.defaults.headers = {
	'Content-Type': 'application/json'
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
