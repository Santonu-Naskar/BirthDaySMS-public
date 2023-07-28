// const connectToMongo=require("./db");
const express = require('express')
var cors = require('cors')
const dotenv=require('dotenv');
dotenv.config();
// connectToMongo();
const app = express();
const port = process.env.PORT|| 5000;

app.use(cors())
app.use(express.json())
// available routes
// app.use('/auth',require('./routes/auth'))
app.use('/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

