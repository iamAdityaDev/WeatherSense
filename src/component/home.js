import React from "react";
import "./home.css";
import home_current from './home_current.png';
import home_daily from './home_daily.png';
import home_hourly from './home_hourly.png';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

const Home=()=>
{
    return (
        <>  
            <p className="heading_weather_send">WeatherSense</p>
            <p className="sub_heading">Forecasting your world, one cloud at a time..</p>

            <img src={home_current} alt="" className="ss_home home_current" />
            <p className="ss_head curr_weather_sense">Current Weather</p>
            <p className="ss_desc desc_current">Never be caught off guard
             by unpredictable weather again. Our website provides an 
             intuitive search function that retrieves accurate and timely weather reports
              for your desired location, ensuring you're prepared for any climate
              . <br/><br/>Stay one step ahead of changing
             weather patterns with our convenient weather feature.
              From temperature and humidity to wind speed and forecasts,
               we deliver comprehensive weather information, allowing
                you to make informed decisions based on the current conditions</p>

            <img src={home_daily} alt="" className="ss_home home_daily" />
            <p className="ss_head daily_weather_sense">Daily Weather Updates</p>
            <p className="ss_desc desc_daily">Stay informed about the weather
             patterns in the coming days with our extended forecast feature.
              Whether you're planning an outdoor activity or organizing your
               schedule, our website provides accurate daily weather
                updates for up to 10 days.<br/><br/>
                Explore the weather forecast for the
                 next week with our comprehensive feature.
                  From temperature highs and lows to precipitation chances,
                   our website delivers a detailed daily weather outlook
                    for up to 10 days, helping you stay ahead of the curve.</p>

            <img src={home_hourly} alt="" className="ss_home home_hourly" />
            <p className="ss_head hourly_weather_sense">Hourly Weather</p>
            <p className="ss_desc desc_hourly">Stay prepared for any weather
             changes with our hourly forecast feature. Our website provides
              detailed weather updates, giving you hourly insights into
               temperature, humidity, wind direction, and other essential
                factors that impact your day.<br/><br/>
                Make the most of your day with our hourly
                 weather updates. From morning to night, our
                  website offers a comprehensive overview of
                   weather conditions, helping you plan your
                    activities and stay ahead of any sudden weather shifts.</p>
            <div className="home_footer">
                <div className="flexbox_footer">
                    <a href="https://www.linkedin.com/in/aditya-dev-08b4251a2/" target="_blank" rel="noopener noreferrer" className="takeme"><LinkedInIcon sx={{ fontSize: 29, color: "black" }}  className="contact_img_footer linkedin"/></a>
                    <a href="mailto:your-email@iamadityadevpro@gmail.com" target="_blank" rel="noopener noreferrer" className="takeme"><MailIcon sx={{ fontSize: 29, color: "black" }} className="contact_img_footer mail"/></a>
                    <a href="https://github.com/iamAdityaDev" target="_blank" rel="noopener noreferrer" className="takeme"><GitHubIcon sx={{ fontSize: 29, color: "black" }} className="contact_img_footer github"/></a>
                    <a href="https://www.instagram.com/iam_aditya_dev/" target="_blank" rel="noopener noreferrer" className="takeme"><InstagramIcon sx={{ fontSize: 29, color: "black" }} className="contact_img_footer instagram"/></a>
                </div>
                <p className="api_ref">This website uses
                 <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer" className="weather_api">Weather API</a></p>
            </div>
        </>
    )
}
export default Home