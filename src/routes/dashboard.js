var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/resumo-fazenda", function(req, res) {
    dashboardController.buscarResumoFazenda(req, res);
});

router.get("/monitoramento-silos", function(req, res) {
    dashboardController.buscarMonitoramentoSilos(req, res);
});

router.get("/ultima-leitura", function(req, res) {
    dashboardController.buscarUltimaLeituraSilos(req, res);
});

router.get("/alertas-recentes", function(req, res) {
    dashboardController.buscarAlertasRecentes(req, res);
});

router.get("/silo-mais-critico", function(req, res) {
    dashboardController.buscarSiloMaisCritico(req, res);
});

router.get("/previsao-enchimento", function(req, res) {
    dashboardController.buscarPrevisaoEnchimento(req, res);
});

module.exports = router;