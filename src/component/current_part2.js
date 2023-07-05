import React, { useEffect, useState } from "react";
import "./current_part2.css";
import "./current_phone.css";
import WaterDrop from "@mui/icons-material/WaterDrop";

const CurrentPart2 = (props) => {
  const [final_data, setfinal_data] = useState([])

  const update_weather_hourly_current = async () => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=31c8b19cd52d4aad9e4160932232206&q=${props.city}`;
    let data = await fetch(url);
    let parsed_data = await data.json();
    const object = Object.keys(parsed_data);
    const len = object.length;
    if (len !== 1) {

      var currentDate = new Date(); 
      let j = currentDate.getHours();
      let newData = [];
      for (let i = 0; i < 5; i++) 
      {
        if(j===24)
        {
          break
        }
        newData.push(parsed_data.forecast.forecastday[0].hour[j])
        j++;
      }
      setfinal_data(newData)
    } 
    else {
      //error message
    }
  };

  function MyComponent(time) {
    let timeString = time;
    let dateTime = new Date(timeString);
  
    let options = { hour: 'numeric', hour12: true };
    let formattedTime = new Intl.DateTimeFormat('en-US', options).format(dateTime);
    return formattedTime
  }

  useEffect(() => {
    update_weather_hourly_current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.city]);


  // console.log(final_data);

  return (
    <>
    <div className="container_second_back">
      <div className="container_second">
        {final_data.length !== 0 ? (
          final_data.map((element, index) => (
            <>
                <div className="div_second" key={index}>
                  <div className="flexbox_row_current">
                    <p className="time_current_sec"><p className="time_current_sec">{MyComponent(element.time)}</p></p>
                    <img src={element.condition.icon} alt="" className="cloud_image_current_sec" />
                    <p className="temp_current_sec">{Math.floor(element.temp_c)}&deg;</p>
                    <p className="feels_like_current_sec">Feels like </p>
                    <p className="feels_like_current_value">{Math.floor(element.feelslike_c)}&deg;C</p>
                    <WaterDrop className="drop_h_current_sec" />
                    <p className="rain_chance_current_sec">{element.chance_of_rain}%</p>
                    </div>
                    <p className="condition_current_sec">{element.condition.text.slice(0, 55)}</p>
                    {/* {console.log(element.temp_c)} */}
                </div>
            </>
          ))
        ) : ('')}
      </div>
      </div>
    </>
  );
};
export default CurrentPart2;
