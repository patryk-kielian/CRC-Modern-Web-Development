import { Link } from "react-router-dom";
import "../styles/NotFound404.css";

export default function NotFound404() {
  return (
    <main className="error-background">
      <div className="error-404">
        <Link to="/">
          <h1>404</h1>
          <h2>Page not found</h2>
        </Link>
      </div>
    </main>
  );
}
