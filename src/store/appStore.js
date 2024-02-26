import { configureStore,combineReducers } from "@reduxjs/toolkit";
import logindetails from "./LoginDetails";
import keycloakSession from "./KeycloakSession";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from "redux-persist";
import location from "./location";
import classesstore from "./classesstore";
let persistConfig = {
    key: "root",
    storage
  }

const rootreducer = combineReducers({ logindetails: logindetails,keycloakSession:keycloakSession,location:location,classesstore:classesstore})

const persistrducr = persistReducer(persistConfig, rootreducer)
const appStore = configureStore({
    reducer:persistrducr
})
let prststre = persistStore(appStore);
export default appStore;
export {prststre};