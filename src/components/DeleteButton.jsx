import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const DeleteButton = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      toast('Data deleted successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

      
      onDelete();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <>
      <button onClick={handleDelete} className="delete-button">
      Delete
    </button>
    

    </>
  );
};

export default DeleteButton;
