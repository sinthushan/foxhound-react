import { SyntheticEvent, useContext, forwardRef, useRef } from "react";
import auth from "../services/auth";
import logo from "../assets/foxhound.png";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { UserContext } from "../services/user";
const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const ref = useRef<HTMLDialogElement>(null);

  const login = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };
    auth.login(target.username.value, target.password.value).then((user) => {
      if (user) {
        setUser(user);
        navigate("/");
      }
    });
  };
  const resetPassword = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const target = event.target as typeof event.target & {
      email: { value: string };
    };
    auth.passwordReset(target.email.value).then((resp) => console.log(resp));
    target.email.value = "";
    ref.current?.close();
  };
  const closeDialog = (event: SyntheticEvent) => {
    if (event.target == ref.current) {
      ref.current?.close();
    }
  };
  const openResetPasswordDialog = () => {
    ref.current?.showModal();
  };

  return (
    <div className="container">
      <ResetPasswordForm
        ref={ref}
        resetPassword={resetPassword}
        closeDialog={closeDialog}
      />
      <header>
        <img className="logo-image" src={logo} alt="foxhound logo" />
      </header>
      <form id="loginForm" onSubmit={login}>
        <div className="form-control">
          <label htmlFor="username">username :</label>
          <input id="username" name="username" />
        </div>
        <div className="form-control">
          <label htmlFor="password">password :</label>
          <input type="password" id="password" name="password" />
        </div>
        <div className="form-control">
          <button type="submit">login</button>
        </div>
        <div className="forgotPass" onClick={openResetPasswordDialog}>
          Forgot Password
        </div>
      </form>
    </div>
  );
};

type MyProps = {
  resetPassword: (event: SyntheticEvent) => void;
  closeDialog: (event: SyntheticEvent) => void;
};

const ResetPasswordForm = forwardRef<HTMLDialogElement, MyProps>(
  (props, ref) => {
    return (
      <dialog id="resetDialog" ref={ref} onClick={props.closeDialog}>
        <div className="resetFormContainer">
          <form id="resetForm" onSubmit={props.resetPassword}>
            <div className="form-control">
              <label className="resetFormLabel" htmlFor="email">
                Email:
              </label>
              <input className="resetFormInput" id="email" name="email" />
            </div>
            <button type="submit">Send Reset Link To email</button>
          </form>
        </div>
      </dialog>
    );
  }
);

export default Login;
