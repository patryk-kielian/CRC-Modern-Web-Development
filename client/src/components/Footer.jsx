import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer>
      <section id="logo">
        <Link to="/">
          <img
            className="footer-logo"
            src="/icons/company_icon.svg"
            alt="Trainings App Logo"
          />
        </Link>
        <p>Patryk Kielian © {new Date().getFullYear()} all rights reserved</p>
      </section>
      <section id="about">
        <h3 className="footer-title">About</h3>
        <p>
          Tutorials is a project that originated as an assignment for the
          Corporate Readiness Certificate - Modern Full-stack Web Apps
          Development course. It was later expanded as a practice project.
          Although the website does not provide actual tutorial videos or
          courses, it serves as a mock-up platform where users can create and
          manage accounts, create and edit tutorials, and enroll in them.
        </p>
      </section>
      <section id="contact">
        <h3 className="footer-title">Contact</h3>
        <ul>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="mailto: patryk.kielian0@gmail.com"
            >
              E-mail
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/patryk-kielian"
            >
              Github
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/patryk-kielian-627270269/"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://patryk-kielian.github.io/Portfolio/"
            >
              Portfolio
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
}
