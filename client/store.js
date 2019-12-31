import { createStore, combineReducers } from 'redux'
import loginReducer from './reducers/loginReducer'
import mapReducer from './reducers/mapReducer'

const reducer = combineReducers({
    login: loginReducer,
    map: mapReducer
})

export default createStore(reducer)