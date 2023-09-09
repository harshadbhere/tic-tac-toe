import React from 'react'
import { Box } from './Box';
import './Board.css'

export const Board = ({winningcomb, board, onClick}) => {
  return (
    <div className='board'>
        {board.map((value, idx)=>{
            return <Box value={value} flag={winningcomb.includes(idx)?true: false} onClick={()=> value===null && onClick(idx)}/>;
        })}
    </div>
  );
}
