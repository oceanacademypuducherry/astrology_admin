import React, { useState ,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from 'react-redux'
import { listArticles,createArticles} from '../actions/ArticleActions'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Article() {

  const dispatch = useDispatch()

///article view
  const articleList = useSelector(state => state.articleList)
  const { loading, error, articles} = articleList

  /// article crrate

  const createArticle = useSelector(state => state.createArticle)
  const { article,success,errorFailure} = createArticle


    useEffect(() => {
      
      console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
          dispatch(listArticles())

          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
  console.log(articles);  
}, [dispatch])

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleImage, setArticleImage] = useState("");
  const [articleDescription, setArticleDescription] = useState("");

  const handleClickOpen = () => {
    setOpen(true);


  };

  const handleClose = () => {
    setOpen(false);
    dispatch(
      createArticles({
        'articleTitle': articleTitle,
        'articleImage': articleImage,  
        'content': articleDescription,
      }))
      console.log('succesfully')
  };

  return (
    <>
      <div>
        <Button
          variant="outlined"
          color="primary"
          style={{
            marginLeft: "90%",
          }}
          onClick={handleClickOpen}
        >
          + Add Article
        </Button>
        {loading ? <h1>loading</h1> : error ? <h1>error</h1> :articles.map(article =>(
          <h1>{article.articleName}</h1>
        ))}
        
        
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
                      <Button
                        variant="contained"
                        style={{
                          background: "#1F6DE2",
                          width: "13%",
                          height: "55px",
                          marginTop: "1%",
                        }}
                      >
                        Choose
                      </Button>
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
    </>
  );
}
