import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const Menu = ({
  propScrollFeatures,
  propScrollAbout,
  propScrollContact,
}) => {
  return (
    <header className="header container">
      <h1 className="logo">
        <span>Astro</span>
        <span>Labium</span>
      </h1>
      <nav>
        <ul>
          <li>
            <Link className="nav_diff" to="/astrolabium">
              ZAPLANUJ WYCIECZKI
            </Link>
          </li>
          <li>
            <a onClick={propScrollFeatures}>DLACZEGO WARTO!</a>
          </li>
          <li>
            <a onClick={propScrollAbout}>CO TO DESZCZ METEORYTÓW?</a>
          </li>
          <li>
            <a onClick={propScrollContact}>KONTAKT</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

Menu.propTypes = {
  propScrollFeatures: PropTypes.func,
  propScrollAbout: PropTypes.func,
  propScrollContact: PropTypes.func,
};
