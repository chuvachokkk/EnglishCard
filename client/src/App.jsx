import { Route, Routes } from 'react-router-dom';
import './App.css';
import ThemePage from './components/ThemePage/ThemePage';
import Profile from './components/Profile/Profile';
import Progress from './components/Progress/Progress';
import Register from './components/Register/Register';
import LogRegister from './components/LogRegister/LogRegister';
import CardGame from './components/CardGame/CardGame';

function App() {
  const user = { id: 1, login: 'Ivan' };

  return (
    <Routes>
      <Route path="/profile" element={<Profile user={user} />} />
      <Route path="/progress" element={<Progress user={user} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<LogRegister />} />
      <Route path="/theme" element={<ThemePage />} />
      <Route path="/card/:themeId" element={<CardGame />} />
    </Routes>
  );
}

export default App;
