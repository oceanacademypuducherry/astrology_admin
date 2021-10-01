import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { Grid, Typography, Paper, Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useStyles } from "./MUI/BookingDetailsMUI";
import firebase from "../../firebaseConfig/fbConfig";

function BookingDetails() {
  let { id } = useParams();
  const classes = useStyles();
  console.log(id, "☻☻☻☻☻☻☻");
  const [data, setData] = useState([]);
  const [purposeFor, setPurposeFor] = useState([]);
  const [dateTime, setDate] = useState({
    date: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
    day: "",
    birthDate: "",
    birthMonth: "",
    birthYear: "",
    birthHour: "",
    birthMinute: "",
    birthDay: "",
  });
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const db = firebase.firestore();
    return db
      .collection("booking")
      .doc(id)
      .onSnapshot((snapshot) => {
        setData(snapshot.data());
        setPurposeFor(snapshot.data().purposeFor);
        setDate({
          ...dateTime,
          date: snapshot.data().time.toDate().getDate(),
          month: snapshot.data().time.toDate().getMonth(),
          year: snapshot.data().time.toDate().getFullYear(),
          hour: snapshot.data().time.toDate().getHours() % 12 || 12,
          minute: snapshot.data().time.toDate().getMinutes(),
          day: snapshot.data().time.toDate().getHours() >= 12 ? "PM" : "AM",
          birthDate: snapshot.data().birthTime.toDate().getDate(),
          birthMonth: snapshot.data().birthTime.toDate().getMonth(),
          birthYear: snapshot.data().birthTime.toDate().getFullYear(),
          birthHour: snapshot.data().birthTime.toDate().getHours() % 12 || 12,
          birthMinute: snapshot.data().birthTime.toDate().getMinutes(),
          birthDay: snapshot.data().birthTime.toDate().getHours() >= 12 ? "PM" : "AM",
        });
        console.log(snapshot.data().time.toDate().getHours(), "////////hours");
        console.log(snapshot.data().time.toDate().getMinutes(), "/////minutes");
        console.log(snapshot.data().time.toDate().getMonth(), "////////month");
        console.log(snapshot.data().time.toDate().getDate(), "////////date");
        console.log(snapshot.data().time.toDate().getYear(), "////////year");
        console.log(snapshot.data().time);
        console.log(snapshot.data().birthTime.toDate(), "♣♠");
      });
  }, []);

  return (
    <>
      {/* {JSON.stringify(`${dateTime.birthMonth}`)} */}
      <Grid container spacing={3} style={{ margin: "0%", padding: "0%" }}>
        <Grid item xs={12} md={6}>
          <div className={classes.leftContent}>
            <div className={classes.leftContent1}>
              <Paper variant="outlined" className={classes.paper}>
                <img className={classes.profileImg} src={data.profile} />

                <h2 style={{ marginBottom: "0px", letterSpacing: "1px" }}>
                  {data.userName}
                </h2>
                <p style={{ marginTop: "1px" }}>{data.email}</p>
              </Paper>
            </div>
            <h2
              style={{
                color: "black",
                paddingLeft: "10px",
                marginTop: "30px",
                marginBottom: "0px",
              }}
            >
              ABOUT
            </h2>

            <div className={classes.leftContent2}>
              <Paper variant="outlined" className={classes.paper}>
                <h3>BIRTH PLACE</h3>
                <p>{data.birthPlace}</p>
              </Paper>
              <Paper variant="outlined" className={classes.paper}>
                <h3>DOB</h3>
                <p>{dateTime.birthDate} {monthNames[dateTime.birthMonth]} {dateTime.birthYear}{" "}
                {dateTime.birthHour}:{dateTime.birthMinute} {dateTime.birthDay}</p>
              </Paper>
              <Paper variant="outlined" className={classes.paper}>
                <h3>PHONE NUMBER</h3>
                <p>{data.phoneNumber}</p>
              </Paper>
              <Paper variant="outlined" className={classes.paper}>
                <h3>BOOKING FOR</h3>
                {data.bookingFor == "Appointment.MySelf" ? (
                  <p>Myself</p>
                ) : (
                  <p>For Other</p>
                )}
              </Paper>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          <div className={classes.rightContent}>
            <Paper variant="outlined" className={classes.paper}>
              <h3>JADHAGAM</h3>
              <img className={classes.jadhagamImg} src={data.jadhagam} />
            </Paper>

            <Paper variant="outlined" className={classes.paper}>
              <h3>PURPOSE FOR</h3>
              {purposeFor.map((data) => (
                <Paper
                  style={{
                    display: "inline-grid",
                    marginRight: "10px",
                    marginBottom: "10px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <p>{data}</p>
                </Paper>
              ))}
            </Paper>
            <Paper variant="outlined" className={classes.paper}>
              <h3>APPOINTMENT TIME</h3>
              <p>
                {dateTime.date} {monthNames[dateTime.month]} {dateTime.year}  {""}
                {dateTime.hour}:{dateTime.minute} {dateTime.day}
              </p>
            </Paper>
            <Paper variant="outlined" className={classes.paper}>
              <h3>PAYMENT</h3>
              <p>₹ {data.payment}</p>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default BookingDetails;
