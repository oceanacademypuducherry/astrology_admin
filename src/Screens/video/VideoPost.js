import React, { useState, useEffect } from "react";
import { dialogStyle } from "./videoPostStyle";
import firebase from "../../firebaseConfig/fbConfig";
import "./addpost.css";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {
  Modal,
  TextField,
  Backdrop,
  Fade,
  Fab,
  Button,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";
import CircularProgressWithLabel from "./progressBar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

export default function TransitionsModal() {
  const storage = firebase.storage();
  const firestore = firebase.firestore();
  const dialogCss = dialogStyle();
  const [videoUpload, setVideoUpload] = useState(true);
  const [imageUpload, setImageUpload] = useState(true);
  const [videoSize, setVideoSize] = useState("0kb");
  const [imageSize, setImageSize] = useState("0kb");
  const [submit, setSubmit] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [localAssetsVideo, setLocalAssetsVideo] = useState({
    video: null,
    videoStatus: 0,
    videoSize: "0kb",
  });
  const [localAssetsImage, setLocalAssetsImage] = useState({
    image: null,
    imageStatus: 0,
    imageSize: "0kb",
  });
  const [addVideo, setAddVideo] = useState({
    title: "",
    description: "",
    videoImage: "",
    videoUrl: "",
    type: "free",
  });
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAddVideo({
      ...addVideo,
      title: "",
      description: "",
      videoImage: "",
      videoUrl: "",
      type: "free",
    });
    setLocalAssetsVideo({ video: null, videoStatus: 0 });
    setLocalAssetsImage({ image: null, imageStatus: 0 });
    setVideoUpload(true);
  };

  //radio field
  function typeHandler(e) {
    console.log(e.target.value);
    setAddVideo({ ...addVideo, type: e.target.value });
  }

  //input field
  function onChangeHandler(e) {
    let { name, value } = e.target;
    setAddVideo({ ...addVideo, [name]: value });
  }
  //flie piker
  const handleImageChange = (e) => {
    console.log(e.target.name);
    if (e.target.files[0]) {
      setLocalAssetsImage({
        ...localAssetsImage,
        image: e.target.files[0],
      });
      setImageUpload(false);
      var fileSize = e.target.files[0].size;
      console.log(fileSize.toFixed(2));
      if (fileSize / (1024 * 1024) < 1) {
        setImageSize(`${(fileSize / 1024).toFixed(0)}kb`);
      } else if (fileSize / (1024 * 1024 * 1024) < 1) {
        setImageSize(`${(fileSize / (1024 * 1024)).toFixed(0)}mb`);
      } else {
        setImageSize(`${fileSize.toFixed(0)}gb`);
      }
    }
  };
  const handleVideoChange = (e) => {
    console.log(e.target.name);
    if (e.target.files[0]) {
      setLocalAssetsVideo({
        ...localAssetsVideo,
        video: e.target.files[0],
      });
      setVideoUpload(false);
      var fileSize = e.target.files[0].size;
      console.log(fileSize.toFixed(2));
      if (fileSize / (1024 * 1024) < 1) {
        setVideoSize(`${(fileSize / 1024).toFixed(0)}kb`);
      } else if (fileSize / (1024 * 1024 * 1024) < 1) {
        setVideoSize(`${(fileSize / (1024 * 1024)).toFixed(0)}mb`);
      } else {
        setVideoSize(`${fileSize.toFixed(0)}gb`);
      }
    }
  };

  function handleImageUpload() {
    setSubmit(true);
    if (localAssetsImage.image !== null) {
      const uploadTask = storage
        .ref(`allVideo/${addVideo.type}/${localAssetsImage.image.name}`)
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
            .ref(`allVideo/${addVideo.type}`)
            .child(localAssetsImage.image.name)
            .getDownloadURL()
            .then((imageUrl) => {
              console.log(imageUrl);
              setAddVideo({ ...addVideo, videoImage: imageUrl });
              setSubmit(false);
            });
        }
      );
    } else {
      alert("Choose image file");
    }
  }
  function handleVideoUpload() {
    setSubmit(true);
    if (localAssetsVideo.video !== null) {
      const uploadTask = storage
        .ref(`allVideo/${addVideo.type}/${localAssetsVideo.video.name}`)
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
            .ref(`allVideo/${addVideo.type}`)
            .child(localAssetsVideo.video.name)
            .getDownloadURL()
            .then((imageUrl) => {
              setAddVideo({ ...addVideo, videoUrl: imageUrl });
              console.log(imageUrl);
              setSubmit(false);
            });
        }
      );
    } else {
      alert("Choose video file");
    }
  }
  // firebase add function

  function addVideoDataToFirestore(addData) {
    let setColection =
      addVideo.type === "free" ? "youtubeVedios" : "PaidVedios";
    firestore
      .collection(setColection)
      .add(addData)
      .then((test) => console.log(test))
      .catch((error) => console.log(error));
    // setAddVideo({
    //   ...addVideo,
    //   title: "",
    //   description: "",
    //   videoImage: "",
    //   videoUrl: "",
    //   type: "free",
    // });
  }

  function onSubmitButton() {
    var isNotValid = Object.keys(addVideo).some(function (i) {
      if (addVideo[i] === "") {
        alert(`${i} is empty`);
      }

      return addVideo[i] === "";
    });
    if (isNotValid) {
      console.log("field is empty");
    } else {
      console.log(addVideo);
      addVideoDataToFirestore(addVideo);
      setOpen(false);
    }
  }
  useEffect(() => {
    setAddVideo({
      ...addVideo,
      title: "",
      description: "",
      videoImage: "",
      videoUrl: "",
      type: "free",
    });
    setLocalAssetsVideo({ video: null, videoStatus: 0 });
    setLocalAssetsImage({ image: null, imageStatus: 0 });
    setImageSize("0kb");
    setVideoSize("0kb");
    return () => {
      console.log("cleanup add video ");
    };
  }, [open]);
  return (
    <div>
      <Fab
        variant="extended"
        aria-label="add"
        className={dialogCss.fabStyle}
        onClick={handleOpen}
      >
        <SlowMotionVideoIcon className={dialogCss.extendedButton} /> Add Video
      </Fab>
      <Modal
        className={dialogCss.modal}
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 10,
        }}
      >
        <Fade in={open}>
          <div className={dialogCss.paper}>
            <TextField
              className={dialogCss.textFieldStyle}
              type="text"
              label="Title"
              variant="outlined"
              name="title"
              value={addVideo.title}
              onChange={onChangeHandler}
            />
            <TextField
              className={dialogCss.textFieldStyle}
              type="text"
              label="Description"
              variant="outlined"
              name="description"
              value={addVideo.description}
              onChange={onChangeHandler}
            />
            <RadioGroup
              name="type"
              value={addVideo.type}
              onChange={typeHandler}
            >
              <div className="upload-file">
                <FormControlLabel
                  value="free"
                  control={<Radio />}
                  label="Free"
                />
                <FormControlLabel
                  value="paid"
                  control={<Radio />}
                  label="Paid"
                />
              </div>
            </RadioGroup>
            <hr />
            {addVideo.type === "paid" ? (
              <>
                <p style={{ margin: 0 }}>Choose video</p>
                <div className="upload-file">
                  <input
                    className={dialogCss.textFieldStyle}
                    type="file"
                    name="video"
                    onChange={handleVideoChange}
                    placeholder="select video"
                  />
                  {localAssetsVideo.videoStatus === 0 ? (
                    <button
                      className="uploadBtn"
                      disabled={videoUpload}
                      onClick={handleVideoUpload}
                    >
                      <CloudUploadIcon
                        style={{ color: videoUpload ? "gray" : "green" }}
                      />{" "}
                      <span
                        className={`file-size ${videoUpload && "disabled"}`}
                      >{`${videoSize}`}</span>
                    </button>
                  ) : localAssetsVideo.videoStatus === 100 ? (
                    <CheckCircleIcon className={dialogCss.completedIcon} />
                  ) : (
                    <CircularProgressWithLabel
                      value={localAssetsVideo.videoStatus}
                    />
                  )}
                </div>
              </>
            ) : (
              <TextField
                className={dialogCss.textFieldStyle}
                type="text"
                label="Video Url"
                variant="outlined"
                name="videoUrl"
                value={addVideo.videoUrl}
                onChange={onChangeHandler}
              />
            )}
            <>
              <hr />
              <p style={{ margin: 0 }}>Choose Image</p>
              <div className="upload-file">
                <input
                  id="imageUpload"
                  name="image"
                  className={dialogCss.textFieldStyle}
                  type="file"
                  onChange={handleImageChange}
                />

                {localAssetsImage.imageStatus === 0 ? (
                  <button
                    className="uploadBtn"
                    disabled={imageUpload}
                    onClick={handleImageUpload}
                  >
                    <CloudUploadIcon
                      style={{ color: imageUpload ? "gray" : "green" }}
                    />{" "}
                    <span
                      className={`file-size ${imageUpload && "disabled"}`}
                    >{`${imageSize}`}</span>
                  </button>
                ) : localAssetsImage.imageStatus === 100 ? (
                  <CheckCircleIcon className={dialogCss.completedIcon} />
                ) : (
                  <CircularProgressWithLabel
                    value={localAssetsImage.imageStatus}
                  />
                )}
              </div>
            </>
            <hr />
            <p>
              Note: Video Thumbnail size <b>400 x 240</b>
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              <Button
                className={dialogCss.submitButtonStyle}
                variant="contained"
                color="primary"
                onClick={onSubmitButton}
                disabled={submit}
              >
                Submit
              </Button>
              <Button
                className={dialogCss.submitButtonStyle}
                variant="contained"
                color="primary"
                onClick={handleClose}
              >
                Calcel
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
