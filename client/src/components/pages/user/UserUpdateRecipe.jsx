import React, { useState, useEffect } from "react";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRecipe, updateRecipes } from "../../functions/recipesCRUD";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//redux
import { useSelector } from "react-redux";

// notify
import { toast } from "react-toastify";

const UserUpdateRecipe = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);
  const [filename, setFileName] = useState("");

  const [recipe, setRecipeState] = useState({
    name: "",
    ingredients: [{ name: "", quantity: "" }],
    instructions: [""],
    prep_time: "",
    cook_time: "",
    total_time: "",
    servings: "",
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (
      name === "name" ||
      name === "prep_time" ||
      name === "cook_time" ||
      name === "total_time" ||
      name === "servings"
    ) {
      setRecipeState({ ...recipe, [name]: value });
    } else if (name === "ingredientName") {
      const ingredients = [...recipe.ingredients];
      ingredients[index].name = value;
      setRecipeState({ ...recipe, ingredients });
    } else if (name === "ingredientQuantity") {
      const ingredients = [...recipe.ingredients];
      ingredients[index].quantity = value;
      setRecipeState({ ...recipe, ingredients });
    } else if (name === "instruction") {
      const instructions = [...recipe.instructions];
      instructions[index] = value;
      setRecipeState({ ...recipe, instructions });
    }
    console.log(name);
  };

  const handleAddIngredient = () => {
    setRecipeState({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: "", quantity: "" }],
    });
  };

  const handleRemoveIngredient = (index) => {
    const ingredients = [...recipe.ingredients];
    ingredients.splice(index, 1);
    setRecipeState({ ...recipe, ingredients });
  };

  const handleAddInstruction = () => {
    setRecipeState({ ...recipe, instructions: [...recipe.instructions, ""] });
  };

  const handleRemoveInstruction = (index) => {
    const instructions = [...recipe.instructions];
    instructions.splice(index, 1);
    setRecipeState({ ...recipe, instructions });
  };

  useEffect(() => {
    loadRecipe(id, user.token);
  }, [id, user.token]);

  // useEffect(() => {
  //   // ตั้งค่าค่าเริ่มต้นที่ใช้ใน input จาก res.data.pic
  //   if (res.data) {
  //     setFileName(res.data.pic); // ตั้งชื่อไฟล์เป็นชื่อที่ได้จาก res.data.pic
  //   }
  // }, [res.data]);

  // // เมื่อมีการเลือกไฟล์ใหม่
  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (selectedFile) {
  //     setFile(selectedFile);
  //     setFileName(selectedFile.name);
  //   }
  // };

  const loadRecipe = (id, authtoken) => {
    getRecipe(id, authtoken)
      .then((res) => {
        setRecipeState(res.data);
        setFileName(res.data.pic);
        // console.log(res.data.pic);
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      });
  };

  const navigate = useNavigate();

  // Update recipe data to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("data", JSON.stringify(recipe));
    formData.append("file", file);
    formData.append("fileName", filename);

    // updateRecipes({ recipe }, id, user.token)
    updateRecipes(formData, id, user.token)
      .then((res) => {
        setLoading(false);
        // loadRecipe(user.token);
        toast.success("Update " + res.data.name + " Success");
        navigate("/user/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response);
      });

    console.log(recipe);
  };

  return (
    <div className="flex justify-center ">
      <div className="md:w-[80rem] xs:w-auto bg-[#FFEAD2] mb-4 rounded-2xl shadow-[5px_5px_0px_0px_rgba(243,185,95)] ">
        <div className="p-10 ">
          {loading ? (
            <div className="text-2xl">Loading...</div>
          ) : (
            <div className="">
              <h1 className="mb-2 text-center text-4xl font-bold text-primaryText">
                🍲 Update Recipe 🍰☕
              </h1>
            </div>
          )}
          <div className="">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap ">
                <div className="lg:w-1/2 w-full">
                  <div className="mt-5 m-2">
                    <label
                      htmlFor="ingredient-name"
                      className="block text-sm font-semibold leading-6 text-[#B67352]"
                    >
                      Recipe Name:
                    </label>
                    <input
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-[4px_4px_0px_0px_rgba(243,185,95)]  placeholder:text-gray-400 "
                      type="text"
                      name="name"
                      placeholder="Recipe Name"
                      required
                      value={recipe.name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Ingredient Inputs */}
                  <div className="py-4 m-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="md:flex ">
                        <div className="md:w-2/3 md:pr-2 sm:w-full mt-2">
                          <label
                            htmlFor="ingredient-name"
                            className="block text-sm font-semibold leading-6 text-[#B67352]"
                          >
                            Ingredient Name:
                          </label>
                          <input
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-[4px_4px_0px_0px_rgba(243,185,95)] placeholder:text-gray-400"
                            type="text"
                            name="ingredientName"
                            placeholder="Ingredient Name"
                            value={ingredient.name}
                            onChange={(e) => handleChange(e, index)}
                          />
                        </div>
                        <div className="md:w-1/3 md:pr-2 sm:w-full mt-2">
                          <label
                            htmlFor="quantity"
                            className="block text-sm font-semibold leading-6 text-[#B67352]"
                          >
                            Quantity:
                          </label>
                          <input
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-[4px_4px_0px_0px_rgba(243,185,95)] placeholder:text-gray-400"
                            type="text"
                            name="ingredientQuantity"
                            placeholder="Quantity"
                            value={ingredient.quantity}
                            onChange={(e) => handleChange(e, index)}
                          />
                        </div>
                        <div className="flex items-end justify-center mt-2">
                          <button
                            type="button"
                            onClick={() => handleRemoveIngredient(index)}
                            className="block w-full px-3.5 py-2 bg-[rgba(243,185,95)] rounded-md shadow-[4px_4px_0px_0px_rgba(182,115,82)] hover:bg-[#f1a261] "
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="md:py-2 mt-2">
                      <button
                        type="button"
                        onClick={handleAddIngredient}
                        className="block w-full px-3.5 py-2 text-[#b67300] bg-[#f5b470] rounded-md shadow-[4px_4px_0px_0px_rgba(182,115,82)] hover:bg-[#f1a261] "
                      >
                        <FontAwesomeIcon icon={faPlus} /> Add Ingredient
                      </button>
                    </div>
                  </div>
                  {/* Ingredient Inputs */}
                  {/* Instruction Inputs */}
                  <div className="m-2">
                    {recipe.instructions.map((instruction, index) => (
                      <div key={index} className="md:flex ">
                        <div className="md:w-3/4 md:pr-2 sm:mt-2 sm:w-full ">
                          <label
                            htmlFor="instruction"
                            className="block text-sm font-semibold leading-6 text-[#B67352]"
                          >
                            Instruction:
                          </label>
                          <input
                            type="text"
                            name="instruction"
                            value={instruction}
                            onChange={(e) => handleChange(e, index)}
                            placeholder={`Instruction ${index + 1}`}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-[4px_4px_0px_0px_rgba(243,185,95)] placeholder:text-gray-400"
                          />
                        </div>
                        <div className="md:w-1/4 flex items-end justify-center sm:mt-2">
                          <button
                            type="button"
                            onClick={() => handleRemoveInstruction(index)}
                            className="block w-full px-3.5 py-2 bg-[#f3b95f] rounded-md shadow-[4px_4px_0px_0px_rgba(182,115,82)] hover:bg-[#f1a261] "
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="md:py-2 mt-2">
                      <button
                        type="button"
                        onClick={handleAddInstruction}
                        className="block w-full px-3.5 py-2 text-[#b67300] bg-[#f5b470] rounded-md shadow-[4px_4px_0px_0px_rgba(182,115,82)] hover:bg-[#f1a261] "
                      >
                        <FontAwesomeIcon icon={faPlus} /> Add Instruction
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 px-2 ">
                    <div className="md:flex ">
                      <div className="md:w-1/2 md:pr-2  sm:w-full sm:pr-0 sm:mt-2">
                        <label
                          htmlFor="prep_time"
                          className="block text-sm font-semibold leading-6 text-[#B67352]"
                        >
                          Preparation Time:
                        </label>
                        <input
                          type="text"
                          id="prep_time"
                          name="prep_time"
                          value={recipe.prep_time}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-[4px_4px_0px_0px_rgba(243,185,95)] placeholder:text-gray-400"
                        />
                      </div>
                      <div className="md:w-1/2 md:pl-2 sm:w-full sm:pl-0 sm:mt-2">
                        <label
                          htmlFor="cook_time"
                          className="block text-sm font-semibold leading-6 text-[#B67352]"
                        >
                          Cooking Time:
                        </label>
                        <input
                          type="text"
                          id="cook_time"
                          name="cook_time"
                          value={recipe.cook_time}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-[4px_4px_0px_0px_rgba(243,185,95)] placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                    <div className="md:flex py-2">
                      <div className="md:w-1/2 md:pr-2  sm:w-full sm:mt-2">
                        <label
                          htmlFor="total_time"
                          className="block text-sm font-semibold leading-6 text-[#B67352]"
                        >
                          Total Time:
                        </label>
                        <input
                          type="text"
                          id="total_time"
                          name="total_time"
                          value={recipe.total_time}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-[4px_4px_0px_0px_rgba(243,185,95)] placeholder:text-gray-400"
                        />
                      </div>
                      <div className="md:w-1/2 md:pl-2 sm:w-full sm:pl-0 sm:mt-2">
                        <label
                          htmlFor="servings"
                          className="block text-sm font-semibold leading-6 text-[#b67352]"
                        >
                          Servings:
                        </label>
                        <input
                          type="text"
                          id="servings"
                          name="servings"
                          value={recipe.servings}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-[4px_4px_0px_0px_rgba(243,185,95)] placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2  px-2 w-full">
                  <div className="mt-5">
                    <label
                      htmlFor="UploadFiles"
                      className="block text-sm font-semibold leading-6 text-[#b67352]"
                    >
                      Upload multiple files:
                    </label>
                    <div className="flex justify-center mt-7 mb-7">
                      <img
                        class="h-[300px] max-w-md "
                        // src={`http://localhost:5000/uploads/${fileName}`}
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : `http://localhost:5000/uploads/${filename}`
                        }
                        alt="image recipe"
                      ></img>
                    </div>

                    <input
                      class="block w-full text-sm rounded-md p-2  bg-white border-0 cursor-pointer text-gray-900 shadow-[4px_4px_0px_0px_rgba(243,185,95)]  placeholder:text-gray-400"
                      id="multiple_files"
                      type="file"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        setFileName(e.target.files[0].name); // Update filename state
                      }}
                    />
                  </div>
                  <div className="mt-4 ">
                    <button
                      type="submit"
                      className={`block w-full px-3.5 py-2 rounded-md shadow-[4px_4px_0px_0px_rgba(182,115,82)] ${
                        Object.values(recipe).some((value) => value === "")
                          ? "bg-[rgba(243,185,95)]/50 cursor-not-allowed"
                          : "bg-[#A6CF98] text-navText font-bold shadow-[5px_5px_0px_0px_rgba(85,124,85)] hover:shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"
                      }`}
                      disabled={Object.values(recipe).some(
                        (value) => value === ""
                      )}
                      // className="bg-red-400"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateRecipe;
