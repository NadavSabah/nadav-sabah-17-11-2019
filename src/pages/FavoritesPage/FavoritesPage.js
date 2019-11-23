import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import FavoritePreview from '../../components/FavoritePreview/FavoritePreview.cmp'
import './FavoritesPage.css'
import favoritesService from '../../services/favoritesService/favoritesService';
import * as actionCreators from '../../store/actions/index'



const FavoritesPage = ({ favorites, loadFavorites }) => {
    useEffect(() => {
        async function getData() {
            try {
                await loadFavorites()

            } catch (error) {
                console.log('Error is', error)
            }
        }

        getData()

    }, [])
    return (
        <div className="favorites-container">
            <h1 className="fav-title">Your Favorites</h1>
            {favorites.length
                ? favorites.map(favorite => (
                    <FavoritePreview key={favorite.id} favorite={favorite} />
                ))
                : <h3 className="fav-title">No favorites</h3>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        favorites: state.favorites.favorites
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadFavorites: async () => {
            const favorites = await favoritesService.loadFavorites()
            dispatch(actionCreators.loadFavorites(favorites))

        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage)