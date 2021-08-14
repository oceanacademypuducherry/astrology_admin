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
      <ResponsiveDrawer />
      <Router>
        <Route path="/" exact component={Article} />
        <Route path="/query" exact component={Query} />
        <Route path="/video" exact component={Video} />
        <Route path="/video" exact component={Video} />
        <Route path="/book" exact component={Book} />
      </Router>
    </div>
  );
}
