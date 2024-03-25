const Recipe = require("../models/Recipe");
const fs = require("fs");

exports.create = async (req, res) => {
  try {
    const pic = req.file ? req.file.filename : null;
    const requestData = JSON.parse(req.body.data);
    const username = req.body.name;
    
    const newData = {
      ...requestData,
      pic,
      username,
    };

    res.json(await new Recipe(newData).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("create Recipe failed");
  }
};

exports.list = async (req, res) => {
  res.json(await Recipe.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
  const recipes = await Recipe.findOne({ _id: req.params.id }).exec();
  res.json(recipes);
};

exports.update = async (req, res) => {
  try {
    const requestData = JSON.parse(req.body.data);
    const img = requestData.pic;
    
    if (typeof req.file !== "undefined") {
      requestData.pic = req.file.filename;await fs.unlink(`./public/uploads/${img}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("remove successfully");
        }
      });
    }
    const updated = await Recipe.findOneAndUpdate(
      { _id: req.params.id },
      requestData,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Update recipe failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Recipe.findOneAndDelete({ _id: req.params.id });
    await fs.unlink(`./public/uploads/${deleted.pic}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("remove successfully");
      }
    });

    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Remove Recipe failed");
  }
};
