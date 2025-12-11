/**
 * @packages
**/
require('dotenv').config();
/**
 * @utils
**/
const app = require('./app');
const connectDB = require('./config/connection/db.connection');


// @variables 
const PORT = process.env.PORT || 8000;

connectDB();


app.listen(PORT, () => {
    console.log(`Server running at PORT:http://localhost:${PORT}`);

})