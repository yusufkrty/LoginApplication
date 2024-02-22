const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/homeRoutes');
const config = require('./src/config/config');
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());


mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});