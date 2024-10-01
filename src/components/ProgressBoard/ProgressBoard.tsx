import { SyntheticEvent, useContext, useEffect, useRef } from "react";
import JobForm from "../jobForm/jobForm";
import "./progressboard.css";
import jobsService from "../../services/jobsService";
import { UserContext } from "../../services/user";
import SwimLane from "../SwimLane/SwimLane";

const ProgressBoard = () => {
  const { user } = useContext(UserContext);
  const { jobs, setJobs } = useContext(jobsService.JobContext);
  const ref = useRef<HTMLDialogElement>(null);
  const handleClick = () => {
    ref.current?.showModal();
  };

  useEffect(() => {
    jobsService
      .getJobs()
      .then((newjobs) => {
        if (newjobs) {
          setJobs(newjobs);
        }
      })
      .catch(() => {
        setJobs([]);
      });
  }, [user]);

  const addJob = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as typeof event.target & {
      title: { value: string };
      company: { value: string };
    };
    jobsService.addJob(target.title.value, target.company.value).then((job) => {
      if (job) {
        setJobs([job, ...jobs]);
      }
    });
    ref.current?.close();
  };

  const closeDialog = (event: SyntheticEvent) => {
    if (event.target == ref.current) {
      ref.current?.close();
    }
  };

  return (
    <div className="maindisplay">
      <JobForm ref={ref} addJob={addJob} closeDialog={closeDialog} />
      <nav className="controlsNav">
        <button id="addJob" onClick={handleClick}>
          Add Application
        </button>
      </nav>
      <main className="jobSection">
        {jobs.map((job) => (
          <SwimLane key={job.id} job={job}></SwimLane>
        ))}
      </main>
    </div>
  );
};

export default ProgressBoard;
