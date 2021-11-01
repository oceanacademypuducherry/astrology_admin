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
  import Box from '@mui/material/Box';
  import SpeedDial from '@mui/material/SpeedDial';
  import SpeedDialIcon from '@mui/material/SpeedDialIcon';
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import SpeedDialAction from '@mui/material/SpeedDialAction';
  import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
  import SaveIcon from '@mui/icons-material/Save';
  import LockOpenIcon from '@mui/icons-material/LockOpen';
  import PrintIcon from '@mui/icons-material/Print';
  import ShareIcon from '@mui/icons-material/Share';
  import EditIcon from '@mui/icons-material/Edit';


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

function SeeAllMeeting() {
    const [booking, setBooking ] = useState([])
    const classes = useStyles();
    var sec =  Date.now()/ 1000

    useEffect(() => {
        const db = firebase.firestore();
        return db.collection("booking").orderBy("time").onSnapshot((snapshot) => {
            const getbookingTime = [];
            snapshot.forEach((doc) => { 
                var seconds = new Date().getTime() / 1000;
                seconds = Math.ceil(seconds)
                if (doc.data().time.seconds >= seconds) {
                    console.log(doc.data().time.toDate());
                    getbookingTime.push({ ...doc.data(), id: doc.id })
                }
            });
            setBooking(getbookingTime);
        })
    }, [])


    return (
        <>
       <Grid container spacing={8} direction="row" justifyContent="flex-start" >
    
        {booking.map((data, index) => (
         
          data.time.seconds >= Math.ceil(sec) &&
          (
            <Grid item key={index}>
              <Card className={classes.root}>
                {/* {/* {JSON.stringify(new Date().getHours()) } {" "} */}
                {/* {JSON.stringify(data.time.toDate().getHours()) } {" "} */}
                {/* {JSON.stringify(data.time.seconds)}  */}
                <Link to={`zoom/${data.id}`} style={{ textDecoration: "none" }}>
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
                      {`${data.time.toDate().getDate()} ${monthNames[data.time.toDate().getMonth()]
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
                {/* <CardActions>
                  <a
                    href={data.adminZoomLink === "" || data.time.toDate().getHours() !== new Date().getHours() ? "#" : data.adminZoomLink}
                    style={{ textDecoration: "none", width: "100%" }}
                  >
                    <Button
                      disabled={data.adminZoomLink === "" || data.time.toDate().getHours() !== new Date().getHours()}
                      variant="outlined"
                      color="secondary"
                      style={{ width: "100%" }}
                    >
                      Launch Zoom
                    </Button>
                  </a>
                </CardActions> */}
              </Card>
            </Grid>
          )
        ))}

      </Grid>
        </>
    )
}

export default SeeAllMeeting
