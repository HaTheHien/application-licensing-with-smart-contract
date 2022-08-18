import React from 'react';
import "../App.css";

export default function Task({taskName,time,id}) {
  return (
    <div className='task' key={id}>
        <h1>Task name: {taskName}</h1>
        <h1>Time to Complete: {time}</h1>
    </div>
  )
}
