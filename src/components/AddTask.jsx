
import React, { useState } from 'react';

const AddTask = ({ columns, onAddTask, setTaskPage }) => {
  const [newTask, setNewTask] = useState({
    id: '',
    content: '',
    summary: '',
    info: ''
  })

  // const [taskContent, setTaskContent] = useState('');
  // const [taskSummary, setTaskSummary] = useState('');
  // const [taskInfo, setTaskInfo] = useState('');

  console.log(columns);
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if ( !newTask.content.trim() ){
      return alert('Kindly fill all field!')
    }

    const { id, content, summary, info } = newTask

    console.log(id);
    console.log(content);
    console.log(summary);
    console.log(info);
    
  
    onAddTask(id, content, summary, info);

    {newTask.content= '',
      newTask.summary= '',
      newTask.info= ''
    }

    setTaskPage(false)
  };
  

  return (
    <div className="add-task w-25 rounded-2" style={{ position: 'absolute', right: '10px', top: '160px', backgroundColor: 'rgb(255, 255, 255, .7)' }}>
      <form onSubmit={handleSubmit} className='p-2'>
        <h2 className='w-100 text-center text-danger'>Add Task</h2>
        <label htmlFor="" className='w-100 text-start fw-medium'>Column Name:</label>
        <select name="columnId" id="" value={newTask.id} className='w-100' onChange={(e) => setNewTask({ ...newTask, id: e.target.value })}>
          <option value="">Select</option>
          {
            columns.map((column) => {
              return <option key={column.id} value={column.id} required>{ column.id }</option>
            })
          }
        </select>

        <label htmlFor="" className='w-100 text-start fw-medium'>Task Name:</label>
        <input
          type="text"
          className='form-control mb-2'
          placeholder="Add a new task"
          value={newTask.content}
          onChange={(e) => setNewTask({...newTask, content: e.target.value})}
          required
        />

        <label htmlFor="" className='w-100 text-start fw-medium'>Task Summary:</label>
        <input
          type="text"
          className='form-control mb-2'
          placeholder="Add a Summary"
          value={newTask.summary}
          onChange={(e) => setNewTask({ ...newTask, summary: e.target.value })}
          // required
        />

        <label htmlFor="" className='w-100 text-start fw-medium'>Task Info:</label>
        <input
          type="text"
          className='form-control mb-2'
          placeholder="Add a Summary"
          value={newTask.info}
          onChange={(e) => setNewTask({ ...newTask, info: e.target.value })}
          // required
        />
        <div  className='d-flex justify-content-between'>
        <button className='rounded-4 bg-danger w-25' type="submit" onClick={() => setTaskPage(false)}>Cancel</button>
        <button className='rounded-4 w-25' type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
