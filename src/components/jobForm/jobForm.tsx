import { forwardRef, SyntheticEvent } from "react";
import "./jobForm.css";

type MyProps = {
  addJob: (event: SyntheticEvent) => void;
  closeDialog: (event: SyntheticEvent) => void;
};

const JobForm = forwardRef<HTMLDialogElement, MyProps>((props, ref) => {
  return (
    <dialog id="jobDialog" ref={ref} onClick={props.closeDialog}>
      <div className="JobFormContainer">
        <form id="jobForm" onSubmit={props.addJob}>
          <div className="form-control">
            <label className="jobFormLabel" htmlFor="title">
              Job Title:
            </label>
            <input className="jobFormInput" id="title" name="title" />
          </div>
          <div className="form-control">
            <label className="jobFormLabel" htmlFor="company">
              Company:
            </label>
            <input className="jobFormInput" id="company" name="company" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </dialog>
  );
});

export default JobForm;
