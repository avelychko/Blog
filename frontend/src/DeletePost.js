import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.css';

export default function DeletePost() {
    const [user, setUser] = useState({});
    const [post, setPost] = useState({});
    const navigate = useNavigate();
    const { userId, postId } = useParams();

    useEffect(()=> {
        fetch(`http://localhost:3001/users/${userId}/posts/${postId}`).then((response) => response.json()).then((data) => setPost(data));
        fetch(`http://localhost:3001/users/${userId}`).then((response) => response.json()).then((data) => setUser(data));
      }, [userId, postId]);

      function delPost(e) {
        e.preventDefault();
    
        // make DELETE request for a single post id
        fetch(`http://localhost:3001/users/${userId}/posts/${postId}`, {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
        })
        .then(response => response.json())
        .then(() => {
          navigate(`/users/${userId}`);
        });
      }

    function getDateTime(dateString) {
        let dateObj = new Date(dateString);
        return `${dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} ${dateObj.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric"})} `;
    }

    return (
        <>
            <div className="label-font">Are you sure?</div>
            <div className="card">
                <div className="deletediv">
                    <div>
                    <Link className="removelink" to={`/users/${userId}`}>
                        <h2 className="label-font">{user.name}</h2>
                    </Link>
                        <h3>@{user.username}</h3>
                    </div>
                    <div>
                        <form onClick = {(event) => delPost(event)}>
                            <button className="deletebutton" type="button">DELETE POST</button>
                        </form>
                    </div>
                </div>
            <div>
                <h4>{post.description}</h4>
                </div>
                <h3><span className="date">{getDateTime(post.date)}</span></h3>
            </div>
        </>
    )
}