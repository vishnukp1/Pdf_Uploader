import { createSlice } from "@reduxjs/toolkit";


const loginSlice = createSlice({
  name: "login",
  initialState:true,
  reducers: {
    setLogin: (state) => {
     return state= false;
    },
    setSignup: (state) => {
        return state= true;
       },
  },
});

export const { setLogin,setSignup} = loginSlice.actions;
export default loginSlice.reducer;