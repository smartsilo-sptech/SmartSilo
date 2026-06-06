var dashboardModel = require("../models/dashboardModel");

function buscarVisaoGeral(req, res) {

    dashboardModel.buscarVisaoGeral()

    .then(function(resultado){

        res.status(200).json(resultado);

    })

    .catch(function(erro){

        console.log(erro);

        res.status(500).json(erro);

    });

}

function buscarPanoramica(req, res) {

    dashboardModel.buscarPanoramica()

    .then(function(resultado){

        res.status(200).json(resultado);

    })

    .catch(function(erro){

        console.log(erro);

        res.status(500).json(erro);

    });

}

function buscarAlertas(req, res) {

    dashboardModel.buscarAlertas()

    .then(function(resultado){

        res.status(200).json(resultado);

    })

    .catch(function(erro){

        console.log(erro);

        res.status(500).json(erro);

    });

}

module.exports = {

    buscarVisaoGeral,
    buscarPanoramica,
    buscarAlertas

};