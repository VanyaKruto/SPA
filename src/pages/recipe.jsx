import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMealById } from "./api";
import { Preloader } from "../components/preloader";

function Recipe() {
  const [Recipe, setRecipe] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  useEffect(() => {
    getMealById(id).then((data) => setRecipe(data.meals[0]));
  }, [id]);
  return (
    <>
      {!Recipe.idMeal ? (
        <Preloader />
      ) : (
        <div className="recipe">
          <img src={Recipe.strMealThumb} alt={Recipe.strMeal} />
          <h1>{Recipe.strMeal}</h1>
          <h6>Category: {Recipe.strCategory}</h6>
          {Recipe.strArea ? <h6>Area: {Recipe.strArea}</h6> : null}
          <p>{Recipe.strInstructions}</p>

          <table className="centered">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Measure</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(Recipe).map((key) => {
                if (key.includes("Ingredient") && Recipe[key]) {
                  return (
                    <tr key={key}>
                      <td>{Recipe[key]}</td>
                      <td>{Recipe[`strMeasure${key.slice(13)}`]}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>

          {Recipe.strYoutube ? (
            <div className="row">
              <h5 style={{ margin: "2rem 0 1.5rem" }}>Video Recipe</h5>
              <iframe
                title={id}
                src={`https://www.youtube.com/embed/${Recipe.strYoutube.slice(
                  -11
                )}`}
                allowfullscreen
              />
            </div>
          ) : null}
        </div>
      )}
      <button className="btn" onClick={goBack}>
        Go Back
      </button>
    </>
  );
}

export { Recipe };
