import {createSlice} from "@reduxjs/toolkit";

const classesstore = createSlice({
    name:"classesstore",
    initialState:{
        "data":[]
    },
    reducers:{addclassdata(state,action){
        state.data = action.payload; 

    }}
})

export default classesstore.reducer;
export const {addclassdata} = classesstore.actions;