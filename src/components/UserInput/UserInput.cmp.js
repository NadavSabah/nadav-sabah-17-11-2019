import React, { useState } from 'react'
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index'
import weatherService from '../../services/weatherService/weatherService'
import './UserInput.cmp.css'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button'




const UserInput = ({ getCityData, getFiveDayCityWeather, getCurrentWeather, getAutoCompleteResult }) => {
    const [cityName, setCityName] = useState('')
    const [renderAutoComplete, setrenderAutoComplete] = useState(null)


    const inputChangeHandler = async (event) => {
        setCityName(event.target.value)
        const results = await getAutoCompleteResult(event.target.value)

        if (results.length) {

            setrenderAutoComplete(
                <ul className="autocomplete">
                    {results.map(result => <li key={result.id} onClick={() => suggestSelected(result.cityName)}>{result.cityName}</li>)}
                </ul>
            )
        }
        else {
            setrenderAutoComplete(null)

        }
    }

    const suggestSelected = (suggest) => {
        setCityName(suggest)
        getCityData(suggest)
        setrenderAutoComplete(null)
    }

    const handleSubmit = async (event) => {
        let regexEnglishLetters = /^[a-zA-Z]+$/.test(cityName)

        if (regexEnglishLetters) {
            try{
                event.preventDefault()
                setrenderAutoComplete(null)
                const cityKey = await getCityData(cityName)
                await getFiveDayCityWeather(cityKey)
                await getCurrentWeather(cityKey)

            }catch (error) {console.log('the error is',error)}
        }
        else {
            event.preventDefault()
            Swal.fire(
                'Error',
                'I Understand only english',
                'error'
            )
        }


    }
    return (

        <React.Fragment>
            <div className="form-container">

                <form className="form flex" onSubmit={handleSubmit}>

                    <input
                        type="search"
                        placeholder="pick a city"
                        onChange={inputChangeHandler}
                        value={cityName}
                    />
                   <Button variant="secondary" className="rounded-0">Search</Button>
                </form>
                {renderAutoComplete}
            </div>
        </React.Fragment>
    )
}

const mapsStateToProps = state => {
    return {
        cityData: state.mainWeather.cityData,
        cityFiveDayWeather: state.mainWeather.cityFiveDayWeather,

    }
}
const mapsDispatchToProps = dispatch => {
    return {
        getCityData: async (cityName) => {
            const cityData = await weatherService.getCityData(cityName)

            dispatch(actionCreators.getCityData(cityData))
            return cityData.Key

        },
        getFiveDayCityWeather: async (cityKey) => {
            const cityData = await weatherService.getFiveDayCityWeather(cityKey)
            dispatch(actionCreators.getFiveDayCityWeather(cityData))

        },
        getCurrentWeather: async (cityKey) => {
            const cityData = await weatherService.getCurrentWeather(cityKey)
            dispatch(actionCreators.getCurrentWeather(cityData))

        },
        getAutoCompleteResult: async (userInput) => {
            const autoCompleteResultData = await weatherService.getAutoCompleteResult(userInput)
            return autoCompleteResultData

        }

    }
}
export default connect(mapsStateToProps, mapsDispatchToProps)(UserInput)
