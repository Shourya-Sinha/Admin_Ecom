import { combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";

import AppReducer from './Slices/InitialSlice.jsx';
import AuthReducer from './Slices/AusthSlice.jsx';
import ProductReducer from './Slices/DataSlice.jsx';

const rootPersistConfig={
    key: 'root',
    storage,
    keyPrefix:'redux-',
    whitelist: ['auth', 'app','productData'],
}

const rootReducer = combineReducers({
    app:AppReducer,
    auth:AuthReducer,
    productData:ProductReducer
});

export {rootPersistConfig,rootReducer};