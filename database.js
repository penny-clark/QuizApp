const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});

//get most recent public quizzes for the homepage
const getRecentQuizzes = function() {
  const sql = `
  SELECT title, creator_name, id
  FROM quizzes
  WHERE publicly_listed = 'true'
  ORDER BY time_created DESC
  LIMIT 10`;

  return pool.query(sql).then((res) => res.rows);
};

module.exports = getRecentQuizzes;

//gets the quiz fields based on quiz id
//Right now answer 1 will always be the right answer, but I don't really have time to fix today!
const getQuizById = function(quiz_id) {
  const sql = `
  SELECT DISTINCT quizzes.id as quiz_id, quizzes.title, quizzes.creator_name, questions.question_content as question, (SELECT answers.answer_content FROM answers
    JOIN questions on question_id = questions.id
    WHERE questions.quiz_id = $1 AND answers.correct = 'true') as answer1,
    (SELECT answers.answer_content FROM answers
    JOIN questions on question_id = questions.id
    WHERE questions.quiz_id = $1 AND answers.correct IS NULL) as answer2
    FROM quizzes
    JOIN questions ON quizzes.id = quiz_id
    JOIN answers ON questions.id = question_id
    WHERE quizzes.id = $1`;
};
module.exports = getQuizById;

//this generates an overview of a quiz for the maker results page
//not sure if it will work to replace all three $1 with the param, but we'll try it and see if it breaks
const getQuizInfoById = function(quiz_id) {
  const sql = `
  SELECT DISTINCT quizzes.id as quiz_id, quizzes.title as title, quizzes.creator_name as creator_name, questions.question_content as question,
  (SELECT answers.answer_content FROM answers
  JOIN questions on question_id = questions.id
  WHERE questions.quiz_id = $1 AND answers.correct = 'true') as correctanswer,
  (SELECT answers.answer_content FROM answers
  JOIN questions on question_id = questions.id
  WHERE questions.quiz_id = $1 AND answers.correct IS NULL) as wronganswer
  FROM quizzes
  JOIN questions ON quizzes.id = quiz_id
  JOIN answers ON questions.id = question_id
  WHERE quizzes.id = $1;`;

  return pool.query(sql, [quiz_id]).then((res) => {
    const quiz = res.rows || null;
    return quiz;
  });
};

//module.exports = getQuizInfoById;

//get the score (in points) for a single attempt
const getAttemptsResults = function(attempt_id) {
  const sql = `
  SELECT attempts.quiztaker_name as name, attempts.quiz_id as quiz_id, count(answers.correct) as score, count(attempts_answers.*) as total
  FROM attempts_answers
  JOIN answers ON answers.id = answer_id
  JOIN attempts ON attempts.id = attempt_id
  WHERE attempts.id = $1
  GROUP BY attempts.id`;

  return pool.query(sql, [attempt_id]).then((res) => {
    const attemptScore = res.rows[0] || null;
    return attemptScore;
  });
};

//module.exports = getAttemptsResults;

//get single attempt score as a percentage
const getAttemptScorePercentage = function(attempt_id) {
  const sql = `
  SELECT attempts.quiz_id as quiz_id, attempts.quiztaker_name as taker_name, (count(answers.correct) / count(attempts_answers.*)) * 100 as average
  FROM attempts_answers
  JOIN answers ON answers.id = answer_id
  JOIN attempts ON attempts.id = attempt_id
  WHERE attempts.id = $1
  GROUP BY attempts.id`;

  return pool.query(sql, [attempt_id]).then((res) => {
    const attemptScore = res.rows[0] || null;
    return attemptScore;
  });
};

//module.exports = getAttemptScorePercentage;

//get quiz results for all takers of a single quiz
const getAllResultsForQuiz = function(quiz_id) {
  const sql = `
  SELECT attempts.quiztaker_name as name, count(answers.correct) as score, count(attempts_answers.*) as total
  FROM answers
  JOIN attempts_answers ON answers.id = answer_id
  JOIN attempts ON attempts.id = attempt_id
  WHERE attempts.quiz_id = $1
  GROUP BY attempts.id`;

  return pool.query(sql, [quiz_id]).then((res) => {
    const allResults = res.rows || null;
    return allResults;
  });
};

//module.exports = getAllResultsForQuiz;

//get the average score of all takers for a quiz
const getQuizTotalAverage = function(quiz_id) {
  const sql = `
  SELECT ROUND(sum(correct) / count(total) * 100) as average
  FROM (SELECT attempts.quiz_id as quiz_id, count(answers.correct) as correct, count(attempts_answers.*) as total
  FROM attempts_answers
  JOIN answers ON answers.id = answer_id
  JOIN attempts ON attempts.id = attempt_id
  WHERE attempts.quiz_id = $1
  GROUP BY attempts.id) as singlescores`;

  return pool.query(sql, [quiz_id]).then((res) => {
    const quizAverage = res.rows[0] || null;
    return quizAverage;
  });
};

//module.exports = getQuizTotalAverage;

//THESE FOUR FUNCTIONS ARE FOR ADDING A NEW QUIZ
const addQuiz = function(newquiz) {
  const sql = `INSERT INTO quizzes (title, creator_name, publicly_listed, category)
  VALUES ($1, $2, $3, $4, $5) RETURNING *`;

  return pool
    .query(sql, [
      newquiz.title,
      newquiz.creatorname,
      newquiz.public,
      newquiz.category,
    ])
    .then((res) => {
      const newquiz = res.rows[0];
      console.log(newquiz); //console log for testing
      return newquiz;
    });
};

//module.exports = addQuiz;

//add a new question to questions database
const addQuestion = function(newquestion) {
  const sql = `INSERT INTO questions (quiz_id, question_content)
  VALUES (${newquiz.id}, $1,) RETURNING *`;

  return pool.query(sql, [newquestion.content]).then((res) => {
    const newquestion = res.rows[0];
    console.log(newquestion); //console log for testing
    return newquestion;
  });
};

//module.exports = addQuestion;

//add a correct answer to answers database

const addAnswer1 = function(answer) {
  const sql = `INSERT INTO answers (question_id, answer_content, correct)
  VALUES (${newquestion.id}, $1, $2) RETURNING *`;

  return pool.query(sql, [answer.content, answer.correct]).then((res) => {
    const answer = res.rows[0];
    console.log(answer); //console log for testing
    return answer;
  });
};

//module.exports = addAnswer1;

//need to call this one after the first answer is added for chaining so the question id gets chained along throug the previous answer
const addAnswerSubsequent = function(answer) {
  const sql = `INSERT INTO answers (question_id, answer_content, correct)
  VALUES (${answer.question_id}, $1, $2) RETURNING *`;

  return pool.query(sql, [answer.content, answer.correct]).then((res) => {
    const answer = res.rows[0];
    console.log(answer); //console log for testing
    return answer;
  });
};

// module.exports = {
//   getRecentQuizzes,
//   getQuizById,
//   getQuizInfoById,
//   getAttemptsResults,
//   getAttemptScorePercentage,
//   getAllResultsForQuiz,
//   getQuizTotalAverage,
//   addQuiz,
//   addQuestion,
//   addAnswer1,
//   addAnswerSubsequent
// }
