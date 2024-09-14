import { SyntheticEvent, useContext, useEffect, useRef } from "react"
import JobForm from "../jobForm/jobForm"
import "./progressboard.css"
import jobsService from "../../services/jobsService"


const ProgressBoard = () => {
    
    const {jobs, setJobs} = useContext(jobsService.JobContext)
    const ref = useRef<HTMLDialogElement>(null)
    const handleClick = () => {
        ref.current?.showModal()
    }
    
    useEffect(() => {
        jobsService.getJobs().then(
          (newjobs) => {
            if (newjobs){
              setJobs(newjobs)
            }
          }
        )
    }, [])
    const addJob = (event: SyntheticEvent) => {
        event.preventDefault()
        event.stopPropagation()
        const target = event.target as typeof event.target & {
            title: { value: string };
            company: { value: string };
        };
        jobsService.addJob(target.title.value, target.company.value).then((job) => {
            if (job){
                setJobs([job, ...jobs])
            }
        })
        ref.current?.close()
    }
    return (
        <div className="maindisplay">
            <JobForm ref={ref} addJob={addJob}/>
            <nav className="controlsNav">
                <button id="addJob" onClick={handleClick}>Add Application</button>
                
               
            </nav>
            {jobs.map((job) => <div key={job.id}>{job.title}</div>)}
        </div>
    )
}

export default ProgressBoard