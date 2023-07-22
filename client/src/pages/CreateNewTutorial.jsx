import { API_URL } from "../config";
import { useContext, useRef, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { LoggedUserContext } from "../contexts/LoggedUserContext";

function CreateNewTutorial() {
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

      // TODO: remove when no longer required in DB
      dataToSend.location = "placeholder";
      dataToSend.dateStart = "placeholder";
      dataToSend.dateEnd = "placeholder";
      dataToSend.timeStart = "placeholder";
      dataToSend.timeEnd = "placeholder";
      dataToSend.frequency = "placeholder";
      //

      // TODO: should be coming from the DB
      dataToSend.trainer = "placeholder";
      console.log(dataToSend);
      const response = await Axios.post(`${API_URL}/new-course`, dataToSend);
      console.log(response);
      navigate("/user");
    }
  };

  return (
    <>
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
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="dropdown">
                    <label htmlFor="category">Category</label>
                    <br />
                    <select
                      id="category"
                      name="category"
                      placeholder="Select category"
                    >
                      <option value="" disabled defaultValue>
                        Select category
                      </option>
                      <option value="Programming">Programming</option>
                      <option value="IT & Software">IT & Software</option>
                      <option value="Photography">Photography</option>
                      <option value="School">School</option>
                      <option value="Business">Business</option>
                      <option value="Music">Music</option>
                      <option value="Personal Development">
                        Personal Development
                      </option>
                      <option value="Languages">Languages</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="descriptionShort">Description short</label>
                    <br />
                    <textarea
                      id="descriptionShort"
                      name="descriptionShort"
                      placeholder="Type a short description of the course (max. 250 characters)"
                    />
                    <br />
                    <p>0/250</p>
                  </div>
                  <div>
                    <label htmlFor="descriptionPoints">Description short</label>
                    <br />
                    <textarea
                      id="descriptionPoints"
                      name="descriptionPoints"
                      placeholder="Type what the user will learn, in points (max. 800 characters)"
                    />
                    <br />
                    <p>0/800</p>
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
                  <div>
                    <label htmlFor="descriptionLong">Description short</label>
                    <br />
                    <textarea
                      id="descriptionLong"
                      name="descriptionLong"
                      placeholder="Write a full description of the course, mention the content, who is it for, what will be done, how long will it take and what should be the outcome (max. 2000 characters)"
                    />
                    <br />
                    <p>0/2000</p>
                  </div>
                </div>
              </div>
              <div className="form-full-width">
                <div>
                  <label htmlFor="demoURL">Demo URL</label>
                  <br />
                  <input
                    type="text"
                    id="demoURL"
                    name="demoURL"
                    placeholder="Paste the address (URL) of the YouTube video that should be the demo of the course"
                  />
                  <br />
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
export default CreateNewTutorial;
