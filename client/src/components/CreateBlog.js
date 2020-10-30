import React, { Component } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

const initialState = {
  username: "",
  title: "",
  content: "",
  usernameError: "",
  titleError: "",
  contentError: "",
};

class Create_Blog extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleUsernamechange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleTitlechange = (event) => {
    this.setState({
      title: event.target.value,
      usernameError: "",
      titleError: "",
      contentError: ""
    });
  };

  handleContentchange = (event) => {
    this.setState({
      content: event.target.value,
    });
  };

  validate = () => {
    let usernameError = "";
    let titleError = "";
    let contentError = "";

    const userLength = this.state.username.length;
    if (userLength < 1 || userLength > 45) {
      usernameError = "Username must be in between 1 to 45 characters";
    }
    const titleLength = this.state.title.length;
    if (titleLength < 1 || titleLength > 45) {
      titleError = "Title must be in between 1 to 45 characters";
    }
    const contentLength = this.state.content.length;
    if (contentLength < 1 || contentLength > 1000) {
      contentError = "Content must be in between 1 to 1000 characters";
    }
    if (usernameError) {
      this.setState({ usernameError });
    }
    if (titleError) {
      this.setState({ titleError });
    }
    if (contentError) {
      this.setState({ contentError });
    }
    if (usernameError || titleError || contentError) {
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    const isValid = this.validate();
    if (isValid) {
      axios.post("http://localhost:3001/insert_blog", {title: this.state.title, username: this.state.username, content: this.state.content});
      this.setState(initialState);
      toast.success("New blog has been created!", {autoClose: 1200});
    }
  };

  render() {
    return (
      <div>
        <h3>Create Blog Page</h3>
        <form>
          <div>
            <div className="col-sm-3">
              <p>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Your username..."
                  value={this.state.username}
                  onChange={this.handleUsernamechange}
                />
              </p>
              <p className="text-left text-danger">
                {this.state.usernameError}
              </p>
            </div>
            <div className="col-sm-5">
              <p>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Blog title..."
                  value={this.state.title}
                  onChange={this.handleTitlechange}
                />
              </p>
              <p class="text-left text-danger">{this.state.titleError}</p>
            </div>
          </div>
          <div className="col-sm-6">
            <p>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="10"
                placeholder="Your writing..."
                value={this.content}
                onChange={this.handleContentchange}
              ></textarea>
            </p>
            <button
              onClick={this.handleSubmit}
              type="button"
              className="btn btn-primary float-sm-left"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Create_Blog;
