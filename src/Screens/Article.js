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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const articleReducer = (state, action) => {
  const firestore = firebase.firestore();
  switch (action.type) {
    case "ADD":
      return firestore.collection("test").add({
        name: action.name,
        image: action.image,
        description: action.description,
      });

    default:
      return state;
      console.log(state);
  }
};

const articleEditReducer = (articleEditState, action) => {
  const firestore = firebase.firestore();
  switch (action.type) {
    case "EDIT":
      console.log(action.name, "/////action");
      firestore
        .collection("test")
        .where("name", "==", action.name)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            console.log(doc.id);
            console.log(doc.data());
          });
        });
      console.log(articleEditState, "/////////////////////state");

      return articleEditState;

    default:
      return state;
  }
};

export default function Article() {
  const firestore = firebase.firestore();
  const storage = firebase.storage();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [alert, setAlert] = useState(false);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [articleId, setArticleId] = useState("");
  const [fileUpload, setFileUpload] = useState("");
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({
    name: "",
    image: "",
    description: "",
  });
  const [currentID, setCurrentID] = useState();
  const [state, dispatch] = useReducer(articleReducer, [data]);
  const [articleEditState, articleEditDispatch] = useReducer(
    articleEditReducer,
    []
  );

  /// this is used to take the documnet id
  function getArticleData(imageData) {
    console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    firestore
      .collection("articles")
      .where("articleImage", "==", imageData)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          setArticleId(doc.id);
        });
      });
  }

  const handleUploadClick = (e) => {
    setFileUpload(e.target.files[0]);
    // console.log(e.target.files[0], "file picked /////////////////////////////////////////");
    var upload = storage
      .ref(`articles/${e.target.files[0].name}`)
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
          .ref("articles")
          .child(e.target.files[0].name)
          .getDownloadURL()
          .then((url) => setUrl(url));
      }
    );
  };

  useEffect(() => {
    const db = firebase.firestore();
    return db.collection("test").onSnapshot((snapshot) => {
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
    db.collection("test")
      .doc(id)
      .get()
      .then((snapshot) => {
        setUpdateData({
          name: snapshot.data().name,
          description: snapshot.data().description,
          image: snapshot.data().image,
        });
        console.log(snapshot.data());
      })
      .catch((e) => console.log(e));
    console.log("/////////////////update", id);

    ///update alert open
    setUpdateAlert(true);
  };

  const articleUpdate = () => {
    ///add update
    const db = firebase.firestore();
    db.collection("test")
      .doc(currentID)
      .set({
        name: updateData.name,
        image: updateData.image,
        description: updateData.description,
      });

    ///update alert close
    setUpdateAlert(false);
  };

  const articleDelete = (id) => {
    const db = firebase.firestore();
    db.collection("test").doc(id).delete();
  };

  const alertUpdate = (e) => {
    console.log(e.target.name, "//////////////////////// event name");
    console.log(e.target.value, "//////////////////////// event value");
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const articleHandleClickOpen = () => {
    setOpen(true);
  };

  const articleHandleClose = () => {
    setOpen(false);
    ///add article
    dispatch({
      type: "ADD",
      name: articleTitle,
      image: url,
      description: articleDescription,
    });
  };

  const alertOpen = (image) => {
    setAlert(true);
    getArticleData(image);
    console.log(image);
  };

  const alertClose = () => {
    setAlert(false);
    console.log("before delete calla");
    dispatch(deleteArticle(articleId));
  };

  const articleEditAlertOpen = (image) => {
    setOpen(true);
    getArticleData(image);
    console.log(
      image,
      "///////////////////get edit image id //////////////////"
    );
    dispatch(editArticle(articleId));
  };

  return (
    <>
      <div className={classes.addArticle}>
        <Button
          variant="outlined"
          style={{ borderColor: "#1F6DE2", color: "#1F6DE2" }}
          onClick={articleHandleClickOpen}
        >
          + Add Article
        </Button>
      </div>

      {/* alert delete */}
      <Dialog
        open={alert}
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
        onClose={open}
      >
        <DialogTitle>Article</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      id="outlined-basic"
                      label="Title"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={articleEditState.name}
                      onChange={(e) => setArticleTitle(e.target.value)}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      id="outlined-basic"
                      label="Image"
                      variant="outlined"
                      style={{ width: "85%", margin: "1%" }}
                    />
                    <input
                      type="file"
                      id="imageInput"
                      onChange={handleUploadClick}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      id="outlined-basic"
                      label="Description"
                      variant="outlined"
                      style={{ width: "100%" }}
                      onChange={(e) => setArticleDescription(e.target.value)}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={articleHandleClose}
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
        <DialogTitle>Article</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      name="name"
                      id="outlined-basic"
                      label="Title"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={updateData.name}
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
                      onChange={handleUploadClick}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      id="outlined-basic"
                      label="Description"
                      variant="outlined"
                      name="description"
                      value={updateData.description}
                      style={{ width: "100%" }}
                      // maxLength={12}
                      onChange={alertUpdate}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={articleUpdate}
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
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.name}
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
                  onClick={articleDelete.bind(this, item.id)}
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
    </>
  );
}
