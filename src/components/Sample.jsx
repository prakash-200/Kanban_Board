import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
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
        t.id === taskId ? { ...t, ...editTask } : t 
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
    setEditPermit(false); // Close the edit modal
  };

  // Double click handler to open the edit menu
  const handleDoubleClick = () => {
    setEditPermit(true);
  };

  return (
    <div
      ref={drag}
      className="task m-2"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onDoubleClick={handleDoubleClick} // Set double click to open edit menu
    >
      <h4 className='text-primary text-center fw-bold text-decoration-underline'>{task.content}</h4>
      <h4 className='text-dark fw-bold'>{task.summary}</h4>
      <h6 className='text-secondary'>{task.info}</h6>
      <div className='d-flex justify-content-between'>
        <button
          className='bg-danger text-light me-2 border-0 rounded-2'
          onClick={() => handleDelete(task.id)}
        >
          <MdDelete />
        </button>
      </div>

      {editPermit && (
        <div className='modal-overlay'>
          <div className='bg-dark p-2' style={{ width: '350px', height: '300px' }}>
            <p className='text-center h3 fw-bold  text-warning'>Edit Task</p>
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
