
const express = require("express");
const controllers = require("../controllers/users")
const router = express.Router();


router.get("/users",controllers.usersFinder);
router.post("/addUsers",controllers.addUsers);
router.put("/updateUsers/:email",controllers.updateUser)
router.delete("/delete/:email",controllers.deleteUser)




module.exports = router;