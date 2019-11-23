import * as actionTypes from './actionTypes'


export const fetchFavorite = (favoriteCity) => {
    return {
        type: actionTypes.ADD_TO_FAVORITES,
        data: favoriteCity
    }
}

export const addToFavorite = (favoriteCity) => {
    return dispatch => {
        return dispatch(fetchFavorite(favoriteCity))
    }
}
export const fetchDeleteFavorite = (newFavorites) => {
    return {
        type: actionTypes.DELETE_FAVORITE,
        data: newFavorites
    }
}

export const deleteFavorite = (newFavorites) => {
    return dispatch => {
        return dispatch(fetchDeleteFavorite(newFavorites))
    }
}
export const fetchFavorites = (favorites) => {
    return {
        type: actionTypes.LOAD_FAVORITES,
        data: favorites
    }
}

export const loadFavorites = (favorites) => {
    return dispatch => {
        return dispatch(fetchFavorites(favorites))
    }
}
