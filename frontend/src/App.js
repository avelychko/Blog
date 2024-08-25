import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router'
import Users from './Users';
import './App.css';
import NewUser from './NewUser';
import Posts from './Posts';
import NewPost from './NewPost';
import SinglePost from './SinglePost';
import DeleteUser from './DeleteUser';
import DeletePost from './DeletePost';
import Wrapper from './Wrapper';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<Posts/>} />
          <Route path="users/new" element={<NewUser/>} />
          <Route path="users/:userId/posts/:postId" element={<SinglePost/>} />
          <Route path="users/:userId/posts/new" element={<NewPost/>} />
          <Route path="users/:userId/delete" element={<DeleteUser/>} />
          <Route path="users/:userId/posts/:postId/delete" element={<DeletePost/>} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
