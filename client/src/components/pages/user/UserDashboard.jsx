import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
import { getRecipes, removeRecipes } from "../../functions/recipesCRUD";
import { toast } from "react-toastify";
import UserAddRecipes from "./UserAddRecipes";

//moment date-time format
// import moment from "moment";
import moment from "moment/min/moment-with-locales";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const UserDashboard = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleImageClick = (imageSrc) => {
    setModalImage(imageSrc);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    loadRecipe(user.token, user.name);
  }, []);

  const loadRecipe = (authtoken, name) => {
    getRecipes(authtoken)
      .then((res) => {
        const filteredRecipes = res.data.filter(
          (recipe) => recipe.username === name
        );
        setRecipeList(filteredRecipes);
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      });
  };

  const handleRemove = (id) => {
    // console.log(id);
    if (window.confirm("Are you sure you want to remove")) {
      setLoading(true);
      removeRecipes(id, user.token)
        .then((res) => {
          // console.log(res);
          loadRecipe(user.token, user.name);
          setLoading(false);
          toast.success("Remove " + res.data.name + " Success");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response);
        });
    }
  };

  const TABLE_HEAD = [
    "Name",
    "Image",
    "Ingredients",
    "Instructions",
    "Prep time",
    "Cook time",
    "Total time",
    "Servings",
    "Date-Time",
    "",
  ];

  const TABLE_ROWS = recipeList.map((recipe) => ({
    name: recipe.name,
    ingredients: recipe.ingredients
      .map((ingredient) => `${ingredient.name} (${ingredient.quantity})`)
      .join(", "),
    instructions: recipe.instructions.join(", "),
    prep_time: recipe.prep_time,
    cook_time: recipe.cook_time,
    total_time: recipe.total_time,
    servings: recipe.servings,
    pic: recipe.pic,
    date: recipe.date,
  }));

  return (
    <>
      <div className="flex justify-center">
        <div className="md:container md:mx-auto  max-w-md mx-auto">
          <div className="flex flex-wrap ">
            <div className="flex items-top justify-center w-full lg:w-1/3 py-2">
              <div className="bg-[#FFEAD2] rounded-2xl  shadow-[5px_5px_0px_0px_rgba(243,185,95)] ">
                <div className="m-4 ">
                  <div className="bg-[#f1a261] py-1 m-2 rounded-2xl shadow-[5px_5px_0px_0px_rgba(243,185,95)] ">
                    <div className="m-4 text-4xl font-medium text-center">
                      Add Recipes 🍲🍰☕
                    </div>
                  </div>
                  {/* <UserAddRecipes onUpdateRecipeList={setRecipeList} /> */}
                  {/* <UserAddRecipes /> */}
                  <UserAddRecipes setRecipeList={setRecipeList} />
                </div>
              </div>
            </div>
            <div className="flex items-top justify-center w-full  lg:w-2/3 pl-4 py-2">
              <Card className="w-full h-[795px] overflow-scroll bg-[#fff2df] rounded-2xl text-md shadow-lg ">
                <table className="w-full min-w-max table-auto ">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th key={head} className="border-b bg-[#b67352] p-4">
                          <Typography
                            variant="h3"
                            color="white"
                            className="font-normal text-left leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS.map(
                      (
                        {
                          name,
                          ingredients,
                          instructions,
                          prep_time,
                          cook_time,
                          total_time,
                          servings,
                          pic,
                          date,
                        },
                        index
                      ) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-[#b67352] ";

                        return (
                          <tr key={index}>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {name}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                <img
                                  class="h-[60px] max-w-xs rounded transition duration-300 transform hover:scale-110 cursor-pointer"
                                  src={`http://localhost:5000/uploads/${pic}`}
                                  alt="image recipe"
                                  onClick={() =>
                                    handleImageClick(
                                      `http://localhost:5000/uploads/${pic}`
                                    )
                                  }
                                />
                                {/* The Modal */}
                                {showModal && (
                                  <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
                                    <div className="modal-content rounded-lg">
                                      <div
                                        className="absolute top-4 right-4 flex rounded-full  bg-orange-500 text-orange-200 text-4xl cursor-pointer"
                                        onClick={handleCloseModal}
                                      >
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                      </div>
                                      <img
                                        src={modalImage}
                                        className="block mx-auto w-[700px]"
                                      />
                                    </div>
                                  </div>
                                )}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {ingredients
                                  .split(", ")
                                  .map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                  ))}
                              </Typography>
                            </td>
                            <td className={`${classes} `}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal "
                              >
                                {instructions
                                  .split(", ")
                                  .map((instruction, index) => (
                                    <li key={index} className="custom-li-width">
                                      {instruction}
                                    </li>
                                  ))}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                as="a"
                                href="#"
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                              >
                                {prep_time}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                as="a"
                                href="#"
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                              >
                                {cook_time}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                as="a"
                                href="#"
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                              >
                                {total_time}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                as="a"
                                href="#"
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                              >
                                {servings}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                as="a"
                                href="#"
                                variant="small"
                                color="blue-gray"
                                className="font-medium "
                              >
                                {/* {date} */}
                                {/* {moment(date).locale('th').format('dddd Do MMMM  YYYY - h:mm:ss a')} */}
                                {moment(date).format(
                                  "dddd D-MM-YYYY h:mm:ss a"
                                )}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                as="a"
                                href="#"
                                variant="small"
                                color="blue-gray"
                                className="font-medium "
                              >
                                <div className="flex flex-row">
                                  <div className="px-2">
                                    {/* <Link to={`/user/update-recipe/` + recipeList[index]._id}>
                                      <button className="block w-full py-1 px-2 bg-[rgba(243,185,95)] rounded-md text-[#e17511] hover:text-[#FFEAD2] hover:bg-[#f1a261] ">
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                      </button>
                                    </Link> */}
                                    <Link
                                      to={`/user/update-recipe/${recipeList[index]._id}`}
                                    >
                                      <button className="block w-full py-1 px-2 bg-[rgba(243,185,95)] rounded-md text-[#e17511] hover:text-[#FFEAD2] hover:bg-[#f1a261] ">
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                      </button>
                                    </Link>
                                  </div>
                                  <div className="px-2">
                                    <button
                                      className="block w-full py-1 px-2 bg-[#e17511] rounded-md text-[#FFEAD2] hover:text-[#e17511] hover:bg-[#f1a261] "
                                      // onClick={() =>
                                      //   onClick(
                                      //     recipeList.map((recipe) => ({
                                      //       _id: recipe._id,
                                      //     })),(index)
                                      //   )
                                      // }
                                      onClick={() =>
                                        handleRemove(recipeList[index]._id)
                                      }
                                      // onClick={() => onClick(recipe._id)}
                                    >
                                      <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                  </div>
                                  <div className="px-2">
                                    <Link to={`/recipe-detail/${recipeList[index]._id}`}>
                                      <button className="block w-full py-1 px-2 bg-[#A6CF98] rounded-md text-navText hover:text-[#A6CF98] hover:bg-navText ">
                                        <FontAwesomeIcon icon={faEye} />
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
