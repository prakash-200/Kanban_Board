
import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { useDrag } from 'react-dnd';

const Task = ({ task, setTasks, index, person }) => {
  const [editPermit, setEditPermit] = useState(false);

  const [editTask, setEditTask] = useState({
    content: task.content,
    summary: task.summary,
    info: task.info,
    person: task.person
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
    // setEditTask({
    //   content: task.content, 
    //   summary: task.summary, 
    //   info: task.info
    // });
    setEditPermit(false); // Close the edit modal
  };

  return (
    <div ref={drag} className="task m-2"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onDoubleClick={() => setEditPermit(true)}
    >
      <h4 className='text-primary text-center fw-bold text-decoration-underline'>{task.content}</h4>
      <h4 className='text-dark fw-bold'>{task.summary}</h4>
      <h6 className='text-secondary'>{task.info}</h6>
      <div className='d-flex justify-content-between'>
        <h6><span className='fw-bold'>To:</span>&nbsp;{task.person}</h6>
        <div>
          <button className='bg-warning border-0 rounded-2 text-dark fw-bold'>{task.date}</button>
          <button
            className='bg-danger ms-2 text-light me-2 border-0 rounded-2'
            onClick={() => handleDelete(task.id)}>
            <MdDelete />
          </button>
        </div>
      </div>
      {/* <div className='d-flex justify-content-end'>
      </div> */}

      {editPermit && (
        <div className='modal-overlay'>
          <div className='bg-dark p-2 rounded-4' style={{ width: '350px', height: '390px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
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

            <label className='text-light mt-2'>Select Person:</label><br />
            <select className='border-0 p-2 rounded-2 w-100' onClick={(e) => setEditTask({ ...editTask, person: e.target.value })} name="" value={editTask.person} id="">
              {
                person.map((pn) => {
                  return <option key={pn.index}>{pn}</option>
                })
              }
            </select>

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
