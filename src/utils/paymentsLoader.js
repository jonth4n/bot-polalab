const { carregarConfig } = require('./configLoader');

function carregarPayments() {
  try {
    return carregarConfig('payments.json');
  } catch (error) {
    throw new Error(
      'Arquivo src/config/payments.json não encontrado. Copie src/config/payments.example.json para src/config/payments.json e preencha com seus dados reais.'
    );
  }
}

module.exports = { carregarPayments };