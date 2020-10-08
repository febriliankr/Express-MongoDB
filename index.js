const express = require("express");
const app = express();
const mongooser = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

//middleware
app.use(bodyParser.json());

// Import Routes
const postsRoute = require('./routes/posts')

app.use('/posts', postsRoute)

// connect to database
const connectionParams = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
const url = process.env.DB_CONNECTION;
mongooser.connect( url, connectionParams)
  .then(()=>{
    console.log('✅ Connected to DB!')
  })
  .catch(err => console.error("Error connecting to the database", err))

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`⚡ Server is running at http://localhost:${PORT}`);
});
