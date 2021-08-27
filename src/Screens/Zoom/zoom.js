import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../firebaseConfig/fbConfig";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";

import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    return db
      .collection("booking")
      .orderBy("time")
      .onSnapshot((snapshot) => {
        const getData = [];
        snapshot.forEach((doc) => getData.push({ ...doc.data(), id: doc.id }));
        setData(getData);
        console.log(getData, "//////////////////////");
      });
  }, []);

  const classes = useStyles();
  return (
    <Grid container direction="row" justifyContent="flex-start" spacing={10}>
      {data.map((data) => (
        <Grid item>
          <Card className={classes.root}>
            <CardHeader
              avatar={
              <Avatar className={classes.avatar} src={data.profile} />
              }
            //   action={
            //     <IconButton aria-label="settings">
            //       <MoreVertIcon />
            //     </IconButton>
            //   }
              title={data.userName}
              subheader=""
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
              <Button variant="outlined" color="secondary">
                Schedule
              </Button>

              <Button variant="outlined" color="secondary">
                View
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
