import { API_URL } from "../config";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Slider from "react-slick";
import "../styles/User.css";

import { LoggedUserContext } from "../contexts/LoggedUserContext";
import CourseCard from "../components/CourseCard";
import CourseCardMin from "../components/CourseCardMin";
import Error from "./Error";
import PopupDecision from "../components/PopupDecision";

function CarouselUser({ content, handleFunction }) {
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
    <div className="container user-slider-container">
      <Slider {...settings}>
        {content.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isUserCourse={true}
            handleFunction={handleFunction}
          />
        ))}
        <div className="card card-user dummy">
          <h4>The end! Would you like to explore more tutorials?</h4>
          <Link to="/courses">
            <button className="ghost-black">Browse all tutorials</button>
          </Link>
        </div>
        {content.length === 1 && <div className="card hidden"></div>}
      </Slider>
    </div>
  );
}

function CarouselAdmin({ content, handleFunction }) {
  const [selectedFooter, setSelectedFooter] = useState(1);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    responsive: [
      {
        breakpoint: 360,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true },
      },
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true },
      },
    ],
  };
  return (
    <div className="container">
      <Slider {...settings}>
        {content.map((course) => (
          <CourseCardMin
            key={course.id}
            course={course}
            isUserCourse={true}
            handleFunction={handleFunction}
          />
        ))}
        <div className="card-min card-min-user dummy">
          <h4>The end! Would you like to create more tutorials?</h4>
          <Link to="/create-new-tutorial">
            <button className="ghost-black">Create a new tutorial</button>
          </Link>
        </div>
        {content.length < 3 && (
          <div className="card-min card-min-user hidden"></div>
        )}
        {content.length < 2 && (
          <div className="card-min card-min-user hidden"></div>
        )}
        {content.length === 0 && (
          <div className="card-min card-min-user hidden"></div>
        )}
      </Slider>
    </div>
  );
}

function User() {
  const [userCourses, setUserCourses] = useState([]);
  const [adminCourses, setAdminCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState(null);
  const [refreshRequired, setRefreshRequired] = useState(false);
  const { loggedUser } = useContext(LoggedUserContext);

  useEffect(() => {
    if (loggedUser) {
      Axios.get(`${API_URL}/courses/${loggedUser.id}`)
        .then((response) => {
          setUserCourses(response.data.courses);
        })
        .catch((error) => {
          console.log(error);
        });

      if (loggedUser.isAdmin) {
        Axios.get(`${API_URL}/courses-admin/${loggedUser.id}`)
          .then((response) => {
            setAdminCourses(response.data.courses);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    setRefreshRequired(false);
  }, [loggedUser, refreshRequired]);

  const handleDeregister = (courseId) => {
    setActionToConfirm(() => () => deregisterCourse(courseId));

    // setActionToConfirm(() => deregisterCourse(courseId));
    setShowPopup(true);
  };

  const deregisterCourse = (courseId) => {
    if (loggedUser) {
      Axios.delete(`${API_URL}/course-attendance`, {
        data: {
          course_id: courseId,
          user_id: loggedUser.id,
        },
      })
        .then(() => {
          setRefreshRequired(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setShowPopup(false);
  };

  const handleDelete = (courseId) => {
    setActionToConfirm(() => () => deleteCourse(courseId));
    setShowPopup(true);
  };
  const deleteCourse = (courseId) => {
    if (loggedUser.isAdmin) {
      Axios.delete(`${API_URL}/delete-course/${courseId}`)
        .then(() => {
          setRefreshRequired(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setShowPopup(false);
  };

  return (
    <>
      {loggedUser ? (
        <main className="background-subtle">
          <div id="container">
            <section className="user-cards">
              <h2>Hello {loggedUser.login}!</h2>
              <div className="cards-container">
                {userCourses.length > 0 ? (
                  <>
                    <h3 className="user-subtitle">
                      Get back to learning in one of your exciting tutorials:
                    </h3>
                    <CarouselUser
                      content={userCourses}
                      handleFunction={handleDeregister}
                    />
                  </>
                ) : (
                  <div className="user-prompt">
                    <h3 className="user-subtitle">
                      You haven't signed up for any tutorials. Search now to
                      find your dream course
                    </h3>
                    <Link to="/courses">
                      <button className="ghost">Browse tutorials</button>
                    </Link>
                  </div>
                )}
              </div>
            </section>
            {loggedUser.isAdmin ? (
              <section className="user-cards admin-cards">
                <h3 className="user-subtitle">
                  Manage the tutorials you created
                </h3>
                <CarouselAdmin
                  content={adminCourses}
                  handleFunction={handleDelete}
                  isAdmin={true}
                />
              </section>
            ) : null}
          </div>
        </main>
      ) : (
        <Error
          textMessage={"To access this page you must be logged in!"}
          textButton={"Log in"}
          route={"/login"}
        />
      )}
      <PopupDecision
        message={"Are you sure you want to proceed?"}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        onConfirm={actionToConfirm}
      />
    </>
  );
}

export default User;
