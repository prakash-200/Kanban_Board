import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, setTasks, index }) => {
  const [editPermit, setEditPermit] = useState(false);
  console.log(task);
  
  const [editTask, setEditTask] = useState({
    content: task.content, 
    summary: task.summary, 
    info: task.info
  });

  const handleEdit = (taskId, newContent, newSummary) => {

    if (!newContent.trim() || !newSummary.trim()) {
      return alert('No data!')
    }

    setTasks((prevTasks) =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, content: newContent, summary: newSummary } : task
      )
    );
    setEditPermit(!editPermit)
  };

  const handleDelete = (taskId) => {

    const deletePermit = confirm("Are you sure you want to delete?");
    if (deletePermit) {
      setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
    }
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="task m-2"
          >
            <h4 className='text-primary text-center fw-bold'>{task.content}</h4>
            <h4 className='text-dark fw-bold'>{task.summary}</h4>
            <h6 className='text-secondary'>{task.info}</h6>
            <div className='d-flex justify-content-between'>
              <button
                className='bg-success text-light me-2 border-0 rounded-2'
                style={{ width: '60px' }}
                onClick={() => setEditPermit(!editPermit)}
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
          </div>
        )}
      </Draggable>

      {editPermit && (
        <div className='modal-overlay'>
          <div className='bg-dark p-2' style={{ width: '350px', height: '250px' }}>
            <p className='text-center h3 fw-bold'>Edit Task</p>
            <label htmlFor="" className='text-light'>Task Name:</label>
            <input
              type="text"
              className='form-control'
              placeholder='Enter a Task Name'
              value={editTask.content}
              required
              onChange={(e) => setEditTask({ ...editTask, content: e.target.value })} // Corrected
            />

            <label htmlFor="" className='text-light mt-2'>Enter Summary:</label>
            <input
              type="text"
              className='form-control'
              placeholder='Enter a Summary'
              value={editTask.summary}
              required
              onChange={(e) => setEditTask({ ...editTask, summary: e.target.value })} // Corrected
            />

            <label htmlFor="" className='text-light mt-2'>Enter Info:</label>
            <input
              type="text"
              className='form-control'
              placeholder='Enter a Summary'
              value={editTask.info}
              required
              onChange={(e) => setEditTask({ ...editTask, info: e.target.value })} // Corrected
            />

            <div className='d-flex justify-content-between mt-2'>
              <button
                className='bg-danger text-light border-0 rounded-2'
                onClick={() => setEditPermit(!editPermit)}
              >
                Cancel
              </button>
              <button
                className='bg-success text-light border-0 rounded-2'
                onClick={() => handleEdit(task.id, editTask.content, editTask.summary)} // Ensure to pass updated values
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
