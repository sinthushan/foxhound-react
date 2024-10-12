import axios from "axios";

const AUTH_BASEURL = "http://127.0.0.1:8000/api/v1/dj-rest-auth/";
const authInstance = axios.create({
  baseURL: AUTH_BASEURL,
});

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

const login = async (username: string, password: string) => {
  const url = "login/";
  const resp = await authInstance.post(url, {
    username: username,
    password: password,
  });
  if (resp.status === 200) {
    localStorage.setItem("access", resp.data["access"]);
    localStorage.setItem("refresh", resp.data["refresh"]);
    return resp.data["user"];
  }
  return null;
};

const register = async (
  username: string,
  email: string,
  password: string,
  confirm_password: string
) => {
  const url = "registration/";
  const resp = await authInstance.post(url, {
    username: username,
    email: email,
    password1: password,
    password2: confirm_password,
  });
  if (resp.status === 200) {
    localStorage.setItem("access", resp.data["access"]);
    localStorage.setItem("refresh", resp.data["refresh"]);
    return resp.data["user"];
  }
  return null;
};

const logout = async () => {
  const token = localStorage.getItem("refresh");
  const url = "logout/";
  const resp = await authInstance.post(url, {
    refresh: token,
  });
  if (resp.status === 200) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }
};

const passwordChange = async (
  oldpassword: string,
  newpassword: string,
  confirm_password: string
) => {
  const url = "password/change/";
  const resp = await authInstance.post(
    url,
    {
      new_password1: newpassword,
      new_password2: confirm_password,
      old_password: oldpassword,
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    }
  );
};

const passwordReset = async (email: string) => {
  const url = "password/reset/";
  const resp = await authInstance.post(url, { email: email });
  if (resp.status === 200) {
    return "Email sent";
  }
  return "Something went wrong";
};

const refreshToken = async () => {
  const token = localStorage.getItem("refresh");
  const url = "token/refresh/";
  const resp = await authInstance.post(url, {
    refresh: token,
  });
  localStorage.setItem("access", resp.data["access"]);

  return resp.status;
};

export default {
  login,
  refreshToken,
  register,
  logout,
  passwordChange,
  passwordReset,
};
