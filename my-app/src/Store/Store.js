import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducers/UserReducer";
import loginReducer from "../Reducers/loginReducer";
import addstaffReducer from "../Reducers/addUser";



export const store = configureStore({
    reducer:{
      auth: authReducer,
      login:loginReducer,
      addstaff:addstaffReducer
      
    
    }
})