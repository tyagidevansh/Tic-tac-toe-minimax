import React, { useState } from 'react';
import Popup from './Popup';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Board.css';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [isXnext, setisXnext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [showPopup, setShowPopup] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isComputer, setIsComputer] = useState(true);

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
        return squares[a] + " wins!";
      }
    }

    let nullcount = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        nullcount++;
      }
    }
    if (nullcount === 0) {
      return "It's a draw!";
    }

    return null;
  }

  // function randomMove(squares) {
  //   for (let i = 0; i < squares.length; i++) {
  //     if (squares[i] === null) {
  //       const nextSquares = squares.slice(); // Make a copy of the squares array
  //       nextSquares[i] = 'O'; // Modify the copy of the array
  //       setSquares(nextSquares); // Update the state with the new array
  //       return;
  //     }
  //   }
  // }

  function bestMove(squares) {
    let bestScore = -Infinity;
    let move;
    console.log(squares);
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        const nextSquares = squares.slice(); // Make a copy of the squares array
        nextSquares[i] = 'O';
        let score = minimax(nextSquares, 0, false);
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    const nextnextSquares = squares.slice();
    nextnextSquares[move] = 'O';
    setSquares(nextnextSquares);
    const calculatedWinner = calculateWinner(nextnextSquares);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
      setShowPopup(true);
    }
  }

  let scores = {
    'X wins!': -1,
    'O wins!': 1,
    "It's a draw!": 0
  };

  function minimax(squares, depth, isMaximizing) {
    let result = calculateWinner(squares);
    if (result != null) {
      let score = scores[result];
      return score;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          const nextSquares = squares.slice();
          nextSquares[i] = 'O';
          let score = minimax(nextSquares, depth + 1, false);
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          const nextSquares = squares.slice();
          nextSquares[i] = 'X';
          let score = minimax(nextSquares, depth + 1, true);
          bestScore = Math.min(score, bestScore);
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

    

    if (isComputer === true){
      setSquares(nextSquares);
      setisXnext(false);
      bestMove(nextSquares);
      setisXnext(true);
    }
    else{
      const nextSquares = squares.slice();
      nextSquares[i] = isXnext ? 'X' : 'O';
      setSquares(nextSquares);
      setisXnext(!isXnext);
    }
      

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
    status = 'You play as X!';
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
      <div className='useButtons'>
        <button type="button" className={`btn btn-light ${isComputer ? 'inactive' : 'active'}`} onClick = {() => setIsComputer(false)}>vs Human</button>
        <button type="button" className={`btn btn-light ${isComputer ? 'active' : 'inactive'}`} style={{ marginLeft: '10px' }} onClick = {()=> setIsComputer(true)}>vs Computer</button>
      </div>
      
    </>
  );
}
