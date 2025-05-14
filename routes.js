const express = require('express');
const { getNome, getComparacao } = require('./services'); // Ajuste no caminho

const router = express.Router();

router.get('/nome/:nome/:inicio/:fim', getNome);

router.get('/comparacao/:nome1/:nome2', getComparacao);

module.exports = router;
