import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Image,
} from 'react-bootstrap';
import axiosInstance from '../../services/axiosInstance';
import CreateCard from '../CreateCard/CreateCard';
import Progress from '../Progress/Progress';

const Profile = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [username, setUsername] = useState(user?.username || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileImage, setProfileImage] = useState(user?.avatar || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.put('/user/update', {
        userId: user.id,
        newUsername: username,
        currentPassword,
        newPassword,
      });

      if (response.status === 200) {
        setMessage('Профиль успешно обновлен!');
        setError('');
        setCurrentPassword('');
        setNewPassword('');
      }
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      setError(
        error.response?.data?.message || 'Ошибка при обновлении профиля'
      );
      setMessage('');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axiosInstance.post(
          '/profile/upload-image',
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const updatedUser = { ...user, avatar: response.data.imageUrl };
        setProfileImage(response.data.imageUrl);
        setMessage('Фото профиля успешно обновлено!');
        setError('');
      } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
        setError('Ошибка при загрузке изображения.');
        setMessage('');
      }
    }
  };

  return (
    <Container fluid>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>Личный кабинет</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                active={activeTab === 'profile'}
                onClick={() => setActiveTab('profile')}
              >
                Профиль
              </Nav.Link>
              <Nav.Link
                active={activeTab === 'progress'}
                onClick={() => setActiveTab('progress')}
              >
                Прогресс
              </Nav.Link>
              <Nav.Link
                active={activeTab === 'create-card'}
                onClick={() => setActiveTab('create-card')}
              >
                Создать карточку
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {activeTab === 'profile' && (
        <Row>
          <Col md={4} className="mb-4">
            <Card className="text-center p-3">
              <Image
                src={`http://localhost:3000${profileImage}`}
                roundedCircle
                fluid
                className="mb-3"
                style={{ width: '150px', height: '150px', margin: '0 auto' }}
              />
              <Form.Group controlId="formImage" className="mb-3">
                <Form.Label>Загрузить фото профиля</Form.Label>
                <Form.Control type="file" onChange={handleImageUpload} />
              </Form.Group>
              <Card.Text>
                <strong>Имя пользователя:</strong> {username}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {user.email}
              </Card.Text>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="p-4">
              <h3 className="mb-4">Редактирование профиля</h3>
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleUpdateProfile}>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Имя пользователя</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formCurrentPassword" className="mb-3">
                  <Form.Label>Текущий пароль</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Введите текущий пароль"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formNewPassword" className="mb-3">
                  <Form.Label>Новый пароль</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Введите новый пароль"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Обновить профиль
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      )}

      {activeTab === 'progress' && <Progress user={user} />}

      {activeTab === 'create-card' && <CreateCard userId={user.id} />}
    </Container>
  );
};

export default Profile;
