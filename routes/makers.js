// Libraries used
const express = require("express");
const maker = express.Router();

// Home page Routes
const makerRoutes = (db) => {
  //Render the taker page
  maker.get("/new/", (req, res) => {
    res.render("new quiz page"); // replace with ejs name for new quiz page
    return maker;
  });

  maker.post("/new/", (req, res) => {
    //generate id for quiz
    //Stretch: check database to see if generated id matches an existing id in database, and regenerate ids until original id is generated
    db.query(/*query file here*/) //send new quiz data to database
      //Stretch: if identical quiz already exists in database, give user error message
      .then(() => {
        res.redirect("/m/:id/"); // redirect to maker quiz page using the id generated as a redirect url
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    return maker;
  });

  maker.get("/:id/", (req, res) => {
    db.query(/*query file here*/) //Query to find info on the quiz with the id in the req.params.id of the page
      .then((data) => {
        res.render("maker quiz page", data); // replace with ejs name for maker quiz page
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    return maker;
  });

  maker.get("/:id/results/", (req, res) => {
    db.query(/*query file here*/) //Query to find info on the quiz with the id in the req.params.id of the page
      .then((data) => {
        res.render("maker quiz results page", data); // replace with ejs name for maker quiz results page
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    return maker;
  });

  //Stretch:

  //An update button
  maker.post("/:id/", (req, res) => {
    db.query(/*query file here*/) //Query to find info on the quiz with the id in the req.params.id of the page and update the info.
      // This includes changing quiz, or making the quiz public or private, or ending submissions for the quiz
      .then((data) => {
        res.render("maker quiz page", data); // replace with ejs name for maker quiz results page
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    return maker;
  });

  maker.post("/:id/delete", (req, res) => {
    db.query(/*query file here*/) //Query to remove the quiz with the id in the req.params.id of the page.
      .then((data) => {
        res.redirect("../", data); // redirect to home page
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    return maker;
  });
};

module.exports = { makerRoutes };
