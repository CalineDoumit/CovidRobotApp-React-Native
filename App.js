import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent';

//const store = ConfigureStore();
const { persistor, store } = ConfigureStore();



export default class App extends React.Component {
  render() {
    /*return (
      <Provider store={store}>
        <Main />
      </Provider>
    );*/

    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
         <PersistGate 
          loading={<Loading />}
          persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
