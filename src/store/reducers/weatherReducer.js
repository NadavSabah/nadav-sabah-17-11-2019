import * as actionTypes from '../actions/actionTypes'

const intialState = { cityData: [], cityFiveDayWeather: [], currentWeather: [], selectedCity: '', isFahrenheit: true }

const weatherForecastReducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CITY_DATA:
            return { ...state, cityData: action.data }
        case actionTypes.GET_CITY_WEATHER:
            return { ...state, cityFiveDayWeather: action.data }
        case actionTypes.GET_CURR_WEATHER:
            return { ...state, currentWeather: action.data }
        case actionTypes.SELECTED_CITY:
            return { ...state, selectedCity: action.data }
        case actionTypes.SET_TEMPERATURE_SCALE:
            return { ...state, isFahrenheit: action.data }

        default:
            return state

    }
}
export default weatherForecastReducer