import * as actionTypes from './actionTypes'


export const fetchCityData = (cityData) => {
    return {
        type: actionTypes.GET_CITY_DATA,
        data: cityData
    }
}

export const getCityData = (cityData) => {
    return dispatch => {
        return dispatch(fetchCityData(cityData))
    }
}

export const fetchFiveDayCityWeather = (cityData) => {
    return {
        type: actionTypes.GET_CITY_WEATHER,
        data: cityData
    }
}

export const getFiveDayCityWeather = (cityData) => {
    return dispatch => {
        return dispatch(fetchFiveDayCityWeather(cityData))
    }
}
export const fetchCurrentWeather = (cityData) => {
    return {
        type: actionTypes.GET_CURR_WEATHER,
        data: cityData
    }
}

export const getCurrentWeather = (cityData) => {
    return dispatch => {
        return dispatch(fetchCurrentWeather(cityData))
    }
}

export const setSelectedCity = (cityName) => {
    return {
        type: actionTypes.SELECTED_CITY,
        data: cityName
    }
}

export const toggleFahrenheit = (isFahrenheit) => {
    return {
        type: actionTypes.SET_TEMPERATURE_SCALE,
        data: isFahrenheit
    }
}




