import { SyntheticEvent, useContext, useRef } from "react";
import { UserContext } from "../services/user";
import defaultProfilePicture from "../assets/defaultProfilePricture.svg";
import auth from "../services/auth";
import { PasswordChangeForm } from "../components/PasswordChange/PasswordChangeForm";
const Profile = () => {
  const { user } = useContext(UserContext);
  const ref = useRef<HTMLDialogElement>(null);
  let avatar: string = "";

  if (user?.avatar) {
    avatar = user?.avatar;
  } else {
    avatar = defaultProfilePicture;
  }
  const openUpdatePassword = () => ref.current?.showModal();
  const closeDialog = (event: SyntheticEvent) => {
    if (event.target == ref.current) {
      ref.current?.close();
    }
  };
  const updateProfile = () => {};
  const updatePassword = (event: SyntheticEvent) => {
    const target = event.target as typeof event.target & {
      oldPassword: { value: string };
      newPassword: { value: string };
      confirmPassword: { value: string };
    };
    auth.passwordChange(
      target.oldPassword.value,
      target.newPassword.value,
      target.confirmPassword.value
    );
  };

  return (
    <main className="userProfile">
      <PasswordChangeForm
        updatePassword={updatePassword}
        closeDialog={closeDialog}
        ref={ref}
      />
      <img src={avatar} alt="profile picture" className="profilePicture" />
      <section className="ProfileBody">
        <div className="firstname userfield">
          <span>First Name: </span>
          <div className="content">{user?.first_name}</div>
        </div>
        <div className="lastname userfield">
          <span>Last Name: </span>
          <div className="content">{user?.last_name}</div>
        </div>
        <div className="email userfield">
          <span>Email: </span>
          <div className="content">{user?.email}</div>
        </div>
        <div className="bio userfield">
          <span>Bio: </span>
          <div className="content">{user?.bio}</div>
        </div>
      </section>
      <div className="profileActions">
        <button className="editProfile" onClick={updateProfile}>
          Edit Profile
        </button>
        <button className="changePassword" onClick={openUpdatePassword}>
          Change Password
        </button>
      </div>
    </main>
  );
};

export default Profile;
