const express = require("express");
const Postcontroller = require("../controllers/post");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({uploadDir: "./uploads/blog"});
const api = express.Router();

api.post("/post", [md_auth.asureAuth, md_upload], Postcontroller.createPost);
api.get("/post", Postcontroller.getPosts);
api.patch("/post/:id", [md_auth.asureAuth, md_upload], Postcontroller.updatePost);
api.delete("/post/:id", [md_auth.asureAuth, md_upload], Postcontroller.deletePost);
api.get("/post/:path", Postcontroller.getPost);

module.exports = api;