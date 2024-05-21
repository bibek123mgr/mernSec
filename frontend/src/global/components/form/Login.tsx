import React from 'react';
import Form, { login } from './Form';
// import { API } from '../../http/AxiosConfig';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../store/slice/AuthSlice';

const Login: React.FC = () => {
  const dispatch=useDispatch()
  const INPUT_DATA = [
    { name: 'email', type: 'text', placeholder: 'email' },
    { name: 'password', type: 'password', placeholder: 'password' },
  ];

  // const handleSubmit =async (data:any) => {
  // try {
  //     const response = await API.post('auth/login', data)
  //   console.log(response.data.data)
  // } catch (error) {
  //   console.log(error)
  // }
  // };

   const handleSubmit = async(data:any) => {
   await dispatch(loginUser(data))
  };

  return (
    <div>
      <Form inputData={INPUT_DATA} page="login" onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
