import React from "react";
import { Link } from "react-router-dom";

export const CallToAction = () => {
  return (
    <section className="calltoaction container pl-30 pr-30">
      <div>
        <h2>Astrolabium</h2>
        <p>Aplikacja do planowania obserwacji nocnego nieba!</p>
      </div>
      <Link to="/astrolabium">
        <button className="generalButton">Uruchom aplikacje</button>
      </Link>
    </section>
  );
};

export default CallToAction;
