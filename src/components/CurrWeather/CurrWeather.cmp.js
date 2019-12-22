import { connect } from 'react-redux';
import React from 'react'
import './CurrWeather.cmp.css'

const CurrWeather = ({ currWeather, isFahrenheit }) => {
    return (
        <div className="container flex justify-content align-items flex-direction">
            {currWeather.WeatherText && currWeather.Temperature.Imperial.Unit && currWeather.Temperature.Imperial.Value && (
                <div>
                    {isFahrenheit ? (
                        <h2>{Math.floor(currWeather.Temperature.Imperial.Value)}<span>&deg;</span>{currWeather.Temperature.Imperial.Unit}</h2>
                    ) : (
                            <h2>{Math.floor(currWeather.Temperature.Metric.Value)}<span>&deg;</span>{currWeather.Temperature.Metric.Unit}</h2>
                        )
                    }
                    <h3>{currWeather.WeatherText}</h3>
                </div>
            )}
            {currWeather.WeatherIcon > 9 ?
           <img
           src={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${currWeather.WeatherIcon}-s.png`}
           alt=""
       />  
       :
       <img
       src={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/0${currWeather.WeatherIcon}-s.png`}
       alt=""
   />
        }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currWeather: state.mainWeather.currentWeather
    }
}
export default connect(mapStateToProps)(CurrWeather)