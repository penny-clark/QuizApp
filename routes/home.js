// Libraries used
const express = require("express");
const home = express.Router();

// Home page Routes
const homeRoutes = db => {
  // Render the home page
  home.get("/", (req, res) => {
    db.query(/*query file here*/)
      .then((data) => {
        res.render("index", data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    return home;
  });

  // Stretch:

  // Search requests or to display specific categories ordered by the most recent submissions for those search requirements
  home.post("/", (req, res) => {
    db.query(/*query file here*/)
      .then((data) => {
        // Render homepage based on the search criterea provided altering the query request
        res.render("index", data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    return home;
  });
};

module.exports = { homeRoutes };
