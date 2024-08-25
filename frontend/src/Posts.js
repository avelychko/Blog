import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './style.css';

export default function Posts() {
    const [ posts, setPosts] = useState([]);
    const [ user, setUser ] = useState({});
    const { userId } = useParams();

    useEffect(()=> {
      fetch(`http://localhost:3001/users/${userId}/posts`).then((response) => response.json()).then((data) => setPosts(data));
      fetch(`http://localhost:3001/users/${userId}`).then((response) => response.json()).then((data) => setUser(data));
    }, [userId]);

    function getDate(dateString) {
      let dateObj = new Date(dateString);
      return `${dateObj.toLocaleString("en-US", { month: "long", day: "numeric"})} ${dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
    }
  
    return (
      <>
        <h2>{user.name}</h2>
        <h3>@{user.username} </h3>
            <Link to={'posts/new'}><button className="addbutton" type="button">ADD POST</button></Link>
            
        <div>
                {posts.map((post, index) => (
                    
                    <div key={index} className="card">
                        <Link className="removelink" to={`/users/${userId}/posts/${post._id}`}>
                            <h2>{user.name}</h2>
                            <h3>@{user.username}</h3>
                            <h4 className="label-font">{post.description}</h4>
                            <h3><span className="date">{getDate(post.date)}</span></h3>
                        </Link>
                        </div>
                    
          ))}
        </div>
      </>
    );
}
  