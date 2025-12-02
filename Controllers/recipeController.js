import recipes from "../Models/recipeSchema.js";

//creating a recipes

export const createRecipe = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);
    const newRecipe = new recipes(req.body);
    await newRecipe.save();
    res
      .status(200)
      .json({ message: "Recipes added Successfully", data: newRecipe });
  } catch (error) {
    console.log(error);
    res
      .status(503)
      .json({ message: "Cannot add the recipes, error in create recipes" });
  }
};

//get recipes

export const getAllRecipes = async (req, res) => {
  try {
    const getRecipes = await recipes.find();
    res.status(200).json({ message: "Recipes fetched", data: getRecipes });
  } catch (error) {
    console.log(error);
    res
      .status(503)
      .json({ message: "Cannot get the recipes, error in get recipes" });
  }
};

//get recipe by id

export const getRecipeById = async (req, res) => {
  try {
    const recipeID = req.params.id;
    const recipeDetails = await recipes.findById(recipeID);
    if (!recipeDetails) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe fetched", data: recipeDetails });
  } catch (error) {
    console.log(error);
    res
      .status(503)
      .json({ message: "Cannot get the recipe, error in get recipe by id" });
  }
};

//update recipe

export const updateRecipe = async (req, res) => {
  try {
    const recipeID = req.params.id;
    const { recipeName, ingredients, procedure } = req.body;
    const result = await recipes.findByIdAndUpdate(
      { _id: recipeID },
      {
        recipeName,
        ingredients,
        procedure,
      },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe updated", data: result });
  } catch (error) {
    console.log(error);
    res
      .status(503)
      .json({ message: "Cannot update the recipe, error in update recipe" });
  }
};

//delete recipe

export const deleteRecipe = async (req, res) => {
  try {
    const recipeID = req.params.id;
    const result = await recipes.findByIdAndDelete({ _id: recipeID });
    if (!result) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    const recip = await recipes.find();
    res
      .status(200)
      .json({ message: "Recipe deleted successfully", data: recip });
  } catch (error) {
    console.log(error);
    res
      .status(503)
      .json({ message: "Cannot delete the recipe, error in delete recipe" });
  }
};
