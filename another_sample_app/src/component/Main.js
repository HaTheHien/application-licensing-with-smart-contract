import './styles.css';
import React, { useState } from 'react';
import Task from './Task';

function Main() {

  const [taskName,setTaskName]=useState("");
  const [time,setTime]=useState("");
  const [taskList,setTaskList]=useState([]);

  const addTask=()=>{
    setTaskList([...taskList,{task:taskName, time:time}])
    setTime("");
    setTaskName("");
  }


  return (
    <div className="App">
      <h1>Todo List</h1>
      <label>Task name:</label>
      <input type="text" id="task" value={taskName} onChange={(e)=>setTaskName(e.target.value)}/>
      <label>Time: </label>
      <input type="text" id="time" value={time} onChange={(e)=>setTime(e.target.value)}/>

      <button onClick={addTask}>Add</button>
      
      
      {taskList.map((task,idx)=>{
        return <Task taskName={task.task} time={task.time} id={idx.toString()}/>
      })}
      
    </div>
  );
}

export default Main;
