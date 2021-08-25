import React, { useState } from "react";
import { dialogStyle } from "./videoPostStyle";
import firebase from "../../firebaseConfig/fbConfig";
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
  const dialogCss = dialogStyle();
  const [videoUpload, setVideoUpload] = useState(true);
  const [imageUpload, setImageUpload] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [localAssets, setLocalAssets] = useState({
    image: null,
    imageStatus: 0,

    video: null,

    videoStatus: 0,
  });
  const [addVideo, setAddVideo] = useState({
    videoTitle: "",
    videoDescription: "",
    videoImage: "",
    videoUrl: "",
    videoType: "free",
  });
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //radio field
  function videoTypeHandler(e) {
    console.log(e.target.value);
    setAddVideo({ ...addVideo, videoType: e.target.value });
  }

  //input field
  function onChangeHandler(e) {
    let { name, value } = e.target;
    setAddVideo({ ...addVideo, [name]: value });
  }
  //flie piker
  const handleChange = (e) => {
    console.log(e.target.name);
    if (e.target.files[0]) {
      setLocalAssets({ ...localAssets, [e.target.name]: e.target.files[0] });

      if (e.target.name == "video") {
        setVideoUpload(false);
      } else if (e.target.name == "image") {
        setImageUpload(false);
      }
    }
  };

  function handleImageUpload() {
    const uploadTask = storage
      .ref(`allVideo/${addVideo.videoType}/${localAssets.image.name}`)
      .put(localAssets.image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setLocalAssets({ ...localAssets, imageStatus: progress });
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(`allVideo/${addVideo.videoType}`)
          .child(localAssets.image.name)
          .getDownloadURL()
          .then((imageUrl) => {
            console.log(imageUrl);
            setAddVideo({ ...addVideo, videoImage: imageUrl });
          });
      }
    );
    console.log(addVideo);
    console.log(localAssets.image.name);
    console.log(localAssets.image);
  }
  function handleVideoUpload() {
    const uploadTask = storage
      .ref(`allVideo/${addVideo.videoType}/${localAssets.video.name}`)
      .put(localAssets.video);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setLocalAssets({ ...localAssets, videoStatus: progress });
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(`allVideo/${addVideo.videoType}`)
          .child(localAssets.video.name)
          .getDownloadURL()
          .then((imageUrl) => {
            console.log(imageUrl);
            setAddVideo({ ...addVideo, videoUrl: imageUrl });
          });
      }
    );
    console.log(addVideo);
    console.log(localAssets.video.name);
    console.log(localAssets.video);
  }

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
        onClose={handleClose}
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
              name="videoTitle"
              value={addVideo.videoTitle}
              onChange={onChangeHandler}
            />
            <TextField
              className={dialogCss.textFieldStyle}
              type="text"
              label="Description"
              variant="outlined"
              name="videoDescription"
              value={addVideo.videoDescription}
              onChange={onChangeHandler}
            />
            <RadioGroup
              name="videoType"
              value={addVideo.videoType}
              onChange={videoTypeHandler}
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
            {addVideo.videoType === "paid" ? (
              <div className="upload-file">
                <input
                  className={dialogCss.textFieldStyle}
                  type="file"
                  name="video"
                  onChange={handleChange}
                  placeholder="select video"
                />
                {localAssets.videoStatus === 0 ? (
                  <button disabled={videoUpload} onClick={handleVideoUpload}>
                    upload
                  </button>
                ) : localAssets.videoStatus === 100 ? (
                  <CheckCircleIcon className={dialogCss.completedIcon} />
                ) : (
                  <CircularProgressWithLabel value={localAssets.videoStatus} />
                )}
              </div>
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
            <div className="upload-file">
              <input
                name="image"
                className={dialogCss.textFieldStyle}
                type="file"
                onChange={handleChange}
                placeholder="select image"
              />
              {localAssets.imageStatus === 0 ? (
                <button disabled={imageUpload} onClick={handleImageUpload}>
                  upload
                </button>
              ) : localAssets.imageStatus === 100 ? (
                <CheckCircleIcon className={dialogCss.completedIcon} />
              ) : (
                <CircularProgressWithLabel value={localAssets.imageStatus} />
              )}
            </div>
            <Button
              className={dialogCss.submitButtonStyle}
              variant="contained"
              color="primary"
              onClick={() => {
                // if (localAssets.image !== null) {
                //   handleUpload();
                // } else {
                //   alert("select image");
                // }
                // if (addVideo.videoUrl.length === 0) {
                //   handleUpload({
                //     storagePath: `allVideo/${addVideo.videoType}`,
                //     pickedFile: localAssets.video,
                //     localState: localAssets,
                //     localStateUploadStatus: "videoStatus",
                //     mainStateProps: "videoUrl",
                //   });
                // } else {
                //   alert("select video");
                // }
              }}
            >
              Submit
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
