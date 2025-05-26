function atualizarCodigoIBGE() {
    const estadoSelect = document.getElementById('estadoSelect');
    const codigoInput = document.getElementById('codigoLocalidade');
    codigoInput.value = estadoSelect.value;
}

async function buscarTopNomes() {
    const codigo = document.getElementById('codigoLocalidade').value.trim();
    if (!codigo) {
        alert('Por favor, selecione um estado');
        return;
    }

    document.getElementById('loading').style.display = 'flex';

    try {
        const response = await axios.get(`http://localhost:3000/api/top-nomes/${codigo}`);

        if (!response.data || response.data.length === 0 || !response.data[0].res) {
            alert('Nenhum dado encontrado para esta localidade.');
            return;
        }

        const dados = response.data[0].res;

        if (!dados || dados.length === 0) {
            alert('Nenhum dado encontrado para esta localidade.');
            return;
        }

        const tbody = document.querySelector('#topNomesTable tbody');
        tbody.innerHTML = '';

        dados.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.nome}</td>
                <td>${item.frequencia.toLocaleString()} pessoas</td>
                <td>${index + 1}º</td>
            `;
            tbody.appendChild(tr);
        });

        const localidadeInfo = document.createElement('div');
        localidadeInfo.className = 'localidade-info';
        localidadeInfo.innerHTML = `
            <p><strong>Estado:</strong> ${document.getElementById('estadoSelect').options[document.getElementById('estadoSelect').selectedIndex].text}</p>
            <p><strong>Sexo:</strong> ${response.data[0].sexo}</p>
        `;

        const tableContainer = document.querySelector('.table-container');
        const existingInfo = tableContainer.querySelector('.localidade-info');
        if (existingInfo) {
            existingInfo.remove();
        }
        tableContainer.insertBefore(localidadeInfo, tableContainer.firstChild);

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao buscar os top nomes. Verifique se o estado está correto ou tente novamente mais tarde.');
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}