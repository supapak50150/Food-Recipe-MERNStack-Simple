const Recipe = require("../models/Recipe");
const fs = require("fs");

exports.create = async (req, res) => {
  try {
    // const { recipe} = req.body;
    // console.log(recipe);
    // res.json(await new Recipe(recipe).save());

    const pic = req.file ? req.file.filename : null;
    // console.log(pic);
    const requestData = JSON.parse(req.body.data);
    // console.log(requestData);
    // console.log(req.body);
    const username = req.body.name;
    // console.log(username);
    
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
  //   res.send("Hello list Recipe");
  res.json(await Recipe.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
  // res.send("Hello read Recipe");
  const recipes = await Recipe.findOne({ _id: req.params.id }).exec();
  res.json(recipes);
};

exports.update = async (req, res) => {
  // res.send("Hello update Recipe");
  // const { name } = req.body;
  //   // const { data,filename } = req.body;
  //   // console.log(filename);
  try {
    //     // const { data, filename } = req.body;
    //     const { data, fileOld } = req.body;
    //     const newData = {
    //       name: data,
    //       // pic: filename,
    //       pic: fileOld,
    //     };
    //     if (typeof req.file !== "undefined") {
    //       // newData.pic = req.file.filename;
    //       newData.pic = req.file.filename;
    //       // await fs.unlink(`./public/uploads/${filename}`, (err) => {
    //       await fs.unlink(`./public/uploads/${req.body.fileOld}`, (err) => {
    //         if (err) {
    //           console.log(err);
    //         } else {
    //           console.log("remove successfully");
    //         }
    //       });
    //     }
    // const updated = await Recipe.findOneAndUpdate(
    //   { _id: req.params.id },
    //   newData,
    //   { new: true }
    // );

    //-------------------------------------
    // const { recipe } = req.body;
    // const updated = await Recipe.findOneAndUpdate(
    //   { _id: req.params.id },
    //   recipe,
    //   { new: true }
    // );
    // console.log(recipe);
    // res.json(updated);
    //-------------------------------------

    // const pic = req.file ? req.file.filename : null;
    // console.log(req.file);

    const requestData = JSON.parse(req.body.data);
    const img = requestData.pic;
    // console.log(img); 
    // console.log(requestData.pic);
    // console.log(req.body);
    // console.log(req.file);
    

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
    // console.log(requestData);
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Update recipe failed");
  }
};

exports.remove = async (req, res) => {
  // res.send("Hello remove Recipe");
  try {
    const deleted = await Recipe.findOneAndDelete({ _id: req.params.id });
    // console.log(deleted);
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
