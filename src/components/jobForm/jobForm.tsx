import {  forwardRef, SyntheticEvent } from "react"


type MyProps = {
    addJob: (event: SyntheticEvent) => void;
}

const JobForm =forwardRef<HTMLDialogElement,MyProps>((props, ref) => {
    
    return (
        <dialog ref={ref}>
            <form onSubmit={props.addJob}>
                <input name="title"/>
                <input name="company"/>
                <button type="submit">Submit</button>
            </form>
        </dialog>
    )
});

export default JobForm