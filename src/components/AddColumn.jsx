import React, { useState } from 'react'
import { MdOutlineLineStyle } from "react-icons/md";

function AddColumn({setShowCategory, onAddColumn}) {
    const [newColumnTitle, setNewColumnTitle] = useState('');

    const handleAddColumn = () => {
        if (newColumnTitle.trim() === '') return;
    
        onAddColumn(newColumnTitle);
    
        setNewColumnTitle('');
        setShowCategory(false)
      };

  return (
    <div className='modal-overlay3'>
        <h4 className='text-warning text-center'>Add Column&nbsp; <span className='text-light'><MdOutlineLineStyle /></span></h4>
        <div className='p-2 rounded-2' style={{ width: '250px', height: '170px' }}>
            <label htmlFor="" className='text-light fw-medium w-100 text-start'>Column Name:</label><br />
            <input type="text" 
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            className='form-control mb-3' 
            placeholder='Enter a Column Name'
            required
            />
            <div className='d-flex justify-content-between' style={{  }}>
            <button className='border-0 bg-danger text-light rounded-2' onClick={() => setShowCategory(false)}>Cancel</button>
            <button className='border-0 bg-success text-light rounded-2' onClick={handleAddColumn} style={{ width: '60px' }} >Add</button>
            </div>
        </div>
    </div>
  )
}

export default AddColumn