import axiosInstance from '../../services/axiosInstance';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ThemePage({ user }) {
  const [themeCard, setThemeCard] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/theme/all').then((theme) => {
      setThemeCard(theme.data);
      console.log(theme);
    });
  }, []);

  if (!user) {
    return (
      <div
        style={{
          display: 'flex',
          gap: '20px',
          padding: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '90vh',
        }}
      >
        Авторизуйтесь
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
      }}
    >
      {themeCard.map((theme) => (
        <Card
          key={theme.id}
          style={{
            width: '22rem',
            height: '28rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = 'scale(1.05)')
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Card.Img
            variant="top"
            src={`http://localhost:3000${theme.imagePath}`} // Используем imagePath из данных темы
            style={{
              height: '200px',
              objectFit: 'cover',
            }}
          />
          <Card.Body
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Card.Title
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              {theme.name}
            </Card.Title>
            <Button
              variant="primary"
              onClick={() => navigate(`/card/${theme.id}`)}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1.1rem',
              }}
            >
              Выбрать
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
