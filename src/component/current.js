import React, { useEffect, useState } from "react";
import "./current.css";
import "./current_phone.css";
import Spinner from "../spinner";

const Current = (props) => {
  const [curr_data, setCurr_data] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
          setCurr_data({});
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setloading(false);
        setCurr_data({});
      }
    };

    fetchData();
  }, [props.city]);

  const { current, location } = curr_data;

  const localTime = location && location.localtime;
  const timeString = localTime
    ? new Date(localTime).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  const feelsLikeTemp = current && current.feelslike_c;
  const formattedfeelTemp = feelsLikeTemp ? Math.floor(feelsLikeTemp) : "";

  const temp = current && current.temp_c;
  const formattedTemp = temp ? Math.floor(temp) : "";

  return (
    <>
      {loading && <Spinner />}
      {Object.keys(curr_data).length !== 0 ? (
        <>
        <div className="header_current1">
            <p className="head_current_weather">
              {location.name}, {location.country} - Current Weather Status
            </p>
            <p className="date_for_current">
              {location && location.localtime
                ? new Date(location.localtime).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
              : "Loading..."}
          </p>
          </div>
          <div className="current_one_back">
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
          </div>
        </>
      ) : (
        <>
          <div className="error_back_current">
            <div className="second_error_back_div">
              <p className="error_current_current">No Results found!!</p>
              <p className="try_again_current">
                Check your location and try again
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Current;
