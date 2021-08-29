import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionIcon from "@material-ui/icons/Description";
import './book.css'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  CardActions,
  Paper,
  Radio,
  Grid,
  Avatar,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Snackbar,
} from "@material-ui/core";
import firebase from "../firebaseConfig/fbConfig";
import { Link } from "react-router-dom";
import { red } from "@material-ui/core/colors";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MediaBook() {
  const storage = firebase.storage();
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [currentId, setCurrentId] = useState();
  const[isSubmitDisable,setIsSubmitDisable] = useState(true)
  const [addBook, setAddBook] = useState({
    authorName: "",
    bookName: "",
    description: "",
    pdfLink: "",
    image: "",
    // createdAt: "",
    bookType: "free",
  });
  const [updateBook, setUpdateBook] = useState({
    authorName: "",
    bookName: "",
    description: "",
    pdfLink: "",
    image: "",
    bookType: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const deleteAlertOpen = (id) => {
    setCurrentId(id);
    setDeleteAlert(true);
  };

  const handleClose = () => {
   
 

    var checker = Object.keys(addBook).some(function (i) {
      return addBook[i] === "";
    });
    if(checker){
      alert('field empty')
    }else{
      addBooks();
      setOpen(false);
    }

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

  const updateUploadImage = (e) => {
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
          .then((url) => setUpdateBook({ ...updateBook, image: url }));
      }
    );
  };

  const updateUploadPdf = (e) => {
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
          .then((url) => setUpdateBook({ ...updateBook, pdfLink: url }));
      }
    );
  };

  const handleChange = (event) => {
    // setValue(event.target.value);
    let { name, value } = event.target;
    setAddBook({ ...addBook, [name]: value });
    console.log(`${name}iiiiiiiiiiiiiiiiiiiiiiiiiiiiii ${value}`);
  };

  const updateChange = (event) => {
    // setValue(event.target.value);
    let { name, value } = event.target;
    setUpdateBook({ ...updateBook, [name]: value });
    console.log(`${name}iiiiiiiiiiiiiiiiiiiiiiiiiiiiii ${value}`);
  };

  useEffect(() => {
    const db = firebase.firestore();
    return db.collection("books").onSnapshot((snapshot) => {
      const getBooks = [];
      snapshot.forEach((doc) => getBooks.push({ ...doc.data(), id: doc.id }));
      setBooks(getBooks);
      console.log(getBooks);
    });
  }, []);

  const alertClose = () => {
    setOpen(false);
    setDeleteAlert(false);
    setUpdateAlert(false);
  };

  // const addAlertClose = () =>{

  // }

  ///add book
  const addBooks = () => {
    firebase.firestore().collection("books").add({
      authorName: addBook.authorName,
      bookName: addBook.bookName,
      description: addBook.description,
      image: addBook.image,
      pdfLink: addBook.pdfLink,
      bookType: addBook.bookType,
      createdAt: Date(),
    });
    setOpen(false);
    console.log(Date());
  };

  /// delete book
  const bookDelete = () => {
    const db = firebase.firestore();
    db.collection("books").doc(currentId).delete();
    setDeleteAlert(false);
  };

  /// edit book

  const update = (id) => {
    ///current id for set data to firebase
    setCurrentId(id);
    const db = firebase.firestore();
    db.collection("books")
      .doc(id)
      .get()
      .then((snapshot) => {
        setUpdateBook({
          authorName: snapshot.data().authorName,
          bookName: snapshot.data().bookName,
          description: snapshot.data().description,
          pdfLink: snapshot.data().pdfLink,
          image: snapshot.data().image,
          bookType: snapshot.data().bookType,
        });
        var httpsReference = storage.refFromURL(snapshot.data().pdfLink).name;
        console.log("666666666666666666");
        console.log(httpsReference);
        console.log(snapshot.data().pdfLink);
      })
      .catch((e) => console.log(e));

    ///update alert open
    setUpdateAlert(true);
  };

  const bookUpdate = () => {
    ///add update
    const db = firebase.firestore();
    db.collection("books").doc(currentID).update({
      authorName: updateBook.authorName,
      bookName: updateBook.bookName,
      description: updateBook.description,
      pdfLink: updateBook.pdfLink,
      image: updateBook.image,
      bookType: updateBook.bookType,
    });

    ///update alert close
    setUpdateAlert(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          style={{
            borderColor: "#1F6DE2",
            color: "#1F6DE2",
            display: "flex",
            justifyContent: "flex-end",
          }}
          onClick={handleClickOpen}
        >
          + Add Book
        </Button>
      </div>

      <Grid container direction="row" justifyContent="flex-start" spacing={10}>
        {/* {JSON.stringify(updateData)} */}

        {books.map((item) => (
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia className={classes.media} image={item.image} />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className={classes.cardTitle}
                  >
                    {item.bookName}
                  </Typography>

                  <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className={classes.cardDescription}
                    >
                      {item.description}
                    </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={deleteAlertOpen.bind(this, item.id)}
                >
                  DELETE
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={update.bind(this, item.id)}
                >
                  EDIT
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* add alert */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={alertClose}
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

                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <FormControl component="fieldset">
           
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
               
              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{display: 'flex', justifyContent:'space-around'}}>
        <Button
                className={classes.submitButtonStyle}
                variant="contained"
                color="primary"
                onClick={handleClose}
                disabled={
                  isSubmitDisable}
              >
                Submit
              </Button>
              <Button
                className={classes.submitButtonStyle}
                variant="contained"
                color="primary"
                onClick={handleClose}
              
              >
                cancel
              </Button>
        </DialogActions>
      </Dialog>
      {/* finish add alert */}

      {/* delete alert */}
      <Dialog
        open={deleteAlert}
        TransitionComponent={Transition}
        keepMounted
        onClose={alertClose}
      >
        <DialogTitle>{"Are you sure want to delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Button
                    onClick={alertClose}
                    variant="contained"
                    style={{
                      background: "#1F6DE2",
                      width: "13%",
                      height: "55px",
                      color: "white",
                    }}
                  >
                    NO
                  </Button>

                  <Button
                    onClick={bookDelete}
                    variant="contained"
                    style={{
                      background: "#1F6DE2",
                      marginLeft: "47%",
                      width: "13%",
                      height: "55px",
                      color: "white",
                    }}
                  >
                    Yes
                  </Button>
                </Grid>
              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      {/* finish delete alert */}

      {/* edit alert */}

      <Dialog
        open={updateAlert}
        TransitionComponent={Transition}
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

                <Grid item xs={12}>
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
                </Grid>

                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      id="outlined-basic"
                      label="Description"
                      name="description"
                      value={updateBook.description}
                      onChange={updateChange}
                      variant="outlined"
                      style={{ width: "100%", marginLeft: "0%", margin: "1%" }}
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
                    <Link
                      to={`/book/preview/test`}
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
        </DialogContent>
        <DialogActions>
          <Button
            // onClick={handleClose}
            variant="contained"
            style={{
              background: "#1F6DE2",
              width: "100%",
              height: "55px",
              color: "white",
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* finish edit alert */}
    </>
  );
}
