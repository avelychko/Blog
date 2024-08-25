import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function SinglePost() {
    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const { userId, postId } = useParams();

    useEffect(()=> {
        fetch(`http://localhost:3001/users/${userId}/posts/${postId}`).then((response) => response.json()).then((data) => setPost(data));
        fetch(`http://localhost:3001/users/${userId}`).then((response) => response.json()).then((data) => setUser(data));
    }, [userId, postId]);

    function getDateTime(dateString) {
        let dateObj = new Date(dateString);
        return `${dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} ${dateObj.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric"})} `;
    }

    return (
        <>
            <div className="card">
                <div className="deletediv">
                <div>
                <Link className="removelink" to={`/users/${userId}`}>
                    <h2 className="label-font">{user.name}</h2>
                </Link>
                    <h3>@{user.username}</h3>
                </div>
                <div>
                    <Link className="removelink" to={`/users/${userId}/posts/${postId}/delete`}>
                        <button className="deletebutton" type="button">DELETE POST</button>
                    </Link>
                </div>
                </div>
            <div>
                <h4>{post.description}</h4>
                </div>
                <h3><span className="date">{getDateTime(post.date)}</span></h3>
            </div>
        </>
    );
}

async function fetchSinglePost() {
    return null;
}

export { fetchSinglePost };