import {createStore,combineReducers} from 'redux'
import authReducer from './Reducer/Auth'
import userReducer from './Reducer/User'

const rootReducer = combineReducers({

    auth:authReducer,
    user:userReducer
})
const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

