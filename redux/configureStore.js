import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { patients } from './patients';
import { robots } from './robots';
import { auth } from './auth';
import { users } from './users';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from 'redux-persist/es/storage';


const config = {
    key: 'root',
    storage:AsyncStorage,
    debug: true
  }

export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            patients,
            robots,
            auth,
            users
        }),
         composeWithDevTools(
            applyMiddleware(thunk, logger),
        )
    );

    const persistor = persistStore(store)

    return { persistor, store };
}
