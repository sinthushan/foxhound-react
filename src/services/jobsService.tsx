import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
import instance from './instance';
import { Job } from "../models/job";

interface JobContextInterface{
    jobs: Job[]|[],
    setJobs: Dispatch<SetStateAction<Job[]|[]>>
}

const defaultState = {
    jobs: [],
    setJobs: (jobs:Job[]) => {}
} as JobContextInterface


const JobContext = createContext(defaultState);

export function JobProvider({children}:{children: ReactNode}){
    const [jobs, setJobs] = useState<Job[]| []>([])
    return(
        <JobContext.Provider value={{jobs, setJobs}}>
            {children}
        </JobContext.Provider>
    )
}

const getJobs = async () => {
    let url = 'jobs/'
    const resp = await instance.get(url)
    if (resp.status === 200){
        const  jobs: Job[] = resp.data
        return jobs 
     }
     return null
}

const addJob = async (title: string, company: string) => {
    let url = 'jobs/'
    const resp = await instance.post(url, {
        title: title, 
        company: company
    })
    if (resp.status === 201){
        const  job: Job = resp.data
        return job 
    }
    return null
}

export default { JobContext, JobProvider, getJobs, addJob}