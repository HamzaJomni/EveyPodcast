import React, { useState, useEffect } from 'react';
import NavbarAdmin from './navbaradmin';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../lib/style/log.css';
function TabClient(){
    
    const [users, setUsers] = useState([]);
    //getting all users
    useEffect(() => {
        async function fetchUsers() {
          const response = await axios.get('http://localhost:5000/users/update-num-podcasts');
          console.log(response.data);
          setUsers(response.data);
        }
        fetchUsers();
      }, []);

      const handleBlock = async (user) => {
        try {
      const response = await axios.put(`http://localhost:5000/users/${user.id}/block`, { status: 'blocked' });
  
      if (response.status === 200) {
        // Mise à jour réussie
        const updatedUser = response.data;
        // Mettre à jour l'état des utilisateurs pour refléter les changements
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
      } else {
        // Gestion des erreurs
        throw new Error('Error blocking user');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnblock = async (user) => {
    try {
      const response = await axios.put(`http://localhost:5000/users/${user.id}/unblock`, { status: 'active' });
  
      if (response.status === 200) {
        // Mise à jour réussie
        const updatedUser = response.data;
        // Mettre à jour l'état des utilisateurs pour refléter les changements
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
      } else {
        // Gestion des erreurs
        throw new Error('Error unblocking user');
      }
    } catch (err) {
      console.error(err);
    }
  };


    return( 
        <section>
            <NavbarAdmin/>
    <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Created At</th>
          <th>Number of Podcasts</th>
          <th>Role</th>
          <th>Alerts</th>
          <th> Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr className={index % 2 === 0 ? "white-row" : "gray-row"} style={{backgroundColor: user.role === 'admin' ? 'orange' : 'white'}} key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{new Date(user.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}</td>
            <td>{user.numPodcasts}</td>
            <td>{user.role}</td>
            <td>{user.alert}</td>
            <td>{user.status}</td>
            <td>
            
              {user.status === 'blocked' ?
            <button className="btn-block" style={{background:"green"}} onClick={() => handleUnblock(user)}>Unblock</button>
               :
           <button className="btn-block" onClick={() => handleBlock(user)}>Block</button>
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </section>
  )
}
export default TabClient;