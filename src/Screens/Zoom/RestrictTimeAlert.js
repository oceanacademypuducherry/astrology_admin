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
import "./style/App.css";
import { classNames } from "@react-pdf-viewer/core";
import moment from "moment";
// import { useStyles } from "./MUI/RestrictTimeAlertMUI";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default function RestrictTimeAlert({
  isDialogOpened,
  handleCloseDialog,
  retrictTime,
}) {
  const [datepicker, setDatePicker] = useState();
  // const [flag, setFlag] = useState(true);
  const [time, setTime] = useState(
    {
      hour: "",
      minute: ""
    }
  );
  // const classes = useStyles();

  const handleClose = () => {
    handleCloseDialog(false);
  };

  const onSubmit = () => {
    // console.log(datepicker.date.getFullYear());
    let dd = datepicker.getDate();
    let mm = datepicker.getMonth();
    let yy = datepicker.getFullYear();
    let hh = parseInt(time.hour);

    console.log(yy, "yy");
    console.log(mm, "mm");
    console.log(dd, "dd");
    console.log(hh, "hh");

    let date = new Date(yy, mm, dd, hh);
    console.log(date, "///////////////////♣♣♣");


    firebase.firestore().collection("booking").add({
      userZoomLink : "",
      adminZoomLink : "",
      birthPlace : "",
      birthTime : "",
      bookingFor : "",
      email : "",
      jadhagam : "https://restrictcontentpro.com/wp-content/uploads/2016/04/add-on-restriction-timeouts-771x386.png",
      payment : "",
      phoneNumber : "",
      profile : "https://cdn.dribbble.com/users/3061865/screenshots/16008162/media/a61b7872f487d82ff51bab5e53f41e9a.png?compress=1&resize=1200x900",
      purposeFor : "",
      time : date,
      userName : "Admin",
    });
    handleCloseDialog(false);
  };

  const datePickerOnChange = (e) => {
    console.log(e.target.value, "e.target.value ☻☻☻☻☻☻");
    setDatePicker(e.target.value);
  };

  const getTimeClick = (e) => {
   let h = e.target.innerText

   console.log(h.slice(0, 2));
    
    setTime({...time, hour: h.slice(0, 2)});
    // flag == true ? e.target.style.color= "red" : e.target.style.color= "black"
    // console.log(e.target.style.color= "red", "☻☻☻☻☻☻☻☻☻☻☻☻");
    // e.target.style.color= "red" == "red" ?
    // setFlag(!flag);
  };

  return (
    <>
      <Dialog
        // fullScreen={true}
        // fullWidth={100}
        // maxWidth={maxWidth}
        open={isDialogOpened}
        onClose={handleClose}
      >
        <DialogTitle>
          {/* {JSON.stringify(datepicker)} */}
          <Typography variant="overline">RESTRICT TIME</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid spacing={3}>
              <Grid item xs={12} style={{ marginBottom: "20px" }}>
                <DatePickerComponent
                  value={datepicker}
                  onChange={datePickerOnChange}
                ></DatePickerComponent>
              </Grid>

              <h6>Morning</h6>

              <div>
                {retrictTime.map(
                  (time) =>
                    time.time < "12" && (
                      <Button
                        className={classNames.buttons}
                        variant="outlined"
                        onClick={getTimeClick}
                      >
                        {time.time}
                      </Button>
                    )
                )}
                {/* {JSON.stringify(retrictTime)} */}
              </div>

              <h6>Afternoon</h6>

              <div>
                {retrictTime.map(
                  (time) =>
                    time.time > "12" &&
                    time.time < "16" && (
                      <Button
                        className={classNames.buttons}
                        variant="outlined"
                        onClick={getTimeClick}
                      >
                        {time.time}
                      </Button>
                    )
                )}
              </div>

              <h6>Evening</h6>

              <div>
                {retrictTime.map(
                  (time) =>
                    time.time > "16" &&
                    time.time < "24" && (
                      <Button
                        className={classNames.buttons}
                        name={time.time}
                        variant="outlined"
                        onClick={getTimeClick}
                      >
                        {time.time}
                      </Button>
                    )
                )}
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
