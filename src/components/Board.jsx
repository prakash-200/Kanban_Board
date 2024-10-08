

// import React, { useState } from 'react';
// import Column from './Column';
// import { FaPlus } from "react-icons/fa";
// import { BsColumnsGap } from "react-icons/bs";
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { MdOutlineLineStyle } from "react-icons/md";
// import AddColumn from './AddColumn';
// import AddTask from './AddTask';

// const Board = ({ columns, tasks, setTasks, onAddTask, onAddColumn, person }) => {

//   // For show col & task buttons
//   // const [columnPage, setColumnPage] = useState(false);
//   // const [taskPage, setTaskPage] = useState(false);

//   // For show Add button 
//   const [showCategory, setShowCategory] = useState(false);
//   const [add, setAdd] = useState(false);

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div>
//         <div className="row row-12 p-3">
//           <div className="col col-md-7 col-xs-7 text-end">
//             <h2 className='kanban fw-bold' style={{ fontFamily: 'cursive' }}>Kanban Board</h2>
//           </div>
//           <div className="col col-md-5 col-xs-5 text-end">
//             <button className='bg-warning fw-bold border-0 rounded-2' onClick={() => setShowCategory(!showCategory)}>
//               Add &nbsp;<FaPlus className='mb-1' />
//             </button>
//           </div>
//         </div>

//           {showCategory && (
//             <>
//             <div className='slide'>
//               <div className='m-4 d-flex justify-content-between'>
//               <button type="button" className='bg-warning border-0 rounded-2' onClick={() => setAdd(true)}>Add Column&nbsp;<BsColumnsGap /></button>
//               <button type="button" className='bg-primary border-0 rounded-2' onClick={() => setAdd(false)}>Add Task&nbsp;<MdOutlineLineStyle /></button>
//               </div>

//               {
//                 add ? 
//                 <AddColumn setShowCategory={setShowCategory} onAddColumn={onAddColumn} />
//                  : 
//                  <AddTask columns={columns} setShowCategory={setShowCategory} onAddTask={onAddTask} person={person} />
//               }
//             </div>
//             </>
//           )}

//         {/* Kanban Board */}
//         <div className="cont">
//           {columns.map((column) => {
//             const columnTasks = tasks.filter(task => task.columnId === column.id);
//             return (
//               <div key={column.id} className="">
//                 <Column
//                   column={column}
//                   tasks={columnTasks}
//                   setTasks={setTasks}
//                   onAddTask={onAddTask}
//                   person={person}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// export default Board;


// import React, { useState, useRef } from 'react';
// import Column from './Column';
// import { FaPlus } from "react-icons/fa";
// import { BsColumnsGap } from "react-icons/bs";
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { MdOutlineLineStyle } from "react-icons/md";
// import AddColumn from './AddColumn';
// import AddTask from './AddTask';

// const Board = ({ columns, tasks, setTasks, onAddTask, onAddColumn, person }) => {
//   const [showCategory, setShowCategory] = useState(false);
//   const [add, setAdd] = useState(false);

//   // Ref for the scrollable container
//   const scrollRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);

//   // Handle mouse down event
//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setStartX(e.pageX - scrollRef.current.offsetLeft);
//     setScrollLeft(scrollRef.current.scrollLeft);
//   };

//   // Handle mouse leave event
//   const handleMouseLeave = () => {
//     setIsDragging(false);
//   };

//   // Handle mouse up event
//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   // Handle mouse move event
//   const handleMouseMove = (e) => {
//     if (!isDragging) return; // Only move if dragging
//     e.preventDefault();
//     const x = e.pageX - scrollRef.current.offsetLeft;
//     const walk = (x - startX) * 2; // Speed factor for drag
//     scrollRef.current.scrollLeft = scrollLeft - walk;
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div>
//         <div className="row row-12 p-3">
//           <div className="col col-md-7 col-xs-7 text-end">
//             <h2 className='kanban fw-bold' style={{ fontFamily: 'cursive' }}>Kanban Board</h2>
//           </div>
//           <div className="col col-md-5 col-xs-5 text-end">
//             <button className='bg-warning fw-bold border-0 rounded-2' onClick={() => setShowCategory(!showCategory)}>
//               Add &nbsp;<FaPlus className='mb-1' />
//             </button>
//           </div>
//         </div>

