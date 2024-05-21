// Login.tsx
import React from 'react';
import Form from '../Form';
import {useDispatch } from 'react-redux';
import { loginUser } from '../../../store/slice/AuthSlice';
const Login: React.FC = () => {
    const dispatch = useDispatch()
    const handleLogin = (data) => {
        dispatch(loginUser(data))
    }
    return (
        <div>
            {/* Pass the prop page to the Form component */}
            <Form page="1" action={handleLogin} />
        </div>
    );
};

export default Login;
