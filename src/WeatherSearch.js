import React, { useState } from "react";
import axios from "axios";
//import Boostrap from "bootstrap";


export default function WeatherSearch() {
  const [city, setCity] = useState(null);
  const [message, setMessage] = useState(null);
  const [search, setSearch] = useState(false);

  function setWeather(response) {
    setMessage(
      <div>
        <h3>In {city} it is.... </h3>
        <ul>
          <li>{Math.round(response.data.main.temp)}F</li>
          <li>{response.data.weather[0].description}</li>
          <li>
            <img
              src={`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
              alt=""
            />
          </li>
          <li>{response.data.main.humidity}% humidity</li>
          <li>and wind speed is {response.data.wind.speed} km/hr</li>
        </ul>
      </div>
    );
    setSearch(true);
  }
  function cityChange(event) {
    console.log(event.target.value);
    setCity(event.target.value);
  }
  function cityInput(event) {
    event.preventDefault();
    let apiKey = "546237bee9562b5e4e711682a4279901";
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&&appid=${apiKey}`;
    axios.get(URL).then(setWeather);
  }
  let form = (
    <div>
      <form className="weatherSubmit" onSubmit={cityInput}>
        <input type="search" placeholder="type a city" onChange={cityChange} />
        <input type="submit" value="submit" />
      </form>
    </div>
  );

  if (search) {
    return (
      <div>
        {form}
        {message}
      </div>
    );
  } else {
    return (
      <div>
        {form}
        <h3>Please enter a city</h3>
      </div>
    );
  }
}
