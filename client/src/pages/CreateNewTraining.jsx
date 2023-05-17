import { useContext, useRef, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { LoggedUserContext } from "../contexts/LoggedUserContext";

function CreateNewTraining() {
  const { loggedUser } = useContext(LoggedUserContext);
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  const submitRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = formRef.current;
    const submitter = submitRef.current;

    const formData = new FormData(form, submitter);
    const dataToSend = {};
    const missingFields = [];
    for (const [key, value] of formData) {
      if (!value) {
        missingFields.push(key);
      }
      dataToSend[key] = value;
    }
    if (missingFields.length) {
      setError(
        `Missing value(s) in field(s): 
        ${missingFields.join(", ")}`
      );
      return;
    } else {
      // Course image is a random icon from 4 presets
      const randomInt = Math.floor(Math.random() * 4) + 1;
      dataToSend.image = `icon${randomInt}.png`;
      dataToSend.user_id = loggedUser.id;

      const response = await Axios.post(
        "http://localhost:3001/new-course",
        dataToSend
      );
      console.log(response);
      navigate("/user");
    }
  };

  return (
    <>
      <Navbar />
      <main id="container">
        {loggedUser && loggedUser.isAdmin ? (
          <>
            <h1>Create a new training:</h1>
            <form
              className="form-training"
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className="form-columns">
                <div className="left-content">
                  <div>
                    <label htmlFor="name">Name</label>
                    <br />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Type name"
                    />
                    <br />
                  </div>
                  <div>
                    <label htmlFor="location">Location</label>
                    <br />
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="Type location"
                    />
                  </div>
                  <div>
                    <label htmlFor="frequency">Frequency (e.g. 5x8h)</label>
                    <br />
                    <input
                      type="text"
                      id="frequency"
                      name="frequency"
                      placeholder="Type frequency"
                    />
                  </div>
                </div>
                <div className="right-content">
                  <div className="language">
                    <p>Language</p>
                    <div className="language-options">
                      <input
                        type="radio"
                        id="language-pl"
                        name="language"
                        value="Polish"
                      />
                      <label htmlFor="language-pl">Polish</label>
                      <input
                        type="radio"
                        id="language-en"
                        name="language"
                        value="English"
                      />
                      <label htmlFor="language-en">English</label>
                    </div>
                  </div>
                  <div className="dropdown">
                    <label htmlFor="level">Level</label>
                    <br />
                    <select id="level" name="level" placeholder="Select level">
                      <option value="" disabled defaultValue>
                        Select level
                      </option>
                      <option value="Easy">Easy</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="trainer">Trainer</label>
                    <br />
                    <input
                      type="text"
                      id="trainer"
                      name="trainer"
                      placeholder="Type trainer's name"
                    />
                  </div>

                  {/* <div>
                    <label className="ghost-button upload-button">
                      <input type="file" />
                      Upload an image
                    </label>
                    <span>No file chosen</span>
                  </div> */}
                </div>
              </div>
              <div className="form-datetime">
                <div className="two-inputs">
                  <div>
                    <label htmlFor="dateStart">Start Date</label>
                    <br />
                    <input type="date" id="dateStart" name="dateStart" />
                  </div>
                  <div>
                    <label htmlFor="dateEnd">End Date</label>
                    <br />
                    <input type="date" id="dateEnd" name="dateEnd" />
                  </div>
                </div>
                <div className="two-inputs">
                  <div>
                    <label htmlFor="timeStart">Start Time</label>
                    <br />
                    <input type="time" id="timeStart" name="timeStart" />
                  </div>
                  <div>
                    <label htmlFor="timeEnd">End Time</label>
                    <br />
                    <input type="time" id="timeEnd" name="timeEnd" />
                  </div>
                </div>
              </div>
              <div className="form-buttons">
                <input
                  className="violet-button"
                  type="submit"
                  value="Create training"
                  ref={submitRef}
                />
                <button className="ghost-button" onClick={() => navigate("/")}>
                  Cancel
                </button>
              </div>
            </form>
            <h1 className="form-error">{error}</h1>
          </>
        ) : (
          <h1>You must have admin permissions to view this page</h1>
        )}
      </main>
    </>
  );
}
export default CreateNewTraining;
