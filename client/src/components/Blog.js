import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

toast.configure();

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      id: props.match.params.id,
      blog: []
    };
    
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/blog/view/${this.state.id}`).then((response)=>{
      this.setBlog(response.data);
    })
  }

  handleTextBoxChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleUpdateblog = () => {
    axios.put("http://localhost:3001/blog/update", {id: this.state.id, content: this.state.value});
    toast.success("Update done!", {autoClose: 1000});
  };

  setBlog(data) {
    this.setState({
      blog: data[0]
    })
  }

  render() {
    const blog_item = this.state.blog;
    return (
      <div>
        <h1>{blog_item.title}</h1>
        <h3>Writer: {blog_item.username}</h3>
        <p>{blog_item.content}</p>
        <div class="form-group">
          <label for="exampleFormControlTextarea1" />
          <textarea
            class="form-control"
            id="updatedBlog"
            rows="6"
            value={this.state.value}
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
