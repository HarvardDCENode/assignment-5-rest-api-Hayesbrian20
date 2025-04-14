require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');


const app = express();
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/locations', require('./routes/web/locations'));
app.use('/menu', require('./routes/web/menu'));
const PORT = process.env.PORT || 3000;


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;
app.use('/client-test', express.static(path.join(__dirname, 'client-side-test')));

app.use('/', require('./routes/index'));
app.use('/locations', require('./routes/web/locations'));
app.use('/menu', require('./routes/web/menu'));

//api
app.use('/api/locations', require('./routes/api/locations'));
app.use('/api/menu', require('./routes/api/menu'));
