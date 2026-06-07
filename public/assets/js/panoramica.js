document.getElementById("div_username").innerHTML =
    sessionStorage.NOME_USUARIO.toUpperCase();

document.getElementById("div_bemVindo").innerHTML =
    `Bem vindo(a) ${sessionStorage.NOME_USUARIO}!`;

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
        return "#0eac50";
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

function carregarPanoramica() {

    fetch("/dashboard/ultima-leitura")
        .then(res => res.json())
        .then(dados => {

            const grid =
                document.getElementById("grid-silos");

            grid.innerHTML = "";

            dados.forEach((silo, index) => {

                const status =
                    obterStatus(silo.percentual_ocupacao);

                const card =
                    document.createElement("div");

                card.className = "card-silo";

                card.innerHTML = `
                    <span class="card-titulo">
                        ${silo.nomeSilo}
                    </span>

                    <div class="card-info">

                        <span class="${obterClasse(status)}">
                            Ocupação:
                            ${silo.percentual_ocupacao}%
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

    const cor = obterCor(status);

    new Chart(
        document.getElementById(`grafico${id}`),
        {
            type: "doughnut",

            data: {
                labels: [
                    "Ocupado",
                    "Disponível"
                ],

                datasets: [{
                    data: [
                        ocupacao,
                        100 - ocupacao
                    ],

                    backgroundColor: [
                        cor,
                        "#e5e5e5"
                    ]
                }]
            },

            options: {

                responsive: true,

                plugins: {
                    legend: {
                        display: false
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