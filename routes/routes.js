
const express = require("express");
const controllers = require("../controllers/users")
const router = express.Router();
const auth = require("../controllers/auth")
const employee = require("../controllers/employes")
const movies = require("../controllers/movies")
router.get("/users",auth.verifyLogin,auth.verifyToken,controllers.listClientes);
router.post("/register",controllers.registerClient);
router.post("/login",controllers.loginClient)
router.put("/updateUsers/:id",controllers.updateUser)
router.delete("/delete/:id",controllers.deleteClient)
router.get('/employees', employee.listEmployees);
router.post('/employees/register', employee.registerEmployee);
router.put('/employees/update/:id', employee.updateEmployee);
router.delete('/employees/delete/:id', employee.deleteEmployee);
router.post('/employees/login', employee.loginEmployee);
router.get('/movies', movies.listMovies);
router.post('/registerMovies', movies.registerMovie);
router.put('/movies/update/:id', movies.updateMovie);
router.delete('/movies/delete/:id', movies.deleteMovies);
module.exports = router;