import React, { useState } from 'react';
import './App.css';
import Popup from './Popup';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [isXnext, setisXnext] = useState(true); //X is always the first player coz game logic ting, it only checks to make a move once a button has been clicking meaning if O is the first player no moves happen and honestly i cant be bothered with changing the entire game logic just so the fucking first move can be randomized i hate minimax
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [showPopup, setShowPopup] = useState(false);
  const [winner, setWinner] = useState(null);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return (squares[a]+ " wins!");
      }
    }
  let nullcount = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null){
      nullcount++;
  }
  }
    if (nullcount === 0){
  return ("Its a draw!");
  }

    return null;
  }

  function randomMove(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        const nextSquares = squares.slice(); // Make a copy of the squares array
        nextSquares[i] = 'O'; // Modify the copy of the array
        setSquares(nextSquares); // Update the state with the new array
        return;
      }
    }
  }
  
  function bestMove(squares){
    let bestScore = -Infinity
    let move;
    console.log(squares)
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null){
        const nextSquares = squares.slice(); // Make a copy of the squares array
            nextSquares[i] = 'O'; 
            let score = minimax(nextSquares,0, true); 
            if (score > bestScore){
              bestScore = score;
              move = i; 
            }
      }
    }
    const nextnextSquares = squares.slice();
    nextnextSquares[move] = 'O';
    setSquares(nextnextSquares); // Update the state with the new array

  }

  let scores = {
    'X wins!':-1,
    'O wins!': 1,
    'Its a draw' : 0
  }

  function minimax(squares, depth, isMaximixing){
    let result = calculateWinner(squares);
    if (result != null){
      let score = scores[result];
      return score;
    }

    if (isMaximixing){
      let bestScore = -Infinity;
      for (let i = 0; i < squares.length; i++){
        if (squares[i]= null){
          const nextSquares = squares.slice();
          nextSquares[i] = 'O';
          let score = minimax(squares, depth+1,false);
          bestScore = max(score, bestScore)
          }
        }
        return bestScore;
      }
      
    else {
      let bestScore = Infinity;
      for (let i = 0; i < squares.length; i++){
        if (squares[i]= null){
          const nextSquares = squares.slice();
          nextSquares[i] = 'X';
          let score = minimax(squares, depth+1,true);
          bestScore= min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
  
    const nextSquares = squares.slice();
  
    if (isXnext) {
      nextSquares[i] = 'X';
    }

    
    setSquares(nextSquares);
    setisXnext(false);
    bestMove(nextSquares); 
    setisXnext(true);

    const calculatedWinner = calculateWinner(nextSquares);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
      setShowPopup(true);
    }
  }

  function handlePopupClose() {
    setShowPopup(false);
  }

  function handlePlayAgain() {
    setSquares(Array(9).fill(null));
    setisXnext(true);
    setWinner(null);
    setShowPopup(false);
  }

  let status;
  if (winner) {
    status = winner;
  } else {
    status = 'Next player: ' + (isXnext ? 'X' : 'O');
  }

  return (
    <>
      <h1> TIC TAC TOE BOZO</h1>
      <h2 className='status'> {status} </h2>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      {showPopup && (
        <Popup
          winner={winner}
          onClose={handlePopupClose}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </>
  );
      }