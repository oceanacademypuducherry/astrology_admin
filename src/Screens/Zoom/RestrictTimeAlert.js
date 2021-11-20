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
  colors,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import firebase from "../../firebaseConfig/fbConfig";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import "./style/Calendar.css";
import { classNames } from "@react-pdf-viewer/core";
import moment from "moment";
import { useStyles } from "./MUI/RestrictTimeAlertMUI";
import { red } from "@material-ui/core/colors";

export default function RestrictTimeAlert({
  isDialogOpened,
  handleCloseDialog,
}) {
  var staticDates = [9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20];
  // const classes = useStyles();
  const [datepicker, setDatePicker] = useState(null);
  const [data, setData] = useState([]);
  const [times, setTimes] = useState({
    morning: [],
    afternoon: [],
    evening: [],
  });
  const [time, setTime] = useState({
    hour: "",
    minute: "",
    hourWithDay: "",
  });

  const handleClose = () => { 
    handleCloseDialog(false);
    setTimes({ ...times, morning: [], afternoon: [], evening: [] });
    setDatePicker(null);
    setTime({ ...time, hourWithDay: "", hour: "", minute : "" });
    setData([]);
  };

  const onSubmit = () => {
    const date = datepicker.split("-")
    let dd = date[2]
    let mm = date[1]
    let yy = date[0]
    let hh = parseInt(time.hour)
    let m = 0
    let s = 0

    console.log(yy, "yy");
    console.log(mm, "mm");
    console.log(dd, "dd");
    console.log(hh, "hh");

    ///mm-1 is because of month going after current month
    let bookingDate = new Date(yy, mm - 1, dd, hh, m, s);
    console.log(bookingDate, "///////////////////♣♣♣");

    firebase
      .firestore()
      .collection("booking")
      .add({
        userZoomLink: "",
        adminZoomLink: "",
        birthPlace: "Restricted Time",
        birthTime: bookingDate,
        bookingFor: "Restricted Time",
        email: "Makarajothi",
        jadhagam:
          "https://restrictcontentpro.com/wp-content/uploads/2016/04/add-on-restriction-timeouts-771x386.png",
        payment: "No Payment",
        phoneNumber: "9842855294",
        profile:
          "https://cdn.dribbble.com/users/3061865/screenshots/16008162/media/a61b7872f487d82ff51bab5e53f41e9a.png?compress=1&resize=1200x900",
        purposeFor: ["Admin Restricted"],
        time: bookingDate,
        userName: "Restricted Time",
      }).then(() => {
        handleClose();
      });
  
    // clear
    setData([]);
    setDatePicker(null);
    setTime({ ...time, hourWithDay: "" });
    setTimes({ ...times, morning: [], afternoon: [], evening: [] });
    handleCloseDialog(false);
  };

  const selectedDate = (h) => {
    setTime({
      ...time,
      hour: h,
      hourWithDay: document.getElementById(h).innerText,
    });
  };

  const datePickerOnChange = (event) => {
    setDatePicker(event.target.value)
    //clear
    setTime({ ...time, hour: "" })
  };

  function getBookedTime() {
     //clear//
    setData([])
    setTime({ ...time, hourWithDay: "" })
    //clear//

    var getUserBookedHours = []
    var getAllHours = []
    var morning = []
    var afternoon = []
    var evening = []
    const date = datepicker.split("-")
    console.log(date[2], "date")
    console.log(date[1], "month")
    console.log(date[0], "year")

    firebase
      .firestore()
      .collection("booking")
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          if (datepicker != null) {
            //Condition for get selected all userbooked time
            if (
              date[2] == doc.data().time.toDate().getDate() &&
              date[1] == doc.data().time.toDate().getMonth() + 1 && 
              date[0] == doc.data().time.toDate().getFullYear()
            ) {
              getUserBookedHours.push(doc.data().time.toDate().getHours());
            }
          }
        });

        console.log(getUserBookedHours, "getUserBookedHours");

        getAllHours = staticDates;

        for (var index of getUserBookedHours) {
          console.log(index, "index");
          getAllHours.splice(getAllHours.indexOf(index), 1);
        }
        console.log(getAllHours, "getAllHours//////////////");

        for (var hours of getAllHours) {
          if (hours >= 9 && hours <= 11) {
            morning.push(hours);
            console.log(hours, "afternoon");
          } else if (hours >= 12 && hours <= 16) {
            console.log(hours, "afternoon");
            afternoon.push(hours);
          } else {
            evening.push(hours);
          }
        }

        setData(getAllHours);
        setTimes({
          ...times,
          morning: morning,
          afternoon: afternoon,
          evening: evening,
        });
        console.log(morning, "morning");
        console.log(afternoon, "afternoon");
        console.log(evening, "afternoon");
      });
  }

  useEffect(() => {
    setTimes({ ...times, morning: [], afternoon: [], evening: [] });
    if (datepicker !== null) {
      getBookedTime();
    }
  }, [datepicker]);

  return (
    <>
      <Dialog
        // fullScreen={true}
        open={isDialogOpened}
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography variant="overline" color="error">
            RESTRICT TIME
          </Typography>
        </DialogTitle>
        <DialogContent style= {{ minWidth: "350px" }}>
          <DialogContentText>
            <Grid spacing={3}>
              <Grid item xs={12} style={{ marginBottom: "20px", textAlign: "center" }}>
              <input style={{width: "90%", height: "30px", textAlign: "center"}} type="date" id="myDate" name="bday" 
              min= {`${JSON.stringify(new Date().getFullYear())}-${JSON.stringify(new Date().getMonth()+1)}-${JSON.stringify(new Date().getDate())}`}
              value={datepicker}
              onChange={datePickerOnChange}
              />
                {/* <DatePickerComponent
                  // firstDayOfWeek= {1}
                  // disabled
                  min={ new Date().getDate() }
                  max={new Date().getDate() }
                  value={datepicker}
                  onChange={datePickerOnChange}
                ></DatePickerComponent> */}
              </Grid>

               {/* {JSON.stringify(times.morning.length)} <br />
               {JSON.stringify(times.afternoon.length)} <br /> 
               {JSON.stringify(times.evening.length)} <br />  */}
                    {/* {JSON.stringify(new Date().getDate())}
                    {JSON.stringify(new Date().getMonth()+1)}
                    {JSON.stringify(new Date().getFullYear())} */}
              
              {time.hourWithDay === "" ? (
                <h4>No Selected Time</h4>
              ) : (
                <h4>
                  Your Selected Time :{" "}
                  <span style={{ color: "tomato" }}>{time.hourWithDay}</span>{" "}
                </h4>
              )}
              {times.morning.length > 0 && <h5>Morning</h5>}
              {/* <h1>{new Date().getHours()}</h1> */}
              {data.map(
                (data) =>
                  data < 12 && (
                    <Button
                      color={time.hour == data ? "secondary" : "primary"}
                      variant="outlined"
                      id={data}
                      disabled={datepicker == null}
                      style={{ display: "inline" }}
                      onClick={selectedDate.bind(this, data)}
                    >
                      {data}:00 AM
                    </Button>
                  )
              )}

              {times.afternoon.length > 0 && <h5>Afternoon</h5>}

              {data.map(
                (data) =>
                  data >= 12 &&
                  data < 17 && (
                    <Button
                      color={time.hour == data ? "secondary" : "primary"}
                      variant="outlined"
                      id={data}
                      disabled={datepicker == null}
                      style={{ display: "inline" }}
                      onClick={selectedDate.bind(this, data)}
                    >
                      {data == 12 && `${data}:00 PM`}{" "}
                      {data > 12 && `${data - 12}:00 PM`}
                    </Button>
                  )
              )}


              {times.evening.length > 0 && <h5>Evening</h5>}

              {data.map(
                (data) =>
                  data > 16 &&
                  data < 21 && (
                    <Button
                      color={time.hour == data ? "secondary" : "primary"}
                      variant="outlined"
                      id={data}
                      disabled={datepicker == null}
                      style={{ display: "inline" }}
                      onClick={selectedDate.bind(this, data)}
                    >
                      {data > 12 && `${data - 12}:00 PM`}
                    </Button>
                  )
              )}
              
              {/* {datepicker.getDate()} */}
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
            color="secondary"
            style={{ width: "100%" }}
            onClick={onSubmit}
            disabled={time.hourWithDay === "" || datepicker === null}
          >
            Restrict
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
