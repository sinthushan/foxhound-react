import {  forwardRef, SyntheticEvent, useRef } from "react"
import './stageForm.css'

type MyProps = {
    addStage: (event: SyntheticEvent) => void;
    closeDialog: (event: SyntheticEvent) => void;
}

const StageForm =forwardRef<HTMLDialogElement,MyProps>((props, ref) => {
 

    return (
        <dialog id="stageDialog" ref={ref} onClick={props.closeDialog} >
            <div className="stageFormContainer" >

                <form id="stageForm" onSubmit={props.addStage} >
                    <div className="form-control">
                        <label className="stageFormLabel" htmlFor="stage">Stage:</label>
                        <input className="stageFormInput" id="stage" name="stage"/>
                    </div>
                    <div className="form-control">
                        <label className="stageFormLabel" htmlFor="round">Round:</label>
                        <input className="stageFormInput" id="round" name="round"/>
                    </div>
                    <div className="form-control">
                        <label className="stageFormLabel" htmlFor="comment">Comment:</label>
                        <input className="stageFormInput" id="comment" name="comment"/>
                    </div>
                    <div className="form-control">
                        <button type="submit" >Add Stage</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
});

export default StageForm