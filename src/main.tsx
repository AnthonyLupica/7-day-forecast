import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'semantic-ui-css/semantic.min.css';
import { ForecastContext } from './context/context.ts';
import { context } from './context/context.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ForecastContext.Provider value={context}>
      <App />
    </ForecastContext.Provider>
  </React.StrictMode>
);
