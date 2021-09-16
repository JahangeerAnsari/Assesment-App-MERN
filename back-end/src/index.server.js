const express = require('express');
const app = express();
const env = require('dotenv');
const bodyParser = require('body-parser');
const { static } = require("express");
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
// env config

env.config();
require('./database/index')

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use("/public", static(path.join(__dirname, "/src/uploads")));



// apiRoutes
const userAssesmentRoute = require('./routes/user.assesmet.routes')
const assesmentRoute = require('./routes/assesment.route')
const userRoutes = require('./routes/user.route');
const adminRoute = require('./routes/adminRoutes/admin.routes');

// api
app.use('/api', userRoutes);
app.use('/api', adminRoute);
app.use('/api',assesmentRoute);
app.use('/api',userAssesmentRoute);

app.listen(process.env.PORT || 8000, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})
