import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import ReactPlayer from "react-player";
import "./editVideo.css";
import firebase from "../../firebaseConfig/fbConfig";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

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

  const storage = firebase.storage();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [localAssetsImage, setLocalAssetsImage] = useState({
    image: null,
    imageStatus: 0,
  });
  const [localAssetsVideo, setLocalAssetsVideo] = useState({
    video: null,
    videoStatus: 0,
  });
  const [editVideo, setEditVideo] = useState({
    title: videoInfo.title,
    description: videoInfo.description,
    videoImage: videoInfo.videoImage,
    videoUrl: videoInfo.videoUrl,
    type: videoInfo.type,
  });

  const handleImageChange = (e) => {
    console.log(e.target.name);
    if (e.target.files[0]) {
      setLocalAssetsImage({
        ...localAssetsImage,
        image: e.target.files[0],
      });
    }
  };

  function handleImageUpload() {
    const uploadTask = storage
      .ref(`allVideo/${videoType}/${localAssetsImage.image.name}`)
      .put(localAssetsImage.image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setLocalAssetsImage({ ...localAssetsImage, imageStatus: progress });
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(`allVideo/${videoType}`)
          .child(localAssetsImage.image.name)
          .getDownloadURL()
          .then((imageUrl) => {
            console.log(imageUrl);
            setEditVideo({ ...editVideo, videoImage: imageUrl });
          });
      }
    );
  }
  const handleVideoChange = (e) => {
    console.log(e.target.name);
    if (e.target.files[0]) {
      setLocalAssetsVideo({
        ...localAssetsVideo,
        video: e.target.files[0],
      });
    }
  };
  function handleVideoUpload() {
    const uploadTask = storage
      .ref(`allVideo/${videoType}/${localAssetsVideo.video.name}`)
      .put(localAssetsVideo.video);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setLocalAssetsVideo({ ...localAssetsVideo, videoStatus: progress });
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(`allVideo/${videoType}`)
          .child(localAssetsVideo.video.name)
          .getDownloadURL()
          .then((imageUrl) => {
            console.log(imageUrl);
            setEditVideo({ ...editVideo, videoUrl: imageUrl });
          });
      }
    );
  }
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
  useEffect(() => {
    console.log(localAssetsImage.image);
    if (localAssetsImage.image !== null) {
      handleImageUpload();
    }
    if (localAssetsVideo.video !== null) {
      handleVideoUpload();
    }

    return () => {
      console.log("cleanup");
    };
  }, [localAssetsImage.image, localAssetsVideo.video]);

  return (
    <div>
      <Button size="small" color="primary" onClick={handleOpen}>
        Edit
      </Button>

      <Modal
        className={classes.modal}
        open={open}
        // onClose={handleClose}
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
                <input
                  type="file"
                  id="videoFile"
                  className="file-inp in"
                  onChange={handleVideoChange}
                />

                <ReactPlayer
                  url={editVideo.videoUrl}
                  controls={true}
                  height={"100%"}
                  width={"100%"}
                  className="in"
                />
                <div
                  className="in in-icon"
                  onClick={() => {
                    const videoFilePick = document.getElementById("videoFile");
                    videoFilePick.click();
                  }}
                >
                  <CloudUploadIcon fontSize="large" />
                </div>
              </div>
         
              <div className="this-visible">
            
                <div className="this-thumbnail">
              
                  <input
                    type="file"
                    id="files"
                    className="file-inp"
                    onChange={handleImageChange}
                  />
                  <img
                    src={editVideo.videoImage}
                    alt="Upload Image"
                    onClick={() => {
                      let files = document.getElementById("files");

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
                    // rows={3}
                    className="this-description inp"
                    name="description"
                    value={editVideo.description}
                    onChange={onChangeInputs}
                  />
                </div>
              </div>
              <p >Note: Book Image size <b>400 x 240</b></p>
            </div>
            <div className="update-btn">
              {" "}
              <button className="update-button" onClick={() => onUpdate()}>
                Update
              </button>
              <button className="update-button" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
