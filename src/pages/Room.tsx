import React, { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/room.scss';

type RoomParams = {
  id: string;
};

const Room: React.FC = () => {
  const params = useParams<RoomParams>();
  const roomID = params.id;
  const { user } = useAuth();

  const [question, setQuestion] = useState<string>('');

  const handleSendNewQuestion = async (event: FormEvent) => {
    event.preventDefault();

    if (question.trim() === '') return;
    if (!user) throw new Error('You must be logged in to post a question');

    const newQuestion = {
      question,
      author: {
        name: user?.name,
        avatar: user?.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomID}/questions`).push(newQuestion);

    setQuestion('');
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Let me ask" />
          <RoomCode code={roomID} />
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form onSubmit={handleSendNewQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={e => setQuestion(e.target.value)}
            value={question}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta <button>faça seu login</button>.
              </span>
            )}

            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Room;
