// Libraries used
const express = require("express");
const maker = express.Router();

// Home page Routes
module.exports = (db) => {
  // Render the maker new quiz page
  maker.get("/new/", (req, res) => {
    res.render("new-quiz"); // replace with ejs name for new quiz page
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
    db.query(
      `SELECT DISTINCT quizzes.id as quiz_id, quizzes.title as title, quizzes.creator_name as creator_name, questions.question_content as question,
    (SELECT answers.answer_content FROM answers
    JOIN questions on question_id = questions.id
    WHERE questions.quiz_id = ${id} AND answers.correct = 'true') as correctanswer,
    (SELECT answers.answer_content FROM answers
    JOIN questions on question_id = questions.id
    WHERE questions.quiz_id = ${id} AND answers.correct IS NULL) as wronganswer
    FROM quizzes
    JOIN questions ON quizzes.id = quiz_id
    JOIN answers ON questions.id = question_id
    WHERE quizzes.id = ${id}`
    ) // Replace with Query to find info on the quiz with the id in the req.params.id of the page
      .then((data) => {
        console.log(data.rows);
        const templateVars = { quiz: { ...data.rows[0] } };
        res.render("maker-quiz", templateVars); // replace with ejs name for maker quiz page
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  maker.get("/:id/results/", (req, res) => {
    const id = req.params.id;
    db.query(
      `SELECT attempts.quiz_id as quiz_id, quizzes.title as title, quizzes.creator_name as creator_name, attempts.quiztaker_name as taker_name, count(answers.correct) as score, count(attempts_answers.*) as total, (SELECT count(attempts.*) FROM attempts WHERE attempts.quiz_id = ${id}) as total_attempts
        FROM answers
        JOIN attempts_answers ON answers.id = answer_id
        JOIN attempts ON attempts.id = attempt_id
      JOIN quizzes ON quizzes.id = attempts.quiz_id
        WHERE attempts.quiz_id = ${id}
        GROUP BY attempts.id, quizzes.title, quizzes.creator_name`
    )
      .then((data) => {
        const templateVars = { quiz: { ...data.rows[0] } };
        console.log(templateVars);
        res.render("maker-result", templateVars);
      })
      .catch((err) => {
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
        res.redirect(`/m/${id}/`); // Replace with ejs name for maker quiz page
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
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // End of Stretch

  return maker;
};
