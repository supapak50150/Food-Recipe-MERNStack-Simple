const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { readdirSync } = require('fs'); //Route Auto


//app
const app = express();

app.use(express.static(__dirname + '/public/'));


//connect DB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB Connected!'))
    .catch((err) => console.error('MongoDB connection error:', err));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());
app.use('/favicon.ico', (req, res) => res.status(204));

//routes
readdirSync('./routes').map((r) => app.use("/api", require('./routes/' + r)));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port', port));