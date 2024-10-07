import React, { useState } from 'react'

function AddColumn({setColumnPage, onAddColumn}) {
    const [newColumnTitle, setNewColumnTitle] = useState('');

    const hidePopUp = () => {
        setColumnPage(false)
    }

    const handleAddColumn = () => {
        if (newColumnTitle.trim() === '') return;
    
        onAddColumn(newColumnTitle);
    
        setNewColumnTitle('');
        setColumnPage(false)
      };

  return (
    <div className='modal-overlay2'>
        <div className='bg-black p-2 rounded-2' style={{ width: '250px', height: '170px' }}>
            <p className='text-center text-warning fw-bold fs-5'>Add Column</p>
            <label htmlFor="" className='text-light w-100 text-start'>Column Name:</label><br />
            <input type="text" 
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            className='form-control mb-3' 
            placeholder='Enter a Column Name'
            required
            />
            <div className='d-flex justify-content-between'>
            <button className='border-0 bg-danger text-light rounded-2' onClick={hidePopUp}>Cancel</button>
            <button className='border-0 bg-success text-light rounded-2' onClick={handleAddColumn} style={{ width: '60px' }} >Add</button>
            </div>
        </div>
    </div>
  )
}

export default AddColumn