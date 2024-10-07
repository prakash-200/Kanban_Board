import React, { useState } from 'react';
import Column from './Column';
import { FaPlus } from "react-icons/fa";
import { BsColumnsGap } from "react-icons/bs";
import { MdOutlineLineStyle } from "react-icons/md";
import { DragDropContext } from 'react-beautiful-dnd';
import AddColumn from './AddColumn';
import AddTask from './AddTask';

const Board = ({ columns, tasks, setTasks, onDragEnd, onAddTask, onAddColumn }) => {
  const [columnPage, setColumnPage] = useState(false);
  const [taskPage, setTaskPage] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const handleColumn = () => {
    setColumnPage(!columnPage);
  }

  return (
    <div>
      <div className="row row-12 p-3">
        <div className="col col-7 text-end">
          <h2 className='text-light' style={{ fontFamily: 'cursive' }}>Kanban Board</h2>
        </div>
        <div className="col col-5 text-end">

          <p>{columnPage}</p>


          <button className='bg-warning fw-bold border-0 rounded-2' onClick={() => setShowCategory(!showCategory)}>Add &nbsp;<FaPlus className='mb-1' />
          </button>

        </div>
      </div>

      <div className="row">
        {
          showCategory &&
            <>
              <div className='text-end'>
                <button onClick={handleColumn} className='border-0 rounded-2 bg-primary text-light fw-bold mb-2' style={{ position: 'absolute', right: '10px', height: '40px', marginLeft: '50px' }}>Add Column &nbsp;<BsColumnsGap /></button>
                  {
                    columnPage && taskPage === false ? <AddColumn setColumnPage={setColumnPage} onAddColumn={onAddColumn} /> : ''
                  }
                <button onClick={ () => setTaskPage(!taskPage) } className='border-0 rounded-2 bg-success text-light fw-bold' style={{ position: 'absolute', right: '10px', top: '130px', height: '40px', width: '130px', marginLeft: '50px' }}>Add Task &nbsp;<MdOutlineLineStyle /></button>
                {
                  taskPage && columnPage === false ? 
                  <AddTask columns={columns} onAddTask={onAddTask} setTaskPage={setTaskPage}/>:''
                }
              </div>
            </>
            
        }
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container">
          {columns.map((column) => {
            const columnTasks = tasks.filter(task => task.columnId === column.id);
            return (
              <div className='row row-12 vw-100 vh-100'>
                <div className="col col-4">
                  <Column
                    key={column.id}
                    column={column}
                    tasks={columnTasks}
                    setTasks={setTasks}
                    onAddTask={onAddTask}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
