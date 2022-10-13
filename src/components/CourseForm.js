import { useFormData } from "../utility/useFormData";
import { Link, useLocation } from "react-router-dom";


const InputField = ({name, text, state, change}) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{text}</label>
      <input className="form-control" id={name} name={name} 
        defaultValue={state.values?.[name]} onChange={change} />
      <div className="invalid-feedback">{state.errors?.[name]}</div>
    </div>
  );

const ButtonBar = () => {
    return (
        <div className="d-flex">
        <button type="button" className="btn btn-outline-dark me-2"><Link to={'/'}>Cancel</Link></button>
        <button type="submit" className="btn btn-primary me-auto" disabled={true}>Submit</button>
        </div>
    );
}

const CourseForm = () => {
    const {state} = useLocation();
    const { courseJson, course } = state;
    const [stated, change] = useFormData(null, {courseTitle: courseJson[course].title, meetingTimes: courseJson[course].meets});
    return (
        <div>
            <h1>Edit course details</h1>
            <form>
                <InputField name="courseTitle" text="Course Title" state={stated} change={change} />
                <InputField name="meetingTimes" text="Meeting Times" state={stated} change={change} />
                <ButtonBar />
            </form>
        </div>
    )
}

export default CourseForm;