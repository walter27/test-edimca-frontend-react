import { useDispatch, useSelector } from "react-redux";
import { onCloseAppModal, onOpenAppModal } from "../store/ui/uiSlice";

export const useUiStore = () => {

    const dispatch = useDispatch();
    const { isAppModalOpen } = useSelector(state => state.ui);
    const openModalApp = () => {
        dispatch(onOpenAppModal());
    }
    const closeModalApp = () => {
        dispatch(onCloseAppModal());
    }
    return {
        //properties
        isAppModalOpen,

        //methods
        openModalApp,
        closeModalApp
    }
}