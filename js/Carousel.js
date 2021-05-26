import React, { useState } from "react";

const slides = [
  {
    title: "Miejsca",
    description:
      "Jeśli lubisz oglądać nocne niebo, interesujesz się astronomia, tu znajdziesz odpowiednie miejsca do oglądania gwiazd gołym okiem...",
  },
  {
    title: "Wydarzenia",
    description:
      "Jesli chcesz wiedzieć kiedy wybrać się na nocny spektakl deszczu meteorytów...",
  },
  {
    title: "Obrazek dnia",
    description:
      "Codziennie nowy NASA Picture of the day oraz baza zdjęć od 1996",
  },
];

export const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
  };

  const previousSlide = () => {
    setCurrentSlide((prevSlide) => {
      if (prevSlide === 0) {
        return 2;
      } else {
        return (prevSlide - 1) % 3;
      }
    });
  };

  return (
    <section className="carusel container ">
      <div className="carusel-content pl-30 pr-30">
        <i className="fas fa-arrow-left leftarrow" onClick={previousSlide}></i>
        <ul>
          <li className="visible">
            <h1>{slides[currentSlide].title}</h1>
            {slides[currentSlide].description}
          </li>
        </ul>
        <i className="fas fa-arrow-right rightarrow" onClick={nextSlide}></i>
      </div>
    </section>
  );
};
