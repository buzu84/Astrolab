import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Index } from "./Index";
import { Astro } from "./Astro";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/astrolabium" component={Astro} />
        </Switch>
      </div>
    </Router>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
