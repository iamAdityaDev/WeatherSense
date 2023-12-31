import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Option from "./dropdown";
import Current from "./component/current";
import Hourly from "./component/hourly";
import Daily from "./component/daily";
import CurrentPart2 from "./component/current_part2";
import Home from "./component/home";
import "./App.css";

function App() {
  const [locations, setLocations] = useState([]);
  const [cityName, setCityName] = useState("");

  const handleOnChange = async () => {
    let cont = document.getElementById("cont");
    cont.style.display = "flex";
    let text = document.getElementById("search_box_id").value;
    let url = `https://api.weatherapi.com/v1/search.json?key=31c8b19cd52d4aad9e4160932232206&q=${text}`;

    try {
      let data = await fetch(url);
      if (data.ok) {
        let parsedData = await data.json();
        setLocations(parsedData);
      } else {
        console.error("Error fetching data:", data.status, data.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const changeLoc = (name, country) => {
    let cont = document.getElementById("cont");
    let search_click=document.getElementById('search_id')

    cont.style.display = "none";
    let text = document.getElementById("search_box_id");
    text.value = `${name}, ${country}`;
    search_click.click()
  };

  const fetch_city = () => {
    let cont = document.getElementById("cont");
    cont.style.display = "none";
    let text = document.getElementById("search_box_id").value;
    setCityName(text);
  };

  const title_change_home = () => {
    document.title = "WeatherSense - Home";
  };
  const title_change_current = () => {
    document.title = "WeatherSense - Current";
  };
  const title_change_daily = () => {
    document.title = "WeatherSense - Daily";
  };
  const title_change_hourly = () => {
    document.title = "WeatherSense - Hourly";
  };

  useEffect(() => {
    handleOnChange();
  }, []);

  return (
    <>
      <BrowserRouter basename="WeatherSense">
        <div>
          <div className="navbar">
            <p className="name_nav">WeatherSense</p>
            <div className="nav_flexbox">
              <Link to="/" onClick={title_change_home} className="nav home">
                Home
              </Link>
              <Link
                to="/current"
                onClick={title_change_current}
                className="nav current"
              >
                Current
              </Link>
              <Link
                to="/daily"
                onClick={title_change_daily}
                className="nav daily"
              >
                Daily
              </Link>
              <Link
                to="/hourly"
                onClick={title_change_hourly}
                className="nav hourly"
              >
                Hourly
              </Link>
            </div>
            <div className="search_back_flexbox">
              <div className="search_back_div">
                <SearchIcon className="search_icon" />
                <input
                  type="text"
                  onChange={handleOnChange}
                  placeholder="Search location.."
                  className="search_box"
                  id="search_box_id"
                />
                <Link
                  onClick={fetch_city}
                  to="/current"
                  className="search"
                  id="search_id"
                >
                  Search
                </Link>
              </div>
              <div className="container_navbar_search" id="cont">
                {locations.map
                  ? locations.map((element, index) => {
                      const combinedName = `${element.name}, ${element.country}`;
                      const truncatedName =
                        combinedName.length > 40
                          ? combinedName.slice(0, 38) + ".."
                          : combinedName;

                      return (
                        <Option
                          key={index}
                          onClick={() =>
                            changeLoc(element.name, element.country)
                          }
                          name={element.name}
                          region={element.region}
                          combinedName={truncatedName}
                        />
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/current"
            element={
              <>
                <Current city={cityName} />
                <CurrentPart2 city={cityName} />
              </>
            }
          />
          <Route path="/daily" element={<Daily city={cityName} />} />
          <Route path="/hourly" element={<Hourly city={cityName} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
