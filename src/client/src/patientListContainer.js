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
    this.state = { selectedIndex: -1, testData: " ", patientList: [] };
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
    this.props.setInfo(this.state.patientList.find(o => o.id === index));
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
  infoRedirect = (e, item) => {
    window.location.href = `/detail?name=${item.Name}&id=${item.id}`;
  };

  componentDidMount() {
    const { db } = this.props;
    let arr = [];

    db
      .collection("patientData")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let id = doc.id.toString();
          let data = doc.data();
          let temp = { ...data };
          temp.id = id;
          arr.push(temp);
        });
      })
      .then(() => {
        this.setState({ patientList: arr });
      });
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.testDiv}>
        <List className={classes.listRoot}>
          {this.state.patientList
            ? this.state.patientList.map((item, idx) => {
                return (
                  <ListItem
                    key={item.id}
                    selected={this.state.selectedIndex === item.id}
                    onClick={event => this.handleListItemClick(event, item.id)}
                  >
                    <ListItemText primary={item.Name} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="info"
                        onClick={e => this.infoRedirect(e, item)}
                        className={
                          item.Danger_Level == "High"
                            ? classes.redChip2
                            : classes.greenChip2
                        }
                      >
                        <InfoIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            : ""}
        </List>
      </div>
    );
  }
}
export default withStyles(styles)(PatientListContainer);
