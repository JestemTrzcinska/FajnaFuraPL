const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5500'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Define Routes
app.use('/api/address', require('./routes/api/address'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/cars', require('./routes/api/cars'));
app.use('/api/defects', require('./routes/api/defects'));
app.use('/api/rents', require('./routes/api/rents'));
app.use('/api/staff', require('./routes/api/staff'));
app.use('/api/status', require('./routes/api/status'));
app.use('/api/users', require('./routes/api/users'));
app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
