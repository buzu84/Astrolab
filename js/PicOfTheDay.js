import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Spinner } from "./Spinner";

export const PicOfTheDay = () => {
  const handleDateFormat = (date) => {
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${year}-${month}-${day}`;
  };

  const handleTranslate = () => {
    setShowTranslation(!showTranslation);
  };

  const [picture, setPicture] = useState("");
  const [currentDate, setCurrentDate] = useState(handleDateFormat(new Date()));
  const [isLoading, setIsLoading] = useState(true);
  const [translatedPicExplanation, setTranslatedPicExplanation] = useState("");
  const [translatedPicTitle, setTranslatedPicTitle] = useState("");
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, [currentDate]);

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&date=${currentDate}`
    )
      .then((response) => response.json())
      .then((json) => {
        setPicture(json);
        setIsLoading(false);
        let fromLang = "en";
        let toLang = "pl";
        let explanation = json.explanation;
        let picName = json.title;
        let url = `https://translation.googleapis.com/language/translate/v2?key=${process.env.REACT__APP_GOOGLE_TRANSLATION_API_KEY}`;
        url += "&q=" + encodeURI(explanation);
        url += "&q=" + encodeURI(picName);
        url += `&source=${fromLang}`;
        url += `&target=${toLang}`;

        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((res) => res.json())
          .then((response) => {
            setTranslatedPicExplanation(
              response.data.translations[0].translatedText
            );
            setTranslatedPicTitle(response.data.translations[1].translatedText);
          })
          .catch((error) => {
            console.log(
              "There was an error with the translation request: ",
              error
            );
          });
      })
      .catch((error) => {
        console.log("There was an error with the NasaPic request: ", error);
      });
  }, [currentDate]);

  if (picture === "") {
    return <Spinner />;
  }
  if (isLoading === true) {
    return <Spinner />;
  }

  return (
    <div className="container NASAPic_container button_container">
      {showTranslation ? (
        <>
          <button onClick={handleTranslate} className="translate_to_pl">
            Przetlumacz
          </button>
          <h3 className="NASAHeader">{translatedPicTitle}</h3>
          {picture.media_type === "image" ? (
            <img className="NASAPic" src={picture.url} alt={picture.title} />
          ) : (
            <iframe
              title="space-video"
              src={picture.url}
              frameBorder="0"
              gesture="media"
              allow="encrypted-media"
              allowFullScreen
              className="photo NASAPic"
            />
          )}
          <p className="pic_description">{translatedPicExplanation}</p>
          <div className="pic_date">
            <p className="date_picker">
              Może chciałbyś zobaczyć zdjęcia z innych dni? (YYYY-MM-DD):{" "}
            </p>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={
                new Date(
                  parseInt(currentDate.split("-")[0]),
                  parseInt(currentDate.split("-")[1]) - 1,
                  parseInt(currentDate.split("-")[2])
                )
              }
              onChange={(date) => setCurrentDate(handleDateFormat(date))}
              minDate={new Date(1996, 0, 1)}
              maxDate={new Date()}
              placeholderText="NASA Picture dostępne od 1.01.1996"
            />
          </div>
        </>
      ) : (
        <>
          <button onClick={handleTranslate} className="translate">
            Przetlumacz
          </button>
          <h3 className="NASAHeader">{picture.title}</h3>
          {picture.media_type === "image" ? (
            <img className="NASAPic" src={picture.url} alt={picture.title} />
          ) : (
            <iframe
              title="space-video"
              src={picture.url}
              frameBorder="0"
              gesture="media"
              allow="encrypted-media"
              allowFullScreen
              className="photo NASAPic"
            />
          )}
          <p className="pic_description">{picture.explanation}</p>
          <div className="pic_date">
            <p className="date_picker">
              Może chciałbyś zobaczyć zdjęcia z innych dni? (YYYY-MM-DD):{" "}
            </p>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={
                new Date(
                  parseInt(currentDate.split("-")[0]),
                  parseInt(currentDate.split("-")[1]) - 1,
                  parseInt(currentDate.split("-")[2])
                )
              }
              onChange={(date) => setCurrentDate(handleDateFormat(date))}
              minDate={new Date(1996, 0, 1)}
              maxDate={new Date()}
              placeholderText="NASA Picture dostępne od 1.01.1996"
            />
          </div>
        </>
      )}
    </div>
  );
};
