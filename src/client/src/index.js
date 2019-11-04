import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Detail from "./detail.js";
import * as serviceWorker from "./serviceWorker";
import database from "./firebase";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Optum extends React.Component {
  constructor(props) {
    super(props);
    this.state = { db: null };
  }
  componentDidMount() {
    this.setState({ db: database }, () => console.log(this.state));
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/detail" exact>
            {this.state.db ? <Detail database={this.state.db} /> : <br />}
          </Route>
          <Route path="/" exact>
            {this.state.db ? <App database={this.state.db} /> : <br />}
          </Route>
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<Optum />, document.getElementById("root"));
serviceWorker.unregister();
