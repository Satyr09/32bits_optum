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
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import ErrorRoundedIcon from "@material-ui/icons/ErrorRounded";
import Chip from "@material-ui/core/Chip";

/*-------------------------------------------------*/
/*---------------------Progress Bar Import ---------------*/

import CircularProgress from "@material-ui/core/CircularProgress";

/*-------------------------------------------------*/

/*---------------Form Imports----------------------*/

import ICU1Form from "./icuType1Form";
import ICU2Form from "./icuType2Form";
import ICU3Form from "./icuType3Form";
import ICU4Form from "./icuType4Form";
/*-------------------------------------------------*/

const FORMS = ({ ...args }) => ({
  1: <ICU1Form {...args} />,
  2: <ICU2Form {...args} />
});
class Detail extends Component {
  constructor(props) {
    super(props);
    this.setFresh = this.setFresh.bind(this);
    this.setLoading = this.setLoading.bind(this);

    this.state = {
      slider1: 0,
      db: this.props.database,
      patientName: "",
      isFresh: false,
      isLoading: false
    };
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
            console.log(doc.id);
            this.setState({ data: data, id: doc.id, isFresh: data.isFresh });
          }
        });
      });
  };

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    const patientName = searchParams.get("name");

    this.setState({ patientName }, () => this.fetchPatientData());
  }

  setFresh(flag) {
    this.setState({
      isFresh: flag
    });
  }
  setLoading(flag) {
    console.log("loading complete");
    this.setState({
      isLoading: flag
    });
  }

  fetchPreds = () => {
    const db = this.props.database;
    let docRef = db.collection("patientData").doc(this.state.id);
    docRef.get().then(doc => {
      if (doc.exists) {
        this.setState({
          records: doc.data().Records,
          isFresh: false
        });
      }
    });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={`${classes.row} ${classes.darkMode}`}>
        {/* <div>
          <span className={classes.tsHeader}>Time Series Predictions :</span>
          <br />
          <span className={classes.tsSubHeader}>
            Usage instructions : Fill up the form below,<br />Different fields
            will be available depending on<br /> the patient's ICU Type<br />Find
            more details about our methodology on Github Then click submit to
            allow our models<br /> to run inference and generate predictions{" "}
          </span>
        </div> */}
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

                {this.state.data.ICU_Type === 1 ? (
                  <ICU1Form
                    db={this.props.database}
                    id={this.state.id}
                    setFresh={this.setFresh}
                    setLoading={this.setLoading}
                  />
                ) : this.state.data.ICU_Type === 2 ? (
                  <ICU2Form
                    db={this.props.database}
                    id={this.state.id}
                    setFresh={this.setFresh}
                    setLoading={this.setLoading}
                  />
                ) : this.state.data.ICU_Type === 3 ? (
                  <ICU3Form
                    db={this.props.database}
                    id={this.state.id}
                    setFresh={this.setFresh}
                    setLoading={this.setLoading}
                  />
                ) : (
                  <ICU4Form
                    db={this.props.database}
                    id={this.state.id}
                    setFresh={this.setFresh}
                    setLoading={this.setLoading}
                  />
                )}
              </Container>
            ) : (
              <button>refresh</button>
            )}
          </CardContent>
        </Card>

        <div>
          {this.state.isLoading ? (
            <div>
              <CircularProgress color="secondary" />
              <div className={classes.marginTop}>
                {" "}
                <Typography variant="body">Please Wait...</Typography>
              </div>
            </div>
          ) : (
            <Typography variant="subtitle1" className={classes.whiteText}>
              Usage : <br />
              Put in values into the form and run the predictor
            </Typography>
          )}
        </div>

        <Card className={` ${classes.inferenceForm} ${classes.redGradient}`}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {this.state.patientName}
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
                {this.state.data ? (
                  <span>
                    Mortality Risk : {this.state.data.Danger_Level} &nbsp;
                    {this.state.data.Danger_Level === "High" ? (
                      <ErrorRoundedIcon color="error" />
                    ) : (
                      <CheckCircleRoundedIcon color="action" />
                    )}
                  </span>
                ) : (
                  ""
                )}
              </Typography>
              <Typography variant="h6">
                {this.state.data
                  ? `ICU Type : ${this.state.data.ICU_Type}`
                  : ""}
              </Typography>
            </Container>

            <Divider className={classes.marginTop} />

            <Container maxWidth="sm" className={` ${classes.marginTop}`}>
              <Typography variant="caption">
                * &nbsp; Values given below are predictions only.<br /> &nbsp;
                Use clinical judgement before dispensing measures
              </Typography>
            </Container>

            {!this.state.isFresh ? (
              this.state.records && this.state.records.length > 0 ? (
                <Container maxWidth="sm" className={classes.marginTop}>
                  <Typography variant="subtitle2">
                    Predictions for &nbsp;&nbsp;
                    <b>{new Date().toLocaleDateString("en-IN")}</b>
                  </Typography>
                  <br />

                  <Typography variant="button">
                    <Chip
                      label={`GCS :
                        ${this.state.records
                          ? this.state.records[this.state.records.length - 1]
                              .gcs
                          : ""}`}
                    />
                  </Typography>
                  <Divider className={classes.marginTop} />
                  <Typography variant="button">
                    <Chip
                      label={`Bun :
                        ${this.state.records
                          ? this.state.records[this.state.records.length - 1]
                              .bun
                          : ""}`}
                    />
                  </Typography>
                  <Divider className={classes.marginTop} />
                  <Typography variant="button">
                    <Chip
                      label={`Urine :
                        ${this.state.records
                          ? this.state.records[this.state.records.length - 1]
                              .urine
                          : ""}`}
                    />
                  </Typography>
                  <Divider className={classes.marginTop} />
                  <Typography variant="button">
                    <Chip
                      label={`Creatinine :
                        ${this.state.records
                          ? this.state.records[this.state.records.length - 1]
                              .creatanine
                          : ""}`}
                    />
                  </Typography>
                </Container>
              ) : (
                ""
              )
            ) : (
              <Container maxWidth="sm" className={classes.marginTop}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.inferenceButton}
                  onClick={this.fetchPreds}
                >
                  Render Predictions
                </Button>{" "}
              </Container>
            )}
            <Divider className={classes.marginTop} />
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default withStyles(style)(Detail);
