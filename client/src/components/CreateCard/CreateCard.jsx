import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../../services/axiosInstance';

const CreateCard = ({ userId }) => {
  const [english, setEnglish] = useState('');
  const [russian, setRussian] = useState('');
  const [themeId, setThemeId] = useState('');
  const [themes, setThemes] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchThemes = async () => {
    try {
      const response = await axiosInstance.get('/theme');
      setThemes(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке тем:', error);
      setError('Ошибка при загрузке тем.');
    }
  };

  const handleCreateCard = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/card/cards', {
        english,
        russian,
        themeId,
        userId,
      });
      setMessage('Карточка успешно создана!');
      setError('');
      setEnglish('');
      setRussian('');
      setThemeId('');
    } catch (error) {
      console.error('Ошибка при создании карточки:', error);
      setError('Ошибка при создании карточки.');
      setMessage('');
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  return (
    <Form onSubmit={handleCreateCard}>
      <h3>Создать новую карточку</h3>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formEnglish" className="mb-3">
        <Form.Label>Английское слово</Form.Label>
        <Form.Control
          type="text"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formRussian" className="mb-3">
        <Form.Label>Русский перевод</Form.Label>
        <Form.Control
          type="text"
          value={russian}
          onChange={(e) => setRussian(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formTheme" className="mb-3">
        <Form.Label>Тема</Form.Label>
        <Form.Select
          value={themeId}
          onChange={(e) => setThemeId(e.target.value)}
          required
        >
          <option value="">Выберите тему</option>
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Создать карточку
      </Button>
    </Form>
  );
};

export default CreateCard;
