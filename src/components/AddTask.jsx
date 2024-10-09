import React, { useState } from 'react';
import { MdOutlineLineStyle } from "react-icons/md";

const AddTask = ({ columns, onAddTask, setShowCategory, person }) => {
  const [newTask, setNewTask] = useState({
    id: '',
    content: '',
    summary: '',
    info: '',
    person: '',
    date: new Date()
  });

  console.log(columns);
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!newTask.content.trim()) {
      return alert('Kindly fill all fields!');
    }

    const { id, content, summary, info, person, date } = newTask;

    console.log(id);
    console.log(content);
    console.log(summary);
    console.log(info);
    console.log(person); // Log the selected person

    const formattedDate = date.toLocaleDateString('en-GB');

    onAddTask(id, content, summary, info, person, formattedDate); // Pass the person to the onAddTask function

    // Reset the input fields
    setNewTask({
      id: '',
      content: '',
      summary: '',
      info: '',
      person: '',
      date: new Date()
    });

    console.log("taskPage");
    
    setShowCategory(false);
  };
  
  return (
    <div className="add-task rounded-2" style={{ position: 'absolute', right: '7px', top: '70px'}}>
      <form onSubmit={handleSubmit} className='p-2'>
        <h4 className='w-100 text-center text-warning'>Add Task&nbsp;<span className='text-light'><MdOutlineLineStyle /></span></h4>
        <label htmlFor="" className='w-100 text-light text-start fw-medium'>Column Name:</label>
        <select name="columnId" id="" value={newTask.id} className='w-100 p-2 rounded-2' onChange={(e) => setNewTask({ ...newTask, id: e.target.value })}>
          <option value="">Select</option>
          {
            columns.map((column) => (
              <option key={column.id} value={column.id} required>{column.id}</option>
            ))
          }
        </select>

        <label htmlFor="" className='w-100 text-light text-start fw-medium'>Task Name:</label>
        <input
          type="text"
          className='form-control mb-2'
          placeholder="Add a new task"
          value={newTask.content}
          onChange={(e) => setNewTask({...newTask, content: e.target.value})}
          required
        />

        <label htmlFor="" className='w-100 text-light text-start fw-medium'>Task Summary:</label>
        <input
          type="text"
          className='form-control mb-2'
          placeholder="Add a Summary"
          value={newTask.summary}
          onChange={(e) => setNewTask({ ...newTask, summary: e.target.value })}
        />

        <label htmlFor="" className='w-100 text-light text-start fw-medium'>Task Info:</label>
        <input
          type="text"
          className='form-control mb-2'
          placeholder="Add additional info"
          value={newTask.info}
          onChange={(e) => setNewTask({ ...newTask, info: e.target.value })}
        />

        <label htmlFor="" className='w-100 text-light text-start fw-medium'>Task Assign:</label>
        <select 
        className='w-100 p-2 rounded-2'
          value={newTask.person} // Set value to bind to newTask state
          onChange={(e) => setNewTask({ ...newTask, person: e.target.value })} 
          name="" 
          id=""
        >
          <option value="">Select a person</option> {/* Add a default option */}
          {
            person.map((pn) => (
              <option key={pn} value={pn}>{pn}</option> // Set value to the person's name
            ))
          }
        </select>

        <div className='mt-3'>
          <input type="button" className='bg-danger border-0 text-light rounded-2' onClick={() => setShowCategory(false)} value="Cancel" />
          <input type="submit" className='bg-success border-0 text-light rounded-2 float-end' value="Submit" />
        </div>

        {/* <div className='row bg-info' style={{ height: '20px' }}>
          <button className='rounded-4 bg-danger' style={{ width: '80px', height: '40px' }} type="button" onClick={() => setTaskPage(false)}>Cancel</button>
          <input type='submit' className='rounded-4 bg-success' style={{ width: '70px', height: '40px', fontSize: '14px' }}  />
        </div> */}
      </form>
    </div>
  );
};

export default AddTask;
