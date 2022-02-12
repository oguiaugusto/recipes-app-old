import React from 'react';
import { HashRouter } from 'react-router-dom';
import GeneralProvider from './context/GeneralProvider';
import Routes from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <HashRouter>
      <GeneralProvider>
        <Routes />
      </GeneralProvider>
    </HashRouter>
  );
}

export default App;
