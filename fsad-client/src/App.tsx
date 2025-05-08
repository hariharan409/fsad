import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Drives from './pages/Drives';
import Reports from './pages/Reports';
import { useAuthContext } from './context/AuthContext';

const App = () => {
  const { user } = useAuthContext(); // ✅ reactive login check

  return (
    <Router>
      {user && <Navbar />}
      <div className="">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={user ? <ProtectedRoutes /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/drives" element={<Drives />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default App;
