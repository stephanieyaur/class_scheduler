import '../styles/CourseList.css';
import { hover } from '@testing-library/user-event/dist/hover';
import 'bootstrap/dist/css/bootstrap.min.css';
import {driver} from '../utility/conflicts';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CourseList = ({ courseJson,selectedTerm,selectedClasses,setSelectedClasses,selectedClassesMeets,setSelectedClassesMeets,profile }) => {

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
    const navigate = useNavigate();
    return (
        <div className="flexContainer">
            {courses.filter(course => courseJson[course].term == selectedTerm).map(course =>
                <div className={selectedClasses.includes(course) ? "card m-1 p-2 green" : "card m-1 p-2 hoverColor"} 
                    onClick={() => clickCourse(course)}>
                    <div className="card-body">
                        <h5 className="card-title">{courseJson[course].term} CS {courseJson[course].number}</h5>
                        <p className="card-text">{courseJson[course].title}</p>
                        <hr />
                        <p className="card-text">{courseJson[course].meets}</p>
                        {profile?.isAdmin ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-pencil-square edit" viewBox="0 0 16 16" onClick={() => navigate('edit-course', { state: { courseJson: courseJson, course: course, selectedClasses: selectedClasses, selectedClassesMeets: selectedClassesMeets } })}>
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        : null}
                    </div>
                </div>
            )}
        </div>)
}

export default CourseList;