const Router = require('express')
const router = new Router()
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const authMiddleware = require('../middleware/auth.middleware')
const fileService = require('../services/fileService')
const File = require('../models/File')

router.post('/registration',
	[
		check('email', "Incorrect email").isEmail(),
		check('password', 'Password must be longer than 3 and less than 12 symbols').isLength({min: 3, max: 12})
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty())
				return res.status(400).json({message: "Incorrect parameters", errors})

			const {email, password} = req.body
			const candidate = await User.findOne({email})

			if (candidate) {
				return res.status(400).json({message: `User with email ${email} already exists`})
			}
			const hashPass = await bcrypt.hash(password, 8)
			const user = new User({email, password: hashPass})
			await user.save()
			await fileService.createDir(new File({user: user.id, name: ''}))

			return res.status(200).json({message: 'User was created. You can sign in'})


		} catch (e) {
			console.log(e)
			return res.status(500).json({message: 'Server error'})
		}
	})

router.post('/login',
	async (req, res) => {
		try {
			const {email, password} = req.body
			const user = await User.findOne({email}).exec()
			if (!user)
				return res.status(400).json({message: "User not found"})

			const isPassValid = bcrypt.compareSync(password, user.password)
			if (!isPassValid)
				return res.status(400).json({message: "Incorrect parameters"})

			const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})

			return res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
					diskSpace: user.diskSpace,
					usedSpace: user.usedSpace,
					avatar: user.avatar
				}
			})

		} catch (e) {
			console.log(e)
			return res.status(500).json({message: 'Server error'})
		}
	})

router.get('/token', authMiddleware,
	async (req, res) => {
		console.log('111')
		try {

			console.log(req)
			const user = await User.findOne({id: req.user.id})
			const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})

			return res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
					diskSpace: user.diskSpace,
					usedSpace: user.usedSpace,
					avatar: user.avatar
				}
			})
		} catch (e) {
			console.log(e)
			return res.status(500).json({message: 'Server error'})
		}
	})
module.exports = router