const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Set up port
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use ('/api', apiRoutes)
app.use('/', htmlRoutes);

//starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));