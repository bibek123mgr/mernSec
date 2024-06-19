import React, { useEffect } from "react";
import Form from "../Form";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { STATUSES, UserLoginType } from "../../../type/Type";
import { login, resetStatus } from "../../../store/authSlice";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((store) => store.auth);

  const handleLogin = (data: UserLoginType) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (status === STATUSES.SUCCESS) {
      onLogin();
    }
    if (status !== STATUSES.IDLE) {
      dispatch(resetStatus());
    }
  }, [status, dispatch, onLogin]);

  return (
    <div>
      <Form page="signin" onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
