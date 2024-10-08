
import React, { useState } from 'react';
import Column from './Column';
import { FaPlus } from "react-icons/fa";
import { BsColumnsGap } from "react-icons/bs";
import { MdOutlineLineStyle } from "react-icons/md";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AddColumn from './AddColumn';
import AddTask from './AddTask';

const Board = ({ columns, tasks, setTasks, onAddTask, onAddColumn }) => {

  // For show col & task buttons
  const [columnPage, setColumnPage] = useState(false);
  const [taskPage, setTaskPage] = useState(false);

  // For show Add button 
  const [showCategory, setShowCategory] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="row row-12 p-3">
          <div className="col col-md-7 col-xs-7 text-end">
            <h2 className='kanban' style={{ fontFamily: 'cursive' }}>Kanban Board</h2>
          </div>
          <div className="col col-md-5 col-xs-5 text-end">
            <button className='bg-warning fw-bold border-0 rounded-2' onClick={() => setShowCategory(!showCategory)}>
              Add &nbsp;<FaPlus className='mb-1' />
            </button>
          </div>
        </div>

        <div className="row">
          {showCategory && (
            <>
              <div className='add-btn text-end'>
                <button onClick={() => setColumnPage(!columnPage)} className='btn1 border-0 rounded-2 bg-primary text-light fw-bold mb-2' style={{ position: 'absolute', right: '10px', height: '40px', marginLeft: '50px' }}>
                  Add Column &nbsp;<BsColumnsGap />
                </button>
                {columnPage && !taskPage && <AddColumn setColumnPage={setColumnPage} onAddColumn={onAddColumn} />}
                <button onClick={() => setTaskPage(!taskPage)} className='btn2 border-0 rounded-2 bg-success text-light fw-bold' style={{ position: 'absolute', right: '10px', top: '130px', height: '40px', width: '130px', marginLeft: '50px' }}>
                  Add Task &nbsp;<MdOutlineLineStyle />
                </button>
                {taskPage && !columnPage && <AddTask columns={columns} onAddTask={onAddTask} setTaskPage={setTaskPage} />}
              </div>
            </>
          )}
        </div>

        {/* Kanban Board */}
        <div className="row row-12 w-100 cont">
          {columns.map((column) => {
            const columnTasks = tasks.filter(task => task.columnId === column.id);
            return (
              <div key={column.id} className="col col-xs-3 col-lg-3">
                <Column
                  column={column}
                  tasks={columnTasks}
                  setTasks={setTasks}
                  onAddTask={onAddTask}
                />
              </div>
            );
          })}
        </div>
      </div>
    </DndProvider>
  );
};

export default Board;
