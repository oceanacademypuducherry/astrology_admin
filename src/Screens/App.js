import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, CssBaseline } from "@material-ui/core";
import Article from "../Screens/Article";
import Query from "../Screens/Query";
// import Book from "../Screens/Book";
import SeeAllMeeting from "./Zoom/SeeAllMeeting"
import AddBook from "../Screens/BookNew/AddBook";
import AddVideos from "../Screens/video/AddVideos";
import Appbar from "../component/AppBar";
import HiddenDrawer from "../component/Drawer";
import SimpleModal from "./video/VideoPost";
import TransitionsModal from "./video/VideoPost";
import ArticleDetails from "./ArticleDetails";
import BookView from "./BookView";
import Zoom from "./Zoom/Zoom";
import UnrestrictTime from "./Zoom/UnrestrictTime"
import Login from "./Login";
import BookingDetails from "../Screens/Zoom/BookingDetails";
import Product from "./product/Product";
import AddProduct from "./product/AddProduct";
import SeeAllProducts from "./product/SeeAllProducts";
import EditProduct from "./product/EditProduct";
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
  const suma = true;
  const gettingValue = JSON.parse(localStorage.getItem("MYADM"));
  // useEffect(() => {
  //   if(gettingValue === null){
  //     window.location = '/login'
  //   }
  // return () =>{}
  // console.log('99999999999999999999')
  // },[suma])

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
            <Route exact path="/zoom">
              <Container>
                <Zoom />
              </Container>
            </Route>
            <Route exact path="/product">
              <Container>
                <Product />
              </Container>
            </Route>
            <Route exact path="/add/product">
              <Container>
                <AddProduct />
              </Container>
            </Route>
            <Route exact path="/seeAll/products">
              <Container>
                <SeeAllProducts />
              </Container>
            </Route>
            <Route exact path="/edit/products/:docId">
              <Container>
                <EditProduct />
              </Container>
            </Route>
            <Route exact path="/book/preview/:id">
              <Container>
                <BookView />
              </Container>
            </Route>
            <Route exact path="/unrestrict">
                <Container>
                <UnrestrictTime />
                </Container>
            </Route>
            
            <Route exact path="/See all meeting">
                <Container>
                <SeeAllMeeting />
                </Container>
            </Route>

            <Route exact path="/zoom/:id">
              <Container>
                <BookingDetails />
              </Container>
            </Route>
           
            <Route exact path="/login">
              <Container className={classes.content}>
                <div className={classes.toolbar} />
                <Login />
              </Container>
            </Route>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
