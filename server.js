'use strict';

const express = require('express')
const app = express();

const path = require('path');

// Setting up a static directory for the files in /pub
// using Express middleware.
app.use(express.static(path.join(__dirname, '/pub')))

// app.get('/', (req, res) => {
//     res.sendFile('/pub/landing-page/landing_page.html', {root: __dirname });
//     // res.sendFile(__dirname + '/pub/landing-page/landing_page.html');
// })

// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})  // localhost development port 5000  (http://localhost:5000)

