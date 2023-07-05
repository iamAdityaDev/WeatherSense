import React, { useEffect, useState } from "react";
import "./hourly.css";
import HourlyFetch from "./hourly_fetch";
import Spinner from "../spinner";

const Hourly = (props) => {
  const [weatherhourly, setweatherhourly] = useState([]);
  const [jagah, setjagah] = useState([]);
  const [loading, setloading] = useState(true);

  const update_weather_hourly = async () => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=31c8b19cd52d4aad9e4160932232206&q=${props.city}`;

    const url_jagah = `https://api.weatherapi.com/v1/current.json?key=31c8b19cd52d4aad9e4160932232206&q=${props.city}`;

    setloading(true);
    let data = await fetch(url);
    const data_jagah = await fetch(url_jagah);
    let parsed_data = await data.json();
    const parsed_data_jagah = await data_jagah.json();

    const object = Object.keys(parsed_data);
    const len = object.length;
    if (len !== 1) {
      setweatherhourly(parsed_data.forecast.forecastday[0].hour);
      let j=5;
      for(let i=0; i<4; i++)
      {
        console.log(parsed_data.forecast.forecastday[0].hour[j])
        j++
      }
      
      setjagah(parsed_data_jagah);
      console.log(jagah)
      setloading(false);
    }
    else {
      setloading(false);
      setweatherhourly([]);
      setjagah([]);
    }
  };
  useEffect(() => {
    update_weather_hourly();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.city]);

  return (
    <>
      {loading && <Spinner />}

      {jagah.length !== 0 ? (
        <>
        <div className="hourly_head_back">
            <p className="head_hourly_weather">
              {jagah.location.name}, {jagah.location.country} - Hourly Weather ( 24
              Hours)
            </p>
            <p className="date_for_hourly">
            {jagah.location && jagah.location.localtime
              ? new Date(jagah.location.localtime).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )
              : "Loading..."}
          </p>
        </div>
        </>
      ) : (''
      )}

      <div className="container_h">
        {weatherhourly.length !== 0 ? (
          weatherhourly.map((element, index) => (
            <HourlyFetch
              key={index}
              element={element}
              time={element.time}
              cloud_photo={element.condition.icon}
              current_temperature={element.temp_c}
              feels_like_temperature={element.feelslike_c}
              rain_chance_per={element.chance_of_rain}
              condition_of_weather={element.condition.text}
              humidity_per={element.humidity}
              uv_index_data={element.uv}
              wind_data={element.wind_kph}
              visibility={element.vis_km}
            />
          ))
        ) : (
          <>
            <div className="error_back_hourly">
              <div className="second_error_back_hourly">
                <p className="error_current_hourly">No Results found !!</p>
                <p className="try_again_hourly">
                  Check your location and try again
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Hourly;
