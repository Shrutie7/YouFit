import { configureStore } from "@reduxjs/toolkit";
import LoginDetailsSliceReducer from "./LoginDetails";
import keycloaksessionslice from "./KeycloakSession";

const appStore = configureStore({
    reducer:{
        logindetails:LoginDetailsSliceReducer,
        keycloakSession:keycloaksessionslice
    }
})

export default appStore;