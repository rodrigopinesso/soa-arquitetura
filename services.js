const axios = require('axios');

const IBGE_API_BASE = 'https://servicodados.ibge.gov.br/api/v2/censos/nomes';

async function getNome(req, res) {
    const { nome, inicio, fim } = req.params;
    try {
        const response = await axios.get(`${IBGE_API_BASE}/${nome}`);
        const data = response.data[0].res.filter(decada => decada.periodo >= inicio && decada.periodo <= fim);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados do nome.' });
    }
}

async function getComparacao(req, res) {
    const { nome1, nome2 } = req.params;
    try {
        const response1 = await axios.get(`${IBGE_API_BASE}/${nome1}`);
        const response2 = await axios.get(`${IBGE_API_BASE}/${nome2}`);
        const data = {
            nome1: response1.data[0].res,
            nome2: response2.data[0].res,
        };
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao comparar nomes.' });
    }
}

module.exports = { getNome, getComparacao };