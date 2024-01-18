
import {createSlice} from "@reduxjs/toolkit";

let data = {}
const loginDetails = createSlice({
    name:"logindetails",
    initialState:data,
    reducers:{
        addLoginReducer:(state,action)=>{
            state.data = action.payload
        }
    }
})

export default loginDetails.reducer;
export const {addLoginReducer} = loginDetails.actions;