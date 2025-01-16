import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Progress from './components/Progress/Progress';

export default function App() {
  const user = { id: 1, login: 'Ivan' };

  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/progress" element={<Progress user={user} />} />
      </Routes>
    </Router>
  );
}
