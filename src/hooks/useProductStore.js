import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvent, onSetActiveEvent, onUpdateEvent } from "../store/product/productSlice";
import { appEdimca } from "../api";

export const useProductStore = () => {


    const dispatch = useDispatch();
    const { products, activeEvent } = useSelector(state => state.product);

    const setActiveEvent = (productEvent) => {
        dispatch(onSetActiveEvent(productEvent))
    };

    const startSavingEvent = async(product) => {
        if (product.id) {
            const { data } = await appEdimca.post('/product/add', product);
            dispatch(onUpdateEvent({...product }));
        } else {
            try {
                const { data } = await appEdimca.post('/product/add', product);
                dispatch(onAddNewEvent({...product, id: data.product.id }));
            } catch (error) {
                console.log(error);
            }
        }
    }

    const deleteEvent = async(product) => {
        try {
            const { data } = await appEdimca.delete(`/product/delete/${product.id}`);
            dispatch(onDeleteEvent({...product }));
        } catch (error) {

            console.log(error);

        }

    }


    const startLoadingProducts = async() => {
        try {
            const { data } = await appEdimca.get('/product/list')
            dispatch(onLoadEvent(data));
        } catch (error) {
            console.log(error);
        }
    }

    return {

        //properties
        products,
        activeEvent,

        //methods
        setActiveEvent,
        startSavingEvent,
        deleteEvent,
        startLoadingProducts
    }
}