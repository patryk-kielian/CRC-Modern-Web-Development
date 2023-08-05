import { Link } from "react-router-dom";
import "../styles/PopularCategories.css";
const categories = [
  { id: 0, name: "Programming", short: "category_programming" },
  { id: 1, name: "IT & Software", short: "category_it_software" },
  { id: 2, name: "Photography", short: "category_photography" },
  { id: 3, name: "School", short: "category_school" },
  { id: 4, name: "Business", short: "category_business" },
  { id: 5, name: "Music", short: "category_music" },
  {
    id: 6,
    name: "Personal Development",
    short: "category_personal_development",
  },
  { id: 7, name: "Languages", short: "category_languages" },
];

function CategoryCard(props) {
  const { name, short } = props.category;

  return (
    <Link to={`/courses?${short}`}>
      <div className="categories-card">
        <div
          className="categories-img"
          style={{
            backgroundImage: `url(img/${short}.png)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>

        <h4>{name}</h4>
      </div>
    </Link>
  );
}

export default function PopularCategories() {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryCard key={`cat_${category.id}`} category={category} />
      ))}
    </div>
  );
}
