import React, { useEffect, useState } from "react";
import "./daily.css";
import DailyReturn from "./daily_return";
import Spinner from "../spinner";

const Daily = (props) => {

  const [jagah, setjagah] = useState([])
  const [loading, setloading] = useState(true)

  const fetch_kar_bhai=async()=>{
    const url = `https://api.weatherapi.com/v1/current.json?key=31c8b19cd52d4aad9e4160932232206&q=${props.city}`;
      setloading(true);
      const response = await fetch(url);
      const data = await response.json();

      const object = Object.keys(data);
      const len = object.length;
      if (len !== 1) {
        setjagah(data);
        setloading(false);
      } else {
        setloading(false);
        setjagah([]);
      }
  }
  useEffect(() => {
    fetch_kar_bhai();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    {loading&&<Spinner/>}

    {jagah.length !== 0 ? (
        <>
            <p className="head_hourly_weather">
              {jagah.location.name}, {jagah.location.country} - Daily Weather ( 10
              Days)
            </p>
        </>
      ) : (''
      )}
      
      <div className="container_daily">
        <DailyReturn city_name={props.city} />
        {console.log(props.city)}
      </div>
    </>
  );
};

export default Daily;
