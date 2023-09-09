import React, { useState, useEffect } from 'react';

import './App.css';
import {Board} from './Components/Board';
import { Selector } from './Components/Selector';
import { ResetBoard } from './Components/ResetBoard';
<style>
  @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
</style>

function App() {
  const [computermove, setComputerMove] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [win, setWin] = useState(false);
  const [selected, setSelected] = useState("X");
  const [winningcomb, setWinningComb] = useState([]);

  const win_conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const handleResetBoard = () => {
    setBoard(Array(9).fill(null));
    setWin(false);
    setPlayer(selected);
    setWinningComb([]);
  }

  const handleMoves = (boxIdx, str) => {
    if(win===true) return;
    const updatedBoard = [...board];
    updatedBoard[boxIdx] = player;
    setBoard(updatedBoard);
    const seq = iswinning(updatedBoard);
    if(seq){
      setWinningComb(seq);
      setWin(true);
      setTimeout(() => {
      window.alert(str + " won!");
    }, 0);
    };
    if (updatedBoard.every((cell) => cell !== null)) {
      window.alert("Game draw!");
    }
    setPlayer(player==='X'?'O':'X');
  }

  const handleUserMove = (boxIdx) => {
    handleMoves(boxIdx, "Player");
    setComputerMove(!computermove);
  }

  const handleComputerMove = (boxIdx) => {
    handleMoves(boxIdx, "Computer");
  }

  const handlePlayerSelect = (selectedSymbol) => {
    handleResetBoard();
    setWin(false);
    setPlayer(selectedSymbol);
    setSelected(selectedSymbol);
  }

  const iswinning = (board)=>{
      for(let i=0; i<win_conditions.length; i++){
        const [a, b, c] = win_conditions[i];
        if(board[a] && board[a]===board[b] && board[a]===board[c]){
          return [a, b, c];
        }
      }
      return null;
    }

    useEffect(() => {
      if(computermove!=null && win===false && board.includes(null)){
        fetch('https://hiring-react-assignment.vercel.app/api/bot',{
          method: 'POST',
          body: JSON.stringify(board),
        })
        .then((response) => response.json())
        .then((data) => handleComputerMove(data));
      }
    }, [computermove]);

  return (
    <div className="App">
      <Selector selected={selected} onClick={handlePlayerSelect} />
      <Board board={board} winningcomb={winningcomb} onClick={handleUserMove} />
      <ResetBoard onClick={handleResetBoard}/>
    </div>
  );
}

export default App;
