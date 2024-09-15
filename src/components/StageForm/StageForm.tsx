import {  forwardRef, SyntheticEvent } from "react"


type MyProps = {
    addStage: (event: SyntheticEvent) => void;
}

const StageForm =forwardRef<HTMLDialogElement,MyProps>((props, ref) => {
    
    return (
        <dialog ref={ref}>
            <form onSubmit={props.addStage}>
                <input name="stage"/>
                <input name="round"/>
                <input name="comment"/>
                <button type="submit">Submit</button>
            </form>
        </dialog>
    )
});

export default StageForm