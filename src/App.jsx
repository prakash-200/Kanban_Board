
import React, { useState } from 'react';
import Board from './components/Board';
import './App.css';

const initialColumns = [
  { id: 'column-1', title: 'To Do' },
  { id: 'column-2', title: 'In Progress' },
  { id: 'column-3', title: 'Done' },
];

const person = [ "Prakash", "Aravinth", "Santhosh", "Arivu", "Jeeva" ]

const initialTasks = [
  { id: 'task-1', content: 'Task 1', summary: 'Sample!', info: 'Sample emoji', person: 'Prakash', date: '08/10/24', columnId: 'column-1' },
  { id: 'task-2', content: 'Task 2', summary: 'Daily Routine♻️', info: 'Complete daily practises and checklist', person: 'Aravinth', date: '10/10/24', columnId: 'column-1' },
  { id: 'task-3', content: 'Task 3', summary: 'Sample Text📑', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel explicabo, dicta ipsam.', person: 'Arivu', date: '18/10/24', columnId: 'column-2' },
  { id: 'task-4', content: 'Task 4', summary: 'Task✅', info: 'Project done ', person: 'Santhosh', date: '15/10/24', columnId: 'column-3' },
];

const App = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);
  
  const onAddTask = (id, content, summary, info, person, formattedDate) => {
    const newTask = {
      id: `task-${tasks.length + 1}`,
      content,
      summary,
      info,
      person,
      date: formattedDate,
      columnId: id
    };
    
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  
  const onAddColumn = (newColumnTitle) => {
    const newColumn = {
      id: `column-${columns.length + 1}`,
      title: newColumnTitle,
    };
    setColumns([...columns, newColumn]);
  };
  
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [removed] = newTasks.splice(result.source.index, 1);
    removed.columnId = result.destination.droppableId;
    newTasks.splice(result.destination.index, 0, removed);

    setTasks(newTasks);
  };

  return (
    <div className='container-fluid'>
      <Board
        columns={columns}
        tasks={tasks}
        setTasks={setTasks}
        onDragEnd={onDragEnd}
        onAddTask={onAddTask}
        onAddColumn={onAddColumn}
        person={person}
      />

    </div>
  );
};

export default App;
