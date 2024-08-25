import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NewPost() {
    const [description, setDescription] = useState("");
    const { userId } = useParams();
    const navigate = useNavigate();

    function post(e) {
        e.preventDefault();
            
        // create new item object from form values
        const newPost = {};
        newPost.description = description;
    
        // make POST request, sending new item data
        fetch(`http://localhost:3001/users/${userId}/posts`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newPost)
        })
        .then(response => response.json())
        .then(() => {
          navigate(`/users/${userId}`);
        });
      }
    

    return (
        <>
            <h2>NEW POST</h2>
            <form onSubmit={post}>
                <div>
                        <input className="post" type="text"
                            placeholder="type here..."
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                </div>

                <button className="createbutton" type="submit">POST</button>
            </form>

        </>
    );
}