import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
export const dialogStyle = makeStyles((theme) => ({
  radioCheck: {
    color: green[600],
    "&$checked": {
      color: green[600],
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 500,
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  fabStyle: {
    position: "fixed",
    right: "1.5%",
    bottom: "2%",
    background: "#1F6DE2",
    color: "white",
    "&:hover": {
      background: "#054cb5",
    },
  },
  extendedButton: {
    marginRight: theme.spacing(1),
  },
  textFieldStyle: {
    margin: theme.spacing(1),
    width: "100%",
  },
  submitButtonStyle: {
    margin: theme.spacing(1),
    width: 150,
    background: "#1F6DE2",
    color: "white",
    "&:hover": {
      background: "#054cb5",
    },
  },
  completedIcon: {
    padding: 10,
    fontSize: 50,
    color: "green",
  },
  ///
}));
