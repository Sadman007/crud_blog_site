import "./App.css";
import Blogs from "./components/Blogs";
import SearchBlogs from "./components/SearchBlogs";
import Nav from "./components/bootStyles/Nav";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Home = () => (
  <div>
    <h1>Welcome to my blog site!</h1>
  </div>
);

const NotFound = () => (
  <div>
    <h1>URL Not Found!</h1>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path={["/", "/home"]} exact component={Home} />
          <Route path="/blog/view/:id" exact component={Blog} />
          <Route path="/view_blogs" exact component={Blogs} />
          <Route path="/create_blog" exact component={CreateBlog} />
          <Route path="/search_blogs" exact component={SearchBlogs} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
