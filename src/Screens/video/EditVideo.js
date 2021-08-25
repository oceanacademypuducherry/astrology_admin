import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import ReactPlayer from "react-player";
import "./editVideo.css";
import firebase from "../../firebaseConfig/fbConfig";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function EditVideo({ videoInfo, docId, videoType }) {
  const collectionName = videoType === "free" ? "youtubeVedios" : "PaidVedios";
  const firestore = firebase.firestore();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [editVideo, setEditVideo] = useState({
    title: videoInfo.title,
    description: videoInfo.description,
    videoImage: videoInfo.videoImage,
    videoUrl: videoInfo.videoUrl,
    type: videoInfo.type,
  });

  function onChangeInputs(e) {
    const { name, value } = e.target;
    setEditVideo({ ...editVideo, [name]: value });
  }

  const handleOpen = () => {
    setOpen(true);
    getVideoData();
  };

  const handleClose = () => {
    setOpen(false);
    // location.reload();
  };
  function getVideoData() {
    const videoData = firestore.collection(collectionName).doc(docId).get();
    videoData
      .then((data) => {
        console.log(data.data());
        setEditVideo(data.data());
      })
      .catch((error) => alert(error.message));
  }

  function onUpdate() {
    firestore.collection(collectionName).doc(videoInfo.docId).update(editVideo);

    handleClose();
  }
  //   useEffect(() => {

  //   }, []);

  return (
    <div>
      <Button size="small" color="primary" onClick={handleOpen}>
        Edit
      </Button>

      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="video-player">
              <input
                className="video-url"
                name="videoUrl"
                type="text"
                onChange={onChangeInputs}
                value={editVideo.videoUrl}
              />
              <div className="this-video">
                <ReactPlayer
                  url={editVideo.videoUrl}
                  controls={true}
                  height={"100%"}
                  width={"100%"}
                />
              </div>
              <div className="this-visible">
                <div className="this-thumbnail">
                  <input type="hidden" id="file" />
                  <img
                    src={editVideo.videoImage}
                    alt=""
                    onClick={() => {
                      let files = document.getElementById("file");
                      files.type = "file";
                      files.click();
                    }}
                  />
                </div>
                <div className="this-content">
                  <textarea
                    className="this-title inp"
                    name="title"
                    onChange={onChangeInputs}
                    value={editVideo.title}
                  />

                  <textarea
                    rows={3}
                    className="this-description inp"
                    name="description"
                    value={editVideo.description}
                    onChange={onChangeInputs}
                  />
                </div>
              </div>
            </div>
            <div className="update-btn">
              {" "}
              <button className="update-button" onClick={() => onUpdate()}>
                Update
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
