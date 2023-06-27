import { API_URL } from "../config";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { LoggedUserContext } from "../contexts/LoggedUserContext";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";

function Home() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    // Fetch courses from the server
    Axios.get(`${API_URL}/courses`).then((response) => {
      setCourses(response.data.courses);
    });
  }, []);
  return (
    <>
      <Navbar />
      <main id="container">
        <div className="hero">
          <h1>
            Tutorials - for anyone
            <br />
            anytime
            <br />
            anywhere
          </h1>
          <h4>
            Tutorials offers a wide selection of online courses for amateurs and
            professionals in various disciplines
          </h4>
          <div>
            <button>Start Learning Now</button>
            <button>Browse Courses</button>
          </div>
        </div>
        <div className="homepage-section">
          <h2>Explore our Tutorials</h2>
          <button>Browse all courses</button>
        </div>
        <div className="homepage-section">
          <h2>Popular categories</h2>
          <div></div>
        </div>
        <div className="homepage-section">
          <h2>Why Tutorials?</h2>
          <div className="advantages-container">
            <div className="advantages-row">
              <h4 className="advantages-icon">
                <span className="material-symbols-outlined">school</span>
              </h4>
              <h4>Acquire useful skills with our vast selection of courses</h4>
            </div>
            <div className="advantages-row">
              <h4 className="advantages-icon">
                <span className="material-symbols-outlined">badge</span>
              </h4>
              <h4>
                Choose courses taught by experts with practical experience
              </h4>
            </div>
            <div className="advantages-row">
              <h4 className="advantages-icon">
                <span className="material-symbols-outlined">sprint</span>
              </h4>
              <h4>
                Learn at your own pace with lifetime access on mobile phones and
                computers
              </h4>
            </div>
            <div className="advantages-row">
              <h4 className="advantages-icon">
                <span className="material-symbols-outlined">
                  workspace_premium
                </span>
              </h4>
              <h4>Obtain prestigeous certificates to boost your hirability</h4>
            </div>
          </div>
        </div>
        <div className="homepage-section">
          <h2>What our users say</h2>
        </div>
      </main>
    </>
  );
}

export default Home;
