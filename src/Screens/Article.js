import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Article() {
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
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          + Add Article
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
        >
          <DialogTitle>{"Article"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div className={classes.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <TextField
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <TextField
                        id="outlined-basic"
                        label="Image"
                        variant="outlined"
                        style={{ width: "85%", margin: "1%" }}
                      />
                      <Button
                        variant="contained"
                        style={{
                          background: "#1F6DE2",
                          width: "13%",
                          height: "55px",
                          marginTop: "1%",
                        }}
                      >
                        Choose
                      </Button>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <TextField
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
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
    </>
  );
}
