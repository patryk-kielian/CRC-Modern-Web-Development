import { Link } from "react-router-dom";
import "../styles/Error.css";

export default function Error({ textMessage, textButton, route }) {
  console.log(route);
  return (
    <main className="error-background">
      <div className="error-content">
        <h3>{textMessage}</h3>
        <Link to={route}>
          <button className="violet">{textButton}</button>
        </Link>
      </div>
    </main>
  );
}
