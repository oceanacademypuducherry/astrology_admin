import React, { useState, useEffect, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../firebaseConfig/fbConfig";
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
  Grid,
  Avatar,
  Snackbar,
} from "@material-ui/core";
// import { CloudDownloadTwoTone, Delete, Edit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 300,
    height: 420,
  },
  media: {
    height: 240,
    maxWidth: 300,
  },
  cardTitle: {
    fontSize: "20px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "30px",
  },

  cardPdf: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "60px",
  },
  addQuery: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "space-between",
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Query() {
  const storage = firebase.storage();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [alert, setAlert] = useState(false);
  const [query, setQuery] = useState({
    question: "",
    pdf: "",
    image: "",
  });
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({
    question: "",
    image: "",
    pdf: "",
  });
  const [currentID, setCurrentID] = useState();

  const addUploadClick = (e) => {
    var upload = storage
      .ref(`querys/${e.target.files[0].name}`)
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
          .ref("querys")
          .child(e.target.files[0].name)
          .getDownloadURL()
          .then((url) => setQuery({ ...query, image: url }));
      }
    );
  };
  const addPdfClick = (e) => {
    var upload = storage
      .ref(`querys/${e.target.files[0].name}`)
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
          .ref("querys")
          .child(e.target.files[0].name)
          .getDownloadURL()
          .then((url) => setQuery({ ...query, pdf: url }));
      }
    );
  };
  const updateUploadClick = (e) => {
    var upload = storage
      .ref(`querys/${e.target.files[0].name}`)
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
          .ref("querys")
          .child(e.target.files[0].name)
          .getDownloadURL()
          .then((url) => setUpdateData({ ...updateData, image: url }));
      }
    );
  };

  const updatepdfClick = (e) => {
    var upload = storage
      .ref(`querys/${e.target.files[0].name}`)
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
          .ref("querys")
          .child(e.target.files[0].name)
          .getDownloadURL()
          .then((url) => setUpdateData({ ...updateData, pdf: url }));
      }
    );
  };

  useEffect(() => {
    const db = firebase.firestore();
    return db
      .collection("test2")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        const getData = [];
        snapshot.forEach((doc) => getData.push({ ...doc.data(), id: doc.id }));
        console.log(getData, "//////////////////////");
        setData(getData);
      });
  }, []);

  const update = (id) => {
    ///current id for set data to firebase
    setCurrentID(id);
    const db = firebase.firestore();
    db.collection("test2")
      .doc(id)
      .get()
      .then((snapshot) => {
        setUpdateData({
          question: snapshot.data().question,
          pdf: snapshot.data().pdf,
          image: snapshot.data().image,
        });
        console.log(snapshot.data());
      })
      .catch((e) => console.log(e));
    console.log("/////////////////update", id);

    ///update alert open
    setUpdateAlert(true);
  };

  const queryUpdate = () => {
    ///add update
    const db = firebase.firestore();
    db.collection("test2").doc(currentID).update({
      question: updateData.question,
      image: updateData.image,
      pdf: updateData.pdf,
    });

    ///update alert close
    setUpdateAlert(false);
  };

  const queryDelete = (id) => {
    const db = firebase.firestore();
    db.collection("test2").doc(id).delete();
  };

  const alertUpdate = (e) => {
    console.log(e.target.name, "//////////////////////// event name");
    console.log(e.target.value, "//////////////////////// event value");
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const addQueryClickOpen = () => {
    setOpen(true);
  };
  const addQueryClickClose = () => {
    setOpen(false);
  };

  const onChangeQuery = (e) => {
    console.log(e.target.value);
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const addQuery = () => {
    ///add article
    firebase.firestore().collection("test2").add({
      question: query.question,
      image: query.image,
      pdf: query.pdf,
      createdAt: Date(),
    });
    setOpen(false);
    console.log(Date());
  };

  const alertOpen = (image) => {
    setAlert(true);
    getQueryData(image);
    console.log(image);
  };

  const alertClose = () => {
    setAlert(false);
  };

  return (
    <>
      <div className={classes.addQuery}>
        <Button
          variant="outlined"
          style={{ borderColor: "#1F6DE2", color: "#1F6DE2" }}
          onClick={addQueryClickOpen}
        >
          + Add Query
        </Button>
      </div>
      

      {/* alert delete */}
      <Dialog
        open={alert}
        TransitionComponent={Transition}
        keepMounted
        onClose={addQueryClickClose}
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
                    onClick={alertClose}
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

      {/* add article */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={addQueryClickClose}
      >
        <DialogTitle>Query</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      name="question"
                      id="outlined-basic"
                      label="Question"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={query.question}
                      onChange={onChangeQuery}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      className={classes.file}
                      name="question"
                      type="file"
                      variant="outlined"
                      style={{ width: "85%" }}
                      onChange={addUploadClick}
                    />
                    <Avatar
                      alt="Remy Sharp"
                      src={query.image}
                      style={{
                        width: "10%",
                        height: "10%",
                      }}
                    />

                    {/* <input type="file" onChange={addUploadClick} /> */}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      name="question"
                      type="file"
                      variant="outlined"
                      style={{ width: "100%" }}
                      onChange={addPdfClick}
                    />
                    {/* <input type="file" onChange={addPdfClick} /> */}
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={addQuery}
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

      {/* Update article */}
      <Dialog
        open={updateAlert}
        TransitionComponent={Transition}
        keepMounted
        onClose={updateAlert}
      >
        <DialogTitle>Query</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      name="question"
                      id="outlined-basic"
                      label="question"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={updateData.question}
                      onChange={alertUpdate}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Avatar alt="Remy Sharp" src={updateData.image} />
                    <input
                      name="image"
                      type="file"
                      id="imageInput"
                      onChange={updateUploadClick}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <input
                      name="Answer Pdf"
                      type="file"
                      onChange={updatepdfClick}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={queryUpdate}
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

      {/* article Design start */}
      <Grid container direction="row" justifyContent="flex-start" spacing={10}>
        {/* {JSON.stringify(updateData)} */}
        {data.map((item) => (
          <Grid item>
            <Card gutterBottom className={classes.card}>
              <CardActionArea>
                <CardMedia className={classes.media} image={item.image} />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className={classes.cardTitle}
                  >
                    {item.question}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={queryDelete.bind(this, item.id)}
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
        {/* <Snackbar
          // anchorOrigin={{ vertical, horizontal }}
          open={false}
          // onClose={handleClose}
          message="Image uploaded"
          // key={vertical + horizontal} */}
        {/* /> */}
      </Grid>
    </>
  );
}
