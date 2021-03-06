import {
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DuoIcon from "@material-ui/icons/Duo";
import Appbar from "./AppBar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default function HiddenDrawer(props) {
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
    <div>
      <div className={classes.toolbar} />
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
            <Link to="/video/free" className={classes.link}>
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
            <Link to="/zoom" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <DuoIcon />
                </ListItemIcon>
                <ListItemText primary={"Zoom"} />
              </ListItem>
            </Link>
            <Link to="/seeAll/products" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary={"Product"} />
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
            <Link to="/book/free" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <MenuBookIcon />
                </ListItemIcon>
                <ListItemText primary={"Book"} />
              </ListItem>
            </Link>
            <Link to="/video/free" className={classes.link}>
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
            <Link to="/zoom" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <DuoIcon />
                </ListItemIcon>
                <ListItemText primary={"zoom"} />
              </ListItem>
            </Link>
            <Link to="/seeAll/products" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary={"Product"} />
              </ListItem>
            </Link>
          </List>
        </Drawer>
      </Hidden>
      <Appbar handleDrawerToggle={handleDrawerToggle} />
    </div>
  );
}
