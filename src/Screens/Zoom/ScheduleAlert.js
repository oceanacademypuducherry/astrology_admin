import {
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import firebase from "../../firebaseConfig/fbConfig";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ScheduleAlert({
  isDialogOpened,
  handleCloseDialog,
  data,
  documentId,
}) {
  const [value, setValue] = useState({
    adminZoomLink: "",
    userZoomLink: "",
  });

  const handleClose = () => {
    handleCloseDialog(false);
  };

  const onChange = (e) => {
    console.log(e.target.value);
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    //firebase update data
    const db = firebase.firestore();
    // console.log(data.id);

    db.collection("booking").doc(documentId).update({
      userZoomLink: value.userZoomLink,
      adminZoomLink: value.adminZoomLink,
    });
    handleCloseDialog(false);
  };

  return (
    <>
      <Dialog
        // fullWidth={fullWidth}
        // maxWidth={maxWidth}
        open={isDialogOpened}
        onClose={handleClose}
        // aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle>
          <Typography variant="overline">SCHEDULE ZOOM</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid spacing={3}>
              <Grid item xs={12} style={{ marginBottom: "20px" }}>
                <TextField
                  label="Zoom Link"
                  name="userZoomLink"
                //   defaultValue={data.userZoomLink}
                  value={value.userZoomLink}
                  onChange={onChange}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Admin Zoom Link"
                  name="adminZoomLink"
                //   defaultValue={data.adminZoomLink}
                  value={value.adminZoomLink}
                  onChange={onChange}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "10px" }}>
                <Typography variant="caption">
                  Note: Add zoom link to user
                </Typography>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "100%" }}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
