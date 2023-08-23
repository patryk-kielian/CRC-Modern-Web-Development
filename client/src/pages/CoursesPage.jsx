import Axios from "axios";
import { API_URL } from "../config";
import { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import { Link, useLocation } from "react-router-dom";
import "../styles/CoursesPage.css";
import "../styles/Carousel.css";

import CourseCard from "../components/CourseCard";

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
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true },
      },
      {
        breakpoint: 1200,
        settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true },
      },
    ],
  };
  return (
    <div className="container">
      <Slider {...settings}>
        {content.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
        {content.length < 3 && <div className="card hidden"></div>}
        {content.length === 1 && <div className="card hidden"></div>}
      </Slider>
    </div>
  );
}

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryToView = titleCase(searchParams.get("category"));

  useEffect(() => {
    // Fetch courses from the server
    Axios.get(`${API_URL}/courses`).then((response) => {
      setCourses(response.data.courses);
    });
  }, []);

  const groupedCourses = courses.reduce((acc, item) => {
    const { category } = item;
    if (categoryToView) {
      // If the category key doesn't exist in the accumulator object, create it and initialize it with an empty array
      if (category === categoryToView) {
        if (!acc[category]) {
          acc[category] = [];
        }
        // Push the item into the corresponding category array
        acc[category].push(item);
      }
    } else {
      // if no category selected through URL query, display all categories
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
    }

    return acc;
  }, {});
  console.log(groupedCourses);
  function titleCase(str) {
    if (!str) {
      return;
    }
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  return (
    <>
      <main className="background-subtle">
        <div id="container">
          {Object.keys(groupedCourses).length !== 0 ? (
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
          ) : (
            <div className="category-container empty">
              <h2>No Tutorials to show</h2>
            </div>
          )}
        </div>
        {/* {showPopup && (
          <Popup
            message="You are already registered to this course!"
            onClose={closePopup}
          />
        )} */}
      </main>
    </>
  );
}

export default CoursesPage;
