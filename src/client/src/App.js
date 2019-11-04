import React from "react";
import PatientListContainer from "./patientListContainer.js";
import PatientInfo from "./patientInfo.js";

import style from "./appStyle.js";
import { withStyles } from "@material-ui/styles";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/getUsername")
      .then(res => res.json())
      .then(data => this.setState({ userName: data.username }));
  }
  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.row}>
        <div className={` ${classes.column} ${classes.patientListContainer}`}>
          <PatientListContainer />
        </div>
        <div className={`${classes.column} ${classes.patientCard}`}>
          <PatientInfo />
        </div>
      </div>
    );
  }
}

export default withStyles(style)(App);
