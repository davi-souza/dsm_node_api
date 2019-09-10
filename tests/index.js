const { URLSearchParams } = require('url');
const axios = require('axios');

const link = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';

const mock_params = {
	nCdEmpresa: '',
	sDsSenha: '',
	nCdServico: '04510',
	sCepOrigem: '12247016',
	sCepDestino: '12216540',
	nVlPeso: '5',
	nCdFormato: 1,
	nVlComprimento: 50.0,
	nVlAltura: 50.0,
	nVlLargura: 50.0,
	nVlDiametro: 50.0,
	sCdMaoPropria: 'n',
	nVlValorDeclarado: 0.0,
	sCdAvisoRecebimento: 'n',
};

function fetch_delivery_info(params) {
	const search_params = new URLSearchParams(params);

	const url = new URL('/calculador/CalPrecoPrazo.aspx', 'http://ws.correios.com.br');

	url.search = search_params.toString();

	axios
		.get(url.toString())
		.then(console.log)
		.catch(console.log);
}

fetch_delivery_info(mock_params);
