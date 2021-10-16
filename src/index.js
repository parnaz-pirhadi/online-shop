import React from 'react';
import ReactDOM from 'react-dom';
import Content from "../src/component/common/Content";
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from "../src/reducers/index";
import {BrowserRouter} from "react-router-dom";
import './content/style/generalCss.scss';
import { PersistGate } from "redux-persist/integration/react";
import 'font-awesome/css/font-awesome.css';
import reduxStore from "./store/reduxStore";
import ApiInterceptor from "./api/ApiInterceptor";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "root",
    storage
};

ApiInterceptor.setupInterceptors(reduxStore);
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)));
const persistor = persistStore(store);


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Content className="main"/>
            </BrowserRouter>
        </PersistGate>

    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
