import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import axios from "axios";

class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3001/blogs").then((response) => {
      this.setState(
        {
          blogs: response.data,
        },
        () => {
          console.log(response.data);
        }
      );
    });
  }

  handleDelete = (id) => {
    axios.delete(`http://localhost:3001/blog/delete/${id}`);
    const newBloglist = this.state.blogs.filter((m) => id !== m.id);
    this.setState({
      blogs: newBloglist,
    });
  };

  handleSortAsc = () => {
    var obj = [...this.state.blogs];
    obj.sort((a, b) =>
      a.username == b.username
        ? a.title < b.title
          ? -1
          : 1
        : a.username < b.username
        ? -1
        : 1
    );
    this.setState(
      {
        blogs: obj,
      },
      () => {
        console.log(obj);
      }
    );
  };

  handleSortDsc = () => {
    var obj = [...this.state.blogs];
    obj.sort((a, b) =>
      a.username == b.username
        ? a.title < b.title
          ? 1
          : -1
        : a.username < b.username
        ? 1
        : -1
    );
    this.setState(
      {
        blogs: obj,
      },
      () => {
        console.log(obj);
      }
    );
  };

  render() {
    return (
      <div>
        <h3>Blog List</h3>

        <div className="text-muted float-left">
          <p> Total blog count: {this.state.blogs.length}</p>
          <button
            onClick={this.handleSortAsc}
            className="btn btn-primary btn-sm"
          >
            Sort blogs by username (ASC)
          </button>
          <br></br>
          <br></br>
          <button
            onClick={this.handleSortDsc}
            className="btn btn-primary btn-sm"
          >
            Sort blogs by username (DSC)
          </button>
          <br></br>
          <br></br>
        </div>

        <table className="center table table-bordered">
          <thead>
            <tr>
              <th scope="col">Writer</th>
              <th scope="col">Title</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.blogs.map((m) => (
              <tr key={m.id}>
                <td>{m.username}</td>
                <td>
                  <Link to={`/blog/view/${m.id}`}>{m.title}</Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(m.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Blogs;
