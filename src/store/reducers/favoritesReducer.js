import * as actionTypes from '../actions/actionTypes'

const intialState = { cityData: '', favorites: [] }

const favoritesReducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CITY_DATA:
            return { ...state, cityData: action.data }
        case actionTypes.ADD_TO_FAVORITES:
            return { ...state, favorites: action.data }
        case actionTypes.DELETE_FAVORITE:
            return { ...state, favorites: action.data }
        case actionTypes.LOAD_FAVORITES:
            return { ...state, favorites: action.data }
        default:
            return state

    }
}

export default favoritesReducer

