import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Article from "./Screens/Article";
import Query from "./Screens/Query";
import Video from "./Screens/Vedio";
import Book from "./Screens/Book";
import {
  Assignment,
  AlternateEmailSharp,
  SlowMotionVideoSharp,
  MenuBook,
} from "@material-ui/icons";
import { Link, BrowserRouter as Route, Switch, Router } from "react-router-dom";
import Vedio from "./Screens/Vedio";

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
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      background: "#F4F4F4",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: { textDecoration: "none", color: theme.palette.text.primary },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [route, setRoute] = useState(1);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const routerPath1 = () => {
    setRoute(1);
  };

  const routerPath2 = () => {
    setRoute(2);
  };

  const routerPath3 = () => {
    setRoute(3);
  };

  const routerPath4 = () => {
    setRoute(4);
  };

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <List>
        <Route>
          <Link to="/" exact className={classes.link}>
            <ListItem button onClick={routerPath1}>
              <ListItemIcon>
                <Assignment />
              </ListItemIcon>
              <ListItemText primary={"Article"} />
            </ListItem>
          </Link>
        </Route>
        <Route>
          <Link to="/query" className={classes.link}>
            <ListItem button onClick={routerPath2}>
              <ListItemIcon>
                <AlternateEmailSharp />
              </ListItemIcon>
              <ListItemText primary={"Queries"} />
            </ListItem>
          </Link>
        </Route>
        <Route>
          <Link to="/vedio" className={classes.link}>
            <ListItem button onClick={routerPath3}>
              <ListItemIcon>
                <SlowMotionVideoSharp />
              </ListItemIcon>
              <ListItemText primary={"Videos"} />
            </ListItem>
          </Link>
        </Route>
        <Route>
          <Link to="/book" className={classes.link}>
            <ListItem button onClick={routerPath4}>
              <ListItemIcon>
                <MenuBook />
              </ListItemIcon>
              <ListItemText primary={"Book"} />
            </ListItem>
          </Link>
        </Route>
      </List>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="transparent"
        style={{ boxShadow: "0px 0px 0px 0px" }}
        className={classes.appBar}
      >
        <Toolbar>
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
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
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
            {drawer}
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
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {route == 1 ? (
          <Article />
        ) : route == 2 ? (
          <Query />
        ) : route == 3 ? (
          <Vedio />
        ) : route == 4 ? (
          <Book />
        ) : null}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
