document.getElementById("div_username").innerHTML =
    sessionStorage.NOME_USUARIO.toUpperCase();

document.getElementById("div_bemVindo").innerHTML =
    `Bem vindo(a) ${sessionStorage.NOME_USUARIO}!`;

const graficos = {};

function obterStatus(ocupacao) {

    if (ocupacao >= 90) {
        return "critico";
    }

    if (ocupacao >= 80) {
        return "alerta";
    }

    return "normal";
}

function obterCor(status) {

    if (status == "normal") {
        return "#0FAB51";
    }

    if (status == "alerta") {
        return "#FFCD04";
    }

    return "#AB0F0F";
}

function obterClasse(status) {

    if (status == "normal") {
        return "info-ocupacao-verde";
    }

    if (status == "alerta") {
        return "info-ocupacao-amarelo";
    }

    return "info-ocupacao-vermelho";
}

function calcularPrevisao(ocupacao) {

    const dias =
        Math.max(
            1,
            Math.round((100 - ocupacao) / 2)
        );

    return `${dias} dias`;
}

function carregarPanoramica() {

    fetch("/dashboard/ultima-leitura")

        .then(res => res.json())

        .then(dados => {

            const grid =
                document.getElementById("grid-silos");

            grid.innerHTML = "";

            dados.forEach((silo, index) => {

                const status =
                    obterStatus(
                        silo.percentual_ocupacao
                    );

                const previsao =
                    calcularPrevisao(
                        silo.percentual_ocupacao
                    );

                const card =
                    document.createElement("div");

                card.className =
                    `card-silo ${status}`;

                card.innerHTML = `

                    <span class="card-titulo">
                        ${silo.nomeSilo}
                    </span>

                    <div class="card-info">

                        <span class="${obterClasse(status)}">

                            Ocupação:
                            ${silo.percentual_ocupacao}%

                        </span>

                        <span class="previsao-silo">

                            Previsão:
                            ${previsao}

                        </span>

                    </div>

                    <div class="card-chart-wrapper">

                        <canvas id="grafico${index}">
                        </canvas>

                    </div>

                `;

                grid.appendChild(card);

                criarGrafico(
                    index,
                    silo.percentual_ocupacao,
                    status
                );

            });

        })

        .catch(erro => {

            console.error(
                "Erro ao carregar panorâmica:",
                erro
            );

        });

}

function criarGrafico(id, ocupacao, status) {

    const canvas =
        document.getElementById(`grafico${id}`);

    if (!canvas) return;

    if (graficos[id]) {
        graficos[id].destroy();
    }

    const cor =
        obterCor(status);

    graficos[id] = new Chart(

        canvas,

        {

            type: "doughnut",

            data: {

                labels: [
                    "Ocupado",
                    "Disponível"
                ],

                datasets: [

                    {

                        data: [
                            ocupacao,
                            100 - ocupacao
                        ],

                        backgroundColor: [
                            cor,
                            "#E5E7EB"
                        ],

                        borderWidth: 0

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "55%",

                plugins: {

                    legend: {
                        display: false
                    },

                    tooltip: {
                        enabled: true
                    }

                }

            }

        }

    );

}

carregarPanoramica();

setInterval(
    carregarPanoramica,
    10000
);