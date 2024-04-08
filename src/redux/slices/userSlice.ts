import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: "",
        active_users: null,
        senderSocket: {},
        connectedUserInfo: {},
    },
    reducers: {
        setName: (state,action) => {
            state.name = action.payload;
        },
        setActiveUsers: (state,action) => {
            state.active_users = action.payload
        },
        setSenderSocket: (state,action) => {
            state.senderSocket = action.payload
        },
        setConnectedUserInfo: (state,action) => {
            state.connectedUserInfo = action.payload
        }
    }
})

export const { setName,setActiveUsers,setSenderSocket,setConnectedUserInfo} = userSlice.actions;
export default userSlice.reducer;