import React, { useState, useEffect } from "react";

import { withStyles } from "@material-ui/styles";
import style from "./appStyle.js";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";

function IcuType4Form({ id, classes, name, db, setFresh, setLoading }) {
  let [gcs, setGCS] = useState(0);
  let [age, setAge] = useState(0);
  let [bun, setBun] = useState(0);
  let [creatanine, setCreatanine] = useState(0);
  let [platelet, setPlatelet] = useState(0);
  let [heartRate, setheartRate] = useState(0);

  let [predicted, setPredictFlag] = useState(false);
  let [disabled, setDisabled] = useState(false);
  let [open, setOpen] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (disabled) {
      return;
    }
    setLoading(true);
    setDisabled(true);
    fetch(
      `http://localhost:8080/model/ts/3?name=${name}&gcs=${gcs}&age=${age}&bun=${bun}&creatanine=${creatanine}&heartRate=${heartRate}&platelet=${platelet}`
    )
      .then(data => data.json())
      .then(res => {
        console.log(res);
        console.log(JSON.parse(res));
        writeToDB(name, res.val);
      });
  };
  const writeToDB = (name, res) => {
    var docRef = db.collection("patientData").doc(id);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          let oldData = doc.data();
          let oldPreds = oldData.Records;
          oldPreds.push(res);
          console.log(oldData);
          oldData.isFresh = true;
          db
            .collection("patientData")
            .doc(id)
            .set(oldData);
        } else {
          console.error("Doc not found");
        }
      })
      .then(() => {
        setOpen(true);
        setPredictFlag(true);
        setFresh(true);
        setLoading(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">Model ran successfully!</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
      {predicted ? (
        <Typography variant="subtitle2">
          Predictions made for the next period. Click render predictions if not
          visible
        </Typography>
      ) : (
        <form
          autoComplete="off"
          className={classes.icu1Form}
          onSubmit={handleSubmit}
        >
          <TextField
            required
            id="standard-required"
            label="GCS Level"
            className={classes.textField}
            margin="normal"
            onChange={e => setGCS(e.target.value)}
          />

          <TextField
            required
            id="standard-required"
            label="Age"
            className={classes.textField}
            margin="normal"
            onChange={e => setAge(e.target.value)}
          />
          <TextField
            required
            id="standard-required"
            label="BUN Level"
            className={classes.textField}
            margin="normal"
            onChange={e => setBun(e.target.value)}
          />
          <TextField
            required
            id="standard-required"
            label="Creatanine Level"
            className={classes.textField}
            margin="normal"
            onChange={e => setCreatanine(e.target.value)}
          />

          <TextField
            required
            id="standard-required"
            label="Hear Rate"
            className={classes.textField}
            margin="normal"
            onChange={e => setheartRate(e.target.value)}
          />

          <TextField
            required
            id="standard-required"
            label="Platelet Level"
            className={classes.textField}
            margin="normal"
            onChange={e => setPlatelet(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.inferenceButton}
            type="submit"
            disabled={disabled}
          >
            Generate predictions
          </Button>
        </form>
      )}
    </div>
  );
}

export default withStyles(style)(IcuType4Form);
