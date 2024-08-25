import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function NewUser() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function createUser(e) {
      e.preventDefault();
      
      // create new store object from form values
      const newUser = {};
        newUser.name = name;
        newUser.username = username;
        newUser.password = password;
  
      // make POST request, sending new store data
      fetch('http://localhost:3001/users', {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      })
      .then(response => response.json())
      .then(() => {
          navigate('/users'); 
      });
  }

    return (
      <>
      <h2>CREATE ACCOUNT</h2>
            <form onSubmit={createUser}>
                <div>
                <input className="form" type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)}/>
                    <input className="form" type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input className="form" type="text" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="createbutton" type="submit">CREATE ACCOUNT</button>
                </div>
                
        </form>

      </>
    );
}