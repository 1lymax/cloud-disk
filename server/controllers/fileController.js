const fs = require('fs')
const Uuid = require('uuid')


const File = require('../models/File')
const User = require('../models/User')
const fileService = require('../services/fileService')

class FileController {
	async createDir(req, res) {
		try {
			const {name, type, parent} = req.body
			const file = new File({name, type, parent, user: req.user.id});
			const parentFile = await File.findOne({_id: parent})

			if (!parentFile) {
				file.path = name;
				await fileService.createDir(req, file);
			} else {
				file.path = `${parentFile.path}/${file.name}`
				await fileService.createDir(req, file)
				parentFile.childs.push(file._id)
				await parentFile.save()
			}

			await file.save()
			return res.json(file)

		} catch (e) {
			console.log(e)
			return res.status(400).json(e)

		}
	}

	async getFiles(req, res) {
		const {sort, search, parent} = req.query
		let files = ''
		try {
			switch (sort) {
				case 'name':
					files = await File.find({user: req.user.id, parent}).sort({name: 1})
					break
				case 'type':
					files = await File.find({user: req.user.id, parent}).sort({type: 1})
					break
				case 'date':
					files = await File.find({user: req.user.id, parent}).sort({date: 1})
					break
				default:
					files = await File.find({user: req.user.id, parent})
			}

			if (search) {
				files = files.filter(file => file.name.includes(search));
			}

			return res.json({files})
		} catch (e) {
			console.log(e)
			return res.status(500).json({message: 'Can not get files'})
		}
	}

	async uploadFile(req, res) {
		try {
			const file = req.files.file

			const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
			const user = await User.findOne({_id: req.user.id})

			if (user.usedSpace + file.size > user.diskSpace) {
				return res.status(400).json({message: "File was not uploaded. Disk quota exceeded"})
			}

			user.usedSpace = user.usedSpace + file.size

			let path
			if (parent) {
				path = `${req.filePath}/${user._id}/${parent.path}/${file.name}`;
			} else {
				path = `${req.filePath}/${user._id}/${file.name}`;
			}

			if (fs.existsSync(path)) {
				return res.status(400).json({message: "File already exist"})
			}
			file.mv(path)

			const type = file.name.split('.').pop()
			let filePath = file.name
			if (parent) {
				filePath = parent.path + '/' + file.name
			}
			const dbFile = new File({
				name: file.name,
				type,
				size: file.size,
				path: filePath,
				parent: parent ? parent._id : null,
				user: user._id
			})

			await dbFile.save()
			await user.save()

			return res.status(200).json(dbFile)

		} catch (e) {
			console.log(e)
			return res.status(400).json({message: 'Can not upload file'})
		}
	}

	async downloadFile(req, res) {
		try {
			const file = await File.findOne({_id: req.query.id, user: req.user.id})
			const path = `${req.filePath}/${req.user.id}/${file.path}`

			if (fs.existsSync(path)) {
				return res.download(path, file.name)
			}
			return res.status(400).json({message: 'Download error. File not found'})

		} catch (e) {
			console.log(e)
			return res.status(500).json({message: 'Download failed'})
		}
	}

	async deleteFile(req, res) {
		try {
			console.log()
			const file = await File.findOne({_id: req.query.id, user: req.user.id})
			const user = await User.findOne({_id: req.user.id})

			if (!file) {
				return res.status(400).json({message: 'File not found'})
			}
			fileService.deleteFile(req, file)
			await file.remove()
			user.usedSpace = user.usedSpace - file.size
			await user.save()

			return res.json({message: 'File was deleted'})
		} catch (e) {
			console.log(e)
			return res.status(400).json({message: e.code === "ENOTEMPTY" ? "Directory is not empty" : "Can't delete file"})
		}
	}

	async uploadAvatar(req, res) {
		try {
			const file = req.files.file
			const user = await User.findById(req.user.id)
			if (user.avatar)
				if (fs.existsSync(req.staticPath + '/' + user.avatar)) {
					fs.unlinkSync(req.staticPath + '/' + user.avatar)
				}
			const avatarName = Uuid.v4() + '.jpg'

			if (!fs.existsSync(req.staticPath)) {
				fs.mkdirSync(req.staticPath);
			}

			file.mv(req.staticPath + '/' + avatarName)

			user.avatar = avatarName
			await user.save()
			return res.json(user)

		} catch (e) {
			console.log(e)
			return res.status(400).json({message: "Upload error"})
		}

	}

	async deleteAvatar(req, res) {
		try {
			const user = await User.findById(req.user.id)
			if (!user.avatar)
				return res.status(400).json({message: 'You have not uploaded avatar'})
			fs.unlinkSync(req.staticPath + '/' + user.avatar)
			user.avatar = null
			await user.save()
			return res.json(user)

		} catch (e) {
			console.log(e)
			return res.status(400).json({message: "Delete avatar error"})
		}

	}

	async getStatistic(req, res) {
		const total = {}
		try {
			total.files = await File.aggregate([{$count: 'name'}])
			total.users = await User.aggregate([{$count: 'name'}])
			total.usedSpace = await User.aggregate([{
				$group: {_id: null,
					total: {$sum: "$usedSpace"}}
			}])

			return res.json(total)

		} catch (e) {
			console.log(e)
			return res.status(400).json({message: "Can't get stats"})
		}

	}


}

module.exports = new FileController()