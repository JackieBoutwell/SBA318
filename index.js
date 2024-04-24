// const express = require("express");

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const _dirname = dirname(fileURLToPath(import.meta.url));
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

//1. Custom Middleware
function userLog(req, res, next) {
    console.log("Request Method: , req.method");
    console.log("request URL: ", req.url);
    next()
}

app.use(userLog);

app.get("/about", (req, res) => {
    const menu = [
        { title: "Home Page", href: "http://localhost:3000/" },
        { title: "Login", href: "http://localhost:3000/login" },
        { title: "Image", href: "http://localhost:3000/image" },
    ];
      res.render("pages/about", { links: menu });
});


app.get("/login", (req, res) => {
    res.sendFile(_dirname + "/public/index1.html");
    app.use(express.static(_dirname + '/public'));
});

app.get("/home", (req, res) => {
    res.sendFile(_dirname + "/public/index.html");
    app.use(express.static(_dirname + '/public'));
});

app.get("/comment", (req, res) => {
    res.sendFile(_dirname + "/public/index2.html");
    app.use(express.static(_dirname + '/public'));
});

app.post("/login", (req, res) => {
  //This is where I would save the data but I will be sending back a status code instead
    //   res.sendStatus(201);

    // console.log(req.body);
});

app.get("/image", (req, res) => {
    //   res.download('./images/pizza.png')
     res.sendFile(_dirname + "/images/pizza.webp");
});


app.put("/comments", (req, res) => {


});

app.patch("/user/jackie", (req, res) => {
  res.sendStatus(200);
});

app.delete("/user/jackie", (req, res) => {
  //Deleting
  res.sendStatus(200);
});



// Error-handling middleware.
// Any call to next() that includes an
// Error() will skip regular middleware and
// only be processed by error-handling middleware.
// This changes our error handling throughout the application,
// but allows us to change the processing of ALL errors
// at once in a single location, which is important for
// scalability and maintainability.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});