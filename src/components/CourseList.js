import 'bootstrap/dist/css/bootstrap.min.css';

const CourseList = ({ courseJson,selectedTerm }) => {
    var courses = Object.keys(courseJson);
    return (
        <div className="flexContainer">
            {courses.filter(course => courseJson[course].term == selectedTerm).map(course =>
                <div className="card m-1 p-2">
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