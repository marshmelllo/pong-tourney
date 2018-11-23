import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import colors from '../colors';
import Player from './Player';

const UpcomingGameCard = ({
  date,
  players,
}) => {
  const date2 = new Date(date);
  date2.setDate(date2.getDate() + 1);
  return (
    <Paper className="upcoming-game-card">
      <div style={{ width: '100%', textAlign: 'right', fontWeight: '500' }}>
        {date2.toDateString()}
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        {players.map((player) => {
          return (<Player name={player}/>);
        })}
      </div>
    </Paper>
  );
}

export default UpcomingGameCard;
