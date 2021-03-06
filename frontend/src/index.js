import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Broadcast } from './pages/broadcast.js';
import { Dashboard } from './pages/dashboard.js';
import { SecondScreen } from './pages/secondscreen.js'; 
// import { Waiting } from './pages/waiting.js';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Router>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/broadcast" element={<Broadcast />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/secondscreen" element={<SecondScreen />}/>
        {/* <Route path="/waiting" element={<Waiting />}/> */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
