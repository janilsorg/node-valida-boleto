const tools = require('./tools');

exports.checkBoleto = async codigoBoleto => {
  const response = {};
  if (!(await tools.validaProduto(codigoBoleto))) return false;
  if (!(await tools.validaSeguimento(codigoBoleto))) return false;
  if (Number(codigoBoleto[2]) < 6) return false;
  
  response.codigoBarras = await tools.getCodigoBarra(codigoBoleto);

  if (!response.codigoBarras) return false;
  
  await tools.checkBoxes(codigoBoleto);
  const valor = await tools.getValor(response.codigoBarras);
  
  if (valor !== null)
    response.valor = await tools.getValor(response.codigoBarras);

  const expireDate = await tools.getVencimento(response.codigoBarras);
  if (expireDate !== null) response.dataVencimento = expireDate;

  response.linhaValida = true;
  return response;
};
