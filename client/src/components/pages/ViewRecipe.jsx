import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipesHome } from "../functions/recipesCRUD";
import moment from "moment";

const ViewRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [{ name: "", quantity: "" }],
    instructions: [""],
    prep_time: "",
    cook_time: "",
    total_time: "",
    servings: "",
    date: "",
    username: "",
  });

  // console.log(id);
  const loadRecipe = () => {
    getRecipesHome()
      .then((res) => {
        const filteredRecipes = res.find((recipe) => recipe._id === id);
        // console.log('Recipes : ',res);
        setRecipe(filteredRecipes);
        // console.log('Recipes : ',filteredRecipes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadRecipe();
  }, []);

  //   console.log(recipe);

  return (
    <>
      <div className="flex justify-center py-2">
        <div className="bg-[#FFEAD2] rounded-2xl shadow-[5px_5px_0px_0px_rgba(243,185,95)] ">
          <div className="md:container md:mx-auto max-w-md mx-auto">
            <div className="flex flex-wrap ">
              <div className="flex items-top justify-center w-full lg:w-1/3 ">
                <div className="m-6 ">
                  <picture className="rounded-lg overflow-hidden block">
                    <img
                      className="w-[1000px]"
                      // src="https://picsum.photos/360/240"
                      src={`http://localhost:5000/uploads/${recipe.pic}`}
                    />
                  </picture>
                </div>
              </div>
              <div className="flex w-full lg:w-2/3">
                <div className="mt-2 mb-6 px-2">
                  <h1 className="py-2 px-4 text-4xl font-bold leading-snug tracking-tight text-primaryText lg:text-2xl lg:leading-tight xl:text-6xl xl:leading-tight ">
                    {recipe.name}
                  </h1>
                  <div className="mt-2">
                    <p className="py-2 px-4 text-lg leading-normal text-secondaryText lg:text-lg xl:text-xl ">
                      <b>By:</b> {recipe.username} <b>Date:</b>
                      {moment(recipe.date).format("dddd D-MM-YYYY h:mm:ss a")}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="py-2 px-4 text-lg font-bold leading-normal text-primaryText lg:text-xl xl:text-2xl ">
                      Food Recipes 🥙
                    </p>
                    <div className="pl-10 text-primaryText">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>
                          {ingredient.name}: {ingredient.quantity}
                        </li>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="py-2 px-4 text-lg font-bold leading-normal text-primaryText lg:text-xl xl:text-2xl ">
                      Food Recipes 👨‍🍳
                    </p>
                    <div className="pl-10 text-primaryText">
                      {recipe.instructions
                        .map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRecipe;
