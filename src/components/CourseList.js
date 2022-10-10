import 'bootstrap/dist/css/bootstrap.min.css';
import driver from '../utility/conflicts';


const CourseList = ({ courseJson,selectedTerm,selectedClasses,setSelectedClasses,selectedClassesMeets,setSelectedClassesMeets }) => {

    const clickCourse = (course) => {
        if (selectedClasses.includes(course)) {
            var newSelectedClasses = [];
            var newSelectedClassesMeets = [];
            for (var i=0; i<selectedClasses.length; i++) {
                if (selectedClasses[i] != course) {
                    newSelectedClasses.push(selectedClasses[i]);
                    newSelectedClassesMeets.push(selectedClassesMeets[i]);
                }
            }
            setSelectedClasses(newSelectedClasses);
            setSelectedClassesMeets(newSelectedClassesMeets);
        } else {
            driver(course, courseJson, selectedClassesMeets, setSelectedClassesMeets, selectedClasses, setSelectedClasses);
        }
    }

    var courses = Object.keys(courseJson);
    return (
        <div className="flexContainer">
            {courses.filter(course => courseJson[course].term == selectedTerm).map(course =>
                <div className={selectedClasses.includes(course) ? "card m-1 p-2 green" : "card m-1 p-2"} 
                    onClick={() => clickCourse(course)}>
                    <div className="card-body">
                        <h5 className="card-title">{courseJson[course].term} CS {courseJson[course].number}</h5>
                        <p className="card-text">{courseJson[course].title}</p>
                        <hr />
                        <p className="card-text">{courseJson[course].meets}</p>
                    </div>
                </div>
            )}
        </div>)
}

export default CourseList;