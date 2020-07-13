const moment = require('moment');
const utils = require('../utils');

exports.checkBoxes = async codigoBoleto => {
    let bloco = [];

    bloco[0] = codigoBoleto.substring(0, 9).split('').reverse();
    bloco[1] = codigoBoleto.substring(10, 20).split('').reverse();
    bloco[2] = codigoBoleto.substring(21, 31).split('').reverse();

    let arrDV = []
    arrDV[0] = Number(codigoBoleto[9]);
    arrDV[1] = Number(codigoBoleto[20]);
    arrDV[2] = Number(codigoBoleto[31]);
    

    for(let i=0; i < bloco.length; i++){
        if((await utils.tituloDV(bloco[i])) !== arrDV[i]) return false;
    }
    return true;  
  };


exports.getCodigoBarras = async codigoBoleto => {

    const codBanco = codigoBoleto.substring(0, 3);
    const moeda = codigoBoleto[3];
    const fatorVcto = codigoBoleto.substring(33, 37);
    const valor = codigoBoleto.substring(37, 47);
    const posicao1 = codigoBoleto.substring(4, 9);
    const posicao2 = codigoBoleto.substring(10, 20);
    const posicao3 = codigoBoleto.substring(21, 31);
  
    const codigo = `${codBanco}${moeda}${fatorVcto}${valor}${posicao1}${posicao2}${posicao3}`
      .split('')
      .reverse();
  
    let multiplicador = 2;
    let soma = 0;
    for(let i=0; i < codigo.length; i++){
        let soma_local = codigo[i] * multiplicador;
        multiplicador = multiplicador >= 9 ? 2 : (multiplicador += 1);
        soma += soma_local;
    }

    const diferenca = 11 - (soma % 11);
    const dv = diferenca === 0 || diferenca === 10 || diferenca === 11 ? 1 : diferenca;
    const codBarras = `${codBanco}${moeda}${dv}${fatorVcto}${valor}${posicao1}${posicao2}${posicao3}`;
    return codBarras;
};

exports.getVencimento = async codigoBoleto => {
  const fatorVcto = Number(codigoBoleto.substring(33, 37));
  const dataReset = moment('2025-02-22').format();
  const dataBase = moment('1997-10-07').format();
  if (moment().format() <= dataReset) {
    return moment(dataBase)
      .locale('pt-br')
      .add(fatorVcto, 'days')
      .calendar();
  }
  /*
  A partir de 22.02.2025, o fator retorna para “1000” adicionando-se “1” a 
  cada dia subsequente a este fator.
  */

  return moment(dataReset)
    .locale('pt-br')
    .add(expireFactor % 1000, 'days')
    .calendar();
};



exports.getValor = async codigoBoleto => {
  return (Number(codigoBoleto.substring(37, 48)) / 100).toFixed(2);
};
