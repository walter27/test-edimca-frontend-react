import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { productSlice } from './product/productSlice'
import { uiSlice } from './ui/uiSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        product: productSlice.reducer
    },
})