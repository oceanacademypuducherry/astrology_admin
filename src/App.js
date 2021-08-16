import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
