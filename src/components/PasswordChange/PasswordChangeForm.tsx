import { forwardRef, SyntheticEvent } from "react";
import "./passwordChangForm.css";

type MyProps = {
  updatePassword: (event: SyntheticEvent) => void;
  closeDialog: (event: SyntheticEvent) => void;
};

export const PasswordChangeForm = forwardRef<HTMLDialogElement, MyProps>(
  (props, ref) => {
    return (
      <dialog id="passwordChangeDialog" ref={ref} onClick={props.closeDialog}>
        <div className="passwordChangeFormContainer">
          <form id="passwordChangeForm" onSubmit={props.updatePassword}>
            <div className="form-control">
              <label className="passwordChangeFormLabel" htmlFor="oldPassword">
                Old Password:
              </label>
              <input
                className="passwordChangeFormInput"
                id="oldPassword"
                name="oldPassword"
                type="password"
              />
            </div>
            <div className="form-control">
              <label className="passwordChangeFormLabel" htmlFor="newPassword">
                New Password:
              </label>
              <input
                className="passwordChangeFormInput"
                id="newPassword"
                name="newPassword"
                type="password"
              />
            </div>
            <div className="form-control">
              <label
                className="passwordChangeFormLabel"
                htmlFor="confirmPassword"
              >
                Confirm New Password:
              </label>
              <input
                className="passwordChangeFormInput"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />
            </div>
            <div className="form-control">
              <button type="submit">Change Password</button>
            </div>
          </form>
        </div>
      </dialog>
    );
  }
);
