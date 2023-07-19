import React, { useState } from "react";
import Slider from "react-slick";
import "../styles/Carousel.css";

import CourseCardMin from "./CourseCardMin";
import OpinionCard from "./OpinionCard";

function Carousel({ content, contentType }) {
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
        {contentType === "courses" &&
          content.map((course) => (
            <CourseCardMin key={course.id} course={course} />
          ))}

        {contentType === "opinions" &&
          content.map((opinion) => (
            <OpinionCard key={opinion.id} opinion={opinion} />
          ))}
        {/* <div>
          <div className="card">
            <h4>Card 1 Title</h4>
            <p>
              Lorem ipsum dolor eget etat blah lorem ipsum dolor eget etat blah.
              Lorem ipsum dolor eget etat blah lorem ipsum dolor eget etat blah.
              Lorem ipsum dolor eget etat blah lorem ipsum dolor eget etat blah.
            </p>
          </div>
        </div>
        <div>
          <div className="card">
            <h4>Card 2 Title</h4>
            <p>
              Lorem ipsum dolor eget etat blah lorem ipsum dolor eget etat blah.
            </p>
          </div>
        </div>
        <div>
          <div className="card">
            <h4>Card 3 Title</h4>
            <p>
              Lorem ipsum dolor eget etat blah lorem ipsum dolor eget etat blah.
            </p>
          </div>
        </div>

        <div>
          <div className="card">
            <h4>Card 4 Title</h4>
            <p>
              Lorem ipsum dolor eget etat blah lorem ipsum dolor eget etat blah.
            </p>
          </div>
        </div>
        <div>
          <div className="card">
            <h4>Card 5 Title</h4>
            <p>
              Lorem ipsum dolor eget etat blah lorem ipsum dolor eget etat blah.
            </p>
          </div>
        </div>

        <div>
          <div className="card">
            <h4>Card 6 Title</h4>
            <p>
              Lorem ipsum dolor eget etat blah lorem ipsum dolor eget etat blah.
            </p>
          </div>
        </div>

        <div>
          <div className="card">
            <h4>Card 7 Title</h4>
            <p>
              Lorem ipsum dolor eget etat blah lorem ipsum dolor eget etat blah.
            </p>
          </div>
        </div>
        <div>
          <div className="card">
            <h4>Card 8 Title</h4>
            <p>
              Lorem ipsum dolor eget etat blah lorem ipsum dolor eget etat blah.
            </p>
          </div>
        </div> */}
      </Slider>
    </div>
  );
}

export default Carousel;
