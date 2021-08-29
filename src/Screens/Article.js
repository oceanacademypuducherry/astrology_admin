import React, { useState, useEffect, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../firebaseConfig/fbConfig";
import { Link } from "react-router-dom";
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
import ArticleDetails from "./ArticleDetails";
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
    fontSize: "18px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "30px",
    color: "grey",
    fontWeight: "500",
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

export default function Article() {
  const storage = firebase.storage();
  const classes = useStyles();
  const [addAlert, setAddAlertOpen] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [article, setArticle] = useState({
    name: "",
    description: "",
    postId: "",
    image: "",
    link: "",
  });
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({
    name: "",
    image: "",
    description: "",
  });
  const [currentID, setCurrentID] = useState();

  const addUploadClick = (e) => {
    console.log(e.target.files[0].name);
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
          .then((url) => setArticle({ ...article, image: url }));
      }
    );
  };

  const addPdfUploadClick = (e) => {
    console.log(e.target.files[0].name);
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
          .then((url) => setArticle({ ...article, link: url }));
        // console.log(url);
      }
    );
  };

  const updateUploadClick = (e) => {
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
          .then((url) => setUpdateData({ ...updateData, image: url }));
      }
    );
  };

  useEffect(() => {
    const db = firebase.firestore();
    return db
      .collection("articles")
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
    db.collection("articles")
      .doc(id)
      .get()
      .then((snapshot) => {
        setUpdateData({
          name: snapshot.data().articleName,
          description: snapshot.data().content,
          image: snapshot.data().articleImage,
          link: snapshot.data().link,
        });
        console.log(snapshot.data());
      })
      .catch((e) => console.log(e));
    console.log("/////////////////update", id);

    ///update alert open
    setUpdateAlert(true);
  };

  const articleUpdate = () => {
    ///update
    const db = firebase.firestore();
    db.collection("articles").doc(currentID).update({
      articleName: updateData.name,
      articleImage: updateData.image,
      content: updateData.description,
      link: updateData.link,
    });

    setCurrentID();

    ///update alert close
    setUpdateAlert(false);
  };

  const articleDelete = (id) => {
    setCurrentID(id);
    setDeleteAlert(true);
  };

  const articleDeleteAlert = () => {
    const db = firebase.firestore();
    db.collection("articles").doc(currentID).delete();
    setCurrentID();
    setDeleteAlert(false);
  };

  const alertUpdate = (e) => {
    console.log(e.target.name, "//////////////////////// event name");
    console.log(e.target.value, "//////////////////////// event value");
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const onChangeArticle = (e) => {
    console.log(e.target.value);
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const addArticle = () => {
    ///add article
    firebase.firestore().collection("articles").add({
      articleName: article.name,
      articleImage: article.image,
      content: article.description,
      postId: article.postId,
      link: article.link,
      createdAt: Date(),
    });

    setArticle({ name: "", description: "", image: "" });
    ///add alert close
    setAddAlertOpen(false);
    console.log(Date());
    ///clearing precious data in state
  };

  return (
    <>
      <div className={classes.addArticle}>
        <Button
          variant="outlined"
          style={{ borderColor: "#1F6DE2", color: "#1F6DE2" }}
          onClick={() => setAddAlertOpen(true)}
        >
          + Add Article
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
                    variant="outlined"
                    style={{
                      background: "#1F6DE2",
                      width: "13%",
                      height: "55px",
                      color: "white",
                      marginLeft: "25px",
                    }}
                  >
                    NO
                  </Button>

                  <Button
                    onClick={articleDeleteAlert}
                    variant="contained"
                    style={{
                      backgroundColor: "rgba(255, 0, 0, 0.8)",
                      marginLeft: "60px",
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
        <DialogTitle>Add Article</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Avatar alt="Remy Sharp" src={article.image} />
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
                      name="name"
                      id="outlined-basic"
                      label="Title"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={article.name}
                      onChange={onChangeArticle}
                    />
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      name="description"
                      id="outlined-basic"
                      label="Description"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={article.description}
                      onChange={onChangeArticle}
                    />
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      name="postId"
                      id="outlined-basic"
                      label="Post Id"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={article.postId}
                      onChange={onChangeArticle}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={addArticle}
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
                      onChange={updateUploadClick}
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
        {data.map((item) => (
          <Grid item>
            <Card className={classes.card}>
              <Link
                to={`article/${item.id}`}
                style={{ textDecoration: "none", color: "#6996FF" }}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={item.articleImage}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className={classes.cardTitle}
                    >
                      {item.articleName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className={classes.cardDescription}
                    >
                      {item.content}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
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
