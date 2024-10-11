import { linkToGMail } from "../services/user";
import gmail from "../assets/Gmail.svg";
import { SyntheticEvent, useContext, useRef, useState } from "react";
import JobForm from "../components/jobForm/jobForm";
import jobsService from "../services/jobsService";

const EmailLink = () => {
  const [linkResults, setLinkResults] = useState([]);
  const ref = useRef<HTMLDialogElement>(null);

  const { jobs, setJobs } = useContext(jobsService.JobContext);
  const linkAccount = () => {
    linkToGMail().then((data) => {
      setLinkResults(data);
    });
  };

  const handleClick = (jobTitle: string) => {
    ref.current?.showModal();
    (ref.current?.querySelector("#company") as HTMLInputElement).value =
      jobTitle;
  };

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
        const newResults = linkResults.filter(
          (result) => result[0] !== target.company.value
        );
        setLinkResults(newResults);
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
    <main className="linkAccountContainer">
      <JobForm ref={ref} addJob={addJob} closeDialog={closeDialog} />
      <div className="linkAccountBtnContainer">
        <button className="linkAccountBtn" onClick={linkAccount}>
          <img className="linkAccountBtnimg" src={gmail} alt="" />
          Check GMail
        </button>
      </div>
      <section className="linkResults">
        {linkResults ? (
          linkResults.map((result) => (
            <div key={result[0]} className="possibleJobApp">
              <label htmlFor={`add${result[0]}`}>{result[0]}</label>
              <input
                type="button"
                value="Add"
                id={`add${result[0]}`}
                onClick={() => handleClick(result[0])}
              />
            </div>
          ))
        ) : (
          <span>No Applications Found</span>
        )}
      </section>
    </main>
  );
};

export default EmailLink;
