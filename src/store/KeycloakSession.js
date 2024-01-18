import {createSlice} from "@reduxjs/toolkit"

const data={}

const keycloakSession = createSlice({
    name:"keycloakSession",
    initialState:{...data},
    reducers:{
        keycloakSessionreducer(state,action){
            console.log(action)
        state.data={...action.payload}
        }

    }
})

export const {keycloakSessionreducer}=keycloakSession.actions
export default keycloakSession.reducer