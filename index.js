// const express = require("express");

import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1> HomePage </h1>");
});

app.post("/register", (req, res) => {
  //This is where I would save the data but I will be sending back a status code instead
  res.sendStatus(201);
});

app.put("/user/jackie", (req, res) => {
  res.sendStatus(200);
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