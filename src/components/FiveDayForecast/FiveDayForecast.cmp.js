import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import './FiveDayForecast.cmp.css'
import Card from 'react-bootstrap/Card'


const FiveDayForecast = ({ dayForecast, isFahrenheit }) => {
    return (

        
//             <Card bg="light" style={{ width: '18rem' }}>
//     <Card.Header>Header</Card.Header>
//     <Card.Body>
//       <Card.Title>Light Card Title</Card.Title>
//       <Card.Text>
//         Some quick example text to build on the card title and make up the bulk
//         of the card's content.
//       </Card.Text>
//     </Card.Body>
//   </Card>
        <div className="flex flex-direction align-items">
            <Card className="r" className="single-square">

            <div className="flex flex-direction align-items">
                <Card.Header style={{width:'100%', 'align':'center',}} >{moment(dayForecast.Date).format('dddd')}</Card.Header>
                <h4>{moment(dayForecast.Date).format('DD/MM')}</h4>
                <img
                    src={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/0${dayForecast.Day.Icon}-s.png`}
                    alt=""
                    />
                <h5>{dayForecast.Day.IconPhrase}</h5>

            </div>

            {/* <div className="flex"> */}
              
                {isFahrenheit ? (
                    <div className="flex justify-content">
                    <p>{dayForecast.Temperature.Maximum.Value}<span>&deg; F |</span></p>
                    <p>{dayForecast.Temperature.Minimum.Value}<span>&deg; F </span></p>
                    </div>
                    )
                    : (
                        <div  className="flex justify-content">
                        <p>{Math.floor((dayForecast.Temperature.Maximum.Value -32 )/1.8)}<span>&deg; C |</span></p>
                        <p>{Math.floor((dayForecast.Temperature.Minimum.Value-32)/1.8)}<span>&deg; C </span></p>
                        </div>
                )}




            {/* </div> */}
                </Card>
        </div>
    )

}
export default FiveDayForecast