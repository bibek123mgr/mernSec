import React from 'react';
import Form from './Form';
import { API } from '../../http/AxiosConfig';

const Signup: React.FC = () => {
  const INPUT_DATA = [
      { name: 'username', type: 'text', placeholder: 'username' },
    { name: 'email', type: 'text', placeholder: 'email' },
    { name: 'password', type: 'password', placeholder: 'password' }
  ];

  const handleRegister = async(data: any) => {
try {
    const response = await API.post('auth/register', data)
    console.log(response.data.data)
} catch (error) {
  console.log(error)
}
  };

  return (
    <div>
      <Form inputData={INPUT_DATA} page="register" onSubmit={handleRegister} />
    </div>
  );
};

export default Signup;
