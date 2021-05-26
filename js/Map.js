import React, { useState, useEffect, useRef } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import PropTypes from "prop-types";

import mapStyles from "./mapStyles";
import { AddDarkSkySpotForm } from "./AddDarkSkySpotForm";
import { Spinner } from "./Spinner";
import { Message } from "./Message";

function Map({ spots }) {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [lat, setLat] = useState(50.064651);
  const [lng, setLng] = useState(19.944981);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedSpot(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });
  }, []);

  if (spots.length === 0) {
    return <Spinner />;
  }

  return (
    <>
      <GoogleMap
        defaultZoom={9}
        center={{ lat, lng }}
        defaultOptions={{ styles: mapStyles }}
      />
      <Marker position={{ lat, lng, }} />

      {spots.map((spot) => {
        const { type, id, lat, lng } = spot;

        return type === "spot" ? (
          <Marker
            key={id}
            position={{
              lat: lat,
              lng: lng,
            }}
            onClick={() => {
              setSelectedSpot(spot);
            }}
            icon={{
              url: `images/favicon/favicon-16x16.png`,
              scaledSize: new window.google.maps.Size(20, 20),
            }}
          />
        ) : (
          <Marker
            key={id}
            position={{
              lat: lat,
              lng: lng,
            }}
            onClick={() => {
              setSelectedSpot(spot);
            }}
            icon={{
              url: `images/favicon/star.png`,
              scaledSize: new window.google.maps.Size(20, 20),
            }}
          />
        )}
      )}

      {selectedSpot && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedSpot(null);
          }}
          position={{
            lat: selectedSpot.lat,
            lng: selectedSpot.lng,
          }}
        >
          <div>
            <h2>{selectedSpot.name}</h2>
            <p>
              <span style={{ fontWeight: "bold" }}>
                Szerokosc geograficzna:{" "}
              </span>
              {selectedSpot.lat} N
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Dlugosc geograficzna: </span>
              {selectedSpot.lng} E
            </p>
            <p>{selectedSpot.description}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function FinalMap() {
  const [spots, setSpots] = useState([]);
  const [spotAdded, setSpotAdded] = useState(false);
  const myRefForm = useRef(null);
  const API = "http://localhost:3000";

  useEffect(() => {
    fetch(`${API}/spots`)
      .then((response) => response.json())
      .then((response) => setSpots(response))
      .catch((error) => {
        console.log(
          "There was an error with fetching spots from json request: ",
          error
        );
      });
  }, []);

  const fetchAddedSpot = () => {
    fetch(`http://localhost:3000/spots`)
      .then((response) => response.json())
      .then((response) => {
        setSpots(response);
        setSpotAdded(true);
      })
      .catch((error) => {
        console.log(
          "There was an error with fetching `new spot added request`: ",
          error
        );
      });
  };

  useEffect(() => {
    const setTime = setTimeout(() => {
      setSpotAdded(false);
    }, 5000);
    return () => {
      clearTimeout(setTime);
    };
  }, [spotAdded]);

  const handleShowForm = () => {
    const formToShow = document.getElementById("add_spots_form");

    if (formToShow.classList.contains("hidden_form")) {
      formToShow.classList.remove("hidden_form");
    } else {
      formToShow.classList.add("hidden_form");
    }
    window.scrollTo({
      behavior: 'smooth',
      top: myRefForm.current.offsetTop
    });
  };

  const handleShowFormBtn = () => {
    const formToShow = document.getElementById("add_spots_form");

    if (formToShow.classList.contains("hidden_form")) {
      formToShow.classList.remove("hidden_form");
    } else {
      formToShow.classList.add("hidden_form");
    }
  };

  return (
    <>
      <div className="container button_container">
        <button onClick={handleShowForm} className="show_form_btn">
          Dodaj miejsce
        </button>
        <div className="map_container">
          {spotAdded && <Message />}
          <div style={{ width: "80vw", height: "88vh", position: "relative" }}>
            <MapWrapped
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              spots={spots}
            />
          </div>
        </div>
      </div>
      <div
        ref={myRefForm}
        id="add_spots_form"
        className="container hidden_form"
      >
        <AddDarkSkySpotForm
          fetchSpot={fetchAddedSpot}
          hideForm={handleShowFormBtn}
        />
      </div>
    </>
  );
}

Map.propTypes = {
  spots: PropTypes.array
};
