import React from "react";
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
import Article from "../Screens/Article";
import Query from "../Screens/Query";
import Book from "../Screens/Book";
import Video from "../Screens/Vedio";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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

  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
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
                <Book />
              </Container>
            </Route>
            <Route exact path="/video">
              <Container className={classes.content}>
                <div className={classes.toolbar} />
                <Video />
              </Container>
            </Route>
            <Route exact path="/query">
              <Container className={classes.content}>
                <div className={classes.toolbar} />
                   <Query />
              </Container>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
