import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

export const AddDarkSkySpotForm = ({ hideForm, fetchSpot }) => {
  const [formState, setFormState] = useState({
    name: "",
    lat: "",
    lng: "",
    description: "",
    type: "",
  });
  const [errors, setErrors] = useState([]);
  const myErrorRef = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top: myErrorRef.current.offsetTop + myErrorRef.current.clientHeight,
      behavior: 'smooth'
    });
  }, [errors]);

  const handleInputChange = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  }


  const validate = () => {
    const { name, lat, lng, description, type } = formState;

    const validationErrors = [];
    const letters = /(?!^\d+$)^.+$/;
    if (!name || name.length < 5 || !name.match(letters)) {
      validationErrors.push("Nazwa powinna składać się z min. 5 znaków!");
    }
    console.log(lat);
    if (!lat || isNaN(lat) || !(lat >= -90 && lat <= 90)) {
      validationErrors.push(
        "Podaj szerokość w prawidłowym zasiegu(-90 do 90)!"
      );
    }
    if (!lng || isNaN(lng) || !(lng >= -180 && lng <= 180)) {
      validationErrors.push(
        "Podaj długość w prawidłowym zasiegu(-180 do 180)!"
      );
    }
    if (
      !description ||
      description.length <= 10 ||
      description.length > 200 ||
      !description.match(letters)
    ) {
      validationErrors.push(
        "Dodaj opis składający się z min. 10 znaków i maksymalnie 200!"
      );
    }
    if (!type) {
      validationErrors.push("Wybierz rodzaj miejsca!");
    }
    return validationErrors;
}

  // const [name, setName] = useState("");
  // const [lat, setLat] = useState("");
  // const [lng, setLng] = useState("");
  // const [description, setDescription] = useState("");
  // const [type, setType] = useState("");




  // const handleNameChange = (e) => {
  //   setName(e.target.value);
  // };
  // const handleLatChange = (e) => {
  //   setLat(e.target.value);
  // };
  // const handleLngChange = (e) => {
  //   setLng(e.target.value);
  // };
  // const handleDescriptionChange = (e) => {
  //   setDescription(e.target.value);
  // };
  // const handleTypeChange = (e) => {
  //   setType(e.target.value);
  // };
  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors.length !== 0) {
      setErrors(validationErrors);
    } else {
      createSpot();
      if (typeof hideForm === "function") {
        hideForm();
      }
    }
  };
  // const validate = () => {
  //   const validationErrors = [];
  //   const letters = /(?!^\d+$)^.+$/;
  //   if (!name || name.length < 5 || !name.match(letters)) {
  //     validationErrors.push("Nazwa powinna składać się z min. 5 znaków!");
  //   }
  //   if (!lat || isNaN(lat) || !(lat >= -90 && lat <= 90)) {
  //     validationErrors.push(
  //       "Podaj szerokość w prawidłowym zasiegu(-90 do 90)!"
  //     );
  //   }
  //   if (!lng || isNaN(lng) || !(lng >= -180 && lng <= 180)) {
  //     validationErrors.push(
  //       "Podaj długość w prawidłowym zasiegu(-180 do 180)!"
  //     );
  //   }
  //   if (
  //     !description ||
  //     description.length <= 10 ||
  //     description.length > 200 ||
  //     !description.match(letters)
  //   ) {
  //     validationErrors.push(
  //       "Dodaj opis składający się z min. 10 znaków i maksymalnie 200!"
  //     );
  //   }
  //   if (!type) {
  //     validationErrors.push("Wybierz rodzaj miejsca!");
  //   }
  //   return validationErrors;
  // };

  const createSpot = () => {
    const url = "http://localhost:3000/spots";
    const spot = {
      name,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      description,
      type,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spot),
    })
      .then((response) => {
        if (response.status === 201) {
          setFormState({
            name: "",
            lat: "",
            lng: "",
            description: "",
            type: ""
          })
          // setName("");
          // setLat("");
          // setLng("");
          // setDescription("");
          // setType("");
          setErrors([]);
          if (typeof fetchSpot === "function") {
            fetchSpot();
          }
        }
      })
      .catch((error) => {
        console.log(
          "There was an error with the `adding new spot request`: ",
          error
        );
      });
  };

  return (
    <div className="container visible_form">
      <fieldset className="form_field">
        <form onSubmit={handleSubmit} className="form_flex">
          <label htmlFor="name" className="form_label">Nazwa</label>
          <input
            id="name"
            value={formState.name}
            type="text"
            name="name"
            onChange={handleInputChange}
          />
          <label htmlFor="lat" className="form_label">Szerokość geograficzna</label>
          <input
            id="lat"
            value={formState.lat}
            type="number"
            name="lat"
            onChange={handleInputChange}
          />
          <label htmlFor="lng" className="form_label">Długość geograficzna</label>
          <input
            id="lng"
            value={formState.lng}
            type="number"
            name="lng"
            onChange={handleInputChange}
          />
          <label htmlFor="description" className="form_label">Dodaj opis miejsca</label>
          <textarea
            id="description"
            value={formState.description}
            type="text"
            name="description"
            onChange={handleInputChange}
            rows="10"
            cols="40"
            placeholder="Dodaj opis"
          />
          <label htmlFor="place" className="form_label">Wybierz typ miejsca</label>
          <select id="place" value={formState.type} name="type" onChange={handleInputChange}>
            <option></option>
            <option value="spot">Punkt obserwacyjny</option>
            <option value="observatory">Obserwatorium</option>
          </select>
          <button className="form_btn" type="submit">
            Dodaj!
          </button>
        </form>
      </fieldset>
      <ul ref={myErrorRef} className="form_errors">
        {errors.map((error, index) => {
          return (
            <li style={{ color: "red", fontWeight: "bold" }} key={index}>
              {error}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

AddDarkSkySpotForm.propTypes = {
  hideForm: PropTypes.func,
  fetchSpot: PropTypes.func,
};
