import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Card,
  Alert,
} from 'react-bootstrap';
import axiosInstance from '../../services/axiosInstance';

const Profile = ({ user }) => {
  const [cards, setCards] = useState([]);
  const [english, setEnglish] = useState('');
  const [russian, setRussian] = useState('');
  const [themeId, setThemeId] = useState('');
  const [themes, setThemes] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Загрузка карточек пользователя
  const fetchUserCards = async () => {
    try {
      const response = await axiosInstance.get(`/card/user/${user.id}`);
      setCards(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке карточек:', error);
      setError('Ошибка при загрузке карточек.');
    }
  };


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
        userId: user.id,
      });
      setCards([...cards, response.data]);
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

  const handleDeleteCard = async (cardId) => {
    try {
      await axiosInstance.delete(`/card/cards/${cardId}`);
      setCards(cards.filter((card) => card.id !== cardId));
      setMessage('Карточка успешно удалена!');
      setError('');
    } catch (error) {
      console.error('Ошибка при удалении карточки:', error);
      setError('Ошибка при удалении карточки.');
      setMessage('');
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserCards();
      fetchThemes();
    }
  }, [user]);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Личный кабинет</h1>
      {user ? (
        <Row>
          <Col md={8}>
            {/* Форма для создания новой карточки */}
            <Card className="p-4">
              <h3 className="mb-4">Создать новую карточку</h3>
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleCreateCard}>
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
            </Card>

            {/* Список созданных карточек */}
            <Card className="mt-4 p-4">
              <h3 className="mb-4">Мои карточки</h3>
              {cards.length > 0 ? (
                <Row>
                  {cards.map((card) => (
                    <Col key={card.id} md={6} className="mb-4">
                      <Card>
                        <Card.Body>
                          <Card.Title>{card.english}</Card.Title>
                          <Card.Text>{card.russian}</Card.Text>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteCard(card.id)}
                          >
                            Удалить
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className="text-center">
                  Вы еще не создали ни одной карточки.
                </p>
              )}
            </Card>
          </Col>
        </Row>
      ) : (
        <Alert variant="warning" className="text-center">
          Пожалуйста, войдите в систему.
        </Alert>
      )}
    </Container>
  );
};

export default Profile;
