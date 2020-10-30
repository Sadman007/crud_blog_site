import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

class SearchBlogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      searchResultMessage: "",
      blogs: [],
    };
  }

  handleSearchBoxChange = (e) => {
    this.setState({ username: e.target.value, searchResultMessage: "" });
  };

  handleSearchResult = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/user/${this.state.username}`
      );
      this.setState({ blogs: data });
      const length = this.state.blogs.length;
      if (length === 0) this.setState({ searchResultMessage: "No result!" });
      else this.setState({ searchResultMessage: `Blog Count: ${length}` });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <h3>Search Blogs Page</h3>
        <form>
          <div>
            <div className="col-sm-3">
              <p>
                <input
                  className="form-control"
                  type="text"
                  placeholder="search by username..."
                  aria-label="Default"
                  onChange={this.handleSearchBoxChange}
                />
              </p>
              <button
                type="button"
                className="btn btn-primary float-sm-left"
                onClick={this.handleSearchResult}
              >
                Search
              </button>
              <br></br>
              <br></br>
              <p className="text-muted float-left">
                {this.state.searchResultMessage}
              </p>
            </div>
          </div>
        </form>
        <br></br>
        <div>
          <table className="center table table-bordered">
            <thead>
              <tr>
                <th scope="col">Title</th>
              </tr>
            </thead>
            <tbody>
              {this.state.blogs.map((m) => (
                <tr key={m.id}>
                  <td>
                    <Link to={`/blog/view/${m.id}`}>{m.title}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SearchBlogs;
