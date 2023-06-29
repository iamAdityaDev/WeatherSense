import React from "react";
import WaterDrop from "@mui/icons-material/WaterDrop";
import "./hourly_fetch.css";

const HourlyFetch = (props) => {
  const localTime = props.time;
  const timeString = localTime
    ? new Date(localTime).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  const feelsLikeTemp = props.feels_like_temperature;
  const formattedfeelTemp = feelsLikeTemp ? Math.floor(feelsLikeTemp) : "";

  const temp = props.current_temperature;
  const formattedTemp = temp ? Math.floor(temp) : "";

  // const speed = props.wind_data;
  const formattedspeed = feelsLikeTemp ? Math.floor(feelsLikeTemp) : "";

  return (
    <>
      <div className="hour_div">
        <div className="flex_one">
          <p className="hour">{timeString}</p>
          <img
            src={props.cloud_photo}
            alt="cloud hai"
            className="cloud_image_h"
          />
          <p className="curr_temp_h">{formattedTemp}&deg;</p>
          <p className="feelslike_label_h">Feels like</p>
          <p className="feelslike_value_h">{formattedfeelTemp}&deg;</p>
          <WaterDrop className="drop_h" />
          <p className="chance_rain_h">{props.rain_chance_per}%</p>
        </div>
        <p className="weather_condition_h">{props.condition_of_weather.slice(0, 55)}</p>

        <div className="outer_flexbox">
          <div className="left_flexbox">
            <div className="inner_div_h left_div_h_one">
              <p className="info_label humidity_label_h">Humidity</p>
              <p className="info_label info_label_in humidity_value_h">
                {props.humidity_per}%
              </p>
            </div>
            <div className="inner_div_h left_div_h_two">
              <p className="info_label wind_label_h">Wind</p>
              <p className="info_label info_label_in wind_value_h">
                {formattedspeed} km/h
              </p>
            </div>
          </div>

          <div className="right_flexbox">
            <div className="inner_div_h right_div_h">
              <p className="info_label uv_label_h">UV-Index</p>
              <p className="info_label info_label_in uv_value_h">
                {props.uv_index_data}/10
              </p>
            </div>
            <div className="inner_div_h right_div_h">
              <p className="info_label visibility_label_h">Visibility</p>
              <p className="info_label info_label_in visibility_value_h">
                {props.visibility} km
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HourlyFetch;
