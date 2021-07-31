import React from 'react';
import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';

const RoomCode: React.FC = () => {
  return (
    <button className="room-code">
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala -Mfxnq_blRZ-_kPOx19U?</span>
    </button>
  );
};

export { RoomCode };
