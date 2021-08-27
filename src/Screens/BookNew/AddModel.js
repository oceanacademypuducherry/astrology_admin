import React, { useState, useEffect } from "react";
import { dialogStyle } from "../video/videoPostStyle";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../firebaseConfig/fbConfig";
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
// import CircularProgressWithLabel from "./progressBar";
// import CheckCircleIcon from "@material-ui/icons/CheckCircle";
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
export default function AddBookModel() {
const classes = useStyles();
  const storage = firebase.storage();
  const firestore = firebase.firestore();
  const[isSubmitDisable,setIsSubmitDisable] = useState(true)
  const dialogCss = dialogStyle();
  const [open, setOpen] = useState(false);
  
  const [addBook, setAddBook] = useState({
    authorName: "",
    bookName: "",
    description: "",
    pdfLink: "",
    image: "",
    paid:"",
    bookType: "free",
   
  });
  const alertOpen = () => {
    setOpen(true);
  };

  const alertClose = () => {
    setOpen(false); };

  const submit = () => {
    var checker = Object.keys(addBook).some(function (i) {
      return addBook[i] === "";
    });
    if(checker){
      alert('field empty')
    }else{
      addBooks();
      setOpen(false);
      setAddBook({ authorName: "",
      bookName: "",
      description: "",
      pdfLink: "",
      image: "",
      bookType: "free",
    paid:""})
     } };

  const addBooks = () => {
    firebase.firestore().collection("booktest").add({
      authorName: addBook.authorName,
      bookName: addBook.bookName,
      description: addBook.description,
      image: addBook.image,
      pdfLink: addBook.pdfLink,
      bookType: addBook.bookType === 'free'?  addBook.bookType : addBook.paid ,
      createdAt: Date(),
    });

    console.log(Date());
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setAddBook({ ...addBook, [name]: value });
    console.log(`${name}iiiiiiiiiiiiiiiiiiiiiiiiiiiiii ${value}`);
  };

  const addUploadImage = (e) => {
    var upload = storage
      .ref(`books/${e.target.files[0].name}`)
      .put(e.target.files[0]);
    upload.on(
      "state_changed",
      (snapshot) => {
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
            console.log('OOOOOOOOOOOOOOOOOOOOOO')
            console.log(url)
            setAddBook({ ...addBook, pdfLink: url })
            setIsSubmitDisable(false)
            
          });
      }
    );
  };
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
          <DialogContentText>
            <div className={classes.root}>
              <Grid container spacing={3}>
              <Grid item xs={12}>
                  <Paper className={classes.paper}>
                  <label>upload Image</label>
                  <Avatar alt="Remy Sharp" src={addBook.image} />
                 
                    <input
                      type="file"
                      id="imageInput"
                      name="image"
                  
                      // label = "upload image"
                      // value={addBook.image}

                      onChange={addUploadImage}
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
                    <FormControl component="fieldset" style = {{border : 'solid 2px',borderRadius: '5px',padding : '10px 30px 15px 30px' ,color :'#CACACA'}}>
           
                      <RadioGroup
                      row = "true"
                    
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
               {addBook.bookType !== 'free' &&  <Grid item xs={6}>
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
                  </Paper></Grid>}
                </Grid>

                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
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
                    <input
                      type="file"
                      id="imageInput"
                      name="pdfLink"
                      // value={addBook.pdfLink}
                      onChange={addUploadPdf}
                    />
                  </Paper>
                </Grid>
               
            
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{display: 'flex', justifyContent:'space-around'}}>
        <Button
                className={classes.submitButtonStyle}
                variant="contained"
                color="primary"
                onClick={submit}
                disabled={
                  isSubmitDisable}
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