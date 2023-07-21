import axios from "axios";
import { API_URL } from "../config";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Course() {
  const [course, setCourse] = useState(null);
  const courseId = useParams().courseId;
  console.log(`${API_URL}/course/${courseId}`);
  useEffect(() => {
    axios.get(`${API_URL}/course/${courseId}`).then((response) => {
      setCourse(response.data.course);
    });
  }, []);
  return (
    <>
      <Navbar />
      <div>Course {courseId}</div>
      <p>{course}</p>
      <Footer />
    </>
  );
}
