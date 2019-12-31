import { createStore, combineReducers } from 'redux'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
    login: loginReducer
})

export default createStore(reducer)