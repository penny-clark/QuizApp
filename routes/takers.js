// Libraries used
const express = require("express");
const taker = express.Router();

// Home page Routes
module.exports = db => {
  // Render the Quiz Taker page
  taker.get("/:id/", (req, res) => {
    const id = req.params.id;
    db.query("SELECT 1") // Replace with Query to find info on the quiz with the id in the req.params.id of the page
      .then(data => {
        console.log("This is data: ", data.rows);
        const templateVars = {rows: data.rows};
        res.render("taker quiz page", templateVars); // replace with ejs name for taker quiz page
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // Show taker results
  taker.get("/:id/results/", (req, res) => {
    const id = req.params.id;
    db.query("SELECT 1") // Replace with Query to find info on the quiz with the id in the req.params.id of the page
      // Stretch: shows details on what questions the taker got wrong and the correct answer for those questions
      .then(data => {
        console.log("This is data: ", data.rows);
        const templateVars = {rows: data.rows};
        res.render("taker quiz results page", templateVars); // Replace with ejs name for taker quiz results page
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // Quiz Submit Button
  taker.post("/:id/", (req, res) => {
    const id = req.params.id;
    db.query("SELECT 1") // Replace with Query to send info on the quiz with the id in the req.params.id of the page.
      .then(() => {
        res.redirect(`/${id}/results`);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return taker;
};
