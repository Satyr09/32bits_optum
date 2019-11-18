const express = require("express");
const bodyParser = require("body-parser");

const os = require("os");
const fs = require("fs");
const csv = require("csvtojson");

const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const appendFileAsync = promisify(fs.appendFile);

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/getUsername", (req, res) =>
  res.send({ username: `${os.userInfo().username} Dai` })
);

const createProcess = type => {};

/*---------------------Patient Similarity------------------*/

app.post("/model/similar", async (req, res) => {
  let data = req.body;
  console.log("TRYING TO DETECT NEAREST NEIGHBOURS------------------");
  console.log(data);
  try {
    const csvData = await csv().fromFile("./src/mean_icutype_1.csv");
    console.log(csvData[0]);

    let mostSim = -1;
    let secondMostSim = -1;
    const result = [];

    for (i = 0; i < csvData.length; i++) {
      const record = csvData[i];
      const dot =
        data.GCS_mean * record.GCS_mean + data.BUN_mean * record.BUN_mean;
      const dataSq =
        data.GCS_mean * data.GCS_mean + data.BUN_mean * data.BUN_mean;
      const recSq =
        record.GCS_mean * record.GCS_mean + record.BUN_mean * record.BUN_mean;

      const temp = dot / (Math.sqrt(dataSq) * Math.sqrt(recSq));
      if (temp > mostSim) {
        mostSim = temp;
        result[0] = { id: record.RecordID, similarity: mostSim };
      } else if (temp > secondMostSim) {
        secondMostSim = temp;
        result[1] = { id: record.RecordID, similarity: secondMostSim };
      }
    }

    console.log(result);
    res.send({
      mostSimID: result[0].id,
      secmostSimID: result[1].id,
      sim1: result[0].similarity,
      sim2: result[1].similarity
    });
  } catch (err) {
    console.log("ERRRRRRROOOOOOOORRRRRRRR");
    console.error(err);
  }
});

/*-------------------- RECO SYS -------------------------*/

app.post("/model/reco", async (req, res) => {
  let { gcs, creatinine, bun, urine } = req.body;

  let spawn = require("child_process").spawn;
  let gcsProcess = spawn("python", [
    "ML/time_series/main/recof.py",
    bun > 21 ? 1 : 0,
    gcs > 15 ? 1 : 0,
    creatinine > 1.2 ? 1 : 0,
    urine > 2000 ? 1 : 0
  ]);
  console.log("process spawned....................... RECO FOR ICU TYPE : 1 ");

  gcsProcess.stdout.setEncoding("utf8");
  gcsProcess.stdout.on("data", data => {
    console.log("DATA RECEIVED--------- RECO ");
    console.log(data);
    res.send({ val: data.toString() });
  });

  gcsProcess.stderr.setEncoding("utf8");
  gcsProcess.stderr.on("data", err => {
    console.log(err);
    console.error(err);
    // res.sendStatus(501);
  });
});

/*-------------------- TIME SERIES PREDICTIONS ----------------*/

app.get("/model/ts/1", async (req, res) => {
  let { id, name, gcs, creatanine, bun, urine } = req.query;
  gcs = "\n" + gcs;
  creatanine = "\n" + creatanine;
  bun = "\n" + bun;
  urine = "\n" + urine;
  let header = "value";
  if (!fs.existsSync(`./src/records/${id}_gcs.csv`))
    await appendFileAsync(`./src/records/${id}_gcs.csv`, header);
  if (!fs.existsSync(`./src/records/${id}_bun.csv`))
    await appendFileAsync(`./src/records/${id}_bun.csv`, header);
  if (!fs.existsSync(`./src/records/${id}_urine.csv`))
    await appendFileAsync(`./src/records/${id}_urine.csv`, header);
  if (!fs.existsSync(`./src/records/${id}_creatanine.csv`))
    await appendFileAsync(`./src/records/${id}_creatanine.csv`, header);

  await appendFileAsync(`./src/records/${id}_gcs.csv`, gcs);
  await appendFileAsync(`./src/records/${id}_creatanine.csv`, creatanine);
  await appendFileAsync(`./src/records/${id}_bun.csv`, bun);
  await appendFileAsync(`./src/records/${id}_urine.csv`, urine);

  let spawn = require("child_process").spawn;
  let gcsPath = `H:\\32bits_optum\\32bits_optum-master\\src\\records\\${id}_gcs.csv`;
  let bunPath = `H:\\32bits_optum\\32bits_optum-master\\src\\records\\${id}_bun.csv`;
  let creataninePath = `H:\\32bits_optum\\32bits_optum-master\\src\\records\\${id}_creatanine.csv`;
  let urinePath = `H:\\32bits_optum\\32bits_optum-master\\src\\records\\${id}_urine.csv`;

  let gcsProcess = spawn("python", [
    "ML/time_series/main/ts_predict.py",
    gcsPath,
    bunPath,
    creataninePath,
    urinePath
  ]);
  console.log("process spawned....................... ICU TYPE : 1 ");

  gcsProcess.stdout.setEncoding("utf8");
  gcsProcess.stdout.on("data", data => {
    console.log("DATA RECEIVED");
    console.log(data);
    res.send({ val: data.toString() });
  });

  gcsProcess.stderr.setEncoding("utf8");
  gcsProcess.stderr.on("data", err => {
    console.log(err);
    console.error(err);
    // res.sendStatus(501);
  });
});

