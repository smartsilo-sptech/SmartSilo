document.getElementById('div_username').innerHTML =
    sessionStorage.NOME_USUARIO;

document.getElementById('div_bemVindo').innerHTML =
    `Bem vindo(a) ${sessionStorage.NOME_USUARIO}!`;

window.onload = carregarPanoramica;

function carregarPanoramica() {

    fetch("/dashboard/ultima-leitura")
        .then(res => res.json())
        .then(dados => {

            renderizarSilos(dados);

        })
        .catch(erro => {

            console.log(erro);

        });
}

function getStatus(ocupacao) {

    if (ocupacao >= 90) {
        return "critico";
    }

    if (ocupacao >= 80) {
        return "alerta";
    }

    return "ideal";
}

function getCor(status) {

    if (status == "ideal") {
        return "#0eac50";
    }

    if (status == "alerta") {
        return "#FFCD04";
    }

    return "#AB0F0F";
}

function getClasseOcupacao(status) {

    if (status == "ideal") {
        return "info-ocupacao-verde";
    }

    if (status == "alerta") {
        return "info-ocupacao-amarelo";
    }

    return "info-ocupacao-vermelho";
}

function renderizarSilos(listaSilos) {

    const grid = document.getElementById("grid-silos");

    grid.innerHTML = "";

    for (let i = 0; i < listaSilos.length; i++) {

        const silo = listaSilos[i];

        const status =
            getStatus(silo.percentual_ocupacao);

        const card = document.createElement("div");

        card.className = "card-silo";

        card.innerHTML = `
            <span class="card-titulo">
                ${silo.nomeSilo}
            </span>

            <div class="card-info">
                <span class="${getClasseOcupacao(status)}">
                    Ocupação:
                    ${silo.percentual_ocupacao}%
                </span>
            </div>

            <div class="card-chart-wrapper">
                <canvas id="chart-silo-${silo.idSilos}"></canvas>
            </div>
        `;

        grid.appendChild(card);

        const cor = getCor(status);

        new Chart(
            document.getElementById(`chart-silo-${silo.idSilos}`),
            {
                type: "doughnut",
                data: {
                    labels: ["Ocupado", "Livre"],
                    datasets: [{
                        data: [
                            silo.percentual_ocupacao,
                            100 - silo.percentual_ocupacao
                        ],
                        backgroundColor: [
                            cor,
                            "#E0E0E0"
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            }
        );
    }
}