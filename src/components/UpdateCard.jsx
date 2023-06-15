import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteButton from './DeleteButton';
import { ToastContainer, toast } from 'react-toastify';

const UpdateCard = ({ id, name, email, phone, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedPhone, setEditedPhone] = useState(phone);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
        name: editedName,
        email: editedEmail,
        phone: editedPhone,
      });
      console.log('Data updated successfully:', response.data);
      toast(`Data Updated successfully`,{
        position:"bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      
      onUpdate();
      setEditMode(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };



  const handleDelete = () => {
    // Delete logic
  };

  return (
    <div className="card">
      {editMode ? (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={editedName}
            onChange={(event) => setEditedName(event.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={editedEmail}
            onChange={(event) => setEditedEmail(event.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            value={editedPhone}
            onChange={(event) => setEditedPhone(event.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{name}</h3>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <DeleteButton id={id} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};


export default UpdateCard;
