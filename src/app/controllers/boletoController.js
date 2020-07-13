const sanitize = require('../services/sanitizer/sanitizeBoleto');
const titulo = require('../services/titulo/titulo');
const concessionaria = require('../services/concessionaria/concessionaria');

class BoletoController {
  async validateBoleto(req, res) {
    try {
      const codigoBoleto = sanitize.lineToNumber(req.body.linhadigitavel);
      if (isNaN(Number(codigoBoleto))) throw new Error('Caracteres inválidos');
      const tipo = sanitize.boletoType(codigoBoleto);
      if (tipo === null) throw new Error('Tipo não identificado');

      let response = null;
      
      switch (tipo) {
        case 'concessionaria':
          response = await concessionaria.checkBoleto(codigoBoleto);
          if (!response) throw new Error('Lnha digitada inválida');
          return res.json(response);
        case 'titulo':
          response = await titulo.checkBoleto(codigoBoleto);
          if (!response) throw new Error('Lnha digitada inválida');
          return res.json(response);
        default:
          throw new Error('Linha digitada inválida');
      }
    } catch (error) {
      return res.status(404).json({ erro: error.message });
    }
  }
}

module.exports = new BoletoController();
