var dashboardModel = require("../models/dashboardModel");

function buscarResumoFazenda(req, res) {

    dashboardModel.buscarResumoFazenda()

    .then(function(resultado){

        res.status(200).json(resultado);

    })

    .catch(function(erro){

        console.log(erro);

        res.status(500).json(erro);

    });

}

function buscarMonitoramentoSilos(req, res) {

    dashboardModel.buscarMonitoramentoSilos()

    .then(function(resultado){

        res.status(200).json(resultado);

    })

    .catch(function(erro){

        console.log(erro);

        res.status(500).json(erro);

    });

}

function buscarUltimaLeituraSilos(req, res) {

    dashboardModel.buscarUltimaLeituraSilos()

    .then(function(resultado){

        res.status(200).json(resultado);

    })

    .catch(function(erro){

        console.log(erro);

        res.status(500).json(erro);

    });

}

function buscarAlertasRecentes(req, res) {

    dashboardModel.buscarAlertasRecentes()

    .then(function(resultado){

        res.status(200).json(resultado);

    })

    .catch(function(erro){

        console.log(erro);

        res.status(500).json(erro);

    });

}

function buscarSiloMaisCritico(req, res) {

    dashboardModel.buscarSiloMaisCritico()

    .then(function(resultado){

        res.status(200).json(resultado);

    })

    .catch(function(erro){

        console.log(erro);

        res.status(500).json(erro);

    });

}

function buscarPrevisaoEnchimento(req, res) {

    dashboardModel.buscarPrevisaoEnchimento()

    .then(function(resultado){

        res.status(200).json(resultado);

    })

    .catch(function(erro){

        console.log(erro);

        res.status(500).json(erro);

    });

}

function buscarResumoStatusSilos(req, res) {

    dashboardModel.buscarResumoStatusSilos()

    .then(function(resultado){

        res.status(200).json(resultado);

    })

    .catch(function(erro){

        console.log(erro);

        res.status(500).json(erro);

    });

}

module.exports = {

    buscarResumoFazenda,
    buscarMonitoramentoSilos,
    buscarUltimaLeituraSilos,
    buscarAlertasRecentes,
    buscarSiloMaisCritico,
    buscarPrevisaoEnchimento,
    buscarResumoStatusSilos
};