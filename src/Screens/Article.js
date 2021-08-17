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
} from "@material-ui/core";
import img from "../Img/2.jpg";
import { CloudDownloadTwoTone, Delete, Edit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  inputRoot: {
    display: "flex",
    flexDirection: "row",
  },
  inputPaper: {
    padding: theme.spacing(2),
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
  const [articleImage, setArticleImage] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [fileUpload, setFileUpload] = useState("");

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
          setUserDetails(doc.id);
        });
      });
  }

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
      setFileUpload( event.target.files[0]);
     console.log(event.target.files[0], "url///////////////////////////");
  }

  useEffect(() => {
    dispatch(listArticles());

    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(articles);
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(
      createArticles({
        articleTitle: articleTitle,
        articleImage: articleImage,
        content: articleDescription,
      }),
      [dispatch]
    );
    console.log("succesfully");
  };

  const alertOpen = (image) => {
    setAlert(true);
    getArticleData(image);
    console.log(image);
  };

  const alertClose = () => {
    setAlert(false);

    console.log(articleSelectedid);

    console.log("before delete calla");

    dispatch(deleteArticle(userDetails));
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
          style={{ borderColor: "#1F6DE2", color: "#1F6DE2" }}
          onClick={handleClickOpen}
        >
          + Add Article
        </Button>
        {/* {loading ? <h1>loading</h1> : error ? <h1>error</h1> :articles.map(article =>(
          <h1>{article.articleName}</h1>
        ))} */}

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

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
        >
          <DialogTitle>{"Article"}</DialogTitle>
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
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
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
      </div>

      {loading ? (
        <h1>loading</h1>
      ) : error ? (
        <h1>error</h1>
      ) : (
        articles.map((article) => (
          <div className={classes.inputRoot}>
            <Paper className={classes.inputPaper}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <img
                      className={classes.img}
                      alt="complex"
                      src={article.articleImage}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container style={{ marginTop: "8%" }}>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {article.articleName}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Description
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <div
                style={{
                  textAlign: "end",
                }}
              >
                <Button>
                  <Delete
                    style={{ borderColor: "#1F6DE2", color: "#1F6DE2" }}
                    onClick={alertOpen.bind(this, article.articleImage)}
                  />
                </Button>
                <Button>
                  <Edit style={{ borderColor: "#1F6DE2", color: "#1F6DE2" }} />
                </Button>
              </div>
            </Paper>
          </div>
        ))
      )}
    </>
  );
}
