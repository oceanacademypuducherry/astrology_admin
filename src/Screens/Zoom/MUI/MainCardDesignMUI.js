import { makeStyles } from "@material-ui/core/styles";
// import { red, blue, grey } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
      cursor: "pointer",
    },
    maxWidth: 345,
    width: 250,
    textDecoration: "none",
    color: "black",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "white",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  },
}));
