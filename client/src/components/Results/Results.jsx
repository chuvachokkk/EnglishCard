import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Импортируем useNavigate
import { Container, Row, Col, Card, ProgressBar, Alert } from 'react-bootstrap';
import axiosInstance from '../../services/axiosInstance';

const Results = ({ user }) => {
  const { userId } = useParams(); // Получаем userId из URL, если он есть
  const navigate = useNavigate(); // Хук для перенаправления
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId && user?.id) {
      navigate(`/results/user/${user.id}`);
    } else if (userId) {
      fetchUserResults();
    }
  }, [userId, user, navigate]);

  const fetchUserResults = async () => {
    try {
      const response = await axiosInstance.get(`/result/user/${userId}`);
      console.log('Results from server:', response.data); // Логируем данные
      setResults(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке результатов:', error);
      setError('Ошибка при загрузке результатов.');
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Мои результаты</h1>
      {results.length > 0 ? (
        results.map((result) => {
          const correctAnswers = Number(result.correctAnswers) || 0;
          const totalCards = Number(result.totalCards) || 1;

          const progress = (correctAnswers / totalCards) * 100;

          return (
            <Card key={result.themeId} className="mb-4 p-3">
              <Card.Title>{result.themeName}</Card.Title>
              <Card.Text>
                Правильных ответов: {correctAnswers} из {totalCards}
              </Card.Text>
              <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
            </Card>
          );
        })
      ) : (
        <p className="text-center">Результаты отсутствуют.</p>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
    </Container>
  );
};

export default Results;
