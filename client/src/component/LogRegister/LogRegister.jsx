// LogRegister.js

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../LogRegister/LogRegister.css';

function LogRegister() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          password,
        }),
        credentials: 'include',
      });

      console.log({ response });

      if (response.status === 200) {
        localStorage.setItem('isAuthenticated', 'true'); 
        navigate('/admin'); 
      }
    } catch (err) {
      console.log(err);
      setError('Неверный логин или пароль');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form className="p-4 border rounded shadow" style={{ width: '300px' }}>
        <h2 className="mb-4 text-center">Вход / Регистрация</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Логин:</Form.Label>
          <Form.Control
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Введите логин"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Пароль:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleLogin} className="w-100 mb-2">
          Войти
        </Button>
        <Button variant="success" onClick={handleRegister} className="w-100 mb-2">
          Регистрация
        </Button>
      </Form>
    </div>
  );
}

export default LogRegister;