import { Link, Outlet } from 'react-router-dom';

export default function Wrapper() {
  return (
      <>
          <div className="content">
              <div>
                  <div className="browsecontainer"><Link className="link" to="/users">BROWSE USERS</Link></div>
                <header>
                  <h1>blog.it</h1>
                </header>
              </div>
              <Outlet />
          </div>
    </>
  );
}
