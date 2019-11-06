const styles = {
  listRoot: {
    "box-shadow": "2px 21px 20px -9px rgba(0,0,0,0.72)",
    "-webkit-box-shadow": "20px 21px 20px -9px rgba(0,0,0,0.72)",
    "-moz-box-shadow": "20px 21px 20px -9px rgba(0,0,0,0.72)",
    backgroundColor: "white"
  },
  progressBar: {
    height: "15px",
    borderRadius: "4px"
  },
  whiteBG: {
    background: "white !important",
    color: "black",
    position: "relative"
  },
  progressBarInner: {
    backgroundColor: "#e5346f"
  },
  arrows: {
    position: "absolute",
    fontSize: 6,
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid"
    }
  },
  darkMode: {
    background: "#222"
  },
  App: {
    background: "#222"
  },
  viewDemoButton: {
    backgroundColor: "#e5346f",
    fontWeight: "800",
    height: "80px",
    color: "#131212",
    fontSize: "38px",
    letterSpacing: "10px",
    fontFamily: '"Viga", sans-serif',
    "&:hover": {
      backgroundColor: "#131212",
      color: "#e5346f"
    }
  },
  usageTexts: {
    width: "100%",
    marginLeft: "50px",
    paddingRight: "50px",
    marginTop: " 100px "
  },
  secondButton: {
    backgroundColor: "#e5346f",
    fontWeight: "800",
    color: "#131212",
    "@media screen and (min-width: 283px)": {
      marginLeft: "30px"
    },
    "@media screen and (max-width: 282px)": {
      marginTop: "10px",
      marginLeft: "0"
    }
  },
  teamName: {
    flexGrow: 1
  },
  whiteText: {
    color: "white"
  },
  redGradient: {
    background: "rgb(115,28,11)",
    background:
      "linear-gradient(21deg, rgba(115,28,11,1) 5%, rgba(254,8,8,1) 52%, rgba(252,176,69,1) 90%)"
  },
  row: {
    display: "flex",
    "flex-direction": "row",
    "flex-wrap": "wrap",
    paddingLeft: "10%",
    paddingRight: "10%",
    margin: "0 auto",
    "justify-content": "space-between",
    "align-items": "center",
    paddingTop: "30px",
    "min-height": "100vh"
  },
  inlineRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: "40px",
    marginTop: "40px"
  },
  blueGradient: {
    color: "white",
    background: "rgb(6,6,61)",
    background:
      "linear-gradient(344deg, rgba(6,6,61,1) 0%, rgba(3,3,122,0.7315301120448179) 32%, rgba(16,172,204,1) 87%)"
  },
  column: {
    display: "flex",
    "flex-direction": "column"
  },
  chipZone: {
    width: "100%",
    margin: "0 auto",
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "20px"
  },
  patientCard: {
    background: "yellow",
    flex: 1
  },
  patientListContainer: {
    width: "50%",
    "margin-left": "20px",
    "margin-right": "20px"
  },
  dailyForm: {
    width: "30%"
  },
  inferenceButton: {
    flex: 0.8
  },
  inferenceForm: {
    flex: 0.8
  },
  center: {
    margin: "0 auto"
  },
  marginTop: {
    marginTop: "50px"
  },
  textField: {
    marginLeft: "10px",
    marginRight: "10px",
    width: 200
  },
  media: {
    height: 100,
    width: 100,
    margin: "0 auto",
    borderRadius: "50% 50% 50% 50%"
  },
  sellProductArea: {
    width: "80%",
    margin: "0 auto",
    color: "white !important"
  },
  firstSellingPoint: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "100px"
  },
  redChip: {
    backgroundColor: "red !important"
  },
  redChip2: {
    color: "red !important"
  },
  greenChip: {
    backgroundColor: "green !important"
  },
  greenChip2: {
    color: "green !important"
  },
  secondSellingPoint: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "100px",
    marginBottom: "200px"
  },
  sellImg: {
    width: "65%"
  },
  halfWidth: {
    width: "50%"
  }
};
export default styles;
