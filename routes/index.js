module.exports = (app) => {
	app.get('/', (req, res, next) => {
		return res.send("WELCOME TO REST API");
	});
};