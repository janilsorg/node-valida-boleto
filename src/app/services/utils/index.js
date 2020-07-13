exports.tituloDV = async field => {
  let multiplicador = 2;
  let soma = 0;
  for(let i=0; i < field.length; i++){
    let local_soma = Number(field[i]) * multiplicador;
    multiplicador = multiplicador > 1 ? (multiplicador -= 1) : 2;
    soma += local_soma > 9 ? Math.floor(local_soma / 10) + (local_soma % 10) : local_soma;
  }
  const dezenaSuperior = (Math.floor(soma / 10) + 1) * 10;
  return dezenaSuperior - soma;
};

exports.concessionariaDVMod10 = async field => {
  
  let multiplicador = 2;
  let soma = 0;
  for(let i=0; i < field.length; i++){
    let local_soma = Number(field[i]) * multiplicador;
    multiplicador = multiplicador > 1 ? (multiplicador -= 1) : 2;
    soma += local_soma > 9 ? Math.floor(local_soma / 10) + (local_soma % 10) : local_soma;
  }

  let resto = soma % 10;
  return resto === 0 ? 0 : 10 - resto;
};

exports.concessionariaDVMod11 = async codigo => {
  
  let multiplicador = 2;
  let soma = 0;
  for(let i=0; i < codigo.length; i++){
      let soma_local = codigo[i] * multiplicador;
      multiplicador = multiplicador >= 9 ? 2 : (multiplicador += 1);
      soma += soma_local;
  }

  switch (soma % 11) {
    case 0:
      return 0;
    case 1:
      return 0;
    case 10:
      return 1;
    default:
      return 11 - (soma % 11);
  }
};

