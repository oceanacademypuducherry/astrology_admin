import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import firebase from "../../firebaseConfig/fbConfig";
import DescriptionIcon from "@material-ui/icons/Description";
import { Link } from "react-router-dom";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Grid,
  FormLabel,
  Avatar,
  FormControl,
  Button,
  Fab,
  Radio,
  Fade,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 300,
    height: 420,
  },
  media: {
    height: 240,
    maxWidth: 300,
    boxShadow: "5px 5px #F5F5F5",
    backgroundColor: "#e6e6e6",
  },

  cardTitle: {
    fontSize: "20px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "30px",
  },

  cardDescription: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "60px",
  },
  addArticle: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  inputRoot: {
    // backgroundColor: "grey",
    display: "flex",
    flexDirection: "row",
  },
  inputPaper: {
    padding: theme.spacing(5),
    maxWidth: 500,
  },
  image: {
    width: 200,
    height: 200,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  submitButtonStyle: {
    margin: theme.spacing(1),
    width: 150,
    background: "#1F6DE2",
    color: "white",
    "&:hover": {
      background: "#054cb5",
    },
  },
}));
export default function EditBook({ bookInfo, docId, bookType }) {
  const firestore = firebase.firestore();
  const storage = firebase.storage();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [isSubmitDisable, setIsSubmitDisable] = useState(true);
  const [updateBook, setUpdateBook] = useState({
    authorName: bookInfo.authorName,
    bookName: bookInfo.bookName,
    description: bookInfo.description,
    pdfLink: bookInfo.pdfLink,
    image: bookInfo.image,
    bookType: bookInfo.bookType,
  });

  const alertOpen = () => {
    setOpen(true);
    getBookData();
  };
  const alertClose = () => {
    setOpen(false);
  };

  function getBookData() {
    const bookData = firestore.collection("books").doc(docId).get();
    bookData
      .then((data) => {
        console.log(data.data());
        setUpdateBook(data.data());
      })
      .catch((error) => alert(error.message));
  }
  const [imageLoading, setimageLoading] = useState(0);
  const updateUploadImage = (e) => {
    var upload = storage
      .ref(`books/${e.target.files[0].name}`)
      .put(e.target.files[0]);
    upload.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setimageLoading(progress);
        console.log(snapshot, "///////////////////////////////snapshots");
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("books")
          .child(e.target.files[0].name)
          .getDownloadURL()
          .then((url) => setUpdateBook({ ...updateBook, image: url }));
      }
    );
  };
  const [pdfLoading, setPdfLoading] = useState(0);
  const updateUploadPdf = (e) => {
    var upload = storage
      .ref(`bookPdf/${e.target.files[0].name}`)
      .put(e.target.files[0]);
    upload.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPdfLoading(progress);
        console.log(snapshot, "///////////////////////////////snapshots");
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("bookPdf")
          .child(e.target.files[0].name)
          .getDownloadURL()
          .then((url) => setUpdateBook({ ...updateBook, pdfLink: url }));
        setIsSubmitDisable(false);
      }
    );
  };

  const updateChange = (event) => {
    // setValue(event.target.value);
    let { name, value } = event.target;
    setUpdateBook({ ...updateBook, [name]: value });
    console.log(`${name}iiiiiiiiiiiiiiiiiiiiiiiiiiiiii ${value}`);
  };

  const bookUpdate = () => {
    var checker = Object.keys(updateBook).some(function (i) {
      return updateBook[i] === "";
    });
    if (checker) {
      alert("field empty");
    } else {
      const db = firebase.firestore();
      db.collection("books").doc(docId).update({
        authorName: updateBook.authorName,
        bookName: updateBook.bookName,
        description: updateBook.description,
        pdfLink: updateBook.pdfLink,
        image: updateBook.image,
        bookType: updateBook.bookType,
      });
      alertClose(false);
    }
  };
  ///add update
  return (
    <div>
      <Button size="small" color="primary" onClick={alertOpen}>
        Edit
      </Button>

      <Fade in={open}>
        <Dialog
          open={open}
          closeAfterTransition
          keepMounted
          onClose={alertClose}
        >
          <DialogTitle>{"Book"} </DialogTitle>

          <DialogContent>
            <DialogContentText>
              <div className={classes.root}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Paper className={classes.paper}>
                      <TextField
                        id="outlined-basic"
                        name="authorName"
                        label="Author Name"
                        variant="outlined"
                        value={updateBook.authorName}
                        onChange={updateChange}
                        style={{ width: "100%" }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper className={classes.paper}>
                      <TextField
                        id="outlined-basic"
                        name="bookName"
                        value={updateBook.bookName}
                        onChange={updateChange}
                        label="Title"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </Paper>
                  </Grid>

                  {/* <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                          aria-label="gender"
                          name="bookType"
                          onChange={updateChange}
                          value={updateBook.bookType}
                        >
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
                        </RadioGroup>
                      </FormControl>
                    </Paper>
                  </Grid> */}

                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <TextField
                        id="outlined-basic"
                        label="Description"
                        name="description"
                        value={updateBook.description}
                        onChange={updateChange}
                        variant="outlined"
                        style={{
                          width: "100%",
                          marginLeft: "0%",
                          margin: "1%",
                        }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper
                      className={classes.paper}
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="file"
                        id="imageInput"
                        name="pdfLink"
                        // value={updateBook.pdfLink}
                        onChange={updateUploadPdf}
                      />
                      <h3>{pdfLoading}%</h3>
                      <Link
                        to={`/book/preview/${docId}`}
                        style={{ color: "gray" }}
                        title="preview document"
                      >
                        <DescriptionIcon fontSize="large" />
                      </Link>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper
                      className={classes.pape}
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                    
                      <input
                        type="file"
                        id="imageInput"
                        name="image"
                        onChange={updateUploadImage}
                      />
                      <h3>{imageLoading}%</h3>
                      <div
                        className="book-img-edit"
                        style={{
                          backgroundColor: "#E0E0E0",
                          height: 30 * 3,
                          width: 35 * 2,
                          display: "inline-block",
                        }}
                      >
                        <img
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          src={updateBook.image}
                        />
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            </DialogContentText>
            <p>Note: Book Image size <b>150 x 200</b></p>
          </DialogContent>
          <DialogActions
            style={{ display: "flex", justifyContent: "space-around" }}
          >
       
            <Button
              onClick={bookUpdate}
              variant="contained"
              className={classes.submitButtonStyle}
              // style={{
              //   background: "#1F6DE2",
              //   width: "150px",
              //   height: "55px",
              //   color: "white",
              // }}
            >
              Submit
            </Button>

            <Button
              className={classes.submitButtonStyle}
              variant="contained"
              onClick={alertClose}
            >
              cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Fade>
    </div>
  );
}
