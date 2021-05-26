import React from "react";
import PropTypes from "prop-types";

export const Features = ({ propRefFeatures }) => {
  return (
    <section
      ref={propRefFeatures}
      className="info-section container pl-30 pr-30"
    >
      <div className="info-item">
        <div className="info-box">
          <div className="icon">
            <i className="fas fa-check"></i>
          </div>
          <h2>Golym okiem</h2>
          <p>
            Znajdź miejsca o odpowiednich parametrach do oglądania nocnego
            nieba, możesz też dodać nowy punkt obserwacyjny do naszej bazy
            miejscówek...
          </p>
        </div>
        <div className="info-box">
          <div className="icon">
            <i className="far fa-clock"></i>
          </div>
          <h2>Meteoryty</h2>
          <p>
            Badz na biezaco z wydarzeniami na niebie, zaplanuj kiedy wybrać się
            na nocny spektakl deszczu meteorytow.
          </p>
        </div>
        <div className="info-box">
          <div className="icon">
            <i className="fas fa-align-left"></i>
          </div>
          <h2>A gdy pogoda nie dopisze..</h2>
          <p>
            Skorzystaj z bazy obserwatoriow astronomicznych w Twojej okolicy i
            wybierz się na ekscytujący seans z kosmosem...
          </p>
        </div>
      </div>
    </section>
  );
};

Features.propTypes = {
  propRefFeatures: PropTypes.shape({ current: PropTypes.any }),
};
