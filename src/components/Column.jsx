// src/components/Column.js
import React, { useState, useEffect } from 'react';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

const Column = ({ column, tasks, setTasks, onAddTask }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [count, setCount] = useState(0);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setCount(tasks.length)
  },[tasks])

  return (
    <div className="column">
      <div className="row">
        <div className="col col-7 text-end">
      <h4 className="fw-bold pt-2" onClick={handleToggleExpand} style={{ cursor: 'pointer' }}>
        {column.title} {isExpanded ? '▼' : '▲'}
      </h4>
        </div>
        <div className="col">
          <h5 className='pt-2 text-dark'>Tasks: <span className='text-danger'>{count}</span></h5>
        </div>
      </div>

      {isExpanded && (
        <>
          <Droppable droppableId={column.id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    setTasks={setTasks}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* <AddTask columnId={column.id} onAddTask={onAddTask} /> */}
        </>
      )}
    </div>
  );
};

export default Column;
