import React from 'react'
import "./Box.css"

export const Box = ({flag, value, onClick}) => {
    const style = value==='X'?"box x":"box o";
    const newstyle = flag ? `${style} win-comb` : style
  return (
    <button className={newstyle} onClick={onClick}>{value}</button>
  );
}
