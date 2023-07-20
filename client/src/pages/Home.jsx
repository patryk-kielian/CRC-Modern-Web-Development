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
import Footer from "../components/Footer";

const opinions = [
  {
    id: 0,
    text: "I cannot express enough how grateful I am for the Tutorials web app. As a recent graduate struggling to find a job in my desired field, I was feeling frustrated and discouraged. However, after discovering Tutorials, everything turned around for me.",
    name: "Jessica Thompson",
    rating: 5.0,
  },
  {
    id: 1,
    text: "Within just a few months of using the app, I acquired valuable skills and knowledge that made me stand out during job interviews. The tutorials were comprehensive, delivered in an engaging manner and allowed me to stay up-to-date with the latest industry trends.",
    name: "Mark Johnson",
    rating: 4.2,
  },
  {
    id: 2,
    text: "Tutorials has been a game-changer for me, without a doubt. As a self-taught developer, I always struggled to find comprehensive resources that could help me progress in my career. That's when I stumbled upon Tutorials, and it has been a revelation.",
    name: "Toby Spencer",
    rating: 4.9,
  },
  {
    id: 3,
    text: "What sets Tutorials apart is their dedication to providing comprehensive resources. Whether I wanted to dive into a new programming language, explore cutting-edge frameworks, or learn about best practices, Tutorials had it all covered.",
    name: "Emily Blackburn",
    rating: 4.3,
  },
  {
    id: 4,
    text: "What sets Tutorials apart is their dedication to providing comprehensive resources. Whether I wanted to dive into a new programming language, explore cutting-edge frameworks, or learn about best practices, Tutorials had it all covered.",
    name: "Emily Blackburn",
    rating: 4.3,
  },
];

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
              <Link to="/courses">
                <button className="ghost">Browse Courses</button>
              </Link>
            </div>
          </div>
        </div>
        <div id="container">
          <section className="courses">
            <h2>Explore our Tutorials</h2>
            <div className="courses-container">
              {courses.length > 0 && (
                <Carousel contentType={"courses"} content={courses} />
              )}
            </div>
            <div className="courses-button-container">
              <Link to="/courses">
                <button className="ghost">Browse all courses</button>
              </Link>
            </div>
          </section>
          <section className="categories">
            <h2>Popular categories</h2>
            <PopularCategories />
          </section>
          <section className="advantages">
            <h2>Why Tutorials?</h2>
            <div className="advantages-container">
              <div className="advantages-row">
                <span className="advantages-icon material-symbols-outlined">
                  school
                </span>
                <h4 className="advantages-text">
                  Acquire useful skills with our vast selection of courses
                </h4>
              </div>
              <div className="advantages-row">
                <span className="advantages-icon material-symbols-outlined">
                  badge
                </span>
                <h4 className="advantages-text">
                  Choose courses taught by experts with practical experience
                </h4>
              </div>
              <div className="advantages-row">
                <span className="advantages-icon material-symbols-outlined">
                  sprint
                </span>
                <h4 className="advantages-text">
                  Learn at your own pace with lifetime access on mobile phones
                  and computers
                </h4>
              </div>
              <div className="advantages-row">
                <span className="advantages-icon material-symbols-outlined">
                  workspace_premium
                </span>
                <h4 className="advantages-text">
                  Obtain prestigeous certificates to boost your hirability
                </h4>
              </div>
            </div>
          </section>
          <section className="testimonials">
            <h2>What our users say</h2>
            {opinions.length > 0 && (
              <Carousel contentType={"opinions"} content={opinions} />
            )}
          </section>
          <section className="cta">
            <div
              className="cta-img"
              style={{
                backgroundImage: `url(img/home_cta.jpeg), linear-gradient(lightgray, lightgray)`,
              }}
            ></div>
            <div className="cta-container">
              <h2>First time at tutorials?</h2>
              <h3>
                You are lucky!
                <br /> Create an account for free and start learning now!
              </h3>
              <div className="cta-buttons">
                <button className="violet">Create an account</button>
                <button className="ghost">
                  Already have an account? Sign in{" "}
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
