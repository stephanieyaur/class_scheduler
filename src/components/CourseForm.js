import { useFormData } from "../utility/useFormData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isValidMeet } from "../utility/conflicts";
import { useDbUpdate } from "../utility/firebase";

const validateCourseForm = (key,val,courseNum, selectedClasses, selectedClassesMeets) => {
    switch (key) {
        case 'courseTitle':
            return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
        case 'meetingTimes':
            return /^$/.test(val) || isValidMeet(val, courseNum, selectedClasses, selectedClassesMeets) ? '' : 'must contain days and start-end, e.g., MTuWThF 12:00-13:20 and cannot overlap other course times';
    }
}

const InputField = ({name, text, state, change}) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{text}</label>
      <input className="form-control" id={name} name={name} 
        defaultValue={state.values?.[name]} onChange={change} />
      <div className="invalid-feedback"><p>{state.errors?.[name]}</p></div>
    </div>
  );

const ButtonBar = () => {
    return (
        <div className="d-flex">
        <button type="button" className="btn btn-outline-dark me-2"><Link to={'/'}>Cancel</Link></button>
        <button type="submit" className="btn btn-primary me-auto">Submit</button>
        </div>
    );
}

const CourseForm = () => {
    const {state} = useLocation();
    const { courseJson, course, selectedClasses, selectedClassesMeets } = state;
    const [stated, change] = useFormData(validateCourseForm, {courseNum: course, courseTitle: courseJson[course].title, meetingTimes: courseJson[course].meets, selectedClasses: selectedClasses, selectedClassesMeets: selectedClassesMeets});
    const [update, result] = useDbUpdate(`/courses/${course}`);
    const navigate = useNavigate();
    const submit = (evt) => {
        evt.preventDefault();
        if (!state.errors) {
            update({
                meets: stated.values.meetingTimes,
                number: courseJson[course].number,
                term: courseJson[course].term,
                title: stated.values.courseTitle
            });
        }
        navigate('/');
    };
    return (
        <div>
            <h1>Edit course details</h1>
            <form noValidate className={stated.errors ? 'was-validated' : null} onSubmit={submit}>
                <InputField name="courseTitle" text="Course Title" state={stated} change={change} />
                <InputField name="meetingTimes" text="Meeting Times" state={stated} change={change} />
                <ButtonBar />
            </form>
        </div>
    )
}

export default CourseForm;