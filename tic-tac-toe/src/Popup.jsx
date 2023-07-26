import React from 'react';
import './App.css';

export default function Popup({ winner, onClose, onPlayAgain, squares }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{winner}</h2>
        <div className="board">
          {squares &&
            squares.map((value, index) => (
              <div key={index} className="board-cell">
                {value}
              </div>
            ))}
        </div>
        <button onClick={onClose}>Close</button>
        <button onClick={onPlayAgain}>Play Again</button>
      </div>
    </div>
  );
}
