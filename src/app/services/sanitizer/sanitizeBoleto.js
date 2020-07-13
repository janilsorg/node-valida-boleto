exports.lineToNumber = line => {
  return line.replace(/[,.\-_\\/ ]/g, '');
};

exports.boletoType = boletoCode => {
  switch (boletoCode.length) {
    case 47:
      return 'titulo';
    case 48:
      return 'concessionaria';
    default:
      return null;
  }
};
