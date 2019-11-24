import React from 'react'
import moment from 'moment'
import './FutureForecastPreview.cmp.css'
import Card from 'react-bootstrap/Card'


const FutureForecastPreview = ({ dayForecast, isFahrenheit }) => {
    return (
        <div className="flex flex-direction align-items">
            <Card className="r" className="single-square">

                <div className="flex flex-direction align-items">
                    <Card.Header style={{ width: '100%', textAlign: 'center', }} >{moment(dayForecast.Date).format('dddd')}</Card.Header>
                    <h4>{moment(dayForecast.Date).format('DD/MM')}</h4>
                    <img
                        src={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/0${dayForecast.Day.Icon}-s.png`}
                        alt=""
                    />
                    <h5>{dayForecast.Day.IconPhrase}</h5>

                </div>
                {isFahrenheit ? (
                    <div className="flex justify-content">
                        <p>{dayForecast.Temperature.Maximum.Value}<span>&deg; F |</span></p>
                        <p>{dayForecast.Temperature.Minimum.Value}<span>&deg; F </span></p>
                    </div>
                )
                    : (
                        <div className="flex justify-content">
                            <p>{Math.floor((dayForecast.Temperature.Maximum.Value - 32) / 1.8)}<span>&deg; C |</span></p>
                            <p>{Math.floor((dayForecast.Temperature.Minimum.Value - 32) / 1.8)}<span>&deg; C </span></p>
                        </div>
                    )}
            </Card>
        </div>
    )

}
export default FutureForecastPreview