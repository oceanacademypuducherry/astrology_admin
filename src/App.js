import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Article from "./Screens/Article";
import Query from "./Screens/Query";
import Book from "./Screens/Book";
import Video from "./Screens/Vedio";
import ResponsiveDrawer from "./demo";

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <ResponsiveDrawer />
        </Switch>
      </Router>
    </div>
  );
}
