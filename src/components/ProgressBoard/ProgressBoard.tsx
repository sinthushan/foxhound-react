import { SyntheticEvent, useRef } from "react"
import JobForm from "../jobForm/jobForm"
import "./progressboard.css"
import jobs from "../../services/jobs"

const ProgressBoard = () => {
    const ref = useRef<HTMLDialogElement>(null)
    const handleClick = () => {
        ref.current?.showModal()
    }
    const addJob = (event: SyntheticEvent) => {
        event.preventDefault()
        event.stopPropagation()
        const target = event.target as typeof event.target & {
            title: { value: string };
            company: { value: string };
        };
        jobs.addJob(target.title.value, target.company.value)
        ref.current?.close()
    }
    return (
        <div className="maindisplay">
            <JobForm ref={ref} addJob={addJob}/>
            <nav className="controlsNav">
                <button id="addJob" onClick={handleClick}>Add Application</button>
            </nav>
        </div>
    )
}

export default ProgressBoard