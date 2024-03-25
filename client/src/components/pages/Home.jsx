import React, { useEffect, useState } from "react";
import catCookingImage from "../../assets/catCooking.png"; // Import the image

import { getRecipesHome } from "../functions/recipesCRUD";
//moment date-time format
import moment from "moment";
import { Link } from "react-router-dom";

const Home = () => {
  const [recipeList, setRecipeList] = useState([]);

  const loadRecipe = () => {
    getRecipesHome()
      .then((res) => {
        // console.log('Recipes : ',res);
        setRecipeList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadRecipe();
  }, []);

  // console.log('Food Recipes : ',recipeList);

  const foodRecipes = recipeList.map((recipe) => ({
    name: recipe.name,
    username: recipe.username,
    pic: recipe.pic,
    date: recipe.date,
    id: recipe._id,
  }));

  return (
    <>
      <div className="flex justify-center py-2">
        <div className="bg-[#FFEAD2] rounded-2xl shadow-[5px_5px_0px_0px_rgba(243,185,95)] ">
          <div className="md:container md:mx-auto max-w-md mx-auto">
            <div className="flex flex-wrap ">
              <div className="flex items-center w-full lg:w-1/2 ">
                <div className="m-10">
                  <h1 className="py-2 px-4 text-4xl font-bold leading-snug tracking-tight text-primaryText lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight ">
                    Welcome to MaewPao Food Recipes 🥗📜
                  </h1>
                  <p className="py-2 px-4 text-xl leading-normal text-secondaryText lg:text-xl xl:text-2xl ">
                    " Are you ready to have fun sharing the recipes I've
                    carefully selected for you and to enjoy exploring new
                    culinary adventures together? Let's stick around to discover
                    the most exciting and delicious recipes! "
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center w-full lg:w-1/2">
                <div className="m-4">
                  <img
                    src={catCookingImage}
                    alt="Cat Cooking"
                    width={500}
                    className="max-w-full h-auto drop-shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 md:container md:mx-auto">
        <div className="mb-4 border-b pb-4 text-5xl leading-tight font-bold text-primaryText text-center">
        ✨ Recipe 🍲
        </div>

        {/* <div className="flex mb-20">
          <div className="p-4 m-2  bg-[#FFEAD2] shadow-[5px_5px_0px_0px_rgba(243,185,95)] rounded-xl  ">
            <picture className="rounded-lg overflow-hidden block">
              <img
                className="hover:scale-125 ease-in duration-150"
                src="https://picsum.photos/360/240"
              />
            </picture>

            <h1 className="mt-4 mb-2 text-xl font-bold text-primaryText">
              Recipe name
            </h1>
            <p className="leading-normal  text-secondaryText">
              by Gojo127 : 12-12-2022{" "}
            </p>
            <div className="mt-2">
              <button
                type="button"
                className="text-navText  bg-[#A6CF98] shadow-[4px_4px_0px_0px_rgba(85,124,85)]
             font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2  "
              >
                Read more
              </button>
            </div>
          </div>
        </div> */}

        {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`p-4 m-2 bg-[#FFEAD2] shadow-[5px_5px_0px_0px_rgba(243,185,95)] rounded-xl ${
                index === 2 ? "place-items-center" : ""
              }`}
            >
              <picture className="rounded-lg overflow-hidden block">
                <img
                  className="hover:scale-125 ease-in duration-150"
                  src="https://picsum.photos/360/240"
                />
              </picture>

              <h1 className="mt-4 mb-2 text-xl font-bold text-primaryText">
                Recipe name
              </h1>
              <p className="leading-normal text-secondaryText">
                by Gojo127 : 12-12-2022
              </p>
              <div className="mt-2">
                <button
                  type="button"
                  className="text-navText bg-[#A6CF98] shadow-[4px_4px_0px_0px_rgba(85,124,85)] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                >
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div> */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {foodRecipes.map((recipe, index) => (
            <div
              key={index}
              className={`p-4 m-2 bg-[#544538]  shadow-[5px_5px_0px_0px_rgba(68,52,34,1.00)] rounded-xl ${
                index === 2 ? "place-items-center" : ""
              }`}
              style={{ height: 'fit-content' }}
            >
              <picture className="rounded-lg overflow-hidden block">
                <img
                  className="h-[200px] w-[400px] hover:scale-125 ease-in duration-150"
                  src={`http://localhost:5000/uploads/${recipe.pic}`} // ใช้ค่า pic จาก foodRecipes ที่สร้างขึ้น
                  alt={recipe.name} // เพิ่ม alt attribute สำหรับ accessibility
                />
              </picture>
              <h1 className="mt-4 mb-2 text-xl font-bold text-primaryText">
                {recipe.name}
              </h1>
              <div className="leading-normal text-secondaryText">
                <p>by : {recipe.username}</p>
                <p>{moment(recipe.date).format("dddd D-MM-YYYY h:mm:ss a")}</p>
              </div>
              <div className="mt-3">
                
                <Link to={`/recipe-detail/${recipe.id}`}>
                  <button className="text-navText bg-[#A6CF98] hover:bg-[#9ad085] shadow-[4px_4px_0px_0px_rgba(85,124,85)] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
                    Read more
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
