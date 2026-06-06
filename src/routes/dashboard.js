var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/visao-geral", function(req, res) {
    dashboardController.buscarVisaoGeral(req, res);
});

router.get("/panoramica", function(req, res) {
    dashboardController.buscarPanoramica(req, res);
});

router.get("/alertas", function(req, res) {
    dashboardController.buscarAlertas(req, res);
});

module.exports = router;