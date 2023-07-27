import { API_URL } from "../config";
import { useContext, useRef, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreateNewTutorial.css";

import { LoggedUserContext } from "../contexts/LoggedUserContext";
import Popup from "../components/Popup";

function LessonForm({ lesson, updateLesson, deleteLesson, error }) {
  const { lessonNr, title, videoURL } = lesson;
  const [titleChars, setTitleChars] = useState(0);
  const [videoChars, setVideoChars] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    updateLesson(lesson.lessonNr, { ...lesson, [name]: value });
  };

  const handleDelete = () => {
    deleteLesson(lessonNr);
  };

  return (
    <div className="form-lesson">
      <h6>Lesson {lessonNr}</h6>
      <div className="form-lesson-inputs">
        <div>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title of the lesson"
            value={title}
            className={
              error && !title.length > 0 && "create-form-missing-value"
            }
            onChange={(e) => {
              handleInputChange(e);
              setTitleChars(e.target.value.length);
            }}
          />
          <p className="create-form-char-counter">
            {titleChars}/45{" "}
            {titleChars >= 45 && <span>Exceeded the character limit!</span>}
          </p>
        </div>
        <div>
          <input
            type="text"
            id="videoURL"
            name="videoURL"
            placeholder="URL of the YouTube video"
            value={videoURL}
            className={
              error && !videoURL.length > 0 && "create-form-missing-value"
            }
            onChange={(e) => {
              handleInputChange(e);
              setVideoChars(e.target.value.length);
            }}
          />
          <p className="create-form-char-counter">
            {videoChars}/255{" "}
            {videoChars >= 255 && <span>Exceeded the character limit!</span>}
          </p>
        </div>
        <button type="button" className="ghost-black" onClick={handleDelete}>
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

  const [nameChars, setNameChars] = useState(0);
  const [descShortChars, setDescShortChars] = useState(0);
  const [descPointsChars, setDescPointsChars] = useState(0);
  const [descLongChars, setDescLongChars] = useState(0);
  const [demoChars, setDemoChars] = useState(0);

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
      if (key === "title" || key === "videoURL") {
        continue;
      }
      if (!value) {
        missingFields.current.push(key);
      }

      dataToSend[key] = value;
    }

    for (const lesson of lessons) {
      if (!lesson.title) {
        missingFields.current.push(`Lesson ${lesson.lessonNr}: Title`);
      }
      if (!lesson.videoURL) {
        missingFields.current.push(`Lesson ${lesson.lessonNr}: Video URL`);
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
    } else if (checkExceededChars()) {
      setError(checkExceededChars());
      setShowPopup(true);
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
    if (!(lessons.length > 1)) {
      setError("You cannot delete the last lesson!");
      setShowPopup(true);
      return;
    }
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
      case "name":
        setNameChars(count);
        break;
      case "descShort":
        setDescShortChars(count);
        break;
      case "descPoints":
        setDescPointsChars(count);
        break;
      case "descLong":
        setDescLongChars(count);
        break;
      case "demo":
        setDemoChars(count);
        break;
    }
  };

  const checkExceededChars = () => {
    if (nameChars >= 45) {
      return `Exceeded maximum number of characters in field "Name" - max. 45`;
    }
    if (descShortChars >= 255) {
      return `Exceeded maximum number of characters in field "Description short" - max. 255`;
    }
    if (descPointsChars >= 800) {
      return `Exceeded maximum number of characters in field "Description points" - max. 800`;
    }
    if (descLongChars >= 2000) {
      return `Exceeded maximum number of characters in field "Description long" - max. 2000`;
    }
    if (demoChars >= 255) {
      return `Exceeded maximum number of characters in field "Demo URL" - max. 255`;
    }

    for (const lesson of lessons) {
      if (lesson.title.length >= 45) {
        return `Exceeded maximum number of characters in field "Lesson ${lesson.lessonNr}: Title" - max. 45`;
      }

      if (lesson.videoURL.length >= 255) {
        return `Exceeded maximum number of characters in field "Lesson ${lesson.lessonNr}: Video URL" - max. 255`;
      }
    }
    return false;
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
                      onChange={(e) =>
                        updateChars(e.target.value.length, "name")
                      }
                    />
                    <p className="create-form-char-counter">
                      {nameChars}/45{" "}
                      {nameChars >= 45 && (
                        <span>Exceeded the character limit!</span>
                      )}
                    </p>
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
                    <p className="create-form-char-counter">
                      {descShortChars}/255{" "}
                      {descShortChars >= 255 && (
                        <span>Exceeded the character limit!</span>
                      )}
                    </p>
                  </div>
                  <div className="create-form-input-block">
                    <label htmlFor="descriptionPoints">
                      Description points
                    </label>
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
                    <p className="create-form-char-counter">
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
                    <label htmlFor="descriptionLong">Description long</label>
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
                    <p className="create-form-char-counter">
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
                  <input
                    type="text"
                    id="demoURL"
                    name="demoURL"
                    placeholder="Paste the address (URL) of the YouTube video that should be the demo of the course"
                    className={`create-form-demo-input ${
                      error &&
                      missingFields.current.includes("demoURL") > 0 &&
                      "create-form-missing-value"
                    }`}
                    onChange={(e) => updateChars(e.target.value.length, "demo")}
                  />
                  <p className="create-form-char-counter">
                    {demoChars}/255{" "}
                    {demoChars >= 255 && (
                      <span>Exceeded the character limit!</span>
                    )}
                  </p>
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
                  className="ghost-black form-lesson-add"
                  type="button"
                  onClick={addLesson}
                >
                  Add another lesson
                </button>
              </div>
              <div className="form-buttons">
                <input
                  className="violet"
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
