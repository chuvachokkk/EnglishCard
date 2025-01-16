import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Card,
  Alert,
  Image,
} from 'react-bootstrap';
import {
  Pencil,
  Lock,
  Trash,
  PlusCircle,
  PersonCircle,
} from 'react-bootstrap-icons'; // Иконки
import axiosInstance from '../../services/axiosInstance';

const Profile = ({ user }) => {
  const [cards, setCards] = useState([]);
  const [english, setEnglish] = useState('');
  const [russian, setRussian] = useState('');
  const [themeId, setThemeId] = useState('');
  const [themes, setThemes] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [newLogin, setNewLogin] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [avatar, setAvatar] = useState(user.avatar || '');

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

  // Загрузка списка тем
  const fetchThemes = async () => {
    try {
      const response = await axiosInstance.get('/theme');
      setThemes(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке тем:', error);
      setError('Ошибка при загрузке тем.');
    }
  };

  // Создание новой карточки
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

  // Удаление карточки
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

  // Изменение логина
  const handleUpdateLogin = async () => {
    try {
      const response = await axiosInstance.put('/auth/update-login', {
        userId: user.id,
        newLogin,
      });
      setMessage(response.data.message);
      setError('');
      setNewLogin('');
    } catch (error) {
      console.error('Ошибка при изменении логина:', error);
      setError('Ошибка при изменении логина.');
      setMessage('');
    }
  };

  // Изменение пароля
  const handleUpdatePassword = async () => {
    try {
      const response = await axiosInstance.put('/auth/update-password', {
        userId: user.id,
        currentPassword,
        newPassword,
      });
      setMessage(response.data.message);
      setError('');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Ошибка при изменении пароля:', error);
      setError('Ошибка при изменении пароля.');
      setMessage('');
    }
  };

  // Загрузка аватарки
  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('userId', user.id);

    try {
      const response = await axiosInstance.post(
        '/user/upload-avatar',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setAvatar(response.data.user.avatar);
      setMessage('Аватарка успешно загружена!');
      setError('');
    } catch (error) {
      console.error('Ошибка при загрузке аватарки:', error);
      setError('Ошибка при загрузке аватарки.');
      setMessage('');
    }
  };

  // Загружаем карточки и темы при загрузке компонента
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
          <Col md={8} className="mx-auto">
            <Card className="p-4 mb-4 shadow-sm">
              <h3 className="mb-4">
                <PersonCircle className="me-2" />
                Аватарка
              </h3>
              {avatar && (
                <Image
                  src={avatar}
                  roundedCircle
                  width={100}
                  height={100}
                  className="mb-3 d-block mx-auto"
                />
              )}
              <Form.Group controlId="formAvatar" className="mb-3">
                <Form.Label>Загрузить аватарку</Form.Label>
                <Form.Control type="file" onChange={handleUploadAvatar} />
              </Form.Group>
            </Card>
            <Card className="p-4 mb-4 shadow-sm">
              <h3 className="mb-4">
                <Pencil className="me-2" />
                Изменить логин
              </h3>
              <Form.Group controlId="formLogin" className="mb-3">
                <Form.Label>Новый логин</Form.Label>
                <Form.Control
                  type="text"
                  value={newLogin}
                  onChange={(e) => setNewLogin(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" onClick={handleUpdateLogin}>
                <Pencil className="me-2" />
                Изменить логин
              </Button>
            </Card>
            <Card className="p-4 mb-4 shadow-sm">
              <h3 className="mb-4">
                <Lock className="me-2" />
                Изменить пароль
              </h3>
              <Form.Group controlId="formCurrentPassword" className="mb-3">
                <Form.Label>Текущий пароль</Form.Label>
                <Form.Control
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formNewPassword" className="mb-3">
                <Form.Label>Новый пароль</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" onClick={handleUpdatePassword}>
                <Lock className="me-2" />
                Изменить пароль
              </Button>
            </Card>
            <Card className="p-4 mb-4 shadow-sm">
              <h3 className="mb-4">
                <PlusCircle className="me-2" />
                Создать новую карточку
              </h3>
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
                  <PlusCircle className="me-2" />
                  Создать карточку
                </Button>
              </Form>
            </Card>
            <Card className="p-4 mb-4 shadow-sm">
              <h3 className="mb-4">
                <PersonCircle className="me-2" />
                Мои карточки
              </h3>
              {cards.length > 0 ? (
                <Row>
                  {cards.map((card) => (
                    <Col key={card.id} md={6} className="mb-4">
                      <Card className="h-100 shadow-sm">
                        <Card.Body>
                          <Card.Title>{card.english}</Card.Title>
                          <Card.Text>{card.russian}</Card.Text>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteCard(card.id)}
                          >
                            <Trash className="me-2" />
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
