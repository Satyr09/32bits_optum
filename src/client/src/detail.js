import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import style from "./appStyle.js";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
/*-------------------- Card Imports -------------*/

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";

/*-------------------------------------------------*/
/*---------------------Slider Import ---------------*/

import Slider from "@material-ui/core/Slider";

/*-------------------------------------------------*/

/*---------------Form Imports----------------------*/

import ICU1Form from "./icuType1Form";

/*-------------------------------------------------*/

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = { slider1: 0, db: this.props.database, patientName: "" };
  }
  handleSliderChange = name => (e, value) => {
    this.setState(
      {
        [name]: value
      },
      () => console.log(this.state)
    );
  };
  fetchPatientData = () => {
    const db = this.state.db;

    db
      .collection("patientData")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = doc.data();
          console.log(data.Name);
          if (data.Name === this.state.patientName) {
            this.setState({ data: data });
          }
        });
      });
  };

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    const patientName = searchParams.get("name");

    this.setState({ patientName }, () => this.fetchPatientData());

    console.log(this.props);
    if (this.props.database) {
      const db = this.props.database;
      console.log(db);
      db
        .collection("patientData")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc.data());
          });
        });
    }
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.row}>
        <Card className={classes.dailyForm}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            title="Daily Record"
            subheader={this.state.patientName}
          />
          <CardContent>
            {this.state.data ? (
              <Container
                maxWidth="sm"
                className={`${classes.center} ${classes.marginTop}`}
              >
                <Typography variant="subtitle1">
                  Fill up the below form and click get predictions
                </Typography>

                <Divider className={classes.marginTop} />

                <ICU1Form name={this.state.patientName} />
              </Container>
            ) : (
              <button>refresh</button>
            )}
          </CardContent>
        </Card>

        <div>
          <Button
            variant="contained"
            color="secondary"
            className={classes.inferenceButton}
          >
            Get Predictions ->
          </Button>
        </div>

        <Card className={classes.inferenceForm}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            title="Predictions"
            subheader={this.state.patientName}
          />
          <CardContent>
            <Container maxWidth="sm" className={classes.center}>
              <Typography variant="h6">
                {`Patient Name : ${this.state.patientName}`}
              </Typography>

              <Typography variant="h6">
                {this.state.data
                  ? `Mortality Risk : ${this.state.data.Danger_Level}`
                  : ""}
              </Typography>
              <Typography variant="h6">
                {this.state.data
                  ? `ICU Type : ${this.state.data.ICU_Type}`
                  : ""}
              </Typography>
            </Container>

            <Divider className={classes.marginTop} />

            <Container
              maxWidth="sm"
              className={`${classes.center} ${classes.marginTop}`}
            >
              <Typography variant="subtitle1">
                Values given below are predictions only.Use clinical judgement
                before dispensing measures
              </Typography>
            </Container>

            <Divider className={classes.marginTop} />
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default withStyles(style)(Detail);
