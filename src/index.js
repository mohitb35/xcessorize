import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import reduxThunk from 'redux-thunk';

import './index.css';

import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary';
import reducers from './reducers';

const persistConfig = {
	key: 'xcessorize',
	storage,
	blacklist: ['errors']
  }

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	persistedReducer, 
	composeEnhancers(applyMiddleware(reduxThunk))
);

const persistor = persistStore(store);

ReactDOM.render(
			<Provider store={store}>
				<ErrorBoundary>
					<PersistGate loading={null} persistor={persistor}>
						<App />
					</PersistGate>
				</ErrorBoundary>
			</Provider>,
  document.getElementById('root')
);
