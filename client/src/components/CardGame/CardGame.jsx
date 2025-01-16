import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";

const CardGame = () => {
  const { themeId } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axiosInstance.get(`/card/${themeId}`);
        setCards(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке карточек:", error);
        setError("Ошибка при загрузке карточек");
      }
    };

    fetchCards();
  }, [themeId]);

  const handleCheckAnswer = async () => {
    const currentCard = cards[currentCardIndex];
    const isAnswerCorrect =
      currentCard.russian.toLowerCase() === userAnswer.toLowerCase();
    setIsCorrect(isAnswerCorrect);

    setTimeout(() => {
      if (currentCardIndex + 1 < cards.length) {
        setCurrentCardIndex((prevIndex) => prevIndex + 1);
        setUserAnswer("");
        setIsCorrect(null);
      } else {
        navigate("/theme");
      }
    }, 1000);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (cards.length === 0) {
    return <div>Загрузка карточек...</div>;
  }

  const currentCard = cards[currentCardIndex];

  if (!currentCard) {
    return <div>Карточки не найдены.</div>;
  }

  return (
    <div>
      <h1>
        Карточка {currentCardIndex + 1} из {cards.length}
      </h1>
      <div>
        <p>Слово на английском: {currentCard.english}</p>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Напиши на русском"
        />
        <button onClick={handleCheckAnswer}>Проверить</button>
      </div>
      {isCorrect !== null && <p>{isCorrect ? "Правильно!" : "Неверно :("}</p>}
    </div>
  );
};
export default CardGame;
