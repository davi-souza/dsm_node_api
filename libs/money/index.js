function money_render(raw_money) {
	return (raw_money / 100).toFixed(2);
}

module.exports = {
	money_render,
};
