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
// import moment from 'moment'
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Lock from "@material-ui/icons/Lock";
import { useStyles } from "./MUI/MainCardDesignMUI";
import firebase from "../../firebaseConfig/fbConfig";
import { Link } from "react-router-dom";
import RestrictTimeAlert from "./RestrictTimeAlert";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SpeedDialAction from "@mui/material/SpeedDialAction";
// import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
// import SaveIcon from '@mui/icons-material/Save';
import LockOpenIcon from "@mui/icons-material/LockOpen";
// import PrintIcon from '@mui/icons-material/Print';
// import ShareIcon from '@mui/icons-material/Share';
import EditIcon from "@mui/icons-material/Edit";

export default function MainCardDesign({ data }) {
  //declaring MUI style
  const classes = useStyles();
  //useState
  const [isOpen, setIsOpen] = useState(false);
  const [restrictTime, setrestrictTime] = useState([]);
  const [time, setTime] = React.useState(new Date());
  // const [unRestrictTime, setUnrestrictTime] = useState([]);
  var sec = Date.now() / 1000;

  React.useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

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

  const onClickrestrictTime = () => {
    const db = firebase.firestore();
    return db.collection("availableTime").onSnapshot((snapshot) => {
      const getData = [];
      snapshot.forEach((doc) => getData.push({ ...doc.data() }));
      setrestrictTime(getData);
      setIsOpen(!isOpen);
    });
  };


  const actions = [
    {
      icon: (
        <Link to="unrestrict">
          <LockOpenIcon />
        </Link>
      ),
      name: "Release Time",
    },
    {
      icon: (
        <Link to="see all meeting">
          <VisibilityIcon />
        </Link>
      ),
      name: "Upcoming Meeting",
    },
    // { icon: <PrintIcon />, name: 'Print', },
    // { icon: <ShareIcon />, name: 'Share', },
  ];

  return (
    <>
      <Box sx={{ height: "100%" }}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.action}
            />
          ))}
        </SpeedDial>
      </Box>

      {/* ScheduleAlert */}
      <RestrictTimeAlert
        retrictTime={restrictTime}
        bookedTime={data}
        isDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
      {/* ScheduleAlert */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "35px",
        }}
      >
        {/* RestrictButton */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClickrestrictTime}
        >
          Restrict Time
        </Button>
        {/* RestrictButton */}

        {/* UnrestrictButton */}
        {/* <div style={{ marginLeft: "10px" }}>
          <Link to="/unrestrict" style={{ textDecorationLine: "none" }}>
            <Button
              variant="contained"
              color="primary"
              >
              Unrestrict Time
            </Button>
          </Link>
        </div> */}
        {/* UnrestrictButton */}
      </div>

      <Grid container spacing={8} direction="row" justifyContent="flex-start">
       

        {data.map(
          (data, index) =>
            new Date().getDate() === data.time.toDate().getDate() && 
            new Date().getMonth() === data.time.toDate().getMonth() &&
            new Date().getFullYear() === data.time.toDate().getFullYear() && (
              // data.time.seconds >= Math.ceil(sec) &&
              
              <Grid item key={index}>
                <Card className={classes.root}>
                {/* { JSON.stringify( new Date().getMonth() + 1)} */}
                 {/* {JSON.stringify(new Date().getFullYear()) }  */}
                  {/* {JSON.stringify(data.time.toDate().getFullYear()) }  */}
                 {/* {JSON.stringify(time.getHours())}   */}
                  <Link
                    to={`zoom/${data.id}`}
                    style={{ textDecoration: "none" }}
                  >
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
                            <Lock style={{ color: "gray" }} />
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
                      href={
                        data.adminZoomLink === "" ||
                        data.time.toDate().getHours() !== new Date().getHours()
                          ? "#"
                          : data.adminZoomLink
                      }
                      style={{ textDecoration: "none", width: "100%" }}
                    >
                      <Button
                        disabled={
                          data.adminZoomLink === "" ||
                          data.time.toDate().getHours() !== time.getHours()
                        }
                        variant="outlined"
                        style={
                          data.adminZoomLink === "" ||
                          data.time.toDate().getHours() !==
                            new Date().getHours()
                            ? { width: "100%" }
                            : {
                                width: "100%",
                                backgroundColor: "#008000",
                                color: "white",
                              }
                        }
                      >
                        Launch Zoom
                      </Button>
                    </a>
                  </CardActions>
                </Card>
              </Grid>
            )
        )}
      </Grid>
    </>
  );
}
