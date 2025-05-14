import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../store/authSlice';
import axiosInstance from  "../api/axiosConfig.js"

const AuthLoader = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await axiosInstance.get('/verify', {
                    withCredentials: true,
                });
                dispatch(login(res.data.success));
            } catch {
                dispatch(logout());
            }
        };

        verifyUser();
    }, [dispatch]);

    return children;
};

export default AuthLoader;