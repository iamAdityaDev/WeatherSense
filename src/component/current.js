import React, { useEffect, useState } from "react";
import "./current.css";
import Spinner from "../spinner";

const Current = (props) => {
  const [curr_data, setCurr_data] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.weatherapi.com/v1/current.json?key=31c8b19cd52d4aad9e4160932232206&q=${props.city}`;
      setloading(true);
      const response = await fetch(url);
      const data = await response.json();

      const object = Object.keys(data);
      const len = object.length;
      if (len !== 1) {
        setCurr_data(data);
        setloading(false);
      } else {
        setloading(false);
        setCurr_data([]);
      }
    };

    fetchData();
  }, [props.city]);

  const localTime = curr_data.location && curr_data.location.localtime;
  const timeString = localTime
    ? new Date(localTime).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  const feelsLikeTemp = curr_data.current && curr_data.current.feelslike_c;
  const formattedfeelTemp = feelsLikeTemp ? Math.floor(feelsLikeTemp) : "";

  const temp = curr_data.current && curr_data.current.temp_c;
  const formattedTemp = temp ? Math.floor(temp) : "";

  return (
    <>
      {loading && <Spinner />}
      {curr_data.length !== 0 ? (
        <>
          <p className="head_current_weather">
            {curr_data.location.name}, {curr_data.location.country} - Current Weather Status
          </p>
          <p className="date_for_current">
            {curr_data.location && curr_data.location.localtime
              ? new Date(curr_data.location.localtime).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )
              : "Loading..."}
          </p>
          In this code, the conditional check curr_data.location &&
          curr_data.location.localtime ensures that both curr_data.location and
          curr_data.location.localtime exist before attempting to access the
          localtime property. If either of them is undefined or null, the code
          will display the text "Loading..." to indicate that the data is being
          fetched or not available yet. Once the check passes, it creates a Date
          object from curr_data.location.localtime and formats it using the
          toLocaleDateString method, similar to the previous example.
          <div className="curr1_div">
            <p className="curr_weather_head">Current Weather</p>
            <p className="curr_time">{timeString}</p>
            <img
              src={
                curr_data.current &&
                curr_data.current.condition &&
                curr_data.current.condition.icon
              }
              className="cloud_cond"
              alt="Cloud hai "
            />
            <p className="curr_temp">{formattedTemp}&deg;</p>
            <p className="celcius">C</p>
            <p className="uv_index">UV-Index</p>
            <p className="uv_value">
              {curr_data.current && curr_data.current.uv}
            </p>
            <div className="right_curr1">
              <p className="label_right_c1 feels_like">Feels Like</p>
              <p className="value_right_c1 feels_like_temp">
                {formattedfeelTemp}&deg;
              </p>
            </div>
            <div className="right_curr1">
              <p className="label_right_c1 Humidity">Humidity</p>
              <p className="value_right_c1 humidity_val">
                {curr_data.current && curr_data.current.humidity}%
              </p>
            </div>
            <div className="right_curr1">
              <p className="label_right_c1 wind">Wind</p>
              <p className="value_right_c1 wind_val">
                {curr_data.current && curr_data.current.wind_kph} km/h
              </p>
            </div>
            <div className="right_curr1">
              <p className="label_right_c1 wind_gusts">Wind Gusts</p>
              <p className="value_right_c1 wind_gusts_val">
                {curr_data.current && curr_data.current.gust_kph} km/h
              </p>
            </div>
            <p className="condition">
              {curr_data.current &&
                curr_data.current.condition &&
                curr_data.current.condition.text.slice(0, 55)}
            </p>
          </div>
          <div className="curr2_div">
            {/* <p className="details">Details</p> */}
            <p className="condition_curr2">
              {curr_data.current &&
                curr_data.current.condition &&
                curr_data.current.condition.text.slice(0, 55)}
            </p>

            <div className="jagah">
              <p className="curr2_temp">{formattedTemp}&deg;C</p>
              <p className="name_curr2">
                {curr_data.location && curr_data.location.name}{" "}
              </p>
              {/* <p className="region_curr2">{curr_data.location && curr_data.location.region}</p> */}
            </div>

            <div className="right_curr2">
              <p className="label_right_c2">Pressure</p>
              <p className="value_right_c2">
                {curr_data.current && curr_data.current.pressure_mb} mb
              </p>
            </div>
            <div className="right_curr2">
              <p className="label_right_c2">Cloud Cover</p>
              <p className="value_right_c2">
                {curr_data.current && curr_data.current.cloud}%
              </p>
            </div>
            <div className="right_curr2">
              <p className="label_right_c2">Visibility</p>
              <p className="value_right_c2">
                {curr_data.current && curr_data.current.vis_km} km
              </p>
            </div>
            <div className="right_curr2">
              <p className="label_right_c2">Wind Degree</p>
              <p className="value_right_c2">
                {curr_data.current && curr_data.current.wind_degree}
              </p>
            </div>

            <div className="left_curr2">
              <p className="label_left_c2">UV-Index</p>
              <p className="value_left_c2">
                {curr_data.current && curr_data.current.uv}/10
              </p>
            </div>
            <div className="left_curr2">
              <p className="label_left_c2">Wind</p>
              <p className="value_left_c2">
                {curr_data.current && curr_data.current.wind_kph} km/h
              </p>
            </div>
            <div className="left_curr2">
              <p className="label_left_c2">Wind Gusts</p>
              <p className="value_left_c2">
                {curr_data.current && curr_data.current.gust_kph} km/h
              </p>
            </div>
            <div className="left_curr2">
              <p className="label_left_c2">Humidity</p>
              <p className="value_left_c2">
                {curr_data.current && curr_data.current.humidity}%
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="error_back_current">
            <p className="error_current_current">No Results found !!</p>
            <p className="try_again_current">
              Check your location and try again
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Current;
