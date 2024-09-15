import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
import instance from './instance';
import { Job, Stage } from "../models/job";

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
    console.log("response:" + resp.status)
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


const addStage = async (job: number, stage: string, round: number, comment: string) => {
    let url = 'jobs/stages/'
    const resp = await instance.post(url, {
        job: job, 
        stage: stage,
        round: round,
        comment: comment
    })
    if (resp.status === 201){
        const  stage: Stage = resp.data
        return stage 
    }
    return null
}

export default { JobContext, JobProvider, getJobs, addJob, addStage}