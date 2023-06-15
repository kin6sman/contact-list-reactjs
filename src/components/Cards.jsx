import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './card.css'
import UpdateCard from './UpdateCard';
import { ToastContainer, toast } from 'react-toastify';



const UserList = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
        name: name,
        email: email,
        phone: phone,
      });
      toast(`Data Added successfully`,{
        position:"bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      
      // Update allContacts with the submitted data
      const newContact = { name, email, phone };
      setAllContacts((prevContacts) => [...prevContacts, newContact]);

      // Reset form inputs
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  useEffect(() => {

    fetchContacts();
  }, []);


  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const newContacts = response.data.map((val) => ({
        id: val.id,
        name: val.name,
        email: val.email,
        phone: val.phone,
      }));
      setAllContacts(newContacts);
      console.log(allContacts)
    } catch (error) {
      console.log(error);
    }
  };


  const handleUpdate = async () => {
    try {
      await fetchContacts();
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const updatedContacts = response.data.map((val) => ({
        id: val.id,
        name: val.name,
        email: val.email,
        phone: val.phone,
      }));
      setAllContacts(updatedContacts);
      

    } catch (error) {
      console.log(error);
    }
  };


  const handleDelete = async () => {
    // Delete logic
  };



  return (
    <>
      <div className='add-Contacts'>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />
      <button type="submit">Add New Contact</button>
    </form>
      </div>
      <div className='cardMain'>
      {allContacts.map((contact, index) => (
        <UpdateCard key={contact.id} {...contact} onUpdate={handleUpdate} onDelete={handleDelete} />
        
      ))}
    </div>
    </>
  );
};

export default UserList;