//         {showCategory && (
//           <div className='slide'>
//             <div className='m-4 d-flex justify-content-between'>
//               <button type="button" className='addBtn bg-warning border-0 rounded-2' onClick={() => setAdd(true)}>Add Column&nbsp;<BsColumnsGap /></button>
//               <button type="button" className='addBtn bg-primary border-0 rounded-2' onClick={() => setAdd(false)}>Add Task&nbsp;<MdOutlineLineStyle /></button>
//             </div>

//             {add ? 
//               <AddColumn setShowCategory={setShowCategory} onAddColumn={onAddColumn} />
//               : 
//               <AddTask columns={columns} setShowCategory={setShowCategory} onAddTask={onAddTask} person={person} />
//             }
//           </div>
//         )}

//         {/* Scrollable Carousel of Columns with mouse drag */}
//         <div
//           className="cont"
//           ref={scrollRef}
//           onMouseDown={handleMouseDown}
//           onMouseLeave={handleMouseLeave}
//           onMouseUp={handleMouseUp}
//           onMouseMove={handleMouseMove}
//           style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
//         >
//           {columns.map((column) => {
//             const columnTasks = tasks.filter(task => task.columnId === column.id);
//             return (
//               <div key={column.id}>
//                 <Column
//                   column={column}
//                   tasks={columnTasks}
//                   setTasks={setTasks}
//                   onAddTask={onAddTask}
//                   person={person}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// export default Board;


import React, { useState, useRef } from 'react';
import Column from './Column';
import { FaPlus } from "react-icons/fa";
import { BsColumnsGap } from "react-icons/bs";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MdOutlineLineStyle } from "react-icons/md";
import AddColumn from './AddColumn';
import AddTask from './AddTask';

const Board = ({ columns, tasks, setTasks, onAddTask, onAddColumn, person }) => {
  const [showCategory, setShowCategory] = useState(false);
  const [add, setAdd] = useState(false);

  // Ref for the scrollable container
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Handle mouse down event
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  // Handle touch start event
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  // Handle mouse move event
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Speed factor for drag
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle touch move event
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Speed factor for drag
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle mouse up and touch end events
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchEnd = () => setIsDragging(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="row row-12 p-3">
          <div className="col col-md-7 col-xs-7 text-end">
            <h2 className='kanban fw-bold' style={{ fontFamily: 'cursive' }}>Kanban Board</h2>
          </div>
          <div className="col col-md-5 col-xs-5 text-end">
            <button className='bg-warning fw-bold border-0 rounded-2' onClick={() => setShowCategory(!showCategory)}>
              Add &nbsp;<FaPlus className='mb-1' />
            </button>
          </div>
        </div>

        {showCategory && (
          <div className='slide'>
            <div className='m-4 d-flex justify-content-between'>
              <button type="button" className='addBtn bg-warning border-0 rounded-2' onClick={() => setAdd(true)}>Add Column&nbsp;<BsColumnsGap /></button>
              <button type="button" className='addBtn bg-primary border-0 rounded-2' onClick={() => setAdd(false)}>Add Task&nbsp;<MdOutlineLineStyle /></button>
            </div>

            {add ? 
              <AddColumn setShowCategory={setShowCategory} onAddColumn={onAddColumn} />
              : 
              <AddTask columns={columns} setShowCategory={setShowCategory} onAddTask={onAddTask} person={person} />
            }
          </div>
        )}

        {/* Scrollable Carousel of Columns with mouse drag & touch scrolling */}
        <div
          className="cont"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {columns.map((column) => {
            const columnTasks = tasks.filter(task => task.columnId === column.id);
            return (
              <div key={column.id}>
                <Column
                  column={column}
                  tasks={columnTasks}
                  setTasks={setTasks}
                  onAddTask={onAddTask}
                  person={person}
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
