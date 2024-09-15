import { Job } from "../../models/job"
import './swimlane.css'
import  arrow  from './arrow.svg'
import StageForm from "../StageForm/StageForm"
import { SyntheticEvent, useContext, useRef } from "react"
import jobsService from "../../services/jobsService"
const SwimLane = ({job} : {job: Job}) => {
    const ref = useRef<HTMLDialogElement>(null)
    const {jobs, setJobs} = useContext(jobsService.JobContext)
    const getJobs = () => {
        jobsService.getJobs().then((newjobs) => {
            if (newjobs){
                setJobs(newjobs)
            }
        }).catch((error) => {
            setJobs([])
        })
    }

    const addStage = (event: SyntheticEvent) => {
        event.preventDefault()
        event.stopPropagation()
        const target = event.target as typeof event.target & {
            stage: { value: string };
            round: { value: number };
            comment: { value: string };
        };
        jobsService.addStage(
            job.id,
            target.stage.value,
            target.round.value,
            target.comment.value
        ).then((stage) => {
            if (stage){
                getJobs()
            }
        })
        ref.current?.close()
    }

    const displayAddStage = () => {
        ref.current?.showModal()
    }
    
    return(
        <div  className="swimLane">
            <StageForm ref={ref} addStage={addStage}/>
            {job.stages.map((stage, index) => (
                <div key={stage.id} className="job">
                    <div className="jobCard"> 
                        <header className="jobCardHeader">{job.title} at {job.company}</header>
                        <section className="jobCardBody">
                        <div className="jobCardBodyComment">{stage.comment}</div>
                        { stage.round > 0  && <div className="roundNumber">round: {stage.round}</div> }
                        </section>
                    </div>
                    {index == job.stages.length - 1 ?  <img onClick={displayAddStage} className="addArrow" src={arrow} alt="add stage arrow" /> :
                     <svg width="60" height="50"><line x1="0" y1="25" x2="100" y2="25" stroke="#009fb7"/></svg>
                    }
                   
                </div>
            ))}
        </div>

    )
}

export default SwimLane