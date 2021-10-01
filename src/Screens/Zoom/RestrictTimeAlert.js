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

export default function RestrictTimeAlert({
  isDialogOpened,
  handleCloseDialog,
  retrictTime,
  bookedTime,
}) {
  var staticDates = [9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20];
  // const classes = useStyles();
  const [datepicker, setDatePicker] = useState();
  const [data, setData] = useState([]);
  const [getDate, setDate] = useState(1);
  const [time, setTime] = useState({
    hour: "",
    minute: "",
    hourWithDay : "",
  });
  // const [timestamp, setTimestamp] = useState([]);

  const handleClose = () => {
    handleCloseDialog(false);
    setDatePicker();
    // setDatePicker("");
    console.log("////////////////////////////////////////////////");
  };

  useEffect(() => {
    setData([]);
    setTime({...time, hourWithDay: ""});
    var getUserBookedHours = [];
    var getAllHours = [];
    firebase
      .firestore()
      .collection("booking")
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          // console.log(datepicker.getMonth() +1, "datepicker month");
          // console.log(doc.data().time.toDate().getMonth()+1, "db month");
          if (datepicker != null) {
            if (
              datepicker.getDate() === doc.data().time.toDate().getDate() &&
              datepicker.getMonth() + 1 ===
                doc.data().time.toDate().getMonth() + 1
            ) {
              // console.log("condition true");
              // console.log(typeof doc.data().time.toDate().getDate(), "///////data");
              // console.log(doc.data().time.toDate().getHours(), "///////Hours");
              getUserBookedHours.push(doc.data().time.toDate().getHours());
            }
          }
        });

        for (var hour of staticDates) {
          // console.log(hour, "get one by one");
          getAllHours.push(hour);
        }
  
      for (var index of getUserBookedHours) {
        console.log(index, "index");
        getAllHours.splice(getAllHours.indexOf(index), 1);
      }

      console.log(getAllHours, "getAllHours");
      setData(getAllHours);
      });


    // setData(staticDates);
   
    console.log("useEffect", datepicker);
  }, [datepicker]);

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
      userZoomLink: "",
      adminZoomLink: "",
      birthPlace: "Restricted Time",
      birthTime: date,
      bookingFor: "Restricted Time",
      email: "Makarajothi",
      jadhagam:
        "https://restrictcontentpro.com/wp-content/uploads/2016/04/add-on-restriction-timeouts-771x386.png",
      payment: "No Payment",
      phoneNumber: "9842855294",
      profile:
        "https://cdn.dribbble.com/users/3061865/screenshots/16008162/media/a61b7872f487d82ff51bab5e53f41e9a.png?compress=1&resize=1200x900",
      purposeFor: ["Admin Restricted"],
      time: date,
      userName: "Restricted Time",
    });
    handleCloseDialog(false);
    setData([]);
    setDatePicker();
  };

  const datePickerOnChange = (event) => {
    var getDate = event.target.value;
    // console.log(getDate.getDate(), "e.target.value ☻☻☻☻☻☻");
    setDatePicker(getDate);
    setTime({...time, hour: ""})
  };

  const getTimeClick = (time) => {
    let h = time;
    console.log(h);
    setTime({ ...time, hour: h.slice(0, 2) });
  };

  const selectedDate = (h) => {
     console.log(h, "clicked");
     setTime({ ...time, hour: h, hourWithDay: document.getElementById(h).innerText});
     console.log(document.getElementById(h).innerText);

  }


  return (
    <>
      <Dialog
        // fullScreen={true}
        open={isDialogOpened}
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography variant="overline">RESTRICT TIME</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid spacing={3}>
              <Grid item xs={12} style={{ marginBottom: "20px" }}>
                <DatePickerComponent
                  // firstDayOfWeek= {1}
                  min={Date()}
                  // max={Date(Date.getDate() + 1 )}
                  value={datepicker}
                  onChange={datePickerOnChange}
                ></DatePickerComponent>
              </Grid>
              
              {/* {JSON.stringify(time.hour)} */}
              <h4>Your Selected Time : {time.hourWithDay}</h4>
              {data.map(
                (data) =>
                  data < 10 &&  (
                    <h5>Morning</h5>
                  )
              )}
             
              {/* <h1>{new Date().getHours()}</h1> */}
              
              {data.map(
                (data) =>
                  data < 12 &&  (
                    <Button color={time.hour == data ? "secondary" : "primary"}  variant="outlined" id= {data} disabled={datepicker == null} style={{ display: "inline" }}  onClick={selectedDate.bind(this, data)}>{data}:00 AM</Button>
                  )
              )}


             <h5>Afternoon</h5>
              {data.map(
                (data) =>
                  data > 12 && data < 17 &&  (
                    <Button color={time.hour == data ? "secondary" : "primary"} variant="outlined"   id= {data} disabled={datepicker == null} style={{ display: "inline" }} onClick={selectedDate.bind(this, data)} >{data > 12 && `${data-12}:00 PM` }</Button>

                  )
              )}

             <h5>Evening</h5>
              {data.map(
                (data) =>
                data > 16 && data < 21 && (
                    <Button color={time.hour == data ? "secondary" : "primary"} variant="outlined" id= {data} disabled={datepicker == null} style={{ display: "inline" }}  onClick={selectedDate.bind(this, data)}>{data > 12 && `${data-12}:00 PM` }</Button>
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
            color="primary"
            style={{ width: "100%" }}
            onClick={onSubmit}
            disabled={datepicker == null}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
