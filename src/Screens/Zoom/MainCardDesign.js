import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import moment from 'moment'
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { useStyles } from "./MUI/MainCardDesignMUI";
import firebase from "../../firebaseConfig/fbConfig";
import { Link } from "react-router-dom";
import RestrictTimeAlert from "./RestrictTimeAlert";

export default function MainCardDesign({ data }) {
  //declaring MUI style
  const classes = useStyles();
  //useState
  const [isOpen, setIsOpen] = useState(false);
  const [restrictTime, setrestrictTime] = useState([]);
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


  // useEffect(() => {
  //  firebase.firestore.collection()
  // }, [])

  const onClickrestrictTime = () => {
    const db = firebase.firestore();
    return db.collection("availableTime").onSnapshot((snapshot) => {
      const getData = [];
      // console.log(Date.now());
      snapshot.forEach((doc) =>
        // console.log(doc.data().time, "////////time"),
        getData.push({ ...doc.data() })
      );
      setrestrictTime(getData);
      setIsOpen(!isOpen);
    });
  };

  return (
    <>
      {/* ScheduleAlert */}
      <RestrictTimeAlert
        retrictTime={restrictTime}
        bookedTime={data}
        isDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
      {/* ScheduleAlert */}

      {/* RestrictButton */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "35px",  }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClickrestrictTime}>
          Retrict Time
        </Button>
      </div>
      {/* RestrictButton */}

      <Grid container direction="row" justifyContent="flex-start" spacing={8}>
       
       
        {data.map((data) => (  
         new Date().getDate() >= data.time.toDate().getDate() &&
         (
          <Grid item>
          <Card className={classes.root}>
         {JSON.stringify(new Date().getDate()) } {" "}
         {JSON.stringify(data.time.toDate().getDate())}
            <Link to={`zoom/${data.id}`} style={{ textDecoration: "none" }} >
              <CardHeader
                style={{ color: "black" }}
                avatar={
                  <Avatar className={classes.avatar} src={data.profile} />
                }
                action={
                  data.userZoomLink && data.adminZoomLink !== "" ? (
                    <IconButton disabled>
                      <CheckCircleIcon style={{ color: "green" }} />
                    </IconButton>
                  ) : (
                    <IconButton disabled>
                      <CancelIcon style={{ color: "red" }} />
                    </IconButton>
                  )
                }
                title={data.userName}
                subheader={data.phoneNumber}
              />
              <CardMedia
                className={classes.media}
                image={data.jadhagam}
                //   title="Sorry! NO Jadhagam is Uploaded"
              />
              <CardContent>
                <h3
                  variant="subtitle1"
                  color="textSecondary"
                  style={{
                    marginBottom: "5px",
                    color: "grey",
                    fontFamily: "Ubuntu",
                    marginTop: "0px",
                  }}
                >
                  Appointment Time
                </h3>
                <p
                  variant="subtitle2"
                  color="textSecondary"
                  style={{
                    marginTop: "0px",
                    marginBottom: "0px",
                    color: "grey",
                    fontFamily: "Ubuntu",
                  }}
                >
                  {`${data.time.toDate().getDate()} ${
                    monthNames[data.time.toDate().getMonth()]
                  }  
                    ${data.time.toDate().getFullYear()}  
                    ${data.time.toDate().getHours() % 12 || 12}:${data.time
                    .toDate()
                    .getMinutes()}
                    ${data.time.toDate().getHours() >= 12 ? "PM" : "AM"}
                  `}
                </p>
              </CardContent>
            </Link>
            <CardActions>
              <a
                href={data.adminZoomLink}
                style={{ textDecoration: "none", width: "100%" }}
              >
                <Button
                  disabled = {data.adminZoomLink === ""}
                  variant="outlined"
                  color="secondary"
                  style={{ width: "100%" }}
                >
                  Launch Zoom
                </Button>
              </a>
            </CardActions>
          </Card>
        </Grid>
         )
        ))}
      </Grid>
    </>
  );
}
