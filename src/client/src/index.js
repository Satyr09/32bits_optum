import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Detail from "./detail.js";
import * as serviceWorker from "./serviceWorker";
import database from "./firebase";

import LandingPage from "./landingPage.js";

import { withStyles } from "@material-ui/styles";
import style from "./appStyle.js";

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
    const classes = this.props.classes;

    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact>
              <LandingPage />
            </Route>
            <Route path="/detail" exact>
              {this.state.db ? <Detail database={this.state.db} /> : <br />}
            </Route>
            <Route path="/patient" exact>
              {this.state.db ? <App database={this.state.db} /> : <br />}
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
const StyledOptum = withStyles(style)(Optum);
ReactDOM.render(<StyledOptum />, document.getElementById("root"));
serviceWorker.unregister();
