import { configureStore } from "@reduxjs/toolkit";
import CartSliceReducer from "./Cart";
import AuthSliceReducer from "./Auth";

const store = configureStore({
    reducer : {
        auth: AuthSliceReducer,
        cart: CartSliceReducer
    }
})

export default store