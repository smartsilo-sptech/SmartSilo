let alertas = [];

window.onload = function () {
    obterAlertas();
    atualizacaoPeriodica();
};

function obterAlertas() {

    fetch("/dashboard/alertas-recentes")
        .then(function (resposta) {

            if (!resposta.ok) {
                throw new Error("Erro ao buscar alertas");
            }

            return resposta.json();

        })

        .then(function (dados) {

            processarAlertas(dados);

        })

        .catch(function (erro) {

            console.error(
                "Erro ao obter alertas:",
                erro
            );

        });

}

function processarAlertas(dados) {

    alertas = [];

    for (let i = 0; i < dados.length; i++) {

        const alertaAtual = dados[i];

        let grauDeAviso = "";
        let classeCor = "";

        if (alertaAtual.ativo == 2) {

            grauDeAviso = "CRÍTICO";
            classeCor = "perigo";

        } else {

            grauDeAviso = "ALERTA";
            classeCor = "alerta";

        }

        alertas.push({

            nomeSilo:
                alertaAtual.nomeSilo,

            percentual:
                alertaAtual.percentual_ocupacao,

            dataHora:
                alertaAtual.dt_registro,

            grauDeAviso:
                grauDeAviso,

            classeCor:
                classeCor

        });

    }

    atualizarKPIs();

    exibirAlertas();

}

function atualizarKPIs() {

    const totalAlertas =
        alertas.length;

    let totalCriticos = 0;
    let totalModerados = 0;

    for (let i = 0; i < alertas.length; i++) {

        if (alertas[i].grauDeAviso == "CRÍTICO") {

            totalCriticos++;

        } else {

            totalModerados++;

        }

    }

    document.getElementById(
        "kpiTotalAlertas"
    ).innerHTML = totalAlertas;

    document.getElementById(
        "kpiCriticos"
    ).innerHTML = totalCriticos;

    document.getElementById(
        "kpiModerados"
    ).innerHTML = totalModerados;

    if (alertas.length > 0) {

        document.getElementById(
            "kpiUltimoAlerta"
        ).innerHTML = alertas[0].nomeSilo;

    } else {

        document.getElementById(
            "kpiUltimoAlerta"
        ).innerHTML = "-";

    }

}

function exibirAlertas() {

    const listaAlertas =
        document.getElementById("listaAlertas");

    listaAlertas.innerHTML = "";

    for (let i = 0; i < alertas.length; i++) {

        listaAlertas.innerHTML +=
            transformarEmLinha(alertas[i]);

    }

}

function transformarEmLinha(alertaAtual) {

    return `

        <div class="linha-alerta">

            <span>
                ${alertaAtual.nomeSilo}
            </span>

            <span>
                ${alertaAtual.percentual}%
            </span>

            <span class="${alertaAtual.classeCor}">
                ${alertaAtual.grauDeAviso}
            </span>

            <span>
                ${formatarData(alertaAtual.dataHora)}
            </span>

        </div>

    `;

}

function formatarData(dataBanco) {

    return new Date(dataBanco)
        .toLocaleString("pt-BR");

}

function atualizacaoPeriodica() {

    setTimeout(function () {

        obterAlertas();

        atualizacaoPeriodica();

    }, 10000);

}