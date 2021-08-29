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
                  subheader="1 July, 2021"
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
                    Phone Number
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
                    {data.phoneNumber}
                  </p>
                </CardContent>
              </Link>
              <CardActions>
                <a
                  href={data.adminZoomLink}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Button
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
        ))}
      </Grid>
    </>
  );
}
