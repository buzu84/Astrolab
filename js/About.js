import React from "react";
import PropTypes from "prop-types";

export const About = ({ propRefAbout }) => {
  return (
    <section ref={propRefAbout} className="about_me container pl-30 pr-30">
      <div className="container_me">
        <div className="author_pic" />
        <div className="author_description">
          <p>
            Meteor jest skałą kosmiczną, która wchodzi w atmosferę Ziemi. Gdy
            opada w kierunku Ziemi, opór - lub opór powietrza na skale powoduje,
            że jest ona wyjątkowo gorąca. To, co widzimy, to „spadająca
            gwiazda”. Ta jasna smuga jest świecącym gorącym powietrzem, gdy
            gorąca skała przechodzi przez atmosferę. Kiedy Ziemia napotyka wiele
            meteoroidów naraz, nazywamy ją deszczem meteorów. Gdy kometa zbliża
            się do słońca, część jej lodowatej powierzchni odparowuje,
            uwalniając wiele cząstek pyłu i skał. Szczątki tej komety rozsypują
            się wzdłuż ścieżki komety, szczególnie w wewnętrznym układzie
            słonecznym (tam, gdzie żyjemy). Kilka razy w roku, gdy Ziemia
            podróżuje wokół Słońca, jej orbita przecina orbitę komety, co
            oznacza, że Ziemia uderza w szczątki komety...
          </p>
        </div>
      </div>
    </section>
  );
};

About.propTypes = {
  propRefAbout: PropTypes.shape({ current: PropTypes.any }),
};
