const moment = require('moment');
const utils = require('../utils');

// VALIDAÇÕES
exports.validaProduto = async boletoCode => {
  // Identificação do Produto - Constante “8” para identificar arrecadação
  return boletoCode[0] === '8';
};

exports.validaSeguimento = async boletoCode => {
  return boletoCode[1] !== '0';
};

exports.checkBoxes = async codigoBoleto => {
  let bloco = [];
  bloco[0] = codigoBoleto.substring(0, 11).split('');
  bloco[1] = codigoBoleto.substring(12, 23).split('');
  bloco[2] = codigoBoleto.substring(24, 35).split('');
  bloco[3] = codigoBoleto.substring(36, 47).split('');
  
  let arrDV = [];
  arrDV[0] = Number(codigoBoleto.substring(12, 13));
  arrDV[1] = Number(codigoBoleto.substring(24, 25));
  arrDV[2] = Number(codigoBoleto.substring(36, 37));
  arrDV[3] = Number(codigoBoleto.substring(48, 49));

  const getDVMod = codigoBoleto[2] === '6' || codigoBoleto[2] === '7' 
                  ? utils.concessionariaDVMod10
                  : utils.concessionariaDVMod11;

  for(let i=0; i < bloco.length; i++){
    if ((await getDVMod(bloco[i])) !== arrDV[i]) return false;
  }

  return true;
};


// GETTERS
exports.getCodigoBarra = async boletoCode => {
  const field1 = boletoCode.substring(0, 11).split('');
  const field2 = boletoCode.substring(12, 23).split('');
  const field3 = boletoCode.substring(24, 35).split('');
  const field4 = boletoCode.substring(36, 47).split('');
  const currentDV = Number(field1.splice(3, 1));
  const code = field1.concat(field2, field3, field4).reverse();
  let realDv = null;
  if (boletoCode[2] === '6' || boletoCode[2] === '7') {
    realDv = await utils.concessionariaDVMod10(code);
  } else {
    realDv = await utils.concessionariaDVMod11(code);
  }
  if (realDv !== currentDV) return false;

  field1.splice(3, 0, realDv.toString());
  return field1.concat(field2, field3, field4).join('');
};

exports.getValor = async codigoBarra => {

  // Identificação do valor real ou referência posição: 3
  if (codigoBarra[2] === '6' || codigoBarra[2] === '8') {
    const valor = codigoBarra.substring(4, 15);
    return (Number(valor) / 100).toFixed(2);
  }
  return null;
};

exports.getVencimento = async codigoBarra => {
  const date = codigoBarra.substring(19, 27);
  return moment(date, 'YYYY-MM-DD').isValid()
    ? moment(date).locale('pt-br')
    : null;
};
