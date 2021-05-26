import React, { useState, useEffect } from "react";
import { Spinner } from "./Spinner";

export const MeteorShowerDates = () => {
  const [events, setEvents] = useState([]);
  const API = "http://localhost:3000";

  useEffect(() => {
    fetch(`${API}/events`)
      .then((response) => response.json())
      .then((response) => setEvents(response))
      .catch((error) => {
        console.log(
          "There was an error with the Meteor shower dates request: ",
          error
        );
      });
  }, []);

  const handleShowDescription = (id) => {
    const eventToShow = document.getElementById(`description_${id}`);
    if (eventToShow.classList.contains("hidden_desc")) {
      eventToShow.classList.remove("hidden_desc");
    } else {
      eventToShow.classList.add("hidden_desc");
    }
  };
  if (events === []) {
    return <Spinner />;
  }
  return (
    <div className="container met_shower_dates">
      <ul>
        {events.map((event) => {
          return (
            <li className="event_element" key={event.id}>
              <h2 className="event_name">
                <img src="images/favicon/star.png" className="pr-30" />
                {event.date} {event.name}
              </h2>
              <p className="peak_hour">
                Godzina szczytu roju meteorytów {event.peakHour} (ECT)
              </p>
              <input
                type="submit"
                value="Pokaż/ukryj opis"
                className="description_button"
                onClick={(e) => handleShowDescription(event.id, e)}
              />
              <p
                id={`description_${event.id}`}
                className="hidden_desc img_desc"
              >
                {event.description}
                {event.source ? (
                  <img
                    className="gradient_picture"
                    src={event.source}
                    alt={event.name}
                  />
                ) : null}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
