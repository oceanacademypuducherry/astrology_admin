import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, CssBaseline } from "@material-ui/core";
import Article from "../Screens/Article";
import Query from "../Screens/Query";
// import Book from "../Screens/Book";
import AddBook from '../Screens/BookNew/AddBook';
import AddVideos from "../Screens/video/AddVideos";
import Appbar from "../component/AppBar";
import HiddenDrawer from "../component/Drawer";
import SimpleModal from "./video/VideoPost";
import TransitionsModal from "./video/VideoPost";
import ArticleDetails from "./ArticleDetails";
import BookView from "./BookView";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar />
      <Router>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <HiddenDrawer />
        </nav>
        <Switch>
          <Route exact path="/">
            <Container className={classes.content}>
              <div className={classes.toolbar} />
              <Article />
            </Container>
          </Route>
          <Route exact path="/article/:id">
            <Container className={classes.content}>
              <div className={classes.toolbar} />
              <ArticleDetails />
            </Container>
          </Route>
          <div className={classes.content}>
            <div className={classes.toolbar} />
            <Route exact path="/book/:id">
              <Container>
                <AddBook />
              </Container>
            </Route>
            <Route exact path="/video/:id">
              <Container>
                <AddVideos />
              </Container>
            </Route>
            <Route exact path="/postVideo">
              <Container>
                <TransitionsModal />
              </Container>
            </Route>
            <Route exact path="/query">
              <Container>
                <Query />
              </Container>
            </Route>
            <Route exact path="/book/preview/:id">
              <Container>
                <BookView />
              </Container>
            </Route>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
