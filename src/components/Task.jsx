// import React, { useState } from 'react';
// import { Draggable } from 'react-beautiful-dnd';

// const Task = ({ task, setTasks, index }) => {
//   const [editPermit, setEditPermit] = useState(false);
  
//   const [editTask, setEditTask] = useState({
//     content: task.content, 
//     summary: task.summary, 
//     info: task.info
//   });

//   const handleEdit = (taskId, newContent, newSummary) => {

//     if (!newContent.trim() || !newSummary.trim()) {
//       return alert('No data!')
//     }

//     setTasks((prevTasks) =>
//       prevTasks.map(task =>
//         task.id === taskId ? { ...task, content: newContent, summary: newSummary } : task
//       )
//     );
//     setEditPermit(!editPermit)
//   };

//   const handleDelete = (taskId) => {

//     const deletePermit = confirm("Are you sure you want to delete?");
//     if (deletePermit) {
//       setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
//     }
//   };

//   return (
//     <>
//       <Draggable draggableId={task.id} index={index}>
//         {(provided) => (
//           <div
//             ref={provided.innerRef}
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//             className="task m-2"
//             style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}
//           >
//             <h4 className='text-primary text-center fw-bold'>{task.content}</h4>
//             <h4 className='text-dark fw-bold'>{task.summary}</h4>
//             <h6 className='text-secondary'>{task.info}</h6>
//             <div className='d-flex justify-content-between'>
//               <button
//                 className='bg-success text-light me-2 border-0 rounded-2'
//                 style={{ width: '60px' }}
//                 onClick={() => setEditPermit(!editPermit)}
//               >
//                 Edit
//               </button>
//               <button
//                 className='bg-danger text-light me-2 border-0 rounded-2'
//                 onClick={() => handleDelete(task.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         )}
//       </Draggable>

//       {editPermit && (
//         <div className='modal-overlay'>
//           <div className='bg-dark p-2' style={{ width: '350px', height: '250px' }}>
//             <p className='text-center h3 fw-bold'>Edit Task</p>
//             <label htmlFor="" className='text-light'>Task Name:</label>
//             <input
//               type="text"
//               className='form-control'
//               placeholder='Enter a Task Name'
//               value={editTask.content}
//               required
//               onChange={(e) => setEditTask({ ...editTask, content: e.target.value })} // Corrected
//             />

//             <label htmlFor="" className='text-light mt-2'>Enter Summary:</label>
//             <input
//               type="text"
//               className='form-control'
//               placeholder='Enter a Summary'
//               value={editTask.summary}
//               required
//               onChange={(e) => setEditTask({ ...editTask, summary: e.target.value })} // Corrected
//             />

//             <label htmlFor="" className='text-light mt-2'>Enter Info:</label>
//             <input
//               type="text"
//               className='form-control'
//               placeholder='Enter a Summary'
//               value={editTask.info}
//               required
//               onChange={(e) => setEditTask({ ...editTask, info: e.target.value })} // Corrected
//             />

//             <div className='d-flex justify-content-between mt-2'>
//               <button
//                 className='bg-danger text-light border-0 rounded-2'
//                 onClick={() => setEditPermit(!editPermit)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className='bg-success text-light border-0 rounded-2'
//                 onClick={() => handleEdit(task.id, editTask.content, editTask.summary)} // Ensure to pass updated values
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Task;

import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task, setTasks, index }) => {
  const [editPermit, setEditPermit] = useState(false);
  
  const [editTask, setEditTask] = useState({
    content: task.content, 
    summary: task.summary, 
    info: task.info
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { ...task, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleEdit = (taskId) => {
    const { content, summary, info } = editTask;
    if (!content.trim() || !summary.trim() || !info.trim()) {
      return alert('No data!');
    }

    setTasks((prevTasks) =>
      prevTasks.map(t =>
        t.id === taskId ? { ...t, ...editTask } : t // Update all fields
      )
    );
    setEditPermit(false); // Close the edit modal
  };

  const handleDelete = (taskId) => {
    const deletePermit = confirm("Are you sure you want to delete?");
    if (deletePermit) {
      setTasks((prevTasks) => prevTasks.filter(t => t.id !== taskId));
    }
  };

  const handleCancel = () => {
    setEditTask({
      content: task.content, 
      summary: task.summary, 
      info: task.info
    });
    setEditPermit(false); // Close the edit modal
  };

  return (
    <div ref={drag} className="task m-2" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <h4 className='text-primary text-center fw-bold'>{task.content}</h4>
      <h4 className='text-dark fw-bold'>{task.summary}</h4>
      <h6 className='text-secondary'>{task.info}</h6>
      <div className='d-flex justify-content-between'>
        <button
          className='bg-success text-light me-2 border-0 rounded-2'
          style={{ width: '60px' }}
          onClick={() => setEditPermit(true)} // Only open the modal
        >
          Edit
        </button>
        <button
          className='bg-danger text-light me-2 border-0 rounded-2'
          onClick={() => handleDelete(task.id)}
        >
          Delete
        </button>
      </div>

      {editPermit && (
        <div className='modal-overlay'>
          <div className='bg-dark p-2' style={{ width: '350px', height: '300px' }}>
            <p className='text-center h3 fw-bold'>Edit Task</p>
            <label className='text-light'>Task Name:</label>
            <input
              type="text"
              className='form-control'
              placeholder='Enter a Task Name'
              value={editTask.content}
              required
              onChange={(e) => setEditTask({ ...editTask, content: e.target.value })} 
            />

            <label className='text-light mt-2'>Enter Summary:</label>
            <input
              type="text"
              className='form-control'
              placeholder='Enter a Summary'
              value={editTask.summary}
              required
              onChange={(e) => setEditTask({ ...editTask, summary: e.target.value })} 
            />

            <label className='text-light mt-2'>Additional Info:</label>
            <input
              type="text"
              className='form-control'
              placeholder='Enter additional info'
              value={editTask.info}
              required
              onChange={(e) => setEditTask({ ...editTask, info: e.target.value })} 
            />
            
            <div className='text-center mt-2'>
              <button
                className='btn btn-primary me-2'
                onClick={() => handleEdit(task.id)}
              >
                Save
              </button>
              <button
                className='btn btn-secondary'
                onClick={handleCancel} // Handle cancel
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
