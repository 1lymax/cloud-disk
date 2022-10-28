function cors(req, res, next) {
	const corsWhiteList = [
		'https://cloudisx.herokuapp.com',
		'http://localhost:3000'
	]

	if (corsWhiteList.indexOf(req.headers.origin) !== -1) {
		res.header("Access-Control-Allow-Origin", req.headers.origin);
		res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE, OPTIONS");
		res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	}

	next();
}

module.exports = cors