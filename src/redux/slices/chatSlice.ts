import { createSlice } from "@reduxjs/toolkit";

const initialState: Array<any> = [];
export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.push(action.payload);
        },
        resetChatMessage: (state,action) => {
            console.log(action.payload);
            return state = [];
        }
    }
})

export const { addMessage,resetChatMessage } = chatSlice.actions
export default chatSlice.reducer