import { API_URL } from "../config";
import { useContext, useRef, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreateNewTutorial.css";

import { LoggedUserContext } from "../contexts/LoggedUserContext";
import Popup from "../components/Popup";

function LessonForm({ lesson, updateLesson, deleteLesson, error }) {
  const { lessonNr, title, videoURL } = lesson;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    updateLesson(lesson.lessonNr, { ...lesson, [name]: value });
  };

  const handleDelete = () => {
    deleteLesson(lessonNr);
  };

  // TODO: make delete button functional

  return (
    <div className="form-lesson">
      <h6>Lesson {lessonNr}</h6>
      <div className="form-lesson-inputs">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title of the lesson"
          value={title}
          className={error && !title.length > 0 && "create-form-missing-value"}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="videoURL"
          name="videoURL"
          placeholder="URL of the YouTube video"
          value={videoURL}
          className={
            error && !videoURL.length > 0 && "create-form-missing-value"
          }
          onChange={handleInputChange}
        />

        <button className="ghost-black" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

function CreateNewTutorial() {
  const { loggedUser } = useContext(LoggedUserContext);

  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [lessons, setLessons] = useState([
    { lessonNr: 1, title: "", videoURL: "" },
  ]);

  const [descShortChars, setDescShortChars] = useState(0);
  const [descPointsChars, setDescPointsChars] = useState(0);
  const [descLongChars, setDescLongChars] = useState(0);

  const formRef = useRef(null);
  const submitRef = useRef(null);
  const missingFields = useRef([]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = formRef.current;
    const submitter = submitRef.current;

    const formData = new FormData(form, submitter);
    const dataToSend = {};
    missingFields.current = [];

    for (const [key, value] of formData) {
      if (!value) {
        missingFields.current.push(key);
      }

      if (key === "title" || key === "videoURL") {
        continue;
      }
      dataToSend[key] = value;
    }

    for (const lesson of lessons) {
      if (!lesson.title || !lesson.videoURL) {
        missingFields.current.push(`Lesson ${lesson.lessonNr}`);
      }
    }
    if (missingFields.current.length) {
      setError(
        <>
          The whole form should be filled out.
          <br />
          Missing{" "}
          {missingFields.current.length > 1
            ? "values in fields:"
            : "a value in field"}{" "}
          {missingFields.current.join(", ")}
        </>
      );
      setShowPopup(true);
      return;
    } else {
      // Course image is a random icon from 4 presets
      const randomInt = Math.floor(Math.random() * 4) + 1;
      dataToSend.image = `icon${randomInt}.png`;
      dataToSend.user_id = loggedUser.id;
      dataToSend.lessons = lessons;

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
      // navigate("/user");
    }
  };

  const addLesson = () => {
    setLessons((prevLessons) => [
      ...prevLessons,
      { lessonNr: prevLessons.length + 1, title: "", videoURL: "" },
    ]);
  };

  const updateLesson = (lessonNr, updatedLesson) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.lessonNr === lessonNr ? updatedLesson : lesson
      )
    );
  };

  const deleteLesson = (lessonNr) => {
    if (!lessons.length > 1) {
      setError("You cannot delete the last lesson!");
      setShowPopup(true);
      return;
    }
    console.log(lessonNr);
    setLessons((prevLessons) =>
      prevLessons.filter((lesson) => lesson.lessonNr !== lessonNr)
    );

    // Update the numbers so they stay in order
    setLessons((prevLessons) =>
      prevLessons.map((lesson, i) => ({ ...lesson, lessonNr: i + 1 }))
    );
  };

  const updateChars = (count, fieldType) => {
    switch (fieldType) {
      case "descShort":
        setDescShortChars(count);
        break;
      case "descPoints":
        setDescPointsChars(count);
        break;
      case "descLong":
        setDescLongChars(count);
        break;
    }
  };

  return (
    <>
      <main id="create-container">
        {loggedUser && loggedUser.isAdmin ? (
          <>
            <h1>Create a new training:</h1>
            <form className="create-form" onSubmit={handleSubmit} ref={formRef}>
              <div className="create-form-columns">
                <div className="create-form-col-left">
                  <div className="create-form-input-block">
                    <label htmlFor="name">Name</label>
                    <br />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Type name"
                      className={
                        error &&
                        missingFields.current.includes("name") &&
                        "create-form-missing-value"
                      }
                    />
                    <br />
                  </div>
                  <div className="create-form-input-block language">
                    <p>Language</p>
                    <div
                      className={`language-options ${
                        error &&
                        missingFields.current.includes("language") &&
                        "create-form-missing-value"
                      }`}
                    >
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
                        defaultChecked="checked"
                      />
                      <label htmlFor="language-en">English</label>
                    </div>
                  </div>
                  <div className="create-form-input-block dropdown">
                    <label htmlFor="level">Level</label>
                    <br />
                    <select
                      id="level"
                      name="level"
                      placeholder="Select level"
                      className={
                        error &&
                        missingFields.current.includes("level") &&
                        "create-form-missing-value"
                      }
                    >
                      <option value="" disabled defaultValue>
                        Select level
                      </option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="create-form-input-block dropdown">
                    <label htmlFor="category">Category</label>
                    <br />
                    <select
                      id="category"
                      name="category"
                      placeholder="Select category"
                      className={
                        error &&
                        missingFields.current.includes("category") &&
                        "create-form-missing-value"
                      }
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
                  <div className="create-form-input-block">
                    <label htmlFor="descriptionShort">Description short</label>
                    <br />
                    <textarea
                      id="descriptionShort"
                      name="descriptionShort"
                      placeholder="Type a short description of the course (max. 250 characters)"
                      className={
                        error &&
                        !descShortChars > 0 &&
                        "create-form-missing-value"
                      }
                      onChange={(e) =>
                        updateChars(e.target.value.length, "descShort")
                      }
                    />
                    <br />
                    <p>
                      {descShortChars}/250{" "}
                      {descShortChars >= 250 && (
                        <span>Exceeded the character limit!</span>
                      )}
                    </p>
                  </div>
                  <div className="create-form-input-block">
                    <label htmlFor="descriptionPoints">
                      Description points
                    </label>
                    <br />
                    <textarea
                      id="descriptionPoints"
                      name="descriptionPoints"
                      placeholder="Type what the user will learn, in points (max. 800 characters)"
                      className={
                        error &&
                        !descPointsChars > 0 &&
                        "create-form-missing-value"
                      }
                      onChange={(e) =>
                        updateChars(e.target.value.length, "descPoints")
                      }
                    />
                    <br />
                    <p>
                      {descPointsChars}/800{" "}
                      {descPointsChars >= 800 && (
                        <span>Exceeded the character limit!</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="create-form-col-right">
                  <div className="create-form-input-block">
                    <label className="ghost-button upload-button">
                      <input type="file" />
                      Upload an image
                    </label>
                    <span>No file chosen</span>
                  </div>
                  <div className="create-form-input-block">
                    <label htmlFor="descriptionLong">Description short</label>
                    <br />
                    <textarea
                      id="descriptionLong"
                      name="descriptionLong"
                      placeholder="Write a full description of the course, mention the content, who is it for, what will be done, how long will it take and what should be the outcome (max. 2000 characters)"
                      className={
                        error &&
                        !descLongChars > 0 &&
                        "create-form-missing-value"
                      }
                      onChange={(e) =>
                        updateChars(e.target.value.length, "descLong")
                      }
                    />
                    <br />
                    <p>
                      {descLongChars}/2000{" "}
                      {descLongChars >= 2000 && (
                        <span>Exceeded the character limit!</span>
                      )}
                    </p>
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
                    className={
                      error &&
                      missingFields.current.includes("demoURL") > 0 &&
                      "create-form-missing-value"
                    }
                  />
                  <br />
                </div>
              </div>
              <div>
                {lessons.map((lesson) => (
                  <LessonForm
                    key={lesson.lessonNr}
                    lesson={lesson}
                    updateLesson={updateLesson}
                    deleteLesson={deleteLesson}
                    error={error}
                  />
                ))}
                <button
                  className="ghost-black"
                  type="button"
                  onClick={addLesson}
                >
                  Add another lesson
                </button>
              </div>
              <div className="form-buttons">
                <input
                  className="violet-button"
                  type="submit"
                  value="Create training"
                  ref={submitRef}
                />
                <button className="ghost-black" onClick={() => navigate("/")}>
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <h1>You must have admin permissions to view this page</h1>
        )}
      </main>
      <Popup
        message={error}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
    </>
  );
}
export default CreateNewTutorial;