//---------------------- ICU TYPE 2 ---------------------------------------------

app.get("/model/ts/2", async (req, res) => {
  let { name, gcs, creatanine, bun, urine, glucose, sodium } = req.query;
  gcs = "\n" + gcs;
  creatanine = "\n" + creatanine;
  bun = "\n" + bun;
  urine = "\n" + urine;
  glucose = "\n" + glucose;
  sodium = "\n" + sodium;

  let header = "value";
  if (!fs.existsSync(`./src/records/${name}_gcs.csv`))
    await appendFileAsync(`./src/records/${name}_gcs.csv`, header);
  if (!fs.existsSync(`./src/records/${name}_bun.csv`))
    await appendFileAsync(`./src/records/${name}_bun.csv`, header);
  if (!fs.existsSync(`./src/records/${name}_urine.csv`))
    await appendFileAsync(`./src/records/${name}_urine.csv`, header);
  if (!fs.existsSync(`./src/records/${name}_creatanine.csv`))
    await appendFileAsync(`./src/records/${name}_creatanine.csv`, header);

  if (!fs.existsSync(`./src/records/${name}_glucose.csv`))
    await appendFileAsync(`./src/records/${name}_glucose.csv`, header);
  if (!fs.existsSync(`./src/records/${name}_sodium.csv`))
    await appendFileAsync(`./src/records/${name}_sodium.csv`, header);

  await appendFileAsync(`./src/records/${name}_gcs.csv`, gcs);
  await appendFileAsync(`./src/records/${name}_creatanine.csv`, creatanine);
  await appendFileAsync(`./src/records/${name}_bun.csv`, bun);
  await appendFileAsync(`./src/records/${name}_urine.csv`, urine);
  await appendFileAsync(`./src/records/${name}_glucose.csv`, glucose);
  await appendFileAsync(`./src/records/${name}_sodium.csv`, sodium);

  let spawn = require("child_process").spawn;
  let gcsProcess = spawn("python", ["ML/time_series/main/gcs_ts.py", name]);
  console.log("process spawned....................... ICU TYPE 2");

  gcsProcess.stdout.setEncoding("utf8");
  gcsProcess.stdout.on("data", data => {
    console.log("DATA RECEIVED");
    res.send({ val: data.toString() });
  });

  gcsProcess.stderr.setEncoding("utf8");
  gcsProcess.stderr.on("data", err => {
    console.log(err);
    console.error(err);
    res.sendStatus(501);
  });
});

// ---------------------------------- ICU TYPE 3 ----------------------------

app.get("/model/ts/3", async (req, res) => {
  let { name, gcs, creatanine, bun, urine, glucose } = req.query;
  gcs = "\n" + gcs;
  creatanine = "\n" + creatanine;
  bun = "\n" + bun;
  urine = "\n" + urine;
  glucose = "\n" + glucose;

  let header = "value";

  if (!fs.existsSync(`./src/records/${name}_gcs.csv`))
    await appendFileAsync(`./src/records/${name}_gcs.csv`, header);
  if (!fs.existsSync(`./src/records/${name}_bun.csv`))
    await appendFileAsync(`./src/records/${name}_bun.csv`, header);
  if (!fs.existsSync(`./src/records/${name}_urine.csv`))
    await appendFileAsync(`./src/records/${name}_urine.csv`, header);
  if (!fs.existsSync(`./src/records/${name}_creatanine.csv`))
    await appendFileAsync(`./src/records/${name}_creatanine.csv`, header);

  if (!fs.existsSync(`./src/records/${name}_glucose.csv`))
    await appendFileAsync(`./src/records/${name}_glucose.csv`, header);
  if (!fs.existsSync(`./src/records/${name}_sodium.csv`))
    await appendFileAsync(`./src/records/${name}_sodium.csv`, header);

  await appendFileAsync(`./src/records/${name}_gcs.csv`, gcs);
  await appendFileAsync(`./src/records/${name}_creatanine.csv`, creatanine);
  await appendFileAsync(`./src/records/${name}_bun.csv`, bun);
  await appendFileAsync(`./src/records/${name}_urine.csv`, urine);
  await appendFileAsync(`./src/records/${name}_glucose.csv`, glucose);

  let spawn = require("child_process").spawn;
  let gcsProcess = spawn("python", ["ML/time_series/main/gcs_ts.py", name]);
  console.log("process spawned....................... ICU TYPE 3");

  gcsProcess.stdout.setEncoding("utf8");
  gcsProcess.stdout.on("data", data => {
    console.log("DATA RECEIVED");
    res.send({ val: data.toString() });
  });

  gcsProcess.stderr.setEncoding("utf8");
  gcsProcess.stderr.on("data", err => {
    console.log(err);
    console.error(err);
    res.sendStatus(501);
  });
});

