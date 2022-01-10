import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './AuthContext';
import { DatabaseProvider } from './DbContext';



ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <DatabaseProvider>
    <App />
       </DatabaseProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


