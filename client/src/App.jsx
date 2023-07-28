import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import CoursesPage from "./pages/CoursesPage";
import CreateNewTutorial from "./pages/CreateNewTutorial";
import Login from "./pages/Login";
import User from "./pages/User";
import Course from "./pages/Course";
import CourseLearn from "./pages/CourseLearn";
import Layout from "./components/Layout";

import { LoggedUserContext } from "./contexts/LoggedUserContext";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <>
      <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<Course />} />
            <Route path="/courses/learn/:courseId" element={<CourseLearn />} />
            <Route path="/user" element={<User />} />
            <Route
              path="/create-new-tutorial"
              element={<CreateNewTutorial />}
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </LoggedUserContext.Provider>
    </>
  );
}

export default App;
