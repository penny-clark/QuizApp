// Libraries used
const express = require("express");
const taker = express.Router();

// Home page Routes
module.exports = (db) => {
  // Render the Quiz Taker page
  taker.get("/:id/", (req, res) => {
    const id = req.params.id;
    db.query(
      `SELECT DISTINCT quizzes.id as quiz_id, quizzes.title, quizzes.creator_name, questions.question_content as question, (SELECT answers.answer_content FROM answers
      JOIN questions on question_id = questions.id
      WHERE questions.quiz_id = ${id} AND answers.correct = 'true') as answer1,
      (SELECT answers.answer_content FROM answers
      JOIN questions on question_id = questions.id
      WHERE questions.quiz_id = ${id} AND answers.correct IS NULL) as answer2
      FROM quizzes
      JOIN questions ON quizzes.id = quiz_id
      JOIN answers ON questions.id = question_id
      WHERE quizzes.id = ${id}`
    ) // Replace with Query to find info on the quiz with the id in the req.params.id of the page
      .then((data) => {
        console.log("This is data: ", data.rows);
        const templateVars = { quiz: { ...data.rows[0] } };
        console.log(templateVars);
        res.render("take-quiz", templateVars); // replace with ejs name for taker quiz page
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Show taker results
  taker.get("/:id/results/", (req, res) => {
    const id = req.params.id;
    db.query(
      `SELECT attempts.quiz_id as quiz_id, quizzes.title as title, attempts.quiztaker_name as taker_name, count(answers.correct) as score, count(attempts_answers.*) as total
    FROM attempts_answers
    JOIN answers ON answers.id = answer_id
    JOIN attempts ON attempts.id = attempt_id
    JOIN quizzes ON quizzes.id = attempts.quiz_id
    WHERE attempts.id = ${id}
    GROUP BY attempts.id, quizzes.title`
    ) // Replace with Query to find info on the quiz with the id in the req.params.id of the page
      // Stretch: shows details on what questions the taker got wrong and the correct answer for those questions
      .then((data) => {
        const templateVars = { quiz: {...data.rows[0]} };
        res.render("taker-result", templateVars); // Replace with ejs name for taker quiz results page
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Quiz Submit Button
  taker.post("/:id/", (req, res) => {
    const id = req.params.id;
    db.query("SELECT 1") // Replace with Query to send info on the quiz with the id in the req.params.id of the page.
      .then(() => {
        res.redirect(`/t/${id}/results`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return taker;
};
