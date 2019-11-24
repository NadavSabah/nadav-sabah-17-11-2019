import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index'
import weatherService from '../../services/weatherService/weatherService'
import favoritesService from '../../services/favoritesService/favoritesService'
import FutureForecastPreview from '../FutureForecastPreview/FutureForecastPreview.cmp'
import CurrWeather from '../CurrWeather/CurrWeather.cmp'
import './MainForecast.cmp.css'
import Swal from 'sweetalert2'

const MainForecast = ({ getCityData, getFiveDayCityWeather, cityFiveDayWeather,
    getCurrentWeather, cityData, currWeather, toggleFavorite, favoritesList, selectedCity, loadFavorites, isFahrenheit, deleteFavorite }) => {
    const [isFavorite, setIsFavorite] = useState(false)
    useEffect(() => {
        async function getWeather() {
            try {

                if (!selectedCity) {
                    await getCityData()
                    await getFiveDayCityWeather()
                    await getCurrentWeather()
                    await loadFavorites()
                }
                else {
                    await getCityData(selectedCity)
                    await getFiveDayCityWeather(cityData.Key)
                    await getCurrentWeather(cityData.Key)
                    await loadFavorites()
                }


            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${error}`
                })
            }
        }
        getWeather()

    }, [])
    const FavoriteStar = () => {
        const index = favoritesList.findIndex(favorite => {
            return favorite.id === cityData.Key
        })

        if (index !== -1) {
            setIsFavorite(true)
            return (<img className="icon" src={require('../../imgs/colorStar.png')} onClick={handleFavorite} />)
        }
        else {
            setIsFavorite(false)
            return (<img className="icon" src={require('../../imgs/emptyStar.png')} onClick={handleFavorite} />)
        }
    }

    const handleFavorite = async () => {
        setIsFavorite(!isFavorite)
        const favoriteCity = {
            id: cityData.Key,
            cityName: cityData.LocalizedName,
            countryName: cityData.Country.LocalizedName,
            f: currWeather.Temperature.Imperial.Value,
            c: currWeather.Temperature.Metric.Value,
            icon: currWeather.WeatherIcon,
            desc: currWeather.WeatherText
        }
        toggleFavorite(isFavorite, favoriteCity, favoritesList)
        if (!isFavorite) {
            Swal.fire(
                `${favoriteCity.cityName} Added To Your Favorite`,
                ``,
                'success')
        }
        else {
            Swal.fire(
                'Deleted',
                `${favoriteCity.cityName} has been deleted from your favorites`,
                'warning'
            )

        }
    }
    return (
        <div>

            {cityData.LocalizedName && cityData.Country.LocalizedName && cityFiveDayWeather && (
                <div>
                    <CurrWeather isFahrenheit={isFahrenheit} />

                    <h2 className="location-name">{cityData.LocalizedName},{cityData.Country.LocalizedName}</h2>
                    <div className="flex justify-content flex-wrap favorite" >

                        <FavoriteStar />
                    </div>
                    <div className="flex justify-content flex-wrap">
                        {cityFiveDayWeather.DailyForecasts && (
                            cityFiveDayWeather.DailyForecasts.map((dayForecast, idx) =>
                                <FutureForecastPreview key={idx} dayForecast={dayForecast} isFahrenheit={isFahrenheit}></FutureForecastPreview>

                            ))}
                    </div>

                </div>
            )}
        </div>
    )

}

const mapStateToProps = state => {
    return {
        cityData: state.mainWeather.cityData,
        cityFiveDayWeather: state.mainWeather.cityFiveDayWeather,
        currWeather: state.mainWeather.currentWeather,
        selectedCity: state.mainWeather.selectedCity,
        favoritesList: state.favorites.favorites,
        isFahrenheit: state.mainWeather.isFahrenheit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCityData: async (cityName) => {
            const cityData = await weatherService.getCityData(cityName)
            dispatch(actionCreators.getCityData(cityData))

        },
        getFiveDayCityWeather: async (cityKey) => {
            const cityData = await weatherService.getFiveDayCityWeather(cityKey)
            dispatch(actionCreators.getFiveDayCityWeather(cityData))
        },
        getCurrentWeather: async (cityKey) => {
            const cityData = await weatherService.getCurrentWeather(cityKey)
            dispatch(actionCreators.getCurrentWeather(cityData))
        },
        toggleFavorite: async (isFavorite, favoriteCity, favorites) => {
            if (!isFavorite) {
                const favoritesCity = await favoritesService.addToFavorite(favoriteCity, favorites)
                dispatch(actionCreators.addToFavorite(favoritesCity))
            }
            else {
                const newFavorites = favoritesService.deleteFavorite(favoriteCity, favorites)
                dispatch(actionCreators.deleteFavorite(newFavorites))
            }
        },
        loadFavorites: async () => {
            const favorites = await favoritesService.loadFavorites()
            dispatch(actionCreators.loadFavorites(favorites))

        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainForecast)

