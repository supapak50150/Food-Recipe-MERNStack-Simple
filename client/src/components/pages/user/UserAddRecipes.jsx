import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { createRecipes } from "../../functions/recipesCRUD";

//redux
import { useSelector } from "react-redux";

// notify
import { toast } from "react-toastify";

const UserAddRecipes = ({ setRecipeList }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);
  const [filename, setFileName] = useState("Choose a file");

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

  // // Memoize Selector ด้วย useMemo
  // const memoizedUser = useMemo(() => user, [user]);

  // submit recipe data to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // const formData = new FormData();
    // formData.append("file", file);
    // // formData.append("data", recipe);
    // formData.append("data", JSON.stringify(recipe)); // ต้องแปลงเป็น JSON ก่อนเพราะ FormData จะรับเฉพาะข้อมูลแบบ text หรือ binary เท่านั้น

    //ตรวจสอบว่าข้อมูลถูก append ให้กับ FormData เป็นอ็อบเจกต์ของข้อมูลที่ป้อนเข้ามาในฟอร์ม
    //   for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]);
    // }

    

    const formData = new FormData();
    formData.append("data", JSON.stringify(recipe));
    formData.append("file", file);
    formData.append("name", user.name);

    //ดูข้อมูลที่ถูก append ให้กับ FormData
    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });

    // createRecipes({ recipe}, user.token)
    createRecipes(formData, user.token)
      .then((res) => {
        // console.log(res);
        //   setRecipe(""); // เคลียร์ค่า name ให้เป็นค่าว่าง
        //   // setFile(""); // เคลียร์ค่า file ให้เป็น null
        // //   setFile(null);
        // //   setFileName("Choose a file");
        //   // console.log("Name after reset:", name);
        //   // console.log("File after reset:", file);
        setRecipeState({
          name: "",
          ingredients: [{ name: "", quantity: "" }],
          instructions: [""],
          prep_time: "",
          cook_time: "",
          total_time: "",
          servings: "",
        });
        setFile(null);
        setLoading(false);
        toast.success("Create " + res.data.name + " Success");
        //   document.getElementById("createRecipeForm").reset();
        //   // resetState();
        // setRecipeList(prevRecipeList => [...prevRecipeList, recipe]);
        setRecipeList((prevRecipeList) => [res.data, ...prevRecipeList]);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response);
      });

    // console.log(recipe);
    // console.log(file);
  };

  return (
    <>
      {loading ? (
        <div className="text-2xl">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
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
          <div className=" m-2">
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

          <div className="px-2 mt-4 ">
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
            <div className="">
              <label
                htmlFor="UploadFiles"
                className="block text-sm font-semibold leading-6 text-[#b67352]"
              >
                Upload multiple files:
              </label>

              <input
                className="block w-full text-sm rounded-md p-2 mt-1 bg-white border-0 cursor-pointer text-gray-900 shadow-[4px_4px_0px_0px_rgba(243,185,95)]  placeholder:text-gray-400"
                id="multiple_files"
                type="file"
                required
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setFileName(e.target.files[0].name); // Update filename state
                }}
              />
            </div>

            <div className="mt-4 mb-6">
              <button
                type="submit"
                className={`block w-full px-3.5 py-2 rounded-md shadow-[4px_4px_0px_0px_rgba(182,115,82)] ${
                  Object.values(recipe).some((value) => value < 1) || !file
                    ? // Object.values(recipe).some((value) => value < 1)
                      "bg-[rgba(243,185,95)]/50 cursor-not-allowed"
                    : "bg-[#A6CF98] text-navText font-bold shadow-[5px_5px_0px_0px_rgba(85,124,85)] hover:shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"
                }`}
                // disabled={Object.values(recipe).some((value) => value < 1) }
                disabled={
                  Object.values(recipe).some((value) => value < 1) || !file
                }
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default UserAddRecipes;
