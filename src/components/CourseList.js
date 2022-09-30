const CourseList = ({courseJson}) => {
    var courses = Object.keys(courseJson);
    console.log(courses);
    return courses.map(course => <p>{courseJson[course].term} CS {courseJson[course].number}: {courseJson[course].title}</p>)
}

export default CourseList;