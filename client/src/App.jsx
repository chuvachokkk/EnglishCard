import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Router } from "react-router-dom";
import { Routes } from "react-router-dom";
import ThemePage from "./components/ThemePage/ThemePage";
import React from "react";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from "./components/Profile/Profile";
import Progress from "./components/Progress/Progress";
import Register from "./components/Register/Register";
import LogRegister from "./components/LogRegister/LogRegister";
import CardGame from "./components/CardGame/CardGame";
import NaviBar from "./components/NavBar/NavBar";
import axiosInstance, { setAccessToken } from "./services/axiosInstance";

function App() {

  // const  user = { id: 1, login: "Ivan" };

  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosInstance.get('/token/refresh').then((res) => {
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
    });
  }, []);

  return (
    <>
      <NaviBar user={user} />
      <Routes>
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/progress" element={<Progress user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LogRegister user={user} setUser={setUser}/>} />
        <Route path="/theme" element={<ThemePage user={user}/>} />
        <Route path="/card/:themeId" element={<CardGame />} />
      </Routes>
    </>
  );
}

export default App;

