import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Axios from "axios";

import Home from "./pages/Home";
import CoursesPage from "./pages/CoursesPage";
import CreateNewTutorial from "./pages/CreateNewTutorial";
import Login from "./pages/Login";
import User from "./pages/User";
import Course from "./pages/Course";
import CourseLearn from "./pages/CourseLearn";
import Layout from "./components/Layout";
import NotFound404 from "./pages/NotFound404";
import Popup from "./components/Popup";

import { LoggedUserContext } from "./contexts/LoggedUserContext";
import { API_URL } from "./config";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const message = "Your session has expired. Please log in again";

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const { userID, exp } = decodedToken;
        // Check if the token has expired
        const currentTime = Date.now() / 1000;
        if (exp > currentTime) {
          Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          // Token is still valid, set the user
          Axios.get(`${API_URL}/login-by-id?userID=${userID}`).then(
            (response) => {
              const user = response.data;
              setLoggedUser(user);
            }
          );
        } else {
          // Token has expired, remove it from localStorage
          setShowPopup(true);
          localStorage.removeItem("jwtToken");
        }
      } catch (error) {
        // There was an error decoding the token, handle it if needed
        console.error("Error decoding token:", error);
        console.log();
        localStorage.removeItem("jwtToken");
      }
    }
  }, []);

  return (
    <>
      <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <Layout>
          <Routes>
            <Route path="*" element={<NotFound404 />} />
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<Course />} />
            <Route path="/courses/learn/:courseId" element={<CourseLearn />} />
            <Route path="/user" element={<User />} />
            <Route
              path="/create-new-tutorial"
              element={<CreateNewTutorial />}
            />
            <Route path="/login/:mode?" element={<Login />} />
          </Routes>
        </Layout>
      </LoggedUserContext.Provider>
      <Popup
        message={message}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
    </>
  );
}

export default App;
