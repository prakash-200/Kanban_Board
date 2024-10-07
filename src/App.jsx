// src/App.js
import React, { useState } from 'react';
import Board from './components/Board';
import './app.css';

const initialColumns = [
  { id: 'column-1', title: 'To Do' },
  { id: 'column-2', title: 'In Progress' },
  { id: 'column-3', title: 'Done' },
];

const initialTasks = [
  { id: 'task-1', content: 'Task 1', summary: '😀😁😂🤣😃', info: 'Sample emoji', columnId: 'column-1' },
  { id: 'task-2', content: 'Task 2', summary: 'Daily Routine', info: 'Complete daily practises and checklist', columnId: 'column-1' },
  { id: 'task-3', content: 'Task 3', summary: 'Sample Text', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel explicabo, dicta ipsam,', columnId: 'column-2' },
];

const App = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [removed] = newTasks.splice(result.source.index, 1);
    removed.columnId = result.destination.droppableId;
    newTasks.splice(result.destination.index, 0, removed);

    setTasks(newTasks);
  };

  const onAddTask = (id, content, summary, info) => {
    const newTask = {
      id: `task-${tasks.length + 1}`,
      content,
      summary,
      info,
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

  return (
    <div className='container-fluid'>
      <Board
        columns={columns}
        tasks={tasks}
        setTasks={setTasks}
        onDragEnd={onDragEnd}
        onAddTask={onAddTask}
        onAddColumn={onAddColumn}
      />

    </div>
  );
};

export default App;
