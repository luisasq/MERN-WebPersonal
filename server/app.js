const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const {API_VERSION} = require("./constans");

const app = express();

//IMPORT ROUTING
const authRoutes = require("./router/auth");
const userRouter = require("./router/user");
const menuRouter = require("./router/menu");
const courseRouter = require("./router/course");
const postRouter = require("./router/post");
const newLetterRouter = require("./router/newsLetter");

//Configure Body Parse
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


// configure Static folder
app.use(express.static("uploads"));

// Configure Header HTTP - CORS
app.use(cors());

// Configure Routing
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRouter);
app.use(`/api/${API_VERSION}`, menuRouter);
app.use(`/api/${API_VERSION}`, courseRouter);
app.use(`/api/${API_VERSION}`, postRouter);
app.use(`/api/${API_VERSION}`, newLetterRouter);

module.exports = app;