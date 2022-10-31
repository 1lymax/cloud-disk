const express = require('express')
const path = require('path')
const compression = require('compression')

const PORT = process.env.PORT || 3000

const app = express()
app.use(compression());
app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT)