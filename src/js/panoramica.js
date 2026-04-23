var silosData = [
    { id: 1,  nome: 'Silo 1',  ocupacao: 75, historico: [75, 77, 79, 7, 23, 45, 62, 81, 78, 75] },
    { id: 2,  nome: 'Silo 2',  ocupacao: 45, historico: [50, 51, 52, 22, 18, 34, 56, 77, 60, 45] },
    { id: 3,  nome: 'Silo 3',  ocupacao: 67, historico: [48, 47, 46, 12, 29, 41, 68, 84, 73, 67] },
    { id: 4,  nome: 'Silo 4',  ocupacao: 53, historico: [55, 55, 56, 2, 17, 28, 46, 72, 60, 53] },
    { id: 5,  nome: 'Silo 5',  ocupacao: 56, historico: [49, 50, 50, 9, 14, 35, 51, 68, 60, 56] },
    { id: 6,  nome: 'Silo 6',  ocupacao: 26, historico: [35, 34, 32, 25, 22, 39, 57, 40, 40, 26] },
    { id: 7,  nome: 'Silo 7',  ocupacao: 71, historico: [45, 44, 44, 14, 26, 44, 63, 81, 100, 71] },
    { id: 8,  nome: 'Silo 8',  ocupacao: 65, historico: [44, 44, 45, 12, 19, 31, 54, 77, 67, 65] },
    { id: 9,  nome: 'Silo 9',  ocupacao: 40, historico: [43, 42, 41, 67, 24, 38, 59, 50, 42, 40] },
    { id: 10, nome: 'Silo 10', ocupacao: 49, historico: [53, 53, 54, 30, 21, 47, 66, 79, 53, 49] }
];

var horas = ['08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'];

function getStatus(ocupacao) {
    if (ocupacao <= 32.8 || ocupacao >= 71.2) {
        return 'critico';
    } else if (ocupacao <= 43.8 || ocupacao >= 60.2) {
        return 'alerta';
    } else {
        return 'ideal';
    }
}

function getCor(status) {
    if (status == 'ideal')  return '#0eac50';
    if (status == 'alerta') return '#FFCD04';
    return 'rgb(167, 0, 0)';
}

function getClasseOcupacao(status) {
    if (status == 'ideal')  return 'info-ocupacao-verde';
    if (status == 'alerta') return 'info-ocupacao-amarelo';
    return 'info-ocupacao-vermelho';
}

function renderizarSilos() {
    var grid = document.getElementById('grid-silos');
    grid.innerHTML = '';

    for (var i = 0; i < silosData.length; i++) {
        var silo = silosData[i];
        var status = getStatus(silo.ocupacao);

        var card = document.createElement('div');
        card.className = 'card-silo';
        card.innerHTML =
            '<span class="card-titulo">' + silo.nome + '</span>' +
            '<div class="card-info">' +
                '<span class="' + getClasseOcupacao(status) + '">Ocupação: ' + silo.ocupacao + '%</span>' +
            '</div>' +
            '<div class="card-chart-wrapper">' +
                '<canvas id="chart-silo-' + silo.id + '"></canvas>' +
            '</div>';

        grid.appendChild(card);

        var cor = getCor(status);
        new Chart(document.getElementById('chart-silo-' + silo.id), {
            type: 'line',
            data: {
                labels: horas,
                datasets: [{
                    label: 'Ocupação (%)',
                    data: silo.historico,
                    borderColor: cor,
                    backgroundColor: cor,
                    borderWidth: 2,
                    pointRadius: 3,
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Horário' },
                        beginAtZero: false
                    },
                    y: {
                        title: { display: true, text: 'Ocupação (%)' },
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
}

renderizarSilos();