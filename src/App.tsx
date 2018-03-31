import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Product from "./Product/component";
import Navbar from "./Navbar/component";

import store from "./state";

const redirectToDefault = () => <Redirect to="/product/nothing" />;

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <div className="App">
              <Route path="/product/:id" component={Product} />
              <Route exact path="/" component={redirectToDefault} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
