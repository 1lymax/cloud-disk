const {Schema, model} = require('mongoose')


const User = new Schema({

	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	diskSpace: {type: Number, default: 1024*1024*150},
	usedSpace: {type: Number, default: 0},
	avatar: {type: String},
	file: [{type: Object, ref: 'file'}]
})

module.exports = model('User', User)