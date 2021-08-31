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
    boxShadow: "5px 5px #F5F5F5",
    backgroundColor: "#e6e6e6",
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Query() {
  const storage = firebase.storage();
  const classes = useStyles();
  const [addAlert, setAddAlertOpen] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [query, setQuery] = useState({
    question: "",
    pdfLink: "",
    queryImage: "",
    postId: "",
    answer: "",
  });
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({
    question: "",
    queryImage: "",
    pdfLink: "",
    postId: "",
    answer: "",
  });
  const [currentID, setCurrentID] = useState();

  const addUploadClick = (e) => {
    console.log(e.target.files[0].name);
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
          .then((url) => setQuery({ ...query, queryImage: url }));
      }
    );
  };
  const addpdfClick = (e) => {
    console.log(e.target.files[0].name);
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
          .then((url) => setQuery({ ...query, pdfLink: url }));
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
          .then((url) => setUpdateData({ ...updateData, queryImage: url }));
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
          .then((url) => setUpdateData({ ...updateData, pdfLink: url }));
      }
    );
  };

  useEffect(() => {
    const db = firebase.firestore();
    return db
      .collection("queries")
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
    db.collection("queries")
      .doc(id)
      .get()
      .then((snapshot) => {
        setUpdateData({
          question: snapshot.data().question,
          pdfLink: snapshot.data().pdfLink,
          queryImage: snapshot.data().queryImage,
          postId: snapshot.data().postId,
          answer: snapshot.data().answer,
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
    db.collection("queries").doc(currentID).update({
      question: updateData.question,
      postId: updateData.postId,
      queryImage: updateData.queryImage,
      pdfLink: updateData.pdfLink,
      answer: updateData.answer,
    });

    ///update alert close
    setUpdateAlert(false);
  };

  const queryDelete = (id) => {
    setCurrentID(id);
    setDeleteAlert(true);
  };

  const queryDeleteAlert = () => {
    const db = firebase.firestore();
    db.collection("queries").doc(currentID).delete();
    setCurrentID();
    setDeleteAlert(false);
  };

  const alertUpdate = (e) => {
    console.log(e.target.name, "//////////////////////// event name");
    console.log(e.target.value, "//////////////////////// event value");
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };
  const alertUpdatePostid = (e) => {
    console.log(e.target.name, "//////////////////////// event name");
    console.log(e.target.value, "//////////////////////// event value");
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const alertUpdateAnswer = (e) => {
    console.log(e.target.name, "//////////////////////// event name");
    console.log(e.target.value, "//////////////////////// event value");
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const onChangeQuery = (e) => {
    console.log(e.target.value);
    setQuery({ ...query, [e.target.name]: e.target.value });
  };
  const onChangePostid = (e) => {
    console.log(e.target.value);
    setQuery({ ...query, [e.target.name]: e.target.value });
  };
  const onChangeAnswer = (e) => {
    console.log(e.target.value);
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const addQuery = () => {
    ///add article
    firebase.firestore().collection("queries").add({
      question: query.question,
      queryImage: query.queryImage,
      pdfLink: query.pdfLink,
      postId: query.postId,
      answer: query.answer,
      createdAt: Date(),
    });
    setAddAlertOpen(false);
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
          onClick={() => setAddAlertOpen(true)}
        >
          + Add Query
        </Button>
      </div>

      {/* alert delete */}
      <Dialog
        open={deleteAlert}
        onClose={() => setDeleteAlert(false)}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>{"Are you sure want to delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Button
                    onClick={() => setDeleteAlert(false)}
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
                    onClick={queryDeleteAlert}
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
        open={addAlert}
        onClose={() => setAddAlertOpen(false)}
        TransitionComponent={Transition}
        keepMounted
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
                      name="postId"
                      id="outlined-basic"
                      label="post id"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={query.postId}
                      onChange={onChangePostid}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      name="answer"
                      id="outlined-basic"
                      label="answer"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={query.answer}
                      onChange={onChangeAnswer}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Avatar alt="Remy Sharp" src={query.queryImage} />
                    <input
                      type="file"
                      id="imageInput"
                      onChange={addUploadClick}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      type="file"
                      id="imageInput"
                      onChange={addpdfClick}
                    />
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
        onClose={() => setUpdateAlert(false)}
        TransitionComponent={Transition}
        keepMounted
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
                      value={updateData.question}
                      onChange={alertUpdate}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      name="postId"
                      id="outlined-basic"
                      label="postid"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={updateData.postId}
                      onChange={alertUpdatePostid}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      name="answer"
                      id="outlined-basic"
                      label="answer"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={updateData.answer}
                      onChange={alertUpdateAnswer}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Avatar alt="Remy Sharp" src={updateData.queryImage} />
                    <input
                      name="queryImage"
                      type="file"
                      id="imageInput"
                      onChange={updateUploadClick}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      name="pdfLink"
                      type="file"
                      id="imageInput"
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
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia className={classes.media} image={item.queryImage} />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className={classes.cardTitle}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.cardpdf}
                  >
                    {item.pdfLink}
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
        open= {updateData.image === ""  &&  true}
        onClose = {updateData.image != "" &&  false}
        // onClose={handleClose}
        message="Image uploaded"
        // key={vertical + horizontal}
      /> */}
      </Grid>
    </>
  );
}
