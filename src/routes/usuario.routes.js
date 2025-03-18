const { Router } = require("express");
const {
  addUsuario,
  getUsuarios,
  updateUsuario,
  deleteUsuario,
  getUsuario,
  buscarUsuario,
} = require("../controllers/usuario.controller.js");

const router = Router();

router.post("/", addUsuario);
router.get("/", getUsuarios);
router.put("/:id", updateUsuario);
router.delete("/:id", deleteUsuario);
router.get("/:id", getUsuario);
router.get("/:id", getUsuario);
router.get("/buscar", buscarUsuario);  
router.get("/buscar/:ciudad", buscarUsuario);  
module.exports = router;
