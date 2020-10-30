import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul className="nav nav-tabs justify-content-end">
        <Link to="/create_blog">
          <li className="nav-item">
            <a className="nav-link">Create a Blog</a>
          </li>
        </Link>
        <Link to="/view_blogs">
          <li className="nav-item">
            <a className="nav-link">View Blogs</a>
          </li>
        </Link>
        <Link to="/search_blogs">
        <li className="nav-item">
          <a className="nav-link">Search Blogs</a>
        </li>
        </Link>
      </ul>
    </nav>
  );
}
export default Nav;
