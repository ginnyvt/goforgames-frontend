import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth0ProviderWithHistory from './auth0-config/auth0-config-with-history';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
);
