import { createSlice } from '@reduxjs/toolkit';


export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.products.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.products = state.products.map(product => {
                if (product.id === payload.id) {
                    return payload;
                }
                return product;
            })
        },
        onDeleteEvent: (state, { payload }) => {
            state.products = state.products.filter(product => product.id !== payload.id);
            state.activeEvent = null;
        },
        onLoadEvent: (state, { payload = [] }) => {
            //state.products = payload;
            payload.forEach(product => {
                const exist = state.products.some(dbProduct => dbProduct.id === product.id);
                if (!exist) {
                    state.products.push(product);
                }
            })
        }

    }
});
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvent } = productSlice.actions;