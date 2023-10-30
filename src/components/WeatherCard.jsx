import React, { useState } from "react";
import "./styles/WeatherCard.css";

const WeatherCard = ({ weather, temp }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const handleChangeTemp = () => setIsCelsius(!isCelsius);

  return (
    <article className="weather">
      <h1 className="weather__title">Weather App</h1>
      <h2 className="weather__location">
        {weather?.name}, {weather?.sys.country}
      </h2>

      <section className="weather__body">
        <header className="weather__img-container">
          <img
            className="weather__img"
            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
            alt=""
          />
        </header>
        <article className="weather__info">
          <h3 className="weather__condition">
            "{weather?.weather[0].description}"
          </h3>
          <ul className="weather__list">
            <li className="weather__item">
              <span className="weather__label">
                <strong>Wind Speed : </strong>
              </span>
              <span className="weather__value">{weather?.wind.speed} m/s</span>
            </li>
            <li className="weather__item">
              <span className="weather__label">
                <strong>Clouds : </strong>
              </span>
              <span className="weather__value">{weather?.clouds.all} % </span>
            </li>
            <li className="weather__item">
              <span className="weather__label">
                <strong>Pressure : </strong>
              </span>
              <span className="weather__value">{weather?.main.pressure} hPa</span>
            </li>
          </ul>
        </article>
      </section>
      <h2>{isCelsius ? `${temp?.celsius}ºC` : `${temp?.fahrenheit}ºF`}</h2>
      <button className='weather__btn' onClick={handleChangeTemp}>
        Change to {isCelsius ? "°F" : "°C"}
      </button>
    </article>
  );
};

export default WeatherCard;
