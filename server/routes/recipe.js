const express = require("express");
const router = express.Router();

// /* http://localhost:5000/api/create */
const { create, list, read, update, remove } = require("../controllers/recipe");

//middleware
const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/uploadfile");

router.get("/recipe-home", list);

router.get("/recipe",auth, list);
router.get("/recipe/:id",auth, read);
router.post("/recipe",auth,upload, create);
router.put("/recipe/:id",auth,upload, update);
router.delete("/recipe/:id",auth, remove);

module.exports = router;
