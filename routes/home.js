// Libraries used
const express = require("express");
const home = express.Router();

// Home page Routes
module.exports = db => {
  // Render the home page
  home.get("/", (req, res) => {
    db.query("SELECT 1") //replace with query sql file for returning the latest quizes from the database
      .then(data => {
        console.log("This is data: ", data.rows);
        const templateVars = {rows: data.rows};
        res.render("index", templateVars);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // Stretch:

  // Search requests or to display specific categories ordered by the most recent submissions for those search requirements
  home.post("/", (req, res) => {
    const body = req.body; //takes in params from the body, search bar submition, and uses that to affect the query made by db.query
    console.log("Body: ", body);
    db.query("SELECT 1")
      .then(data => {
        // Render homepage based on the search criterea provided altering the query request
        console.log("This is data: ", data.rows);
        const templateVars = {rows: data.rows};
        res.render("index", templateVars);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // End of Stretch

  return home;
};
