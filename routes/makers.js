// Libraries used
const express = require("express");
const maker = express.Router();

// Home page Routes
module.exports = db => {
  // Render the maker new quiz page
  maker.get("/new/", (req, res) => {
    res.render("new quiz page"); // replace with ejs name for new quiz page
  });

  // Submit the quiz to database
  maker.post("/new/", (req, res) => {
    const id = 1; // generate id for quiz
    //Stretch: check database to see if generated id matches an existing id in database, and regenerate ids until original id is generated
    db.query("SELECT 1") // Replace with Query to send new quiz data to database using id
      // Stretch: if identical quiz already exists in database, give user error message
      .then(() => {
        res.redirect(`/m/${id}/`); // redirect to maker quiz page using the id generated as a redirect url
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  maker.get("/:id/", (req, res) => {
    const id = req.params.id;
    db.query("SELECT 1") // Replace with Query to find info on the quiz with the id in the req.params.id of the page
      .then(data => {
        console.log("This is data: ", data.rows);
        const templateVars = {rows: data.rows};
        res.render("maker quiz page", templateVars); // replace with ejs name for maker quiz page
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  maker.get("/:id/results/", (req, res) => {
    const id = req.params.id;
    db.query("SELECT 1") // Replace with Query to find info on the quiz with the id in the req.params.id of the page
      .then(data => {
        console.log("This is data: ", data.rows);
        const templateVars = {rows: data.rows};
        res.render("maker quiz results page", templateVars); // Replace with ejs name for maker quiz results page
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // Stretch:

  // An update button
  maker.post("/:id/", (req, res) => {
    const id = req.params.id;
    db.query("SELECT 1") // Replace with Query to find info on the quiz with the id in the req.params.id of the page and update the info.
      // This includes changing quiz, or making the quiz public or private, or ending submissions for the quiz
      .then(() => {
        res.redirect(`/${id}/`); // Replace with ejs name for maker quiz results page
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // A delete button
  maker.post("/:id/delete", (req, res) => {
    const id = req.params.id;
    db.query("SELECT 1") // Query to remove the quiz with the id in the req.params.id of the page.
      .then(() => {
        res.redirect("../"); // redirect to home page
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // End of Stretch

  return maker;
};
