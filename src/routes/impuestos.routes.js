// routes/impuestoRoutes.js
const express = require("express");
const {
    register,
    login,
    authenticate,
    getImpuestos,
    createImpuesto,
    updateImpuesto,
    deleteImpuesto,
    getUsuarios
} = require("../controllers/impuestosController");

const router = express.Router();
router.get("/",(req,res)=>{res.send("Hello World")})
router.get("/usuarios",getUsuarios);
router.post("/register", register);
router.post("/login", login);

router.use(authenticate);

router.get("/impuestos/:cedula",  getImpuestos);
router.post("/impuestos/:cedula", createImpuesto);
router.put("/impuestos/:id",  updateImpuesto);
router.delete("/impuestos/:id" ,deleteImpuesto);

module.exports = router;
