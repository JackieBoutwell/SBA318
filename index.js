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
// Parsing Middleware
app.use(express.json())

//1. Custom Middleware
function userLog(req, res, next) {
    console.log("Request Method: , req.method");
    console.log("request URL: ", req.url);
    next()
}

app.use(userLog);

//2.Custom Middleware
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});
    
app.use(express.static(_dirname + '/public'));
// BLOCKER
// My time stamp function did not work  used the one from class that we went over.
//  will have to review this later!
// function timeStamp(req, res, next) {
//   req.requestTime = Date.now()/1000;
//   next();
// }

// app.use(timeStamp);



app.get("/", (req, res) => {
  const data = {
    title: "Add to your grocery list",
    //seconds: new Date().getSeconds(),
    items: [""],
    htmlContent: "<em></em>",
  };
  res.render("list.ejs", data);
});




app.get("/list", (req, res) => {
    res.sendFile(_dirname + "/public/index.html");
    res.send([])
    express.static(_dirname + '/public');

});


http://localhost:3000/
// app.get("/login", (req, res) => {
//   res.render("login.ejs", {
   
//   });
//   // app.set('view engine', 'ejs');
// });

// app.get('/login', (req, res) => {
//   res.render('login.ejs', req.query);
// });

// app.post("/login", (req, res) => {
//   console.log(req.body)
//   console.log('success')
// });



// app.get("/home", (req, res) => {
//     res.sendFile(_dirname + "/public/index.html");
//     // express.static(_dirname + '/public');

// });

// app.get("/comment", (req, res) => {
//     res.sendFile(_dirname + "/public/index2.html");
//     app.use(express.static(_dirname + '/public'));
// });

// app.post("/login", (req, res) => {
  //This is where I would save the data but I will be sending back a status code instead
    //   res.sendStatus(201);

    // console.log(req.body);
// });

// app.get("/image", (req, res) => {
//     //   res.download('./images/pizza.png')
//      res.sendFile(_dirname + "/images/pizza.webp");
// });


// app.put("/comments", (req, res) => {


// });

// app.patch("/user/jackie", (req, res) => {
//   res.sendStatus(200);
// });

// app.delete("/user/jackie", (req, res) => {
//   //Deleting
//   res.sendStatus(200);
// });
// Utilize reasonable data structuring practices.

// Create and use error-handling middleware.

// 404 Middleware
// app.use((req, res, next) => {
//     console.log("rni")
// //   next(error(404, "Resource Not Found"));
// });

// Error-handling middleware.
// Any call to next() that includes an
// Error() will skip regular middleware and
// only be processed by error-handling middleware.
// This changes our error handling throughout the application,
// but allows us to change the processing of ALL errors
// at once in a single location, which is important for
// scalability and maintainability.
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.json({ error: err.message });
// });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});