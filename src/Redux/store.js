import portfolioSlice from "./portfolioSlice";
import {configureStore} from "@reduxjs/toolkit";

const store=configureStore({
    reducer:{
        portfolio:portfolioSlice,
    }
});

export default store;