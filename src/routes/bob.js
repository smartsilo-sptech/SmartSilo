var express = require("express");
var router = express.Router();

var bobController = require("../controllers/bobController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/perguntar", function (req, res) {
    bobController.perguntar(req, res);
})

module.exports = router;