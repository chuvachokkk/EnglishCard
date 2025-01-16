import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ProgressBar, Alert } from 'react-bootstrap';
import axiosInstance from '../../services/axiosInstance';

const Results = ({ user }) => {
  const { userId } = useParams();
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const fetchUserResults = async () => {
    try {
      const response = await axiosInstance.get(`/result/user/${userId}`);
      setResults(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке результатов:', error);
      setError('Ошибка при загрузке результатов.');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserResults();
    }
  }, [userId]);

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
                Правильных ответов: {correctAnswers} из Бесконечности ! Ведь
                английский можно изучать вечно , прям как Русский язык .
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
