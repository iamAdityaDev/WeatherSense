import React, { useEffect, useState } from "react";
import WaterDrop from "@mui/icons-material/WaterDrop";
import "./daily_fetch.css";
import Spinner from "../spinner";

const DailyReturn = (props) => {
  const [weatherdaily, setWeatherdaily] = useState([]);
  const [loading, setloading] = useState(true);

  const updateWeatherDaily = async (datePass) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=31c8b19cd52d4aad9e4160932232206&q=${props.city_name}&date=${datePass}`;
    const response = await fetch(url);
    const parsedData = await response.json();
    return parsedData.forecast.forecastday;
  };

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = new Date();
      const promises = [];
      setloading(true);
      for (let i = 0; i < 10; i++) {
        const year = currentDate.getFullYear();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;

        const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
          day < 10 ? "0" + day : day
        }`;
        promises.push(updateWeatherDaily(formattedDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      try {
        const weatherData = await Promise.all(promises);
        setWeatherdaily(weatherData);
        setloading(false);
      } catch (error) {
        setloading(false);
        // Handle error here
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.city_name]);

  console.log(weatherdaily);

  return (
    <>
      {loading && <Spinner />}

      {weatherdaily.length > 0 ? (
        weatherdaily.map((element, index) => (
          <div className="daily_div" key={index}>
            <div className="flex_one_d">
            <div className="temp_max_min">
              <p className="day_d">{new Date(element[0].date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
              <p className="date_d">{element[0].date.slice(5, 10)}</p>
            </div>
              <img
                src={element[0].day.condition.icon}
                alt="cloud hai"
                className="cloud_image_d"
              />
                <p className="max_temp_d">
                  {Math.floor(element[0].day.maxtemp_c)}&deg;
                </p>
                <p className="min_temp_d">
                  /{Math.floor(element[0].day.mintemp_c)}&deg;
                </p>
              <WaterDrop className="drop_d" />
              <p className="chance_rain_d">
                {element[0].day.daily_chance_of_rain}%
              </p>
            </div>
            <p className="weather_condition_d">
              {element[0].day.condition.text.slice(0, 55)}
            </p>

            <div className="outer_flexbox_d">
              <div className="left_flexbox_d">
                <div className="inner_div_d left_div_d_one">
                  <p className="info_label_d humidity_label_d">Humidity</p>
                  <p className="info_label_d info_label_in_d humidity_value_d">
                    {element[0].day.avghumidity}%
                  </p>
                </div>
                <div className="inner_div_d left_div_d_two">
                  <p className="info_label_d sunrise_d">Sunrise at :</p>
                  <p className="info_label_d info_label_in_d_sun sunrise_value_d">
                    {element[0].astro.sunrise}
                  </p>
                </div>
              </div>

              <div className="right_flexbox_d">
                <div className="inner_div_d right_div_d">
                  <p className="info_label_d visibility_label_d">Visibility</p>
                  <p className="info_label_d info_label_in_d visibility_value_d">
                    {element[0].day.avgvis_km} km
                  </p>
                </div>
                <div className="inner_div_d right_div_d">
                  <p className="info_label_d sunset_d">Sunset at :</p>
                  <p className="info_label_d info_label_in_d_sun sunset_value_d">
                    {element[0].astro.sunset}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          <div className="error_back_daily">
              <div className="second_error_back_daily">
              <p className="error_current_daily">No Results found !!</p>
              <p className="try_again_daily">Check your location and try again</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DailyReturn;
