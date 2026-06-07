var database = require("../database/config");

function buscarResumoFazenda() {

    var instrucaoSql = `SELECT * FROM vw_ocupacao_fazenda;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMonitoramentoSilos() {

    var instrucaoSql = `SELECT * FROM vw_silos_monitoramento;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimaLeituraSilos() {

    var instrucaoSql = `SELECT * FROM vw_ultima_leitura_silo ORDER BY nomeSilo;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlertasRecentes() {

    var instrucaoSql = `SELECT * FROM vw_alertas_recentes ORDER BY dt_registro DESC;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarResumoFazenda,
    buscarMonitoramentoSilos,
    buscarUltimaLeituraSilos,
    buscarAlertasRecentes
}