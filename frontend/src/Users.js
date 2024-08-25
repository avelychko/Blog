import {Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import './style.css'

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(()=> {
      fetch('http://localhost:3001/users').then((response) => response.json()).then((data) => setUsers(data));
    }, []);

    return (
        <>
        <div>{users.length} Users</div>
        <div className="content">
            {users.map((user, index) => (
                <div key={index} className="card">
                    <div className="deletediv">
                    <div>
                    <Link className="removelink" to={`${user._id}`}>
                    <h2 className="label-font">{user.name}</h2>
                      <h3>@{user.username}</h3>
                      </Link>
                  </div>
                  <div>
                  <Link className="removelink" to={`${user._id}/delete`}>
                      <button className="deletebutton" type="button">DELETE ACCOUNT</button>
                    </Link>
                    </div>
                </div>
            </div>
            ))}
                <Link to="new"><button className="addbutton" type="button">CREATE ACCOUNT</button></Link>
        </div>
    </>
    );
}
  