import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  Typography,
} from "@material-ui/core";
import img from "../Img/2.jpg";
import { Delete, Edit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  inputRoot: {
    flexGrow: 1,
  },
  inputPaper: {
    padding: theme.spacing(2),
    maxWidth: 500,
  },
  image: {
    width: 200,
    height: 200,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Video() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          style={{ borderColor: "#1F6DE2", color: "#1F6DE2" }}
          onClick={handleClickOpen}
        >
          + Add Video
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
        >
          <DialogTitle>{"Video"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div className={classes.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <TextField
                        id="outlined-basic"
                        label="Image"
                        variant="outlined"
                        style={{ width: "85%", marginLeft: "0%", margin: "1%" }}
                      />
                      <Button
                        variant="contained"
                        style={{
                          background: "#1F6DE2",
                          width: "13%",
                          height: "55px",
                          marginTop: "1%",
                          color: "white",
                        }}
                      >
                        Choose
                      </Button>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper className={classes.paper}>
                      <TextField
                        id="outlined-basic"
                        label="Video"
                        variant="outlined"
                        style={{ width: "85%", marginLeft: "0%", margin: "1%" }}
                      />
                      <Button
                        variant="contained"
                        style={{
                          background: "#1F6DE2",
                          width: "13%",
                          height: "55px",
                          marginTop: "1%",
                          color: "white",
                        }}
                      >
                        Choose
                      </Button>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper className={classes.paper}>
                      <TextField
                        id="outlined-basic"
                        label="YouTube Video"
                        variant="outlined"
                        style={{ width: "85%", marginLeft: "0%", margin: "1%" }}
                      />
                      <Button
                        variant="contained"
                        style={{
                          background: "#1F6DE2",
                          width: "13%",
                          height: "55px",
                          marginTop: "1%",
                          color: "white",
                        }}
                      >
                        Choose
                      </Button>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper className={classes.paper}>
                      {" "}
                      <TextField
                        id="outlined-basic"
                        label="Video Name"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper className={classes.paper}>
                      <TextField
                        id="outlined-basic"
                        label="Video Description"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <TextField
                        id="outlined-basic"
                        label="Related Image"
                        variant="outlined"
                        style={{ width: "85%", marginLeft: "0%", margin: "1%" }}
                      />
                      <Button
                        variant="contained"
                        style={{
                          background: "#1F6DE2",
                          width: "13%",
                          height: "55px",
                          marginTop: "1%",
                          color: "white",
                        }}
                      >
                        Choose
                      </Button>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="contained"
              style={{
                background: "#1F6DE2",
                width: "100%",
                height: "55px",
                color: "white",
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={classes.inputRoot}>
        <Paper className={classes.inputPaper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={img} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container style={{ marginTop: "8%" }}>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    Video Name
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Video Description
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div
            style={{
              textAlign: "end",
            }}
          >
            <Button>
              <Delete style={{ borderColor: "#1F6DE2", color: "#1F6DE2" }} />
            </Button>
            <Button>
              <Edit style={{ borderColor: "#1F6DE2", color: "#1F6DE2" }} />
            </Button>
          </div>
        </Paper>
      </div>
    </>
  );
}
