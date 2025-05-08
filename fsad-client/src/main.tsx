import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './context/AuthContext'; // ✅ Import this

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Wrap your app */}
      <App />
      <Toaster />
    </AuthProvider>
  </React.StrictMode>,
);
