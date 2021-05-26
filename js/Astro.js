import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import FinalMap from "./Map";
import { MeteorShowerDates } from "./MeteorShowerDates";
import { PicOfTheDay } from "./PicOfTheDay";

export const Astro = () => {
  const activeStyle = {
    color: "red",
  };

  return (
    <>
      <header className="header container">
        <h1 className="logo">
          <span>Astro</span>
          <span>Labium</span>
        </h1>
        <nav>
          <ul>
            <li>
              <NavLink
                activeStyle={activeStyle}
                activeClassName="active"
                className="nav_diff"
                exact
                to="/astrolabium"
              >
                MAPA
              </NavLink>
            </li>
            <li>
              <NavLink
                activeStyle={activeStyle}
                activeClassName="active"
                className="nav_diff"
                to="/astrolabium/picture"
              >
                NASA OBRAZEK DNIA
              </NavLink>
            </li>
            <li>
              <NavLink
                activeStyle={activeStyle}
                activeClassName="active"
                className="nav_diff"
                to="/astrolabium/calendar"
              >
                DESZCZ METEORYTÓW
              </NavLink>
            </li>
            <li>
              <NavLink
                activeStyle={activeStyle}
                activeClassName="active"
                className="nav_diff"
                exact
                to="/"
              >
                STRONA GŁÓWNA
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/astrolabium" component={FinalMap} />
        <Route path="/astrolabium/calendar" component={MeteorShowerDates} />
        <Route path="/astrolabium/picture" component={PicOfTheDay} />
      </Switch>
    </>
  );
};
