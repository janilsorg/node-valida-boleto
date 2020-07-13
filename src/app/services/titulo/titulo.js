const tools = require('./tools');

exports.checkBoleto = async codigoBoleto => {
  const response = {};
  
  if (codigoBoleto[3] !== '9') return false;

  if (!(await tools.checkBoxes(codigoBoleto))) return false;

  response.codigoBarras = await tools.getCodigoBarras(codigoBoleto);
  response.valor = await tools.getValor(codigoBoleto);
  response.linhaValida = true;
  response.dataVencimento = await tools.getVencimento(codigoBoleto);
  return response;
};
