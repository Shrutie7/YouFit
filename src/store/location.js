import { createSlice } from "@reduxjs/toolkit"



const location = createSlice({
    name: "location",
    initialState: {
        "state": {

        }
    },
    reducers: {
        addloc(state, action) {
            state.state = action.payload
        }
    }
})

export const { addloc } = location.actions
export default location.reducer