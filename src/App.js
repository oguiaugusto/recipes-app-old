import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GeneralProvider from './context/GeneralProvider';
import Routes from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter basename={ process.env.PUBLIC_URL }>
      <GeneralProvider>
        <Routes />
      </GeneralProvider>
    </BrowserRouter>
  );
}

export default App;
