import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Progress from './components/Progress/Progress';
import Register from './components/Register/Register';
import LogRegister from './components/LogRegister/LogRegister';

function App() {
  const user = { id: 1, login: 'Ivan' };

  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/progress" element={<Progress user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LogRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
