// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LogRegister from './component/LogRegister/LogRegister';
import Register from './component/Register/Register';


//  import './App.css'
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LogRegister />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        </div>

    </Router>
  );
}

export default App;