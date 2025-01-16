import axiosInstance from '../../services/axiosInstance';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ThemePage() {
  const [themeCard, setThemeCard] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/theme/all').then((theme) => {
      setThemeCard(theme.data);
      console.log(theme);
    });
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {themeCard.map((theme) => (
        <Card key={theme.id} style={{ width: '18rem' }}>
          <Card.Img
            style={{ width: 'auto' }}
            variant="top"
            src={theme.imagePath}
          />
          <Card.Body>
            <Card.Title>{theme.name}</Card.Title>
            <Button
              variant="primary"
              onClick={() => navigate(`/card/${theme.id}`)}
            >
              Выбрать
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
