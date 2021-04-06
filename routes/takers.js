// Libraries used
const express = require("express");
const taker = express.Router();

// Home page Routes
const takerRoutes = (db) => {
  //Render the taker page

  taker.get("/:id/", (req, res) => {
    db.query(/* query file here */) //Query to find info on the quiz with the id in the req.params.id of the page
      .then((data) => {
        res.render("taker quiz page", data); // replace with ejs name for taker quiz page
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    return taker;
  });

  // Show taker results
  taker.get("/:id/results/", (req, res) => {
    db.query(/* query file here */) //Query to find info on the quiz with the id in the req.params.id of the page
    // Stretch: shows details on what questions the taker got wrong and the correct answer for those questions
      .then((data) => {
        res.render("taker quiz results page", data); // replace with ejs name for taker quiz results page
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    return taker;
  });

  // A submit button
  taker.post("/:id/", (req, res) => {
    db.query(/*query file here*/) // Query to send info on the quiz with the id in the req.params.id of the page.
      .then((data) => {
        res.redirect("/:id/results", data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    return taker;
  });
  });
};

module.exports = { takerRoutes };
