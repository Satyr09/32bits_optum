import React from "react";
import PatientListContainer from "./patientListContainer.js";
import PatientInfo from "./patientInfo.js";

import style from "./appStyle.js";
import { withStyles } from "@material-ui/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { info: null };
    this.setInfo = this.setInfo.bind(this);
  }
  setInfo = arg => {
    this.setState({ info: arg });
  };
  refreshInfo = arg => {
    this.setState({ info: arg });
  };
  componentDidMount() {
    fetch("http://localhost:8080/api/getUsername")
      .then(res => res.json())
      .then(data => this.setState({ userName: data.username }));
  }
  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.darkMode}>
        <AppBar position="static" className={classes.blueGradient}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.teamName}>
              32_BITS
            </Typography>
            <Button color="inherit">Home</Button>
          </Toolbar>
        </AppBar>

        <div className={classes.usageTexts}>
          <h1 class="gleaming">Demo instructions :</h1>
          <h5 class="subtitle">
            Use this view to examine current patient stats and run through<br />{" "}
            our model to predict mortality risks
          </h5>
        </div>
        <div className={classes.row}>
          <div className={` ${classes.column} ${classes.patientListContainer}`}>
            <PatientListContainer
              db={this.props.database}
              setInfo={this.setInfo}
            />
          </div>
          <div className={`${classes.column} ${classes.patientCard}`}>
            <PatientInfo
              db={this.props.database}
              info={this.state.info}
              refreshInfo={this.refreshInfo}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(App);
