import React from "react";
import "./App.css";
import styles from "./appStyle.js";

import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import {
  TextField,
  CircularProgress,
  Modal,
  Typography,
  Zoom,
  InputAdornment,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: "80",
      percentage: "87"
    };
    this.donateRef = React.createRef();
  }

  scroll = () => {
    window.scrollTo(0, this.donateRef.current.offsetTop);
  };

  viewDemo = () => {
    window.location.href = "/patient";
  };
  componentDidMount() {
    let heading = document.querySelector(".gleaming");
    let letters = heading.textContent.split("");
    heading.textContent = "";
    letters.forEach(letter => {
      let span = document.createElement("span");
      span.textContent = letter;
      span.style.animationDelay = `${Math.floor(
        Math.random() * (1000 - 10 + 1)
      ) + 10}ms`;
      heading.append(span);
    });
  }
  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <div className="landingBackground">
          <div className="landingBackgroundProgress">
            <Tooltip
              TransitionComponent={Zoom}
              title={`${Number(
                this.state.percentage | 0
              )}% mean accuracy achieved`}
              classes={{ tooltip: classes.whiteBG, arrow: classes.arrows }}
            >
              <LinearProgress
                variant="determinate"
                value={
                  this.state.percentage
                    ? this.state.percentage >= 100 ? 100 : this.state.percentage
                    : 0
                }
                classes={{
                  root: classes.progressBar,
                  barColorPrimary: classes.progressBarInner
                }}
              />
            </Tooltip>
          </div>
          <div className="landingBackgroundMid">
            <div className="landingBackgroundContentHolder">
              <div className="landingBackgroundText" styles="text-align:left">
                We at{" "}
                <b className="gleaming" style={{ paddingLeft: "5px" }}>
                  32_Bits
                </b>{" "}
                aim to develop <br />a solution to help reduce the<br />
                <span className="specialText">Mortality Rates</span> in ICUs
                <br />
                <span className="specialSmallText">
                  The development of methods for prediction of mortality rates
                  in Intensive Care Unit (ICU) populations has been motivated
                  primarily by the need to compare the efficacy of medications,
                  care guidelines, surgery, and other interventions when, as is
                  common.
                </span>
              </div>
              <div className="landingBackgroundAction">
                <Button variant="contained" component="span" size="large">
                  Know More
                </Button>
              </div>
            </div>

            <div className="landingBackgroundImage">
              <img src={require("./heart.svg")} alt="heart" />
            </div>
          </div>
        </div>

        <div className={classes.sellProductArea}>
          <div className="methodDesc">
            <span className="methodDescHead"> Our methodology : </span>
            <br />
            <br />
            <span className="methodDescText">
              {" "}
              We use machine learning models to analyse<br /> the available data
              and make two categories of predictions:<br />
              <br />
              <br />
              1 . Time Series Prediction of critical value.
              <br />
              2. Predicting whether the patient is under immediate danger
            </span>
          </div>
          <div className={classes.firstSellingPoint}>
            <div className={classes.halfWidth}>
              <img
                className={classes.sellImg}
                src={require("./doctor.svg")}
                alt="doctor"
              />
            </div>
            <div className="landingBackgroundText2">
              {" "}
              With your professional<br /> expertise
            </div>
          </div>

          <div className={classes.secondSellingPoint}>
            <div className="landingBackgroundText2">
              {" "}
              And our analysis tools
            </div>
            <div className={classes.halfWidth}>
              <img
                className={classes.sellImg}
                src={require("./analysis.svg")}
                alt="tech"
              />
            </div>
          </div>
        </div>

        <div className="donateButtonWrapper">
          <Button
            variant="contained"
            color="primary"
            className={classes.viewDemoButton}
            onClick={this.viewDemo}
          >
            View Demo
          </Button>
        </div>

        <div className="authorArea">Made by Daipayan Mukherjee</div>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
