import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isAppModalOpen: false
    },
    reducers: {
        onOpenAppModal: (state) => {
            state.isAppModalOpen = true;
        },
        onCloseAppModal: (state) => {
            state.isAppModalOpen = false;
        }
    }
});
export const { onOpenAppModal, onCloseAppModal } = uiSlice.actions;