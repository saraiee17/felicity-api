//Install necessary modules
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");

require('dotenv').config()

//Use JSON middleware and CORS
app.use(express.json());
app.use(cors());

//Link necessary routes
const userRoute = require('./routes/userRoute');
const emotionRoute = require('./routes/emotionRoute');

//Use the routes for API calls
app.use('/users', userRoute);
app.use('/emotions', emotionRoute);


app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});