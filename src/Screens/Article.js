import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import {
  listArticles,
  createArticles,
  deleteArticle,
} from "../actions/ArticleActions";

import firebase from "../firebaseConfig/fbConfig";
import {
  Button,
  ButtonBase,
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
  Input
} from "@material-ui/core";
import img from "../Img/2.jpg";
import { CloudDownloadTwoTone, Delete, Edit } from "@material-ui/icons";

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
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [articleId, setArticleId] = useState("");
  const [fileUpload, setFileUpload] = useState("");
  const [url, setUrl] =useState("");

  const dispatch = useDispatch();

  ///article view all
  const articleList = useSelector((state) => state.articleList);
  const { loading, error, articles } = articleList;

  ///article delete
  const articleDelete = useSelector((state) => state.articleDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = articleDelete;

  /// article create

  const createArticle = useSelector((state) => state.createArticle);
  const { articleCreate, success, errorFailure } = createArticle;

  const firestore = firebase.firestore();
  const storage = firebase.storage();
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
    (snapshot) => {console.log(snapshot,'///////////////////////////////snapshots');},
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref("articles")
        .child(e.target.files[0].name)
        .getDownloadURL()
        .then((url) =>setUrl(url));
    }
  );
  };

  useEffect(() => {
    dispatch(listArticles());

    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(articles);
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose =  () => {
    setOpen(false);
     dispatch(
      createArticles({
        articleName: articleTitle,
        articleImage: url,
        content: articleDescription,
      }),
      // [dispatch]
    );

    console.log("succesfully");

    console.log(url, "//////////////////////////////////////////////url");

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

  return (
    <>
      <div className={classes.addArticle}>
        <Button
          variant="outlined"
          style={{ borderColor: "#1F6DE2", color: "#1F6DE2" }}
          onClick={handleClickOpen}
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
        onClose={handleClose}
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
                      id = "imageInput"
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
            onClick={handleClose}
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

      {/* {url} */}
      {/* article Design start */}
      <Grid container direction="row" justifyContent="flex-start" spacing={5}>
        {loading ? (
          <h1>loading...</h1>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          articles.map((article) => (
            <Grid item key={article.articleName}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={article.articleImage}
                    title={article.articleName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {article.articleName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className={classes.cardDescription}
                    >
                      {article.content}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" onClick={alertOpen.bind(this, article.articleImage)}>
                    DELETE
                  </Button>
                  <Button size="small" color="primary">
                    EDIT
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}
