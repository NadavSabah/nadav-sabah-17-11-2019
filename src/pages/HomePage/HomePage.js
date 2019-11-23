import React, { useState } from 'react'
import UserInput from '../../components/UserInput/UserInput.cmp'
import MainForecast from '../../components/MainForecast/MainForecast.cmp'

const HomePage = () => {
    return (
        <div>
            <UserInput></UserInput>
            <MainForecast></MainForecast>

        </div>
    )
}
export default HomePage
