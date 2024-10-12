import { SyntheticEvent, useContext, useRef } from "react";
import { updateApplicant, UserContext } from "../services/user";
import defaultProfilePicture from "../assets/defaultProfilePricture.svg";
import auth from "../services/auth";
import { PasswordChangeForm } from "../components/PasswordChange/PasswordChangeForm";
import { EditUserForm } from "../components/EditUserForm/EditUserForm";
const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const ref = useRef<HTMLDialogElement>(null);
  const userRef = useRef<HTMLDialogElement>(null);
  let avatar: string = "";

  if (user?.avatar) {
    avatar = user?.avatar;
  } else {
    avatar = defaultProfilePicture;
  }
  const openUpdatePassword = () => ref.current?.showModal();

  const openEditProfile = () => userRef.current?.showModal();

  const closeDialog = (event: SyntheticEvent) => {
    if (event.target == ref.current) {
      ref.current?.close();
    }
  };

  const closeUserDialog = (event: SyntheticEvent) => {
    if (event.target == userRef.current) {
      userRef.current?.close();
    }
  };

  const updateProfile = (event: SyntheticEvent) => {
    const target = event.target as typeof event.target & {
      firstName: { value: string };
      lastName: { value: string };
      userEmail: { value: string };
      userBio: { value: string };
    };
    updateApplicant(
      target.firstName.value,
      target.lastName.value,
      target.userEmail.value,
      target.userBio.value
    ).then((updatedApplicant) => setUser(updatedApplicant));
  };
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
      <EditUserForm
        user={user!}
        updateUser={updateProfile}
        closeDialog={closeUserDialog}
        ref={userRef}
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
        <button className="editProfile" onClick={openEditProfile}>
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
