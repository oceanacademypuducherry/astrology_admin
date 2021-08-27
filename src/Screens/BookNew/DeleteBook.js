import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import firebase from "../../firebaseConfig/fbConfig";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 500,
  },
}));

export default function BookDelete({ bookInfo, docId, bookType }) {
  const firestore = firebase.firestore();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteFunction() {
    firestore.collection('booktest').doc(docId).delete();
    console.log(docId);
  }

  return (
    <div>
      <Button size="small" color="primary" onClick={handleOpen}>
        Delete
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
            <h1>Are you sure to delete this video</h1>
            <h2 id="transition-modal-title">{bookInfo.bookName}</h2>
            <p id="transition-modal-description">{bookInfo.description}</p>
            <div className="update-btn">
              <button
                className="update-button d-yes"
                onClick={() => {
                  deleteFunction();
                  handleClose();
                }}
              >
                Yes
              </button>
              <button
                className="update-button"
                onClick={() => {
                  handleClose();
                }}
              >
                No
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}