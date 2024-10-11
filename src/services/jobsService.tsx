import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Job, Stage } from "../models/job";

import axios from "axios";
import auth from "./auth";

const BASEURL = "http://127.0.0.1:8000/api/v1/";
const jobInstance = axios.create({
  baseURL: BASEURL,
});

let isRefreshing = false;

jobInstance.interceptors.request.use((config) => {
  if (!config.url?.includes("refresh")) {
    config.headers.Authorization = "Bearer " + localStorage.getItem("access");
  }

  return config;
});

jobInstance.interceptors.response.use(
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

      return jobInstance(error.config);
    }
    return Promise.reject(error);
  }
);

interface JobContextInterface {
  jobs: Job[] | [];
  setJobs: Dispatch<SetStateAction<Job[] | []>>;
}

const defaultState = {
  jobs: [],
  setJobs: (jobs: Job[]) => {},
} as JobContextInterface;

const JobContext = createContext(defaultState);

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[] | []>([]);
  return (
    <JobContext.Provider value={{ jobs, setJobs }}>
      {children}
    </JobContext.Provider>
  );
}

const getJobs = async () => {
  const url = "jobs/";
  const resp = await jobInstance.get(url);
  if (resp.status === 200) {
    const jobs: Job[] = resp.data;
    return jobs;
  }
  return null;
};

const addJob = async (title: string, company: string) => {
  const url = "jobs/";
  const resp = await jobInstance.post(url, {
    title: title,
    company: company,
  });
  if (resp.status === 201) {
    const job: Job = resp.data;
    return job;
  }
  return null;
};

const removeJob = async (id: number) => {
  const url = `jobs/${id}/`;
  const resp = await jobInstance.delete(url);
  if (resp.status === 200 || resp.status === 204) {
    return true;
  }

  return false;
};

const addStage = async (
  job: number,
  stage: string,
  round: number,
  comment: string
) => {
  const url = "jobs/stages/";
  const resp = await jobInstance.post(url, {
    job: job,
    stage: stage,
    round: round,
    comment: comment,
  });
  if (resp.status === 201) {
    const stage: Stage = resp.data;
    return stage;
  }
  return null;
};

export default {
  JobContext,
  JobProvider,
  getJobs,
  addJob,
  addStage,
  removeJob,
};
