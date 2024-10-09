
import React, { useState, useEffect } from 'react';
import Task from './Task';
import { useDrop } from 'react-dnd';

const Column = ({ column, tasks, setTasks, person }) => {

  // For collapse & expand
  const [isExpanded, setIsExpanded] = useState(true);

  // For count the tasks
  const [count, setCount] = useState(0);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      const newTask = { ...item, columnId: column.id }; // Update the columnId when dropped
      setTasks((prevTasks) => {
        // Remove the old task and add the new one with the updated columnId
        return prevTasks.map(task =>
          task.id === item.id ? newTask : task
        );
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  useEffect(() => {
    setCount(tasks.length);
  }, [tasks]);

  return (
    <div ref={drop} className="column">
      <div className="row">

        <div className="col text-center">
          <h4 className="fw-bold pt-2" onClick={() => setIsExpanded(!isExpanded)} style={{ cursor: 'pointer' }}>
            {column.title} <span className='text-dark'>({count})</span> {isExpanded ? '▼' : '▲'}
          </h4>
        </div>

      </div>

      {isExpanded && (
        <div style={{ minHeight: '100px' }}>
          {tasks.map((task, index) => (
            <Task
              key={task.id}
              task={task}
              setTasks={setTasks}
              index={index}
              person={person}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Column;
