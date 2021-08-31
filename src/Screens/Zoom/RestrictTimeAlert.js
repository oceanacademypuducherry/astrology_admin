///////restrictTimeAlert.js

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
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
// import "./style/App.css";
// import { useStyles } from "./MUI/RestrictTimeAlertMUI";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default function RestrictTimeAlert({
  isDialogOpened,
  handleCloseDialog,
  retrictTime,
}) {
  const [datepicker, setDatePicker] = useState({
    date: "",
  });
  const [flag, setFlag] = useState(true);
  const [state, setState] = useState();
  // const classes = useStyles();

  const handleClose = () => {
    handleCloseDialog(false);
  };

  const onSubmit = () => {
    // //firebase update data
    // const db = firebase.firestore();
    // // console.log(data.id);

    // db.collection("booking").doc(documentId).update({
    //   userZoomLink: value.userZoomLink,
    //   adminZoomLink: value.adminZoomLink,
    // });
    handleCloseDialog(false);
  };

  const datePickerOnChange = (e) => {
    console.log(e.target.value, "e.target.value ☻☻☻☻☻☻");
    setDatePicker({ date: e.target.value });
  };

  const getTimeClick = (e) => {
    setFlag(!flag);
    setState(e.target.innerText)
    // flag == true ? e.target.style.color= "red" : e.target.style.color= "black"
    // console.log(e.target.style.color= "red", "☻☻☻☻☻☻☻☻☻☻☻☻");
    // e.target.style.color= "red" == "red" ?
    // setFlag(!flag);
  }

  return (
    <>
      <Dialog
        // fullScreen={true}
        // fullWidth={100}
        // maxWidth={maxWidth}
        open={isDialogOpened}
        onClose={handleClose}
      >
        <DialogTitle >
        
          {/* {JSON.stringify(retrictDate)} */}
          <Typography variant="overline">RESTRICT TIME</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid spacing={3}>
              <Grid item xs={12} style={{ marginBottom: "20px" }}>
                {/* <DatePickerComponent
                  value={datepicker.date}
                  onChange={datePickerOnChange}
                ></DatePickerComponent> */}
              </Grid>

              <h6>Morning</h6>

              <div>
                {retrictTime.map((time) => (
                  time.time <= "12" &&
                  <Button variant="outlined" onClick={getTimeClick.bind(this,time.time)} >{time.time}</Button>
                ))}
                {/* {JSON.stringify(retrictTime)} */}
              </div>

              <h6>Afternoon</h6>

              <div>
              {retrictTime.map((time) => (
                  time.time >= "12" && time.time <= "15"  &&
                  <Button  variant="outlined" onClick={getTimeClick.bind(this,time.time)}>{time.time}</Button>
                ))}
              </div>

              <h6>Evening</h6>

              <div>
              {retrictTime.map((time) => (
                  time.time >= "16" && time.time <= "24"  &&
                  <Button   name={time.time} variant="outlined" onClick={getTimeClick.bind(this,time.time)}>{time.time}</Button>
                ))}
              </div>

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