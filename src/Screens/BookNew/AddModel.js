import React, { useState, useEffect } from "react";
import { dialogStyle } from "../video/videoPostStyle";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../firebaseConfig/fbConfig";
import "./addModel.css";
// import "./addpost.css";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Grid,
  Avatar,
  FormControl,
  Button,
  Fab,
  Radio,
  Fade,
  RadioGroup,
  FormControlLabel,
  Typography,
} from "@material-ui/core";

import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";
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
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
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
export default function AddBookModel() {
  const classes = useStyles();
  const storage = firebase.storage();
  const firestore = firebase.firestore();
  const [isSubmitDisable, setIsSubmitDisable] = useState(true);
  const dialogCss = dialogStyle();
  const [open, setOpen] = useState(false);
  const[pickImage,setPickImage]=useState(null)
  const [imageLoading, setimageLoading] = useState(0);
  const [pdfLoading, setPdfLoading] = useState(0);

  const [addBook, setAddBook] = useState({
    authorName: "",
    bookName: "",
    description: "",
    pdfLink: "",
    image: "",
    paid: "paid",
    bookType: "free",
  });
  const alertOpen = () => {
    setOpen(true);
  };

  const alertClose = () => {
    setOpen(false);
  };

  const submit = () => {
    console.log(addBook.bookType);
    console.log(addBook.paid);

    var checker = Object.keys(addBook).some(function (i) {
      return addBook[i] === "";
    });
    if (checker) {
      alert("field empty");
    } else {
      addBooks();
      setOpen(false);
      setAddBook({
        ...addBook,
        authorName: "",
        bookName: "",
        image: "",
        pdfLink: "",
        description: "",
        bookType: "free",
        paid: "paid",
      
      });
      setPickImage(null);
  
      setPdfLoading(0);
      setimageLoading(0);
      setIsSubmitDisable(true);
      const imageInput = document.getElementById('imageInput')
      const pdfInput = document.getElementById('pdfInput')
      imageInput.value = null
      pdfInput.value = null
    }
  };

  const addBooks = () => {
    const type = addBook.bookType === "free" ? addBook.bookType : addBook.paid;
    console.log(type);

    firebase.firestore().collection("books").add({
      authorName: addBook.authorName,
      bookName: addBook.bookName,
      description: addBook.description,
      image: addBook.image,
      pdfLink: addBook.pdfLink,
      bookType: type,
      createdAt: Date(),
    });

    console.log(Date());
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setAddBook({ ...addBook, [name]: value });
    console.log(`${name}iiiiiiiiiiiiiiiiiiiiiiiiiiiiii ${value}`);
  };

    //only pick
    const pick = (e) =>{
      console.log(e.target.files[0]);
      setPickImage(e.target.files[0]);
      console.log('---------------------------')
      console.log(pickImage);

     };

 
  const addUploadImage = () => {
    var upload = storage
      .ref(`books/${pickImage.name}`)
      .put(pickImage);
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
          .child(pickImage.name)
          .getDownloadURL()
          .then((url) => setAddBook({ ...addBook, image: url }));
      }
    );
  };



   
   

 
  const addUploadPdf = (e) => {
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
          .then((url) => {
            console.log("OOOOOOOOOOOOOOOOOOOOOO");
            console.log(url);
            setAddBook({ ...addBook, pdfLink: url });
            setIsSubmitDisable(false);
            
          });
      }
    );
  };
  useEffect(() => {
    if(pickImage !== null){
      addUploadImage()
    }
    
  }, [pickImage])
  return (
    <div>
      <Fab
        variant="extended"
        aria-label="add"
        className={dialogCss.fabStyle}
        onClick={alertOpen}
      >
        <SlowMotionVideoIcon className={dialogCss.extendedButton} /> Add Book
      </Fab>
      <Fade in={open}>
        <Dialog
          open={open}
          keepMounted
          onClose={alertClose}
          closeAfterTransition
        >
          <DialogTitle>{"Book"}</DialogTitle>
          <DialogContent>
          <p>Note: Book Image size <b>150 x 200</b></p>
            <DialogContentText>
              <div className={classes.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <div className="ab-image-div">
                        {" "}
                        <img src={addBook.image} />
                      </div>
                      <h3 style={{ color: "#A6A6A6" }}>{imageLoading}%</h3>

                      <input
                        type="file"
                        id="imageInput"
                        name="image"
                        display="none"
                        onChange={pick}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper className={classes.paper}>
                      <TextField
                        id="outlined-basic"
                        name="authorName"
                        label="Author Name"
                        variant="outlined"
                        value={addBook.authorName}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper className={classes.paper}>
                      {" "}
                      <TextField
                        id="outlined-basic"
                        name="bookName"
                        value={addBook.bookName}
                        onChange={handleChange}
                        label="Title"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={6}>
                    <Paper className={classes.paper}>
                      <FormControl
                        component="fieldset"
                        style={{
                          border: "solid 2px",
                          borderRadius: "5px",
                          padding: "10px 30px 15px 30px",
                          color: "#CACACA",
                        }}
                      >
                        <RadioGroup
                          row="true"
                          name="bookType"
                          value={addBook.bookType}
                          onChange={handleChange}
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
                  </Grid>
                  {addBook.bookType !== "free" && (
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <TextField
                          id="outlined-basic"
                          name="paid"
                          value={addBook.paid}
                          onChange={handleChange}
                          label="Enter amount"
                          variant="outlined"
                          style={{ width: "100%" }}
                        />
                      </Paper>
                    </Grid>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      multiline
                      rows={5}
                      rowsMax={6}
                      id="outlined-basic"
                      label="Description"
                      name="description"
                      value={addBook.description}
                      onChange={handleChange}
                      variant="outlined"
                      style={{ width: "100%", marginLeft: "0%", margin: "1%" }}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <h2>{pdfLoading}%</h2>
                    <input
                      type="file"
                      id="pdfInput"
                      name="pdfLink"
                      // value={addBook.pdfLink}
                      onChange={addUploadPdf}
                    />
                  </Paper>
                </Grid>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <Button
              className={classes.submitButtonStyle}
              variant="contained"
              color="primary"
              onClick={submit}
              disabled={isSubmitDisable}
            >
              Submit
            </Button>
            <Button
              className={classes.submitButtonStyle}
              variant="contained"
              color="primary"
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
