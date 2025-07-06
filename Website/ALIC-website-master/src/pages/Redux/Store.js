import { configureStore } from "@reduxjs/toolkit";
import leadSourceReducer from "./CourseSlice";
import queryReducer from "./Query/QuerySlice"


export const store = configureStore({
  reducer: {
    leadsource: leadSourceReducer,
    querysourse : queryReducer
   
  },
});