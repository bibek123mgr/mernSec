// Login.tsx
import React from 'react';
import Form from '../components/Form';
const Login: React.FC = () => {
    return (
        <div>
            {/* Pass the prop page to the Form component */}
            <Form page="1"/>
        </div>
    );
};

export default Login;
