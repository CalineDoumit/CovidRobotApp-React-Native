import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Patients } from './patients';
import { Robots } from './robots';
import { Auth } from './auth';
import { Users } from './users';
//import { composeWithDevTools } from 'redux-devtools-extension';
//import { persistStore, persistCombineReducers } from 'redux-persist';
//import AsyncStorage from '@react-native-async-storage/async-storage';


/*const config = {
    key: 'root',
    storage:AsyncStorage,
    debug: true
  }*/

export const ConfigureStore = () => {
    //const store = createStore(
       // persistCombineReducers(config, {
        const store = createStore(
            combineReducers({
            patients:Patients,
            robots:Robots,
            auth:Auth,
            users:Users
        }),
         //composeWithDevTools(
            applyMiddleware(thunk, logger),
        //)
    );

   // const persistor = persistStore(store)

    //return { persistor, store };
    return store;
}
