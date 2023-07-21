import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import CoursesPage from "./pages/CoursesPage";
import CreateNewTraining from "./pages/CreateNewTraining";
import Login from "./pages/Login";
import User from "./pages/User";
import Course from "./pages/Course";
import { LoggedUserContext } from "./contexts/LoggedUserContext";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  // const setLoggedUserWithAdmin = (user) => {
  //   console.log(user);
  //   if (user && user.isAdmin) {
  //     user.isAdmin = true;
  //   }
  //   setLoggedUser({ loggedUser: user });
  // };

  return (
    <>
      <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<Course />} />
          <Route path="/user" element={<User />} />
          <Route path="/create-new-training" element={<CreateNewTraining />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </LoggedUserContext.Provider>
    </>
  );
}

export default App;
