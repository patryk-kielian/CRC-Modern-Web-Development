import { useContext } from "react";

import Navbar from "../components/Navbar";
import { LoggedUserContext } from "../contexts/LoggedUserContext";

function CreateNewTraining() {
  const { loggedUser } = useContext(LoggedUserContext);

  return (
    <>
      <Navbar />
      <main id="container">
        {loggedUser && loggedUser.isAdmin ? (
          <>
            <h1>Create a new training:</h1>
            <form className="form-training">
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
                    <div className="language-options">
                      <input
                        type="radio"
                        id="language"
                        name="language"
                        defaultValue="PL"
                      />
                      <label htmlFor="language">Polish</label>
                      <input
                        type="radio"
                        id="language"
                        name="language"
                        defaultValue="EN"
                      />
                      <label htmlFor="language">English</label>
                    </div>
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
                      <option value="" disabled="" selected="">
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
                    <label htmlFor="start-date">Start Date</label>
                    <br />
                    <input type="date" id="start-date" name="start-date" />
                  </div>
                  <div>
                    <label htmlFor="end-date">End Date</label>
                    <br />
                    <input type="date" id="end-date" name="end-date" />
                  </div>
                </div>
                <div className="two-inputs">
                  <div>
                    <label htmlFor="start-time">Start Time</label>
                    <br />
                    <input type="time" id="start-time" name="start-time" />
                  </div>
                  <div>
                    <label htmlFor="end-time">End Time</label>
                    <br />
                    <input type="time" id="end-time" name="end-time" />
                  </div>
                </div>
              </div>
              <div className="form-buttons">
                <input
                  className="violet-button"
                  type="submit"
                  value="Create training"
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
