import React from "react";
<<<<<<< HEAD
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, CssBaseline } from "@material-ui/core";
=======
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Typography,
  Hidden,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
>>>>>>> f53084082b52884c666e5951ee0d62c1b88413d4
import Article from "../Screens/Article";
import Query from "../Screens/Query";
import Book from "../Screens/Book";
import Video from "../Screens/Vedio";
<<<<<<< HEAD
import Appbar from "../component/AppBar";
import HiddenDrawer from "../component/Drawer";
=======
>>>>>>> f53084082b52884c666e5951ee0d62c1b88413d4

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
<<<<<<< HEAD
  root: {
    display: "flex",
  },
=======
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      background: "#ffffff",
      color: "black",
      boxShadow: "none",
    },
  },

>>>>>>> f53084082b52884c666e5951ee0d62c1b88413d4
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
<<<<<<< HEAD
=======
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
>>>>>>> f53084082b52884c666e5951ee0d62c1b88413d4
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
<<<<<<< HEAD
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
          <div className={classes.content}>
            <div className={classes.toolbar} />
            <Route exact path="/book">
              <Container>
=======
  drawerPaper: {
    width: drawerWidth,
  },
}));

function App(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            Astro Admin
          </Typography>
          <Box>
            <Button
              style={{
                background: "#1F6DE2",
                color: "white",
              }}
            >
              Log out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Router>
        <div style={{ display: "flex" }}>
          <Hidden>
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <List>
                <Link to="/" className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Article"} />
                  </ListItem>
                </Link>
                <Link to="/book" className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Book"} />
                  </ListItem>
                </Link>
                <Link to="/video" className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <SlowMotionVideoIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Video"} />
                  </ListItem>
                </Link>
                <Link to="/query" className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <AlternateEmailIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Query"} />
                  </ListItem>
                </Link>
              </List>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <List>
                <Link to="/" className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Article"} />
                  </ListItem>
                </Link>
                <Link to="/book" className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Book"} />
                  </ListItem>
                </Link>
                <Link to="/video" className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <SlowMotionVideoIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Video"} />
                  </ListItem>
                </Link>
                <Link to="/query" className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <AlternateEmailIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Query"} />
                  </ListItem>
                </Link>
              </List>
            </Drawer>
          </Hidden>
          <Switch>
            <Route exact path="/">
              <Container className={classes.content}>
                <div className={classes.toolbar} />
                <Article />
              </Container>
            </Route>
            <Route exact path="/book">
              <Container className={classes.content}>
                <div className={classes.toolbar} />
>>>>>>> f53084082b52884c666e5951ee0d62c1b88413d4
                <Book />
              </Container>
            </Route>
            <Route exact path="/video">
<<<<<<< HEAD
              <Container>
=======
              <Container className={classes.content}>
                <div className={classes.toolbar} />
>>>>>>> f53084082b52884c666e5951ee0d62c1b88413d4
                <Video />
              </Container>
            </Route>
            <Route exact path="/query">
<<<<<<< HEAD
              <Container>
                <Query />
              </Container>
            </Route>
          </div>
        </Switch>
      </Router>
    </div>
=======
              <Container className={classes.content}>
                <div className={classes.toolbar} />
                   <Query />
              </Container>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
>>>>>>> f53084082b52884c666e5951ee0d62c1b88413d4
  );
}

export default App;
