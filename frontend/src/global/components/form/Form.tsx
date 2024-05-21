import React, { useState, ChangeEvent, FormEvent } from 'react';

type InputData = {
  name: string;
  type: string;
  placeholder: string;
};

export interface login{
    email: string;
    password: string;

}
export interface register extends login{
    username: string;
}
type UserInfo = {
  login: login,
  register:register
};

type FormProps = {
  onSubmit: (data: { email: string; password: string; } | { username: string; email: string; password: string }) => void;
  inputData: InputData[];
  page: 'login' | 'register';
};

const Form: React.FC<FormProps> = ({ inputData, page, onSubmit }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    login: {
      email: '',
      password: ''
    },
    register: {
      username: '',
      email: '',
      password: ''
    }
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>, page: 'login' | 'register') => {
    const { name, value } = e.target;
    setUserInfo((state) => ({
      ...state,
      [page]: {
        ...state[page],
        [name]: value
      }
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = page === 'login' ? userInfo.login : userInfo.register;
    onSubmit(data);
  };

  return (
    <div className="flex items-center justify-center min-h-[78vh]">
      <form method="post" className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center">{page === 'login' ? 'Login' : 'Register'}</h2>
        {inputData.map((data) => (
          <input
            key={data.name}
            type={data.type}
            name={data.name}
            placeholder={data.placeholder}
            value={userInfo[page][data.name as keyof typeof userInfo[typeof page]]}
            onChange={(e) => onChange(e, page)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          {page === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Form;


