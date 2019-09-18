const soap = require('soap');
// 12247016, 12216540, 5, 50.0

function delivery_date(delivery_type) {
	const today = new Date();

	const days_to_add = delivery_type === 'WORKINGDAYS_10' ? 14 : 21;

	if (today.getDay() === 6) {
		today.setDate(today.getDate() + 2);
	} else if (today.getDay() === 0) {
		today.setDate(today.getDate() + 1);
	}

	today.setDate(today.getDate() + days_to_add);

	return today;
}

function get_mail_info(items, delivery_type = 'WORKINGDAYS_15') {
	return Promise.resolve({
		price: 10000,
		at: delivery_date(delivery_type),
	});
	//const url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';
	//const args = {
	//	nCdEmpresa: '',
	//	sDsSenha: '',
	//	nCdServico: '04510',
	//	sCepOrigem: cep_origin,
	//	sCepDestino: cep_destination,
	//	nVlPeso: weight.toString(),
	//	nCdFormato: 1,
	//	nVlComprimento: length,
	//	nVlAltura: length,
	//	nVlLargura: length,
	//	nVlDiametro: length,
	//	sCdMaoPropria: 'n',
	//	nVlValorDeclarado: 0.0,
	//	sCdAvisoRecebimento: 'n',
	//};
	//return new Promise((resolve, reject) => {
	//	soap.createClient(url, (client_err, client) => {
	//		if (client_err) {
	//			reject(client_err);
	//		} else {
	//			client.CalcPrecoPrazo(args, (err, res) => {
	//				if(err) {
	//					reject(err);
	//				} else {
	//					const {Valor, PrazoEntrega} = res.CalcPrecoPrazoResult.Servicos.cServico;
	//					resolve({price: Valor, estimated_time: PrazoEntrega});
	//				}
	//			});
	//		}
	//	});
	//});
}

module.exports = {
	get_mail_info,
};
