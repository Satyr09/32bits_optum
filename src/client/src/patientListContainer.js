import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import styles from "./appStyle.js";

class PatientListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: -1, testData: " " };
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
    this.getDataFromModel(index, " item");
  };
  getDataFromModel = (firstName, lastName) => {
    fetch(
      `http://localhost:8080/model?firstname=${firstName}&lastname=${lastName}`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ testData: data.name });
      });
  };
  infoRedirect = e => {
    window.location.href = "/detail";
  };
  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.testDiv}>
        <List className={classes.listRoot}>
          <ListItem
            selected={this.state.selectedIndex === 0}
            onClick={event => this.handleListItemClick(event, 0)}
          >
            <ListItemText primary={this.state.testData} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="info"
                onClick={e => this.infoRedirect(e)}
              >
                <InfoIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem
            selected={this.state.selectedIndex === 1}
            onClick={event => this.handleListItemClick(event, 1)}
          >
            <ListItemText primary={this.state.testData} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="info">
                <InfoIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    );
  }
}
export default withStyles(styles)(PatientListContainer);
