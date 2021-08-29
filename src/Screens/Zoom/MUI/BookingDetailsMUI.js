import { makeStyles } from "@material-ui/core/styles";
import { red, blue, grey } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  leftContent: {
    fontFamily: "Ubuntu",
    height: "100vh",
    borderRight: "1px solid #e1e1e1",
    // borderWidth :   "0.1em",
    // backgroundColor: "white",
  },
  rightContent: {
    height: "100vh",
    // backgroundColor: blue[100],
  },
  leftContent1: {
    // fontFamily: 'Ubuntu',
    height: "280px",
    // backgroundColor: "white",
  },

  leftContent2: {
    marginTop: "20px",
  },

  profileImg: {
    marginBottom: "10px",
    height: "180px",
    width: "190px",
    backgroundColor: blue,
    borderRadius: "150px",
    objectFit: "cover",
  },

  jadhagamImg: {
    marginBottom: "10px",
    height: "200px",
    width: "100%",
    backgroundColor: blue,
    // borderRadius: "150px",
    objectFit: "cover",
  },


  paper: {
    marginRight: "30px",
    marginBottom: "15px",
    padding: "10px",
  },

  // sizeAvatar: {
  //     height: theme.spacing(5),
  //     width: theme.spacing(4),
  //   },
}));
