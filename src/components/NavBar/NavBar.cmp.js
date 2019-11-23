import React, { useState } from 'react';
import { BrowserRouter as Route, NavLink } from 'react-router-dom'
import * as actionCreators from '../../store/actions/index'
// import weatherService from '../../services/weatherService/weatherService'


import { connect } from 'react-redux';

import './NavBar.css'




const NavBar = ({ toggleFahrenheit }) => {
    const [isFahrenheit, setisFahrenheit] = useState(true)
    const toggleTemperature = () => {
        setisFahrenheit(!isFahrenheit)
        toggleFahrenheit(isFahrenheit)
    }

    return (<nav className='navigate'>
        <div className="flex">
            <ul className="nav-bar" >
                <li ><NavLink to='/Favorites'> <img title='Favorites' className="icon " src={require('../../imgs/favorites.png')} alt='Home' /></NavLink> </li>
                <li ><NavLink exact to='/'> <img title='HomePage' className="icon" src={require('../../imgs/homePage.png')} alt='Home' /></NavLink></li>
                <div>
                    <li onClick={toggleTemperature} >{isFahrenheit ?
                        <img title='HomePage' className="icon" src={require('../../imgs/f.png')} alt='Home' />
                        : <img title='HomePage' className="icon" src={require('../../imgs/c.png')} alt='Home' />}
                    </li>
                    <li > <img title='Dark Screen' className="user-img" alt='' />Dark Screen</li>

                </div>
            </ul>

        </div>
        <hr></hr>

    </nav>)

}


const mapDispatchToProps = dispatch => {
    return {
        toggleFahrenheit: (isFahrenheit) => {
            dispatch(actionCreators.toggleFahrenheit(isFahrenheit))
        }
    }
}

export default connect(null, mapDispatchToProps)(NavBar)
