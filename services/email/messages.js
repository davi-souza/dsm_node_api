const { money_render } = require('../../libs/money');

function order_parts_details(order_parts) {
	function handle_finishing(finishing) {
		if (!finishing) {
			return 'Não especificado';
		}

		switch (finishing) {
			case 'RECTIFIED':
				return 'Retificado - 1.6 Ra';
				break;
			case 'POLISHED':
				return 'Polido - 0.8 Ra';
				break;
			default:
				return 'Padrão - 2.4 Ra';
				break;
		}
	}

	return order_parts.map(op => {
		return `
Nome: ${op.part.name},
Link para download: ${op.part.storage},
Tipo de material: ${op.material_type.name},
Tratamento térmico: ${op.heat_treatment ? op.heat_treatment.name : 'Nenhum'}
Tratamento superficial: ${op.superficial_treatment ? op.superficial_treatment.name : 'Nenhum'}
Tolerância: ${op.tolerance ? op.tolerance+'mm' : 'Não especificado'}
Acabamento: ${handle_finishing(op.finishing)}
Número de roscas: ${op.screw_amount || 0}
Quantidade: ${op.amount}
		`.trim();
	}).join('\n\n');
}

function new_order_supplier_message(order) {
	const raw_payment = 
		parseInt(order.delivery_cost, 10) +
		parseInt(order.supplier_payment, 10);

	return `
Olá,


Temos um novo pedido disponível!


Pagamento: R$ ${money_render(raw_payment)}

Prazo de entrega: ${order.delivery_at}

Detalhes das peças:
${order_parts_details(order.parts)}

Clique aqui para pegar.
`.trim();
}

function new_order_user_message(order) {
	const raw_payment = 
		parseInt(order.mech4u_payment, 10) +
		parseInt(order.supplier_payment, 10) +
		parseInt(order.delivery_cost, 10) +
		parseInt(order.tax_payment, 10);

	return `
Olá,

Seu pedido foi aceito e está sendo fabricado!


Detalhes do pedido:

Pagamento: R$ ${money_render(raw_payment)}

Entrega em: ${order.delivery_at}

Detalhes das peças:
${order_parts_details(order.parts)}
`.trim();
}

module.exports = {
	new_order_supplier_message,
	new_order_user_message,
};
