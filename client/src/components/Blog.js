import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

toast.configure();

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      id: props.match.params.id,
      blog: "",
    };
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/blog/view/${this.state.id}`
      );
      this.setState({ blog: data[0] });
    } catch (err) {
      console.log(err);
    }
  }

  handleTextBoxChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleUpdateblog = async () => {
    try {
      const { data } = await axios.put("http://localhost:3001/blog/update", {
        id: this.state.id,
        content: this.state.value,
      });
    } catch (err) {
      console.log(err);
    }
    toast.success("Update done!", { autoClose: 1000 });
  };

  render() {
    const { title, username, content, value } = this.state.blog;
    return (
      <div>
        <h1>{title}</h1>
        <h3>Writer: {username}</h3>
        <p>{content}</p>
        <div class="form-group">
          <label for="exampleFormControlTextarea1" />
          <textarea
            class="form-control"
            id="updatedBlog"
            rows="6"
            value={value}
            onChange={this.handleTextBoxChange}
          ></textarea>
        </div>
        <button
          onClick={this.handleUpdateblog}
          className="btn btn-primary btn-sm"
        >
          Update
        </button>
      </div>
    );
  }
}

export default Blog;
