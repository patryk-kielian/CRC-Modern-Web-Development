import { API_URL } from "../config";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "../styles/CoursesPage.css";
import "../styles/Carousel.css";

import { LoggedUserContext } from "../contexts/LoggedUserContext";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import Popup from "../components/Popup";
import Footer from "../components/Footer";

function CarouselCoursesPage({ content }) {
  const [selectedFooter, setSelectedFooter] = useState(1);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 320,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true },
      },
    ],
  };
  return (
    <div className="container">
      <Slider {...settings}>
        {content.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </Slider>
    </div>
  );
}

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const { loggedUser } = useContext(LoggedUserContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch courses from the server
    Axios.get(`${API_URL}/courses`).then((response) => {
      setCourses(response.data.courses);
    });
  }, []);

  const groupedCourses = courses.reduce((acc, item) => {
    const { category } = item;
    // If the category key doesn't exist in the accumulator object, create it and initialize it with an empty array
    if (!acc[category]) {
      acc[category] = [];
    }
    // Push the item into the corresponding category array
    acc[category].push(item);
    return acc;
  }, {});

  const handleRegister = (courseId) => {
    if (loggedUser) {
      // Enroll the user to the course
      Axios.post(`${API_URL}/course-attendance`, {
        course_id: courseId,
        user_id: loggedUser.id,
      })
        .then((response) => {
          navigate("/user");
        })
        .catch((error) => {
          console.log(error);
          setShowPopup(true);
        });
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Navbar />
      <main id="container">
        {Object.keys(groupedCourses).length !== 0 && (
          <>
            {Object.keys(groupedCourses).map((category) => (
              <div key={category} className="category-container">
                <h2>{category} Tutorials</h2>
                <CarouselCoursesPage content={groupedCourses[category]} />
                <div className="category-button-container">
                  <Link to="/courses">
                    <button className="category-button ghost">
                      All {category} courses
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
        {/* {showPopup && (
          <Popup
            message="You are already registered to this course!"
            onClose={closePopup}
          />
        )} */}
      </main>
      <Footer />
    </>
  );
}

export default CoursesPage;
