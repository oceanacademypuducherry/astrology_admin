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
import React, { useState } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { useStyles } from "./MUI/MainCardDesignMUI";
import ScheduleAlert from "./ScheduleAlert";
import firebase from "../../firebaseConfig/fbConfig";
import { Link } from "react-router-dom";

export default function MainCardDesign({ data }) {
  //declaring MUI style
  const classes = useStyles();
  //usestate
  const [isOpen, setIsOpen] = useState(false);
  const [specificData, setSpecificData] = useState();
  const [documentId, setDocumentId] = useState();

  const handleOpen = (id) => {
    console.log(id, "♦♦♦♦♦♦♦ Set document id ♦♦♦♦♦♦♦");
    setDocumentId(id);
    const db = firebase.firestore();
    db.collection("booking")
      .doc(id)
      .get()
      .then((snapshot) => {
        setSpecificData(snapshot.data());
        console.log(snapshot.data(), "☻☻☻☻☻☻☻☻☻, get data");
        //  setData(snapshot.data());
      })
      .catch((e) => console.log(e));

    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* ScheduleAlert */}
      <ScheduleAlert
        data={specificData}
        documentId={documentId}
        isDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
      {/* ScheduleAlert */}

      {/* ScheduleAlert */}
      <ScheduleAlert
        data={specificData}
        documentId={documentId}
        isDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
      {/* ScheduleAlert */}

      <Grid container direction="row" justifyContent="flex-start" spacing={10}>
        {data.map((data) => (
          <Grid item>
            <Card className={classes.root}>
              <CardHeader
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
                subheader="Time"
              />
              <CardMedia
                className={classes.media}
                image={data.jadhagam}
                //   title="Sorry! NO Jadhagam is Uploaded"
              />
              <CardContent>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  style={{ fontWeight: "bold" }}
                >
                  Phone Number
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {data.phoneNumber}
                </Typography>
              </CardContent>
              <CardActions>
                {data.userZoomLink && data.adminZoomLink !== "" ? (
                  <a href="https://zoom.us/" style={{ textDecoration: "none" }}>
                    <Button variant="outlined" color="secondary">
                      Launch Zoom
                    </Button>
                  </a>
                ) : (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleOpen(data.id)}
                  >
                    Schedule
                  </Button>
                )}
                <Link to={`zoom/${data.id}`} style={{ textDecoration: "none" }}>
                  <Button variant="outlined" color="secondary">
                    View
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
