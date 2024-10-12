import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { User } from "../models/user";

import axios from "axios";
import auth from "./auth";

const BASEURL = "http://127.0.0.1:8000/api/v1/";
const userInstance = axios.create({
  baseURL: BASEURL,
});

let isRefreshing = false;

userInstance.interceptors.request.use((config) => {
  if (!config.url?.includes("refresh")) {
    config.headers.Authorization = "Bearer " + localStorage.getItem("access");
  }

  return config;
});

userInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401 && !isRefreshing) {
      isRefreshing = true;
      const status = await auth.refreshToken();
      isRefreshing = false;
      if (status !== 200) {
        return Promise.reject(error);
      }
      error.config.headers.Authorization =
        "Bearer " + localStorage.getItem("access");
      return userInstance(error.config);
    }
    return Promise.reject(error);
  }
);

export interface UserContextInterface {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const defaultState = {
  user: null,
  setUser: (user: User) => {},
} as UserContextInterface;

export const UserContext = createContext(defaultState);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const checkifloggedIn = async () => {
  const url = "applicant/";
  const resp = await userInstance.get(url);
  if (resp.status === 200) {
    const user: User = resp.data;
    return user;
  }
  return null;
};

export const updateApplicant = async (
  firstName: string,
  lastName: string,
  userEmail: string,
  userBio: string
) => {
  const url = `applicant/`;
  const data = {
    email: userEmail,
    first_name: firstName,
    last_name: lastName,
    bio: userBio,
  };
  const resp = await userInstance.put(url, data);
  if (resp.status === 200) {
    const user: User = resp.data;
    return user;
  }
  return null;
};

export const linkToGMail = async () => {
  const url = "applicant/link/";
  const resp = await userInstance.get(url);
  if (resp.status === 200) {
    const data = resp.data;
    return data.applications;
  }
};
