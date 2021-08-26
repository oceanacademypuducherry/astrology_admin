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
  Snackbar
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

  cardTitle : {
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Article() {
  const storage = firebase.storage();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [alert, setAlert] = useState(false);
 
  const [article, setArticle] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({
    name: "",
    image: "",
    description: "",
  });
  const [currentID, setCurrentID] = useState();

  const addUploadClick = (e) => {
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
          .then((url) => setUpdateData({...updateData, image: url}));
      }
    );
  };

  useEffect(() => {
    const db = firebase.firestore();
    return db.collection("test").orderBy("createdAt").onSnapshot((snapshot) => {
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
      .update({
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

  const addArticleClickOpen = () => {
    setOpen(true);
  };

  const onChangeArticle = (e) => {
    console.log(e.target.value);
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const addArticle = () => {
    ///add article
    firebase.firestore().collection("test").add({
      name: article.name,
      image: article.image,
      description: article.description,
      createdAt : Date(),
    });
    setOpen(false);
    console.log(Date());
  };

  const alertOpen = (image) => {
    setAlert(true);
    getArticleData(image);
    console.log(image);
  };

  const alertClose = () => {
    setAlert(false);
  };


  return (
    <>
      <div className={classes.addArticle}>
        <Button
          variant="outlined"
          style={{ borderColor: "#1F6DE2", color: "#1F6DE2" }}
          onClick={addArticleClickOpen}
        >
          + Add Article
        </Button>
      

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
                      name = "name"
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
                      name = "description"
                      id="outlined-basic"
                      label="Description"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={article.description}
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
      </div>  
      {/* article Design start */}
      <Grid container direction="row" justifyContent="flex-start" spacing={10}>
        {/* {JSON.stringify(updateData)} */}

        {data.map((item) => (
          <Grid item>
            <Card  className={classes.card}>
              <CardActionArea>
                <CardMedia className={classes.media} image={item.image} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle} >
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
                  onClick={update.bind(this, item.id)}>
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
