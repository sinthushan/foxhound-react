import { forwardRef, SyntheticEvent } from "react";
import "./editUserForm.css";
import { User } from "../../models/user";

type MyProps = {
  user: User;
  updateUser: (event: SyntheticEvent) => void;
  closeDialog: (event: SyntheticEvent) => void;
};

export const EditUserForm = forwardRef<HTMLDialogElement, MyProps>(
  (props, ref) => {
    return (
      <dialog id="editUserDialog" ref={ref} onClick={props.closeDialog}>
        <div className="editUserFormContainer">
          <form id="editUserForm" onSubmit={props.updateUser}>
            <div className="form-control">
              <label className="editUserFormLabel" htmlFor="firstName">
                First Name:
              </label>
              <input
                className="editUserFormInput"
                id="firstName"
                name="firstName"
                defaultValue={props.user.first_name}
              />
            </div>
            <div className="form-control">
              <label className="editUserFormLabel" htmlFor="lastName">
                last Name:
              </label>
              <input
                className="editUserFormInput"
                id="lastName"
                name="lastName"
                defaultValue={props.user.last_name}
              />
            </div>
            <div className="form-control">
              <label className="editUserFormLabel" htmlFor="userEmail">
                Email:
              </label>
              <input
                className="editUserFormInput"
                id="userEmail"
                name="userEmail"
                defaultValue={props.user.email}
              />
            </div>
            <div className="form-control">
              <label className="editUserFormLabel" htmlFor="userBio">
                Bio:
              </label>
              <input
                className="editUserFormInput"
                id="userBio"
                name="userBio"
                defaultValue={props.user.bio}
              />
            </div>
            <div className="form-control">
              <button type="submit">Update User</button>
            </div>
          </form>
        </div>
      </dialog>
    );
  }
);
