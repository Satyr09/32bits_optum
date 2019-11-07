import React, { Component } from "react";
import styles from "./appStyle.js";
import { withStyles } from "@material-ui/styles";

/*-------------Email & Report Genration imports---------------*/
import * as emailjs from "emailjs-com";
import jsPDF from "jspdf";
/*-----------------------------------------------------------*/

/* material-ui imports*/

import Divider from "@material-ui/core/Divider";

import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";

import Button from "@material-ui/core/Button";
/*---------------------------------------------------------------*/

class patientInfo extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    console.log(this.props.info);
    this.state = {
      open: false,
      mortalityRisk: "",
      generateReportStatus: false
    };
  }
  ICU = [
    "Dept : Coronary unit care ",
    "Dept : Cardiac Surgery",
    "Dept : Medical ICU",
    "Surgical ICU"
  ];
  refreshInfoHelper = () => {
    const { db } = this.props;
    let docRef = db.collection("patientData").doc(this.props.info.id);
    this.setState({ generateReportStatus: true });
    docRef.get().then(doc => {
      if (doc.exists) this.props.refreshInfo(doc.data());
      else console.error("haalp!");
    });
  };
  runMortalityPredictor = () => {
    console.log("SDFSD");
    console.log(this.props.info);

    fetch("http://localhost:8080/predictor", {
      method: "post",
      body: JSON.stringify(this.props.info),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.text())
      .then(data => {
        this.setState(
          {
            open: true,
            mortalityRisk: data == 1 ? "High" : "Low"
          },
          () => {
            const { db } = this.props;
            let docRef = db.collection("patientData").doc(this.props.info.id);

            docRef
              .update({
                Danger_Level: this.state.mortalityRisk
              })
              .then(() => {this.refreshInfoHelper();this.sendMail()})
              .catch(err => console.error(err));
          }
        );
      });
  };

  generateReport = () => {
    var doc = new jsPDF();

    Object.keys(this.props.info).forEach((key, i) => {
      doc.text(20, 10 + i * 10, `${key} : ${this.props.info[key]}`);
    });

    doc.save(
      `${this.props.info.Name}_${new Date().toLocaleDateString(
        "en-IN"
      )}_Report.pdf`
    );
  };

  sendMail = () => {
    const email = "32_bits";

    let templateParams = {
      from_name: email,
      to_who: "daipayan.mukherjee09@gmail.com",
      to_name: "Doctor X.",
      patient_name: this.props.info.Name,
      mortality_risk: this.props.info.Danger_Level,
      message_html:
        '<a href="http://localhost:3000"><button style="background-color:blue;color:white;font-size:18px;padding:10px 10px 10px 10px;"> Go to Dashboard.</button></a> '
    };
    emailjs.send(
      "gmail",
      "template_eZdIxnaq",
      templateParams,
      "user_HfkI6Wqlzdzl9o7Rk49nC"
    );
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const classes = this.props.classes;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              Mortality Risk : {this.state.mortalityRisk}!
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />

        {this.props.info ? (
          <Card className={`${classes.card} ${classes.blueGradient}`}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={this.props.info.Name}
              subheader={`ICU TYPE : ${this.props.info.ICU_Type}`}
            />
            <CardMedia
              className={classes.media}
              image={"https://i.pravatar.cc/100" || require("./logo.jpg")}
              title="Paella dish"
            />

            <div className={classes.chipZone}>
              <Chip
                avatar={<Avatar>M</Avatar>}
                label={`${this.props.info.Danger_Level} Risk Patient`}
                className={
                  this.props.info.Danger_Level == "High"
                    ? classes.redChip
                    : classes.greenChip
                }
              />

              <Chip
                avatar={<Avatar>M</Avatar>}
                label={`${this.ICU[Number(this.props.info.ICU_Type) - 1]}`}
                color="primary"
              />
            </div>
            <CardContent>
              <Typography variant="button">
                Age : &nbsp; {this.props.info.Age}
              </Typography>
              <Divider className={classes.marginTop} />
              <Typography variant="button">
                Height (in cms) : &nbsp; {this.props.info.Height}
              </Typography>
              <Divider className={classes.marginTop} />
              <Typography variant="button">
                Gender : &nbsp; {this.props.info.Gender}
              </Typography>
              <Divider className={classes.marginTop} />
              <Typography variant="button">
                Weight (ing kgs) : &nbsp; {this.props.info.Weight}
              </Typography>
            </CardContent>

            <div className={classes.inlineRow}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={this.runMortalityPredictor}
              >
                Run Mortality Predictor
              </Button>

              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                disabled={!this.state.generateReportStatus}
                onClick={this.generateReport}
              >
                Generate Report
              </Button>
            </div>
          </Card>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default withStyles(styles)(patientInfo);
