import React, { useEffect, useState } from "react";
import firebase from "../../firebaseConfig/fbConfig";
import { useParams } from "react-router";
import MediaCard from "./Video";
import "./video.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import TransitionsModal from "./VideoPost";
import { Link } from "react-router-dom";

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
  const { id } = useParams();

  // firebase functions
  const firestore = firebase.firestore();
  const storage = firebase.storage();

  // get paid video
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
        console.log(e.message);
      });
  }
  // get free video
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
        console.log(e.message);
      });
  }

  const folder = id !== "free" ? "PaidVedios" : "youtubeVedios";
  let fireData = firestore.collection(folder);

  // use effect
  useEffect(() => {
    fireData.onSnapshot((querySnapshot) => {
      let videoResponse = [];
      querySnapshot.docs.map((doc) => {
        console.log(doc.data());
        let dbField = doc.data();
        dbField["docId"] = doc.id;
        videoResponse.push(dbField);
      });
      setAllVideos(videoResponse);
    });
  }, [id]);

  return (
    <div className="add-video">
      <div className="toggle">
        <div>
          <Link to={`/video/free`} className={"to-link"}>
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
          </Link>
          <Link to={`/video/paid`} className={"to-link"}>
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
          </Link>
        </div>
      </div>

      <div className="all-video">
        {allVideos.map((video) => (
          <MediaCard
            videoInfo={video}
            // title={video.title}
            // description={video.description}
            // imageUrl={video.videoImage}
            docId={video.docId}
            videoType={video.type}
          />
        ))}
      </div>
      <TransitionsModal />
    </div>
  );
}
