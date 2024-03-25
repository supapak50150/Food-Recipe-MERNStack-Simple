const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [IngredientSchema],
      required: true,
    },
    instructions: {
      type: [String],
      required: true,
    },
    prep_time: {
      type: String,
      required: true,
    },
    cook_time: {
      type: String,
      required: true,
    },
    total_time: {
      type: String,
      required: true,
    },
    servings: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
