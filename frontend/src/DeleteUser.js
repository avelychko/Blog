import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function DeleteUser() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(()=> {
        fetch(`http://localhost:3001/users/${userId}`).then((response) => response.json()).then((data) => setUser(data));
      }, [userId]);

    function delUser(e, user) {
        e.preventDefault();
      
        // make DELETE request for a single user id
        fetch(`http://localhost:3001/users/${user._id}`, {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
        })
        .then(response => response.json())
        .then(() => {
            navigate('/users'); 
        });
    }


    return (
        <>
        <div className="label-font">Are you sure?</div>
            <div className="card">
                <div className="deletediv">
                    <div>
                        <h2 className="label-font">{user.name}</h2>
                        <h3>@{user.username}</h3>
                    </div>
                    <div>
                        
                        <form onClick = {(event) => delUser(event, user)}>
                            <button className="deletebutton" type="submit">DELETE ACCOUNT</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}