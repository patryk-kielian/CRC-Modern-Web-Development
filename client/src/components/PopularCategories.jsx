import { Link } from "react-router-dom";
import "../styles/PopularCategories.css";
const categories = [
  {
    id: 0,
    name: "Programming",
    imgName: "category_programming",
    short: "programming",
  },
  {
    id: 1,
    name: "IT & Software",
    imgName: "category_it_software",
    short: "it_software",
  },
  {
    id: 2,
    name: "Photography",
    imgName: "category_photography",
    short: "photography",
  },
  { id: 3, name: "School", imgName: "category_school", short: "school" },
  {
    id: 4,
    name: "Business",
    imgName: "category_business",
    short: "business",
  },
  { id: 5, name: "Music", imgName: "category_music", short: "music" },
  {
    id: 6,
    name: "Personal Development",
    imgName: "category_personal_development",
    short: "personal_development",
  },
  {
    id: 7,
    name: "Languages",
    imgName: "category_languages",
    short: "languages",
  },
];

function CategoryCard(props) {
  const { name, imgName, short } = props.category;

  return (
    <Link to={`/courses?category=${short}`}>
      <div className="categories-card">
        <div
          className="categories-img"
          style={{
            backgroundImage: `url(img/${imgName}.png)`,
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
