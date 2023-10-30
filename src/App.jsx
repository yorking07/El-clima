import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';

const App = () => {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const success = (position) => {
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };
    setCoords(obj);
  };

  const errorAccessLocation = (error) => {
    if (error.code === error.PERMISSION_DENIED) {
      setError('https://cdn-icons-png.flaticon.com/128/752/752755.png');
      setIsLoading(false);
    }
  };

  const APIKEY = '33529c5ea7c5ae71f46e4c840378a1c3';

  useEffect(() => {
    setIsLoading(true);
    const options = { enableHighAccuracy: true };
    const watchId = navigator.geolocation.watchPosition(success, errorAccessLocation, options);

    return () => {
      navigator.geolocation.clearWatch(watchId); // Detener la observación cuando el componente se desmonte
    };
  }, []);

  useEffect(() => {
    if (coords) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${APIKEY}`;

      axios
        .get(url)
        .then((res) => {
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const fahrenheit = ((res.data.main.temp - 273.15) * (9 / 5) + 32).toFixed(1);
          setTemp({ celsius, fahrenheit });
          setWeather(res.data);
        })
        .catch((err) => {
          setError('Ha habido un error');
        })
        .finally(() => setIsLoading(false));
    }
  }, [coords]);

  return (
    <div className='app'>
      {isLoading ? (
        <h2 className='app_loader'>Loading...</h2>
      ) : error ? (
        <article className='app__error'> <img className='imagen__error' src={error} alt="" /> <span className='texto__error'>Error, por favor permite acceder a la ubicacion</span></article>
      ) : (
        <WeatherCard weather={weather} temp={temp} />
      )}
    </div>
  );
};

export default App;
