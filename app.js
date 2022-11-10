const express = require('express');
const app = express();
const cors = require('cors');
const loaddb = require("./src/config/db");
const auth = require("./src/middleware/auth");
const fileUpload = require("express-fileupload");



require("dotenv").config();

const port = process.env.PORT || 8000 ;

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routes
const userRoutes = require('./src/routes/user');
const postRoutes = require('./src/routes/post');

app.use('/api', userRoutes);
app.use('/api', auth, postRoutes);


app.get('/',  (req, res) => {
    res.send('Hello World!');
    }
);

app.listen(port, () => {
    console.log(`server listening to http://localhost:${port}`);
    }
);
