const express = require("express");
const bodyParser = require("body-parser");

const os = require("os");
const fs = require("fs");

const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const appendFileAsync = promisify(fs.appendFile);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

/*-------------------- TIME SERIES PREDICTIONS ----------------*/

app.get("/model/ts/1", async (req, res) => {
  let { name, gcs, creatanine, bun, urine } = req.query;
  console.log(req.query);
  //write to file async
  //.then -> call python script for pred
  //return json data

  //   const oldRecords = await readFileAsync(`../records/${name}.csv`);
  //   console.log(oldRecords);
  gcs = "\n" + gcs;
  creatanine = "\n" + creatanine;
  bun = "\n" + bun;
  urine = "\n" + urine;
  let header = "value";
  if (!fs.existsSync(`./src/records/${name}_gcs.csv`))
    await appendFileAsync(`./src/records/${name}_gcs.csv`, header);
  if (!fs.existsSync(`./src/records/${name}_bun.csv`))
    await appendFileAsync(`./src/records/${name}_bun.csv`, header);
  if (!fs.existsSync(`./src/records/${name}_urine.csv`))
    await appendFileAsync(`./src/records/${name}_urine.csv`, header);
  if (!fs.existsSync(`./src/records/${name}_creatanine.csv`))
    await appendFileAsync(`./src/records/${name}_creatanine.csv`, header);

  await appendFileAsync(`./src/records/${name}_gcs.csv`, gcs);
  await appendFileAsync(`./src/records/${name}_creatanine.csv`, creatanine);
  await appendFileAsync(`./src/records/${name}_bun.csv`, bun);
  await appendFileAsync(`./src/records/${name}_urine.csv`, urine);

  res.send(200);
});

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
