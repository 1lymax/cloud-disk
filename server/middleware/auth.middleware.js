const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next()
	}

	try {
		console.log(req.headers)
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			return res.status(401).json({message: 'Authorization error. You need to sign in again.'})
		}
		const decoded = jwt.verify(token, config.get('secretKey'))
		req.user = decoded
		next()
	}catch (e) {
		console.log(e)
		return res.status(401).json({message: 'Authorization error.'})
	}
};