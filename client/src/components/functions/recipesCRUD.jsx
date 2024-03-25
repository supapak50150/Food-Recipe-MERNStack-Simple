import axios from "axios";

export const createRecipes = async (formData, authtoken) =>
  await axios.post(`${import.meta.env.VITE_REACT_APP_API}/recipe`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      authtoken,
    },
  });

export const getRecipes = async (authtoken) =>
  await axios.get(`${import.meta.env.VITE_REACT_APP_API}/recipe`, {
    headers: {
      authtoken,
    },
  });

export const getRecipesHome = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API}/recipe-home`
    );
    // console.log('Response from API:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const getRecipe = async (id, authtoken) =>
  await axios.get(`${import.meta.env.VITE_REACT_APP_API}recipe/${id}`, {
    headers: {
      authtoken,
    },
  });

export const updateRecipes = async (formData, id, authtoken) =>
  await axios.put(
    `${import.meta.env.VITE_REACT_APP_API}/recipe/${id}`,
    formData,
    {
      headers: {
        authtoken,
      },
    }
  );

export const removeRecipes = async (id, authtoken) =>
  await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/recipe/${id}`, {
    headers: {
      authtoken,
    },
  });
