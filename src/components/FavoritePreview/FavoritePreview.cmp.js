import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import './FavoritePreview.cmp.css'
import favoriteService from '../../services/favoritesService/favoritesService'
import * as actionCreators from '../../store/actions/index'
import Swal from 'sweetalert2'


const FavoritePreview = ({ favorite, favorites, deleteFavorite, setSelectedCity, history }) => {
    useEffect(() => {

    }, [])
    const handleDeleteFavorite = (event) => {
        event.stopPropagation()
        Swal.fire({
            title: 'Are you sure?',
            text: `Delting ${favorite.cityName} from favorites?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                deleteFavorite(favorite.id, favorites)
                Swal.fire(
                    'Deleted!',
                    `${favorite.cityName} is no longer in your favorites`,
                    'success'
                )
                history.push('/')

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Undo deletion',
                    `The city ${favorite.cityName} still with us`,
                    'info'
                )
            }
        })
    }
    const backToHomePage = () => {
        setSelectedCity(favorite.cityName)
        history.push('/')
    }
    return (
        <div>

            <div onClick={backToHomePage} className="single-favorite flex justify-content flex-direction align-items flex-wrap">
                <h2>{favorite.cityName},{favorite.countryName}</h2>
                <div>{favorite.f}&deg;F|{favorite.c}&deg;C</div>
                <h2>{favorite.desc}</h2>
                <img
                    src={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/0${favorite.icon}}-s.png`}
                    alt=""
                />

                <button onClick={handleDeleteFavorite}>X</button>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        favorites: state.favorites.favorites

    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteFavorite: (id, favorites) => {
            const newFavorites = favoriteService.deleteFavorite(id, favorites)
            dispatch(actionCreators.deleteFavorite(newFavorites))
        },
        setSelectedCity: (cityName) => {
            dispatch(actionCreators.setSelectedCity(cityName))
        }

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FavoritePreview))

