import React, { useState, useEffect } from "react";

import { withStyles } from "@material-ui/styles";
import style from "./appStyle.js";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function IcuType1Form({ classes, name }) {
  const handleSubmit = e => {
    e.preventDefault();

    fetch(
      `http://localhost:8080/model/ts/1?name=${name}&gcs=${gcs}&urine=${urine}&bun=${bun}&creatanine=${creatanine}`
    )
      .then(data => data.json())
      .then(res => console.log(res));
  };

  const [gcs, setGCS] = useState(0);
  const [urine, setUrine] = useState(0);
  const [bun, setBun] = useState(0);
  const [creatanine, setCreatanine] = useState(0);

  return (
    <div>
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
          label="Urine Level"
          className={classes.textField}
          margin="normal"
          onChange={e => setUrine(e.target.value)}
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

        <Button
          variant="contained"
          color="secondary"
          className={classes.inferenceButton}
          type="submit"
        >
          Get Predictions ->
        </Button>
      </form>
    </div>
  );
}

export default withStyles(style)(IcuType1Form);
