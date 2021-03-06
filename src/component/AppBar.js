import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      background: "#d6efff",
      color: "black",
      boxShadow: "none",
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
      background: "black",
    },
  },
}));

function Appbar({ handleDrawerToggle }) {
  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };
  const classes = useStyles();
  return (
    <div>
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

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px 0",
            }}
          >
            <img src="images/makarajothi_logo.svg" alt="" height="50" />{" "}
            <p style={{ fontSize: 25, margin: "0 10px", color: "black" }}>
              {" "}
              Makarajothi Admin
            </p>
          </div>
          <Box>
            <Button
              style={{
                background: "#1F6DE2",
                color: "white",
              }}
              onClick={logout}
            >
              Log out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Appbar;
