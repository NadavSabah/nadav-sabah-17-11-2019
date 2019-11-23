import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import weatherReducer from './store/reducers/weatherReducer'
import favoritesReducer from './store/reducers/favoritesReducer'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
    mainWeather: weatherReducer,
    favorites: favoritesReducer
})


const myMiddleware = store => {
    return next => {
        return action => {
            // console.log('[Middleware] Dispactching ', action);
            // this will let the action continue to the reducer, though for that to succeed, we need to pass the action as an argument
            const result = next(action)
            // console.log('[Middleware next state: ', store.getState())
            return result
        }
    }
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(myMiddleware, thunk)));
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(myMiddleware,thunk)));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
