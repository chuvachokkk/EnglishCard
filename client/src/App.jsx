import { Route, Routes } from 'react-router-dom';
import './App.css';
import ThemePage from './components/ThemePage/ThemePage';
import Profile from './components/Profile/Profile';
import Progress from './components/Progress/Progress';
import Register from './components/Register/Register';
import LogRegister from './components/LogRegister/LogRegister';
import CardGame from './components/CardGame/CardGame';
import { useEffect, useState } from 'react';
import axiosInstance, { setAccessToken } from './services/axiosInstance';

function App() {
  const [user, setUser] = useState(null);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    (async function () {
      const res = await axiosInstance.get('/token/refresh');
      if (res.data) {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      }
    })();
  }, []);

  return (
    <Routes>
      <Route
        path="/profile"
        element={<Profile user={user} updateUser={updateUser} />}
      />
      <Route path="/progress" element={<Progress user={user} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<LogRegister />} />
      <Route path="/theme" element={<ThemePage />} />
      <Route path="/card/:themeId" element={<CardGame />} />
    </Routes>
  );
}

export default App;
