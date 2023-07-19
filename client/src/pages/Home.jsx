import { API_URL } from "../config";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Home.css";

import { LoggedUserContext } from "../contexts/LoggedUserContext";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import CourseCard from "../components/CourseCard";
import PopularCategories from "../components/PopularCategories";

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
      <main>
        <div className="hero">
          <div className="hero-content">
            <h1>
              Tutorials - for anyone
              <br />
              anytime
              <br />
              anywhere
            </h1>
            <h4>
              Tutorials offers a wide selection of online courses for amateurs
              and professionals in various disciplines
            </h4>
            <div className="hero-buttons">
              <button>Start Learning Now</button>
              <button className="ghost">Browse Courses</button>
            </div>
          </div>
        </div>
        <div id="container">
          <section className="courses">
            <h2>Explore our Tutorials</h2>
            <div className="courses-container">
              {courses.length > 0 && <Carousel courses={courses} />}
            </div>
            <Link to="/courses">
              <button className="ghost centered">Browse all courses</button>
            </Link>
          </section>
          <section className="categories">
            <h2>Popular categories</h2>
            <PopularCategories />
          </section>
          <section>
            <h2>Why Tutorials?</h2>
            <div className="advantages-container">
              <div className="advantages-row">
                <h4 className="advantages-icon">
                  <span className="material-symbols-outlined">school</span>
                </h4>
                <h4>
                  Acquire useful skills with our vast selection of courses
                </h4>
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
                  Learn at your own pace with lifetime access on mobile phones
                  and computers
                </h4>
              </div>
              <div className="advantages-row">
                <h4 className="advantages-icon">
                  <span className="material-symbols-outlined">
                    workspace_premium
                  </span>
                </h4>
                <h4>
                  Obtain prestigeous certificates to boost your hirability
                </h4>
              </div>
            </div>
          </section>

          <section>
            <h2>What our users say</h2>
            {/* {courses.length > 0 && <Carousel />} */}
          </section>
        </div>
      </main>
    </>
  );
}

export default Home;
