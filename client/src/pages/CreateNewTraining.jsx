import { useContext, useRef } from "react";
import Axios from "axios";

import Navbar from "../components/Navbar";
import { LoggedUserContext } from "../contexts/LoggedUserContext";

function CreateNewTraining() {
  const { loggedUser } = useContext(LoggedUserContext);
  const formRef = useRef(null);
  const submitRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = formRef.current;
    const submitter = submitRef.current;

    const formData = new FormData(form, submitter);
    const dataToSend = {};
    for (const [key, value] of formData) {
      dataToSend[key] = value;
    }

    const response = await Axios.post(
      "http://localhost:3001/new-course",
      dataToSend
    );
    console.log(response);
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
                  <div className="language">
                    <p>Language</p>
                    <fieldset className="language-options">
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
                    </fieldset>
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
                  <div className="dropdown">
                    <label htmlFor="level">Level</label>
                    <br />
                    <select id="level" name="level" placeholder="Select level">
                      <option value="" disabled defaultValue>
                        Select level
                      </option>
                      <option value="Easy">Easy</option>
                      <option value="Easy">Intermediate</option>
                      <option value="Easy">Advanced</option>
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
                  <div>
                    <label className="ghost-button upload-button">
                      <input type="file" />
                      Upload an image
                    </label>
                    <span>No file chosen</span>
                  </div>
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
                <button className="ghost-button">Cancel</button>
              </div>
            </form>
          </>
        ) : (
          <h1>You must have admin permissions to view this page</h1>
        )}
      </main>
    </>
  );
}
export default CreateNewTraining;
