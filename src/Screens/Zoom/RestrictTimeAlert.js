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
import "./style/Calendar.css";
import { classNames } from "@react-pdf-viewer/core";
import moment from "moment";
import { useStyles } from "./MUI/RestrictTimeAlertMUI";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default function RestrictTimeAlert({
  isDialogOpened,
  handleCloseDialog,
  retrictTime,
}) {
  const classes = useStyles();
  const [datepicker, setDatePicker] = useState();
  const [flag, setFlag] = useState(false);
  const [time, setTime] = useState(
    {
      hour: "",
      minute: ""
    }
  );

  const handleClose = () => {
    handleCloseDialog(false);
  };

  const onSubmit = () => {
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

    () => {
      console.log("date");
    }
  };

  const getTimeClick = (time) => {
   let h = time
   console.log(h);
    setTime({...time, hour: h.slice(0, 2)});
    // setFlag(flag ? false : true);
  };

  return (
    <>
      <Dialog
        // fullScreen={true}
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
                // firstDayOfWeek= {1}
                // floatLabelType= "fghgjf"
                   min={Date()}
                // max={Date(Date.getDate() + 1 )}
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
                        className={classes.buttons}
                        variant="outlined"
                        color={flag ? "primary" : "secondary"}
                        onClick={getTimeClick.bind(this, time.time, event)}
                      >
                        {`${parseInt(time.time)}:00`}
                      </Button>
                    )
                )}
              </div>

              <h6>Afternoon</h6>

              <div>
                {retrictTime.map(
                  (time) =>
                    time.time > "12" &&
                    time.time < "16" && (
                      <Button
                        className={classes.buttons}
                        variant="outlined"
                        color={flag ? "primary" : "secondary"}
                        onClick={getTimeClick.bind(this, time.time)}
                      >
                        {`${parseInt(time.time) - 12}:00`}
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
                        className={classes.buttons}                    
                        variant="outlined"
                        color={flag ? "primary" : "secondary"}
                        onClick={getTimeClick.bind(this, time.time)}
                      >
                        {`${parseInt(time.time) - 12}:00`}
                      </Button>
                    )
                )}
              </div>

              <Grid item xs={12} style={{ marginTop: "10px" }}>
                <Typography variant="caption">
                  Note: Restrict Date and Time 
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
