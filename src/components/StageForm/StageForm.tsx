import {  forwardRef, SyntheticEvent } from "react"
import './stageForm.css'

type MyProps = {
    addStage: (event: SyntheticEvent) => void;
    closeDialog: (event: SyntheticEvent) => void;
}

const StageForm =forwardRef<HTMLDialogElement,MyProps>((props, ref) => {
    
    return (
        <dialog id="stageDialog" ref={ref} onClick={props.closeDialog}>
           <div className="stageFormContainer">
            <form id="stageForm" onSubmit={props.addStage}>
                <div className="form-control">
                    <label className="stageFormLabel" htmlFor="stage">Stage:</label>
                    <input className="stageFormInput" name="stage"/>
                </div>
                <div className="form-control">
                    <label className="stageFormLabel" htmlFor="round">Round:</label>
                    <input className="stageFormInput" name="round"/>
                </div>
                <div className="form-control">
                    <label className="stageFormLabel" htmlFor="comment">Comment:</label>
                    <input className="stageFormInput" name="comment"/>
                </div>
                <button type="submit">Submit</button>
            </form>
            </div>
        </dialog>
    )
});

export default StageForm