//------------------------------------- ICU TYPE 4 ------------------------------------------------

app.get("/model/ts/4", async (req, res) => {
  let { name, gcs, creatanine, bun, platelets, heartRate, age } = req.query;
  gcs = "\n" + gcs;
  creatanine = "\n" + creatanine;
  bun = "\n" + bun;
  platelets = "\n" + platelets;

  let header = "value";
  if (!fs.existsSync(`./src/records/${name}_gcs.csv`))
    await appendFileAsync(`./src/records/${name}_gcs.csv`, header);
  if (!fs.existsSync(`./src/records/${name}_bun.csv`))
    await appendFileAsync(`./src/records/${name}_bun.csv`, header);
  if (!fs.existsSync(`./src/records/${name}_platelets.csv`))
    await appendFileAsync(`./src/records/${name}_platelets.csv`, header);
  if (!fs.existsSync(`./src/records/${name}_creatanine.csv`))
    await appendFileAsync(`./src/records/${name}_creatanine.csv`, header);
  if (!fs.existsSync(`./src/records/${name}_heartRate.csv`))
    await appendFileAsync(`./src/records/${name}_heartRate.csv`, header);
  if (!fs.existsSync(`./src/records/${name}_age.csv`))
    await appendFileAsync(`./src/records/${name}_age.csv`, header);

  await appendFileAsync(`./src/records/${name}_gcs.csv`, gcs);
  await appendFileAsync(`./src/records/${name}_creatanine.csv`, creatanine);
  await appendFileAsync(`./src/records/${name}_bun.csv`, bun);
  await appendFileAsync(`./src/records/${name}_platelets.csv`, platelets);
  await appendFileAsync(`./src/records/${name}_heartRate.csv`, platelets);
  await appendFileAsync(`./src/records/${name}_age.csv`, platelets);

  let spawn = require("child_process").spawn;
  let gcsProcess = spawn("python", ["ML/time_series/main/gcs_ts.py", name]);
  console.log("process spawned....................... ICU TYPE 4");

  gcsProcess.stdout.setEncoding("utf8");
  gcsProcess.stdout.on("data", data => {
    console.log("DATA RECEIVED");
    res.send({ val: data.toString() });
  });

  gcsProcess.stderr.setEncoding("utf8");
  gcsProcess.stderr.on("data", err => {
    console.log(err);
    console.error(err);
    res.sendStatus(501);
  });
});

/*--------------------------------------------------------------------------------*/

app.post("/predictor", (req, res) => {
  let dataMain = req.body;
  console.log(dataMain);

  var spawn = require("child_process").spawn;
  let pyProcess = spawn("python", [
    "ML/classifiers/predictor.py",
    JSON.stringify(dataMain)
  ]);

  pyProcess.stdout.setEncoding("utf8");
  pyProcess.stdout.on("data", function(data) {
    console.log("SENDING : ");
    console.log(data.toString());
    res.end(data.toString());
  });
  pyProcess.stderr.setEncoding("utf8");
  pyProcess.stderr.on("data", err => {
    console.log(err);
  });
});

/*-----------------------------------------------------------------------------------*/

app.get("/model", (req, res) => {
  console.log(req.query.firstname);
  console.log(req.query.lastname);

  var spawn = require("child_process").spawn;
  var pyProcess = spawn("python", [
    __dirname + "/hello.py",
    req.query.firstname,
    req.query.lastname
  ]);
  pyProcess.stdout.setEncoding("utf8");
  pyProcess.stdout.on("data", function(data) {
    console.log("SENDING : ");
    console.log(data.toString());
    res.send({ name: data.toString() });
  });
  pyProcess.stderr.setEncoding("utf8");
  pyProcess.stderr.on("data", err => {
    console.log(err);
  });
});
app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
