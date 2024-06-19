import Form from "../Form";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { register, resetStatus } from "../../../store/authSlice";
import { STATUSES, userDataType } from "../../../type/Type";
import React, { useEffect } from "react";

interface LoginProps {
  onLogin: () => void;
}

const Signup: React.FC<LoginProps> = ({ onLogin }) => {
  const dispatch = useAppDispatch();
  const handleRegister = (data: userDataType) => {
    dispatch(register(data));
  };
  const { status } = useAppSelector((store) => store.auth);
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
      <Form page="signup" onSubmit={handleRegister} />
    </div>
  );
};

export default Signup;
