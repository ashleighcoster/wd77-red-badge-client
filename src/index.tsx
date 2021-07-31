import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Footer from './components/site/Footer';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


