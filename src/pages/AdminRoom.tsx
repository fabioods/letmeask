import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import answerImg from '../assets/images/answer.svg';
import checkImg from '../assets/images/check.svg';
import deleteImg from '../assets/images/delete.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import '../styles/room.scss';

type RoomParams = {
  id: string;
};

const AdminRoom = () => {
  const params = useParams<RoomParams>();
  const roomID = params.id;
  const history = useHistory();

  const { questions, title } = useRoom(roomID);

  const handleEndRoom = async () => {
    if (window.confirm('Tem certeza que você deseja excluir esta sala?')) {
      database.ref(`rooms/${roomID}`).update({
        endedAt: new Date(),
      });

      history.push('/');
    }
  };

  const handleDeleteQuestion = async (questionID: string) => {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomID}/questions/${questionID}`).remove();
    }
  };

  const handleCheckQuestionAsAnswered = async (questionID: string) => {
    await database.ref(`rooms/${roomID}/questions/${questionID}`).update({
      isAnswered: true,
    });
  };

  const handleHighlightQuestion = async (questionID: string) => {
    await database.ref(`rooms/${roomID}/questions/${questionID}`).update({
      isHighlighted: true,
    });
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Let me ask" />
          <div>
            <RoomCode code={roomID} />
            <Button isOutlined onClick={() => handleEndRoom()}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(q => (
            <Question
              key={q.id}
              content={q.content}
              author={q.author}
              isHighlighted={q.isHighlighted}
              isAnswered={q.isAnswered}
            >
              {!q.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(q.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(q.id)}
                  >
                    <img src={answerImg} alt="Dar destaque a pergunta" />
                  </button>
                </>
              )}

              <button type="button" onClick={() => handleDeleteQuestion(q.id)}>
                <img src={deleteImg} alt="Deletar pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;
