import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { Toaster } from './components/ui/toaster'; // ✅ This

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster /> {/* ✅ Add this here */}
  </React.StrictMode>,
);
