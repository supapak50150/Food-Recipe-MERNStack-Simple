const express = require("express");
const router = express.Router();

// /* http://localhost:5000/api/create */
const { create, list, read, update, remove } = require("../controllers/recipe");

//middleware
const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/uploadfile");

// router.get("/people", auth, list);
// router.get("/people/:id", auth, read);
// // router.post('/person', auth, create);
// router.post("/people", auth, upload, create);
// router.put("/people/:id", auth,upload, update);
// router.delete("/people/:id", auth, remove);

router.get("/recipe-home", list);

router.get("/recipe",auth, list);
router.get("/recipe/:id",auth, read);
router.post("/recipe",auth,upload, create);
// router.post("/recipe",auth, create);
// router.put("/recipe/:id",auth, update);
router.put("/recipe/:id",auth,upload, update);
router.delete("/recipe/:id",auth, remove);

// /* http://localhost:5000/api/create */
// router.get('/create', (req, res) => {
//     res.send('create person')
// })

// /* http://localhost:5000/api/update */
// router.get('/update', (req, res) => {
//     res.send('update person')
// })

module.exports = router;
