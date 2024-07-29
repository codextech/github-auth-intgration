const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())

app.use(bodyParser.json());

/* ! MongoDB Connection ! */ 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

/* ! Routes ! */ 
const authRoutes = require('./routes/auth.route');
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
