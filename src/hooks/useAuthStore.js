import { useDispatch, useSelector } from "react-redux";
import { appEdimca } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const startLogin = async({ username, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await appEdimca.post('/api/login', { username, password });
            localStorage.setItem('token', data.token);
            dispatch(onLogin({ user: data.user.username }));
        } catch (error) {
            dispatch(onLogout('Wrong credentials'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        //properties
        status,
        user,
        errorMessage,

        //methods
        startLogin,
        checkAuthToken,
        startLogout
    }
}