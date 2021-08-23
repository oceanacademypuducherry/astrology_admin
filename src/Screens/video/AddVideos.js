import React, { useEffect, useState, useLayoutEffect } from "react";
import firebase from "../../firebaseConfig/fbConfig";
import MediaCard from "./Video";
import "./video.css";

import Fab from "@material-ui/core/Fab";
import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  togleBtn: {
    margin: 8,
  },

  fabStyle: {
    position: "fixed",
    right: "1.5%",
    bottom: "2%",
    background: "#1F6DE2",
    color: "white",
    "&:hover": {
      background: "#054cb5",
    },
  },

  extendedButton: {
    marginRight: theme.spacing(1),
  },
}));

export default function AddVideos() {
  const classes = useStyles();

  const [allVideos, setAllVideos] = useState([]);
  const [videoType, setVideoType] = useState(true);
  const firestore = firebase.firestore();
  const storage = firebase.storage();
  function getVideoData() {
    let videoResponse = [];
    firestore
      .collection("PaidVedios")
      .get()
      .then((response) => {
        response.docs.forEach((videoData) => {
          let dbField = videoData.data();
          dbField["docId"] = videoData.id;
          videoResponse.push(dbField);
        });
        setAllVideos(videoResponse);
      })
      .catch((e) => {
        console.log("444444444444444444");
        console.log(e.message);
      });
  }
  function getYoutubeVideoData() {
    let videoResponse = [];
    firestore
      .collection("youtubeVedios")
      .get()
      .then((response) => {
        response.docs.forEach((videoData) => {
          let dbField = videoData.data();
          dbField["docId"] = videoData.id;

          videoResponse.push(dbField);
        });
        setAllVideos(videoResponse);
      })
      .catch((e) => {
        console.log("444444444444444444");
        console.log(e.message);
      });
  }

  useEffect(() => {
    !videoType ? getVideoData() : getYoutubeVideoData();
  }, [videoType]);
  return (
    <div className="add-video">
      <div className="toggle">
        <div>
          <Button
            className={classes.togleBtn}
            variant="outlined"
            color="primary"
            onClick={() => {
              setVideoType(true);
            }}
          >
            Free
          </Button>

          <Button
            className={classes.togleBtn}
            variant="outlined"
            color="primary"
            onClick={() => {
              setVideoType(false);
            }}
          >
            Paid
          </Button>
        </div>
      </div>

      <div className="all-video">
        {allVideos.map((video) => (
          <MediaCard
            title={video.title}
            description={video.description}
            imageUrl={video.videoImage}
          />
        ))}
      </div>
      <Fab variant="extended" aria-label="add" className={classes.fabStyle}>
        <SlowMotionVideoIcon className={classes.extendedButton} /> Add Video
      </Fab>
    </div>
  );
}
