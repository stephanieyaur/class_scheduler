import '../styles/Modal.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Modal = ({ open, setOpen, selectedCourses,courseJson }) => (
    <div
      className={`modal ${open ? 'modal-show' : ''}`}
      tabIndex="-1"
      role="dialog"
      onClick={(evt) => { if (evt.target === evt.currentTarget) setOpen(false)}}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" aria-label="Close"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="modal-body">
            {selectedCourses.length != 0 && selectedCourses != undefined && selectedCourses != null ? 
                <div>
                <p>Your course plan includes these courses: </p>
                <ul>
                {selectedCourses.map(course => (
                    <li>
                    <b>{courseJson[course].term} CS {courseJson[course].number}</b>
                    <br/>
                    {courseJson[course].title}
                    <br/>
                    <i>{courseJson[course].meets}</i></li>
                ))
                }
                </ul>
                </div>
            :
                <div>
                <p>No course plan.</p>
                <p>To add a course to your course plan, click one of the course cards. To remove courses, click a selected course again.</p>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
);
  
  export default Modal;