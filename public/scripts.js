function renderChart(canvasId, labels, data, label) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderColor: 'blue',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function buscarEvolucaoNome() {
    const nome = document.getElementById('nomeInput').value;
    const inicio = document.getElementById('inicioInput').value;
    const fim = document.getElementById('fimInput').value;

    fetch(`/nome/${nome}/${inicio}/${fim}`)
        .then(response => response.json())
        .then(data => {
            const labels = data.map(d => d.periodo);
            const values = data.map(d => d.frequencia);
            renderChart('chartNome', labels, values, `Evolução do Nome: ${nome}`);
        })
        .catch(err => alert('Erro ao buscar evolução do nome.'));
}

function compararNomes() {
    const nome1 = document.getElementById('nome1Input').value;
    const nome2 = document.getElementById('nome2Input').value;

    fetch(`/comparacao/${nome1}/${nome2}`)
        .then(response => response.json())
        .then(data => {
            const labels = data.nome1.map(d => d.periodo);
            const values1 = data.nome1.map(d => d.frequencia);
            const values2 = data.nome2.map(d => d.frequencia);
            renderChart('chartComparacao', labels, values1, `Nome: ${nome1}`);
            renderChart('chartComparacao', labels, values2, `Nome: ${nome2}`);
        })
        .catch(err => alert('Erro ao comparar nomes.'));
}

function buscarLocalidade() {
    const uf = document.getElementById('localidadeInput').value;

    fetch(`/localidade/${uf}`)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tabelaLocalidade').querySelector('tbody');
            tbody.innerHTML = '';
            data.slice(0, 3).forEach(item => {
                const row = tbody.insertRow();
                row.insertCell(0).innerText = item.nome;
                row.insertCell(1).innerText = item.frequencia;
            });
        })
        .catch(err => alert('Erro ao buscar localidade.'));
}